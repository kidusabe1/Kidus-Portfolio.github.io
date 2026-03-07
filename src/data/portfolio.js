export const portfolioData = {
  personal: {
    name: 'Kidus',
    fullName: 'Kidus Abebe Mekonen',
    tagline: 'AI Engineer • Data Scientist • Researcher',
    headline: 'I build useful AI products.',
    description:
      'I design practical machine learning systems with measurable outcomes — from multilingual NLP products to edge AI deployments and applied research.',
    highlights: [
      'Published in IEEE & Elsevier',
      'Built and deployed real-time AI systems',
      'Focused on health and education impact',
    ],
    about:
      "I'm a final-year Artificial Intelligence student focused on solving real-world problems with machine learning and data-driven systems. I care deeply about building technology that can improve public health and education, and I'm currently on an exchange semester in South Korea while expanding my cross-disciplinary AI work.",
    email: 'kidusabebe1921@gmail.com',
    phone: '+918984937192',
    address: 'Building 2 Chungnam National University, Daejeon, South Korea',
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

  projects: [
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
      year: 'Feb 2025',
      title: 'Published in Elsevier',
      venue: 'Elsevier',
      paper:
        'Unlocking the Power of Machine Learning in Big Data: A Scoping Survey',
      link: 'https://www.sciencedirect.com/science/article/pii/S2666764925000104?via%3Dihub',
      image: 'images/elsevier.svg',
    },
    {
      year: 'Jan 2025',
      title: 'Became an IEEE Member',
      venue: 'IEEE',
      image: 'images/IEEE.png',
    },
    {
      year: 'Mar 2024',
      title: 'Published in IEEE',
      venue: 'IEEE',
      paper:
        'Privacy and Security Concerns in Generative AI: A Comprehensive Survey',
      link: 'https://ieeexplore.ieee.org/document/10478883',
      image: 'images/IEEE.png',
    },
  ],

  workExperience: [
    {
      period: 'May 2024 — Jul 2024',
      company: 'HighRadius',
      role: 'IT Consultant Intern',
      description:
        'Designed and implemented automated ETL pipelines, increasing data processing efficiency by 60%, while building sustainable and scalable solutions using AWS, SQL, and other database technologies.',
      link: 'https://www.highradius.com/',
      image: 'images/HighRadius.svg',
    },
    {
      period: 'May 2023 — Nov 2023',
      company: 'BITS Pilani',
      role: 'Generative AI Research Intern',
      description:
        'Authored and published a research paper titled "Privacy and Security Concerns in Generative AI," proposing strategies to mitigate privacy and security risks in AI-driven technologies.',
      link: 'https://www.bits-pilani.ac.in/',
      image: 'images/bits.webp',
    },
    {
      period: 'Oct 2023 — Feb 2024',
      company: 'UCMAS',
      role: 'Marketing Associate',
      description:
        'Spearheaded social media analytics tracking, optimizing post performance and increasing reach by 35%. Implemented marketing strategies that led to a 30% increase in lead generation.',
      link: 'https://www.ucmasodisha.in/',
      image: 'images/UCMAS.avif',
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
      description:
        'Coordinated with local centers to organize tri-monthly blood donation camps in my high school and neighborhood, leading a team of student volunteers.',
      image: 'images/blood bank.jpg',
    },
    {
      period: 'Mar 2017 — Jun 2020',
      title: 'Community School English Teacher',
      description:
        'Volunteered to teach underprivileged children (ages 8 to 17) with limited English proficiency.',
      image: 'images/PSE.png',
    },
    {
      period: 'Apr 2023 — Mar 2024',
      title: 'KIIT University AI Society Core Member',
      description:
        'Collaborated with top AI researchers to organize events, workshops, and initiatives focused on AI, fostering a community of learners and professionals.',
      image: 'images/AISOC.png',
    },
  ],
};
