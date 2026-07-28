export const coursePortfolio = {
  meta: {
    title: 'Signal and Data Analysis for Neuroscience',
    instructor: 'Prof. Izhar Bar-Gad',
    student: 'Kidus Abebe Mekonen',
    role: 'Neuro-AI Researcher',
    summary:
      'A hands-on study of how raw neural recordings become interpretable evidence—from digitization and spike statistics to dimensionality reduction and frequency analysis.',
  },

  stats: [
    { value: '04', label: 'featured studies' },
    { value: '07', label: 'core methods' },
    { value: '01', label: 'analytical journey' },
  ],

  projects: [
    {
      id: 'signal-recovery',
      index: '01 / 04',
      eyebrow: 'Signal estimation',
      title: 'Recovering structure from a noisy signal',
      question:
        'How much smoothing removes noise without erasing the signal we care about?',
      approach:
        'Compared Gaussian kernels across window sizes and standard deviations, estimated additive noise from the residual, and evaluated the resulting SNR.',
      takeaway:
        'The selected window of 50 samples with σ = 10 offered a practical balance between visible denoising and edge/detail preservation.',
      tags: ['Gaussian convolution', 'SNR', 'Bias–variance trade-off'],
      accent: 'signal',
    },
    {
      id: 'neural-response',
      index: '02 / 04',
      eyebrow: 'Event-related activity',
      title: 'Characterizing stimulus-driven neural responses',
      question:
        'How does a neuron’s firing change before, during, and after repeated stimulation?',
      approach:
        'Computed baseline and evoked rates, aligned spikes to approximately 100 stimulus events, then normalized binned counts into a peri-stimulus time histogram.',
      takeaway:
        'A 200 ms pre-stimulus and 800 ms post-stimulus window exposed a pronounced change in firing that the overall mean alone could not describe.',
      tags: ['PSTH', 'Tuning curves', 'Firing rate'],
      accent: 'event',
    },
    {
      id: 'spike-dynamics',
      index: '03 / 04',
      eyebrow: 'Point processes',
      title: 'Modeling spike-train dynamics',
      question:
        'What signatures do refractoriness, bursting, and shared inhibition leave in observed spike trains?',
      approach:
        'Simulated Poisson firing with recovery, derived ISI survivor and hazard functions, and compared cross-correlations before and after common inhibition.',
      takeaway:
        'The refractory model suppresses short intervals, while common inhibition produces an extended correlation trough tied to the inhibition window.',
      tags: ['Poisson process', 'Hazard function', 'Cross-correlation'],
      accent: 'spike',
    },
    {
      id: 'latent-structure',
      index: '04 / 04',
      eyebrow: 'Representation learning',
      title: 'Finding structure in neural waveforms',
      question:
        'Can a compact representation separate candidate spikes more clearly than the original 20-dimensional recordings?',
      approach:
        'Implemented PCA, checked the result against scikit-learn, projected 2,000 waveforms, and examined cluster structure with k-means and EM.',
      takeaway:
        'The first principal component produced strong separation between two waveform groups; later components preserved variation but contributed less to classification.',
      tags: ['PCA', 'K-means', 'Expectation maximization'],
      accent: 'latent',
    },
  ],

  findings: [
    {
      value: '200 / 800 ms',
      label: 'Pre- and post-stimulus windows used to reveal event-related firing changes.',
    },
    {
      value: 'σ = 10',
      label: 'Selected Gaussian spread for balancing visible denoising with signal detail.',
    },
    {
      value: '2,000 × 20',
      label: 'Waveform matrix reduced with PCA before k-means and EM clustering.',
    },
  ],

  toolkit: [
    'Python',
    'NumPy',
    'SciPy',
    'Matplotlib',
    'scikit-learn',
  ],
};
