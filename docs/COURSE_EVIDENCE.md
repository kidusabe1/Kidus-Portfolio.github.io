# SDA portfolio evidence and presentation

The portfolio connects four separate studies through analysis choices; it does not imply one dataset or a continuous experiment. Each study presents a question, decision, finding, two figures, lesson, limitation, assignment summary, and notebook link. Verification and correction notes are development documentation only and must not appear on the public portfolio.

## Rebuild evidence

From `main-portfolio`, with the original assignment folders in the parent directory:

```sh
MPLCONFIGDIR=/private/tmp/sda-mpl-cache ../bin/python scripts/build_course_evidence.py
```

The script uses the existing course Python environment (NumPy, SciPy, Matplotlib, scikit-learn). It does not execute or modify original notebooks. It writes theme-specific PNG figures, escaped read-only notebook HTML exports containing source and saved outputs, and `docs/course-results.json`. No raw datasets are included in the site.

## Verified facts and corrections

- **SNR:** Full convolution with a normalized 50-sample Gaussian, sigma 10; crop `[25:-24]`, matching notebook code. Mean-square estimate divided by mean-square residual gives **9.404596896957703 dB**, matching saved output. Notebook prose saying 0.36 dB is stale. This is a filter-dependent estimate, not ground-truth SNR or evidence of optimal smoothing.
- **PSTH:** 100 events; baseline −200–0 ms, response 0–800 ms. Rates are 18.55 Hz and 24.8875 Hz. The 75–100 ms bin is 113.2 Hz. The notebook omits the final 775–800 ms bin; regenerated figures include it. A 25 ms histogram does not establish a 5 ms onset latency.
- **Refractory simulation:** Original RandomState seed 42 and thinning rule yield 4,883 proposals and 3,404 accepted spikes. Minimum accepted interval is at least 5 ms. Autocorrelation uses lag zero at N−1, correcting the notebook's shifted slicing; self-pairs are omitted. The notebook's Fano factor is not cited because variance was assigned to mean rather than empirically computed. The notebook's truncated smoothed-autocorrelation calculation is also not used.
- **PCA:** Assignment 6, question 1 specifies LFP trials at **4 kHz**. The notebook code uses 4000 Hz; its 40 kHz / potential-spikes prose is inconsistent. Matrix: 2,000 × 20. Custom centered Gram-matrix eigendecomposition is compared to scikit-learn after axis-sign alignment. First three score columns agree within absolute tolerance 1e−9. PC1 explains 86.5851%; PC1+PC2 explain 92.8838%. Sign reversal changes scores' signs but preserves geometry. No classification accuracy is claimed.

Notebook HTML exports preserve the historical source, including its mistakes, without editorial commentary. Study links point to relevant cells. Assignment briefs on the page are explicitly summaries, not verbatim quotations.

## Checks

The evidence generator asserts the SNR, firing rates, counts, refractory lower bound, autocorrelation symmetry, PCA data shape, explained variance and sign-aligned agreement. Use `npm run lint` and `npm run build` for the website. Browser checks cover responsive layouts, theme switching, section anchors, keyboard disclosures, notebook links, and full-size figure links.

Browser verification completed at 320, 768, 1024 and 1440 px, with no horizontal overflow observed. Light/dark theme switching and keyboard disclosure activation worked; the console contained no warnings or errors. Direct hash navigation and notebook return links were verified after fixing React mount-time anchor restoration. All notebook cell targets and 16 themed figures are present in the production build.
