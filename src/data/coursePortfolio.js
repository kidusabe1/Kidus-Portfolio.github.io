export const coursePortfolio = {
  meta: {
    title: 'Signal and Data Analysis for Neuroscience',
    instructor: 'Prof. Izhar Bar-Gad',
    student: 'Kidus Abebe Mekonen',
    role: 'Neuro-AI Researcher',
    summary:
      'Four assignments on signal estimation, stimulus-locked firing, spike-train dynamics, and dimensionality reduction.',
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
      assignment: 'Assignment 02 · Question 1',
      question:
        'The file noisy_signal.csv contains 5,000 noisy samples. Compare the supplied Gaussian window sizes and sigma values, recommend a window for estimating the signal, estimate the noise from the residual, and report the SNR in dB.',
      approach:
        'Compared Gaussian kernels across window sizes and standard deviations, estimated additive noise from the residual, and evaluated the resulting SNR.',
      result:
        'A 50-sample Gaussian window with σ = 10 separated the slow oscillation from the high-frequency residual and produced an estimated SNR of 9.40 dB.',
      takeaway:
        'The plot makes the trade-off visible: smoothing reveals the underlying waveform, but more aggressive kernels begin to flatten meaningful structure.',
      tags: ['Gaussian convolution', 'SNR', 'Bias and variance'],
      chart: 'signal-recovery',
      chartAlt:
        'Noisy oscillating signal overlaid with its Gaussian-smoothed estimate, with the residual noise shown below.',
    },
    {
      id: 'neural-response',
      index: '02 / 04',
      eyebrow: 'Event-related activity',
      title: 'Characterizing stimulus-driven neural responses',
      assignment: 'Assignment 03 · Question 3',
      question:
        'Using the provided spike and stimulation times, compute the pre-stimulus mean firing rate and stimulation rate, determine how stimulation affects the mean firing rate, and describe the response using a clearly defined time window.',
      approach:
        'Computed baseline and evoked rates, aligned spikes to approximately 100 stimulus events, then normalized binned counts into a peri-stimulus time histogram.',
      result:
        'Across 100 stimuli, firing rose from an 18.55 Hz baseline to a 113.2 Hz peak at 75 ms, followed by distinct secondary responses near 350 ms and 650 ms.',
      takeaway:
        'The overall post-stimulus mean was only 24.89 Hz. The PSTH exposed a much richer three-epoch response that a single mean would hide.',
      tags: ['PSTH', 'Tuning curves', 'Firing rate'],
      chart: 'psth-response',
      chartAlt:
        'Peri-stimulus time histogram showing a large early firing peak and two later response epochs.',
    },
    {
      id: 'spike-dynamics',
      index: '03 / 04',
      eyebrow: 'Point processes',
      title: 'Finding the refractory fingerprint',
      assignment: 'Assignment 02 · Question 4',
      question:
        'Generate a 90-second Poisson spike train at 55 spikes per second with a 5 ms absolute refractory period and a 6 ms linear recovery. Calculate the TIH, survivor and hazard functions, and rate-normalized autocorrelation over ±100 ms.',
      approach:
        'Generated the homogeneous process with a fixed random seed, rejected spikes during absolute refractoriness, probabilistically restored firing during recovery, and compared the interval distribution with the autocorrelation.',
      result:
        'The refractory mechanism reduced 4,883 proposed spikes to 3,404 accepted spikes and carved a symmetric five-millisecond hole around zero lag.',
      takeaway:
        'The missing short ISIs and the autocorrelation trough are two views of the same biological constraint: the neuron cannot immediately fire again.',
      tags: ['Poisson process', 'Hazard function', 'Cross-correlation'],
      chart: 'refractory-autocorrelation',
      chartAlt:
        'Inter-spike interval distributions and rate-normalized autocorrelation showing a five-millisecond refractory gap.',
    },
    {
      id: 'latent-structure',
      index: '04 / 04',
      eyebrow: 'Representation learning',
      title: 'Finding structure in LFP trials',
      assignment: 'Assignment 06 · Question 1c',
      question:
        'Each row is one LFP trial sampled at 4 kHz. Perform PCA, plot histograms of the trial projections and a PC1-versus-PC2 scatter plot, then explain the plots in terms of representation and potential classification.',
      approach:
        'Implemented PCA from the covariance eigendecomposition, checked the components against scikit-learn, then projected all 2,000 trials into the learned coordinate system.',
      result:
        'PC1 alone explained 86.6% of the variance; PC1 and PC2 together explained 92.9%. PC1 formed two modes, while the first two projections traced a striking V-shaped geometry.',
      takeaway:
        'The bimodal PC1 distribution suggests a compact classification boundary, while PC2 preserves within-group variation that a one-dimensional view would lose.',
      tags: ['PCA', 'Dimensionality reduction', 'Classification'],
      chart: 'pca-structure',
      chartAlt:
        'Bimodal histogram of PC1 projections beside a V-shaped scatter plot of PC1 against PC2.',
    },
  ],

  learnings: [
    {
      title: 'Match the representation to the question',
      description:
        'Smoothing windows, histogram bins, and analysis intervals are modeling choices. I learned to set them according to the time scale of the neural process, then check which details they preserve or remove.',
    },
    {
      title: 'Read spike trains from several views',
      description:
        'Firing rate alone does not describe temporal structure. Inter-spike intervals, survivor and hazard functions, PSTHs, and autocorrelation answer different questions about the same spikes.',
    },
    {
      title: 'Implement, validate, then interpret',
      description:
        'Writing methods from their mathematical definitions made their assumptions clearer. Comparing my implementations with library results helped separate coding errors from meaningful patterns in the data.',
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
