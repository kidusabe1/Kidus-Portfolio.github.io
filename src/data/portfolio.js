export const portfolioData = {
  personal: {
    name: 'Kidus',
    fullName: 'Kidus Abebe Mekonen',
    tagline: 'Neuro-AI Researcher • Computer Science & Neuroscience',
    headline: 'I bridge neuroscience and AI.',
    description:
      'I combine computer science and neuroscience to build AI systems that improve quality of life for people living with neurodegenerative disease.',
    highlights: [
      'Neural Interfaces Lab • Gonda Brain Research Center',
      'Erasmus Mundus MSc • Bar-Ilan & Vrije University',
      'Published research with 400+ citations',
    ],
    about:
      "I bridge computer science and neuroscience with the goal of improving quality of life for people living with neurodegenerative disease. At the Neural Interfaces Lab in Bar-Ilan University's Gonda Brain Research Center, I worked on longitudinal patient modelling and conversational AI for Parkinson's disease. My training spans Brain and Data Science at Bar-Ilan University, neuroscience at Vrije University of Amsterdam, and Information Technology at KIIT.",
    email: 'kidusabebe1921@gmail.com',
    phone: '+251945836505',
    address: 'Vrije University of Amsterdam, Amsterdam, The Netherlands',
    cvUrl: 'myCV.pdf',
    social: {
      github: 'https://github.com/kidusabe1',
      linkedin:
        'https://www.linkedin.com/in/kidus-abebe-mekonen-540b88208/',
      youtube: 'https://www.youtube.com/@kidus_diaries',
      instagram:
        'https://www.instagram.com/kidus_vs_life?igsh=NWY3cTBkNWR3cGNv&utm_source=qr',
    },
  },

  education: [
    {
      degree: 'MSc in Neuroscience',
      institution: 'Vrije University of Amsterdam',
      location: 'Amsterdam, The Netherlands',
      period: 'Aug 2026',
    },
    {
      degree: 'MSc in Brain and Data Science',
      program: 'Erasmus Mundus Joint Master Degree',
      institution: 'Bar-Ilan University',
      location: 'Ramat Gan, Israel',
      period: 'Oct 2025 — Present',
      description:
        'Interdisciplinary graduate study at the intersection of brain science, data science, and neural engineering.',
    },
    {
      degree: 'NeuroData Summer School',
      institution: 'University of Zagreb',
      location: 'Zagreb, Croatia',
      period: 'Jul 2026',
    },
    {
      degree: 'Bachelor of Technology in Information Technology',
      institution: 'Kalinga Institute of Industrial Technology (KIIT)',
      location: 'Bhubaneswar, India',
      period: 'Oct 2021 — Jun 2025',
    },
    {
      degree: 'Exchange Semester, Department of AI',
      program: 'Global Korea Scholarship',
      institution: 'Chungnam National University',
      location: 'Daejeon, South Korea',
      period: 'Sep 2024 — Dec 2024',
    },
  ],

  awards: [
    {
      title: 'Erasmus Mundus Joint Master Scholarship',
      description:
        'Neuroscience and Data Science graduate study across Israel and the Netherlands.',
    },
    {
      title: 'Fully Funded Merit Scholarship',
      description:
        'Study in India scholarship covering four years of bachelor’s study.',
    },
    {
      title: 'Global Korea Scholarship',
      description:
        'Funded an exchange semester at Chungnam National University in South Korea.',
    },
  ],

  certifications: [
    'Google Advanced Data Analytics Specialization',
    'TensorFlow and Deep Learning',
    'Supervised Machine Learning',
    'Data Integration with Microsoft Azure Data Factory',
    'Security and Privacy for Big Data',
    'Hadoop Platform and Application Framework',
    'Advanced Data Visualisation with Tableau',
    'Business Analytics with R',
  ],

  skills: {
    'Machine Learning & Data Science': [
      'Python',
      'PyTorch',
      'TensorFlow',
      'MATLAB',
      'Scikit-learn',
      'Pandas',
      'OpenCV',
    ],
    'Software Development': ['C++', 'C', 'React', 'Next.js', 'HTML', 'CSS'],
    'Database Management': ['PostgreSQL', 'MySQL', 'MongoDB'],
    'DevOps & Environment': ['Git', 'Docker', 'Linux', 'Anaconda'],
  },

  interests: [
    {
      title: 'Neuroinformatics & Clinical AI',
      description:
        'Intersection of machine learning and neurological data, including predictive and monitoring applications for neurodegenerative conditions and EEG signal processing for neural decoding.',
    },
    {
      title: 'Advanced Neural Architectures',
      description:
        'Engineering and theoretical exploration of Transformers, Generative Adversarial Networks (GANs), and Spiking Neural Networks (SNNs).',
    },
    {
      title: 'Algorithmic Interpretability & Security',
      description:
        'Evaluating model transparency using frameworks like SHAP, and assessing data privacy and architectural vulnerabilities in Generative AI ecosystems.',
    },
    {
      title: 'Applied ML & Data Systems',
      description:
        'Deployment of ML algorithms for large-scale data analysis, incorporating computer vision and NLP for classification, detection, and automated summarization.',
    },
  ],

  projects: [
    {
      title: 'AI-Augmented Treatment for Parkinson’s Disease',
      image: 'images/parkinsons-clinical-ai.jpg',
      period: 'Oct 2025 — Jul 2026',
      link: `${import.meta.env.BASE_URL}posters/nabupd-gonda-meeting-poster.pdf`,
      linkLabel: 'View poster',
      description:
        'Helped design a WhatsApp-based clinical AI agent with domain-specific agents that capture symptoms, medication events, and patient routines.',
      tags: ['Clinical AI', 'Conversational Agents', 'Parkinson’s Disease'],
    },
    {
      title: 'LoCoPD: Longitudinal Conversational Modelling',
      image: 'images/locopd-longitudinal-modelling.jpg',
      period: 'Mar 2026 — Jul 2026',
      link: `${import.meta.env.BASE_URL}posters/locopd-gonda-meeting-poster.pdf`,
      linkLabel: 'View poster',
      description:
        'Built a synthetic patient generator for realistic, multidimensional profiles representing people living with Parkinson’s disease.',
      tags: ['Synthetic Data', 'Patient Modelling', 'Parkinson’s Disease'],
    },
    {
      title: 'Covert Speech Classification with a Spatio-Temporal Transformer',
      image: 'images/covert-speech-eeg-transformer.jpg',
      period: 'Oct 2025 — Mar 2026',
      link: 'https://github.com/kidusabe1/Imagined-Speech-Decoding',
      linkLabel: 'View repository',
      description:
        'Performed model interpretability analysis for a functional-area spatio-temporal transformer used in EEG-based imagined-speech classification.',
      tags: ['EEG', 'Transformers', 'Interpretability'],
    },
    {
      title: 'Signal & Data Analysis for Neuroscience',
      image: null,
      variant: 'course',
      period: 'Course portfolio',
      link: `${import.meta.env.BASE_URL}course/signal-data-analysis/`,
      internal: true,
      linkLabel: 'Explore course',
      description:
        'Four computational studies spanning signal denoising, event-related firing, spike-train dynamics, and latent structure in LFP trials.',
      tags: ['Computational Neuroscience', 'Signal Processing', 'Python'],
    },
    {
      title: 'NLP Based Multilingual Video Summarizer',
      image: 'images/llama.jpeg',
      link: 'https://github.com/kidusabe1/Multilingual-Youtube-Video-Summarizer',
      description:
        'Fine-tuned LLaMA3 and open-source language translators, summarizing YouTube videos in 200+ languages.',
      tags: ['LLaMA3', 'NLP', 'Multilingual'],
    },
    {
      title: 'Lightweight Waste Classifier',
      image: 'images/yolo.png',
      link: 'https://github.com/kidusabe1/Waste-Classifier',
      description:
        'Developed a waste classification system using NVIDIA NanoJet and YOLOv11, achieving 92% accuracy with real-time processing under 50ms.',
      tags: ['YOLOv11', 'Edge AI', 'Computer Vision'],
    },
    {
      title: 'CCTV Anomaly Detection & Auto-Captioning',
      image: 'images/anomaly.avif',
      link: 'https://github.com/kidusabe1/CCTV_Captioning',
      description:
        'Built Automated Anomaly Detection using C3D-v1.0 and a three-layer neural network, achieving 0.9602 Cap Score on the UCF-Crime dataset.',
      tags: ['C3D', 'Deep Learning', 'Video Analysis'],
    },
    {
      title: 'Micrograd',
      image: 'images/pic04.jpg',
      link: "https://github.com/kidusabe1/Micrograd-implementation-following-andrej-karparthy/blob/main/andre's%20tutorial%20implementation.ipynb",
      description:
        'Micrograd is the Backbone of Backpropagation models — a minimal autograd engine implementation.',
      tags: ['Neural Networks', 'Backpropagation', 'Python'],
    },
    {
      title: 'EV Vehicle Analysis',
      image: 'images/pic01.png',
      link: 'https://public.tableau.com/app/profile/kidus.abebe.mekonen/viz/ElectricVehicleDataAnalysis_17240895891830/EVProductAnalysis',
      description: 'A Tableau project on various types of EVs in the US.',
      tags: ['Tableau', 'Data Viz', 'Analytics'],
    },
    {
      title: 'Sales Dashboard',
      image: 'images/pic02.png',
      link: 'https://public.tableau.com/views/SalesDashboard_17118250039380/SalesDashboard?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link',
      description:
        'Dynamic Supermarket Sales Analysis Dashboard using Tableau.',
      tags: ['Tableau', 'Sales Analytics', 'Dashboard'],
    },
  ],

  publications: [
    {
      year: '2024',
      title:
        'Privacy and Security Concerns in Generative AI: A Comprehensive Survey',
      venue: 'IEEE Access',
      description:
        'Reviews major privacy and security risks in generative AI, mitigation strategies, and open research challenges. The paper has received over 400 citations.',
      link: 'https://ieeexplore.ieee.org/document/10478883',
      image: 'images/IEEE.png',
    },
    {
      year: '2025',
      title:
        'Unlocking the Power of Machine Learning in Big Data: A Scoping Survey',
      venue: 'Data Science and Management',
      description:
        'Surveys the role of machine learning in big data analytics, tracing the development of ML-enabled data processing and decision-support systems.',
      link: 'https://www.sciencedirect.com/science/article/pii/S2666764925000104?via%3Dihub',
      image: 'images/elsevier.svg',
    },
  ],

  workExperience: [
    {
      period: 'Oct 2025 — Jul 2026',
      company: 'Neural Interfaces Lab',
      organization: 'Gonda Brain Research Center',
      location: 'Ramat Gan, Israel',
      role: 'Research Intern · 30 hours/week',
      description: [
        'Worked on a project to improve quality of life for people with Parkinson’s disease under Prof. Izhar Bar-Gad.',
        'Developed longitudinal patient modelling approaches for conversational agents.',
      ],
    },
    {
      period: 'May 2024 — Jul 2024',
      company: 'HighRadius Technologies',
      organization: 'FinTech',
      location: 'Bhubaneswar, India',
      role: 'Technology Consultant Intern · 40 hours/week',
      description: [
        'Designed and implemented automated ETL pipelines, improving data processing efficiency by 60%.',
        'Built sustainable and scalable solutions using AWS, SQL, and other database tools.',
      ],
      link: 'https://www.highradius.com/',
      image: 'images/HighRadius.svg',
    },
    {
      period: 'May 2023 — Nov 2023',
      company: 'Birla Institute of Technology and Science',
      organization: 'Pilani Campus',
      location: 'Pilani, India',
      role: 'Research Intern · 20 hours/week',
      description: [
        'Proposed strategies for mitigating privacy and security risks in AI-driven technologies under Prof. Vikas Hassija.',
        'Co-authored the published survey “Privacy and Security Concerns in Generative AI.”',
      ],
      link: 'https://www.bits-pilani.ac.in/',
      image: 'images/bits.webp',
    },
  ],

  blogs: [
    {
      title: 'Kidus Diaries on YouTube',
      description:
        'Behind-the-scenes stories, learning journeys, and updates from my student and builder life.',
      link: 'https://www.youtube.com/@kidus_diaries',
      cta: 'Watch',
      icon: 'youtube',
    },
    {
      title: 'AI + Data Work on GitHub',
      description:
        'Technical writeups in project READMEs with implementation details, experiments, and findings.',
      link: 'https://github.com/kidusabe1',
      cta: 'Explore',
      icon: 'github',
    },
    {
      title: 'Professional Updates on LinkedIn',
      description:
        'Publications, internships, and career milestones in one place.',
      link: 'https://www.linkedin.com/in/kidus-abebe-mekonen-540b88208/',
      cta: 'Read',
      icon: 'linkedin',
    },
  ],

  extraCurricular: [
    {
      period: 'Feb 2017 — Jul 2020',
      title: 'Blood Donation Camp Organizer',
      organization: 'Ethiopian Blood Bank · Mekelle Center',
      description: [
        'Coordinated tri-monthly blood donation camps in my high school and neighborhood.',
        'Led student volunteers promoting the initiative across the school and community.',
      ],
      image: 'images/blood bank.jpg',
    },
    {
      period: 'Mar 2017 — Jun 2020',
      title: 'Community School English Teacher',
      organization: 'Paradise School of American English',
      description: [
        'Volunteered to teach underprivileged children ages 8 to 17 with limited English proficiency.',
      ],
      image: 'images/PSE.png',
    },
    {
      period: 'Apr 2023 — Mar 2024',
      title: 'Core Member',
      organization: 'Artificial Intelligence Society of KIIT · AISOC',
      description: [
        'Collaborated with leading AI researchers to organize events, workshops, and initiatives for a community of learners and professionals.',
        'Supported AI research and education through active participation in the university’s non-profit society.',
      ],
      image: 'images/AISOC.png',
    },
  ],
};
