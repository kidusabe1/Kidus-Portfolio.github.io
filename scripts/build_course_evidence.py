"""Rebuild portfolio figures and read-only notebook exports from sibling SDA files.
Run from any directory: ../bin/python scripts/build_course_evidence.py
Requires the course environment's NumPy, SciPy, Matplotlib and scikit-learn.
Original notebooks and datasets are never modified or executed.
"""
from pathlib import Path
import html
import json
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from scipy import signal
from sklearn.decomposition import PCA

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent
IMAGES = ROOT / 'public/images/course'
EVIDENCE = ROOT / 'public/evidence/course'
EVIDENCE.mkdir(parents=True, exist_ok=True)

# Match the original notebook's full-convolution crop, including its alignment.
raw = np.loadtxt(SOURCE / 'Assignment 02/noisy_signal.csv')
def smooth(size, sigma):
    kernel = signal.windows.gaussian(size, sigma)
    kernel /= kernel.sum()
    return signal.convolve(raw, kernel)[size // 2:size // 2 + len(raw)]
estimate = smooth(50, 10)
residual = raw - estimate
snr = 10 * np.log10(np.mean(estimate ** 2) / np.mean(residual ** 2))
assert round(snr, 2) == 9.40

spikes = np.loadtxt(SOURCE / 'Assignment 3 (2)/Q3spikeTime.csv', skiprows=1) * 1000
stimuli = np.loadtxt(SOURCE / 'Assignment 3 (2)/Q3stimTime.csv', skiprows=1) * 1000
trials = [spikes[(spikes >= t - 200) & (spikes <= t + 800)] - t for t in stimuli]
baseline = np.mean([np.sum(t < 0) / .2 for t in trials])
evoked = np.mean([np.sum(t >= 0) / .8 for t in trials])
# Include the last 775–800 ms bin, omitted by arange(-200, 800, 25) in the notebook.
edges = np.arange(-200, 801, 25)
psth = np.histogram(np.concatenate(trials), edges)[0] / (len(trials) * .025)
assert len(trials) == 100 and np.isclose(baseline, 18.55)
assert np.isclose(evoked, 24.8875) and np.isclose(psth.max(), 113.2)

# Preserve the original RandomState sequence and thinning rule.
rng = np.random.RandomState(42)
proposed, t = [], 0
while t < 90:
    t += -np.log(rng.rand()) / 55
    if t < 90:
        proposed.append(t)
accepted = []
for t in proposed:
    dt = t - accepted[-1] if accepted else np.inf
    if dt >= .011 or (.005 <= dt < .011 and rng.rand() < (dt - .005) / .006):
        accepted.append(t)
assert len(proposed) == 4883 and len(accepted) == 3404
assert np.min(np.diff(accepted)) >= .005
binary = np.zeros(90000)
binary[(np.array(accepted) * 1000).astype(int)] = 1
corr = signal.correlate(binary, binary, mode='full', method='fft')
zero = len(binary) - 1
lags = np.arange(-100, 101)
autocorr = corr[zero + lags] * 1000 / binary.sum()
autocorr[lags == 0] = np.nan  # Omit self-pairs, rather than suggesting zero is measured.
assert np.allclose(autocorr[:100], autocorr[101:][::-1])

X = np.loadtxt(SOURCE / 'Assignment 6/lfp_data.csv', delimiter=',', skiprows=1)
centered = X - X.mean(axis=0)
eigenvalues, eigenvectors = np.linalg.eig(centered.T @ centered)
order = np.argsort(eigenvalues)[::-1]
eigenvalues, eigenvectors = eigenvalues[order], eigenvectors[:, order]
scores = centered @ eigenvectors
reference = PCA(n_components=3).fit(centered)
# Sign alignment compares equivalent axes; score signs change with axis signs.
signs = np.sign(np.sum(eigenvectors[:, :3].T * reference.components_, axis=1))
aligned = scores[:, :3] * signs
error = np.max(np.abs(aligned - reference.transform(centered)))
assert np.allclose(aligned, reference.transform(centered), rtol=0, atol=1e-9)
variance = eigenvalues / eigenvalues.sum() * 100
assert X.shape == (2000, 20) and round(variance[:2].sum(), 1) == 92.9

metrics = {'snr_db': float(snr), 'baseline_hz': float(baseline), 'post_mean_hz': float(evoked),
           'peak_hz': float(psth.max()), 'peak_bin_ms': [75, 100],
           'proposed_spikes': len(proposed), 'accepted_spikes': len(accepted),
           'pc1_percent': float(variance[0]), 'pc1_pc2_percent': float(variance[:2].sum()),
           'pca_sign_aligned_max_error': float(error)}
(ROOT / 'docs/course-results.json').write_text(json.dumps(metrics, indent=2) + '\n')

for theme, bg, fg, muted, accent, other in [
    ('light', '#f7f7f5', '#17221d', '#58635d', '#047857', '#a13b55'),
    ('dark', '#0d1210', '#edf5f0', '#b0bbb4', '#a7f3d0', '#f0a0b1'),
]:
    plt.rcParams.update({'font.size': 12, 'text.color': fg, 'axes.labelcolor': fg,
                         'xtick.color': muted, 'ytick.color': muted, 'axes.edgecolor': muted,
                         'axes.facecolor': bg, 'figure.facecolor': bg, 'savefig.facecolor': bg})
    def canvas():
        fig, ax = plt.subplots(figsize=(7, 4.5), layout='constrained')
        ax.spines[['top', 'right']].set_visible(False)
        ax.grid(alpha=.12, color=muted)
        ax.set_axisbelow(True)
        return fig, ax
    def save(fig, name):
        fig.savefig(IMAGES / f'{name}-{theme}.png', dpi=160)
        plt.close(fig)
    fig, ax = canvas()
    ax.plot(raw, color=muted, alpha=.2, lw=.6)
    for size, sigma, color, style, label in [
        (5, .5, muted, '-', '5 samples / σ 0.5'),
        (50, 10, accent, '-', '50 samples / σ 10 (selected)'),
        (2000, 500, other, '--', '2,000 samples / σ 500'),
    ]:
        ax.plot(smooth(size, sigma), color=color, ls=style, lw=1.5, label=label)
    ax.set(xlabel='Sample index', ylabel='Amplitude', ylim=(-3.7, 4.8))
    ax.legend(frameon=False, fontsize=10, loc='upper right', labelcolor=fg)
    save(fig, 'kernel-comparison')
    fig, ax = canvas()
    ax.plot(residual, color=other, lw=.5)
    ax.axhline(0, color=muted, lw=.7)
    ax.set(xlabel='Sample index', ylabel='Residual amplitude', ylim=(-2.5, 3.8))
    ax.text(.03, .94, 'Residual = recording − selected estimate\nEstimated SNR: 9.40 dB',
            transform=ax.transAxes, va='top', fontsize=12)
    save(fig, 'signal-residual')
    fig, ax = canvas()
    bars = ax.bar(['Before\n−200 to 0 ms', 'After\n0 to 800 ms'], [baseline, evoked],
                  color=[muted, accent], width=.55)
    ax.bar_label(bars, fmt='%.2f Hz', padding=6, color=fg)
    ax.set(ylabel='Mean firing rate (Hz)', ylim=(0, 34))
    save(fig, 'response-means')
    fig, ax = canvas()
    ax.bar(edges[:-1], psth, width=25, align='edge', color=accent)
    ax.axvline(0, color=other, ls='--', lw=1)
    ax.axhline(baseline, color=muted, ls=':', lw=1)
    ax.annotate('113.2 Hz\n75–100 ms bin', (87.5, 113.2), (270, 114),
                arrowprops={'arrowstyle': '->', 'color': fg}, fontsize=11)
    ax.text(455, 28, 'Baseline 18.55 Hz', fontsize=10, color=muted)
    ax.set(xlabel='Time from stimulus onset (ms)', ylabel='Firing rate (Hz)', ylim=(0, 145))
    save(fig, 'response-timing')
    fig, ax = canvas()
    bins = np.arange(0, 201, 2)
    for times, color, label, style in [(proposed, muted, 'Poisson proposals', '--'),
                                       (accepted, accent, 'With refractory rule', '-')]:
        # Normalize over all intervals; display only the first 80 ms.
        values = np.diff(times) * 1000
        counts, _ = np.histogram(values, bins)
        ax.stairs(counts / len(values) / 2, bins, color=color, label=label, ls=style, lw=2)
    ax.axvspan(0, 5, color=other, alpha=.15)
    ax.text(.32, .9, 'No accepted intervals below 5 ms', transform=ax.transAxes, fontsize=10)
    ax.set(xlabel='Inter-spike interval (ms)', ylabel='Probability density (1/ms)', xlim=(0, 80))
    ax.legend(frameon=False, fontsize=10, labelcolor=fg, loc='center right')
    save(fig, 'refractory-intervals')
    fig, ax = canvas()
    ax.plot(lags, autocorr, color=accent)
    ax.axvspan(-5, 5, color=other, alpha=.15)
    ax.annotate('Refractory trough\n±5 ms around zero', (3, 3), (24, 12), fontsize=10,
                arrowprops={'arrowstyle': '->', 'color': fg})
    ax.set(xlabel='Lag (ms)', ylabel='Conditional rate (Hz)', xlim=(-100, 100))
    save(fig, 'refractory-lags')
    fig, ax = canvas()
    ax.hist(scores[:, 0], bins=30, color=accent)
    ax.set(xlabel='PC1 projection', ylabel='Trial count')
    ax.text(.04, .93, 'Two modes along PC1', transform=ax.transAxes, va='top')
    save(fig, 'pca-distribution')
    fig, ax = canvas()
    ax.scatter(scores[:, 0], scores[:, 1], s=8, alpha=.35, color=accent, rasterized=True)
    ax.set(xlabel='PC1 projection', ylabel='PC2 projection')
    ax.text(.04, .94, 'PC1 + PC2: 92.9% of variance', transform=ax.transAxes, va='top')
    save(fig, 'pca-projection')

# Static exports: escaped source and saved outputs, without executing notebooks.
notebooks = [
    ('signal-recovery', 'Assignment 02/SNR_1.ipynb'),
    ('neural-response', 'Assignment 3 (2)/PSTH_3.ipynb'),
    ('spike-dynamics', 'Assignment 02/poisson_with_refractory_period_04.ipynb'),
    ('latent-structure', 'Assignment 6/PCA_1.ipynb'),
]
for slug, path in notebooks:
    cells = []
    for i, cell in enumerate(json.loads((SOURCE / path).read_text())['cells']):
        source = html.escape(''.join(cell['source']))
        if not source.strip():
            continue
        outputs = []
        for output in cell.get('outputs', []):
            text = output.get('text', output.get('data', {}).get('text/plain', []))
            if text:
                outputs.append(f'<pre class="output">{html.escape("".join(text))}</pre>')
            png = output.get('data', {}).get('image/png')
            if png:
                outputs.append(f'<img alt="Saved figure output from cell {i + 1}" src="data:image/png;base64,{html.escape("".join(png))}">')
        cells.append(f'<section id="cell-{i + 1}"><h2>Cell {i + 1} · {cell["cell_type"]}</h2><pre class="{cell["cell_type"]}">{source}</pre>{"".join(outputs)}</section>')
    doc = f'''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>{html.escape(Path(path).name)} · SDA notebook</title>
<style>body{{font:16px/1.65 system-ui,sans-serif;max-width:960px;margin:40px auto;padding:0 20px;color:#17221d;background:#f7f7f5}}a{{color:#046348}}a:focus-visible{{outline:3px solid #047857;outline-offset:5px}}h1{{overflow-wrap:anywhere}}h2{{font-size:14px;color:#58635d}}aside{{padding:20px;border-left:3px solid #047857;background:#e9efe9}}section{{border-top:1px solid #ccd4ce;margin-top:32px}}pre{{overflow:auto;padding:16px;background:#ebeeea;font-size:13px}}pre.markdown{{white-space:pre-wrap;font:inherit;background:transparent;padding:0}}img{{max-width:100%;height:auto}}.output{{background:#e3ebe5}}</style>
<a href="../../course/signal-data-analysis/#{slug}">← Back to study</a><h1>{html.escape(Path(path).name)}</h1><p>Original notebook · source text and saved outputs</p>{''.join(cells)}</html>'''
    (EVIDENCE / f'{slug}.html').write_text("\n".join(line.rstrip() for line in doc.splitlines()) + "\n")
print(json.dumps(metrics, indent=2))
