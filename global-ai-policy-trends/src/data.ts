import { PolicyDocument, ForecastMetric, StatItem } from './types';

export const initialPolicies: PolicyDocument[] = [
  {
    id: '1',
    title: 'EU Artificial Intelligence Act (AI Act)',
    country: 'European Union',
    countryCode: 'EU',
    year: 2024,
    status: 'Adopted',
    summary: 'The world\'s first comprehensive horizontal legal framework for AI, classifying applications into risk levels (unacceptable, high, limited, minimal) with strict rules for high-risk systems and general-purpose AI.',
    sentiment: 'Restrictive',
    sentimentScores: { positive: 15, neutral: 35, restrictive: 50 },
    maturityScore: 92,
    riskScore: 85,
    topics: ['Risk Classification', 'Copyright', 'Biometrics', 'Foundational Models', 'Fines & Auditing'],
    entities: ['European AI Board', 'National Supervisory Authorities', 'CEN/CENELEC'],
    keywords: ['High-risk AI', 'Conformity assessment', 'Social scoring', 'Generative AI', 'Systemic risk'],
    recommendations: [
      'Conduct a thorough inventory of internal AI assets to categorize risk tiers.',
      'Establish technical compliance pipelines for conformity assessment before market placement.',
      'Implement data governance and quality practices for training sets as mandated by Article 10.',
      'Monitor and log AI outputs post-market to catch drift or compliance violations.'
    ],
    adoptionTrend: [10, 25, 45, 75, 92]
  },
  {
    id: '2',
    title: 'US Executive Order on Safe, Secure, and Trustworthy AI',
    country: 'United States',
    countryCode: 'US',
    year: 2023,
    status: 'Adopted',
    summary: 'A sweeping directive establishing new standards for AI safety and security, protecting privacy, advancing equity and civil rights, standing up for consumers and workers, promoting innovation, and leading globally.',
    sentiment: 'Positive',
    sentimentScores: { positive: 45, neutral: 40, restrictive: 15 },
    maturityScore: 85,
    riskScore: 65,
    topics: ['National Security', 'Red-Teaming', 'Watermarking', 'Privacy Guidelines', 'Talent Attraction'],
    entities: ['Department of Commerce', 'NIST', 'Department of Energy', 'FTC'],
    keywords: ['Synthetic content', 'Dual-use foundation models', 'Safety reporting', 'Critical infrastructure'],
    recommendations: [
      'Implement NIST AI Risk Management Framework (RMF 1.0) throughout the model lifecycle.',
      'Adopt robust red-teaming and safety evaluation mechanisms prior to deployment.',
      'Incorporate cryptographic watermarking or provenance metadata for synthetic content.',
      'Establish human-in-the-loop oversight for high-impact federal contract submissions.'
    ],
    adoptionTrend: [15, 30, 50, 70, 85]
  },
  {
    id: '3',
    title: 'Singapore Model AI Governance Framework (v2)',
    country: 'Singapore',
    countryCode: 'SG',
    year: 2020,
    status: 'Adopted',
    summary: 'Practical guidance for private sector organizations to address key ethical and governance issues when deploying AI solutions, emphasizing human-centricity and explainability.',
    sentiment: 'Positive',
    sentimentScores: { positive: 65, neutral: 25, restrictive: 10 },
    maturityScore: 88,
    riskScore: 40,
    topics: ['Explainability', 'Human Oversight', 'Corporate Governance', 'Customer Relations'],
    entities: ['IMDA', 'PDPC', 'National AI Office'],
    keywords: ['Internal governance', 'Decision-making risk', 'Explainable model logs', 'Customer trust'],
    recommendations: [
      'Align board-level oversight with IMDA\'s three levels of human-in-the-loop decisions.',
      'Adopt simple explainability standards (e.g. SHAP, LIME) for customer-facing models.',
      'Embed data privacy impact assessments (DPIAs) into standard deployment pipelines.',
      'Design transparent communication channels about AI use to end customers.'
    ],
    adoptionTrend: [30, 55, 70, 80, 88]
  },
  {
    id: '4',
    title: 'India AI Mission (National AI Strategy)',
    country: 'India',
    countryCode: 'IN',
    year: 2024,
    status: 'Proposed',
    summary: 'An ambitious national infrastructure and policy initiative aiming to democratize compute access, support AI start-ups, deploy indigenous foundational models, and draft safety frameworks.',
    sentiment: 'Positive',
    sentimentScores: { positive: 70, neutral: 20, restrictive: 10 },
    maturityScore: 72,
    riskScore: 35,
    topics: ['Sovereign Compute', 'Startup Funding', 'Agri-Tech AI', 'Public Sector Deployment'],
    entities: ['Ministry of Electronics & IT', 'Digital India', 'NITI Aayog'],
    keywords: ['GPU clusters', 'Digital Public Infrastructure', 'Language translation', 'Social inclusion'],
    recommendations: [
      'Utilize sovereign AI cloud infrastructure to compute research models at subsidized rates.',
      'Focus product development on multi-lingual support aligning with Bhashini API initiative.',
      'Observe ethical AI audits proposed for agricultural and healthcare AI deployments.',
      'Establish localized security and privacy protections for public sector data models.'
    ],
    adoptionTrend: [5, 15, 35, 55, 72]
  },
  {
    id: '5',
    title: 'China Interim Measures for Generative AI Services',
    country: 'China',
    countryCode: 'CN',
    year: 2023,
    status: 'Adopted',
    summary: 'The world\'s earliest targeted generative AI regulation requiring providers of public-facing generative services to register models, ensure data source legality, and uphold truthfulness.',
    sentiment: 'Restrictive',
    sentimentScores: { positive: 20, neutral: 30, restrictive: 50 },
    maturityScore: 80,
    riskScore: 78,
    topics: ['Content Moderation', 'Model Licensing', 'Data Provenance', 'Intellectual Property'],
    entities: ['CAC (Cyberspace Administration)', 'Ministry of Science and Technology'],
    keywords: ['Algorithm filing', 'Social stability', 'Public opinion properties', 'Security assessment'],
    recommendations: [
      'Complete CAC algorithm registration prior to launching public-facing text or image services.',
      'Establish strict internal content moderation systems utilizing pre-trained filter models.',
      'Ensure data labeling processes employ verified, licensed training data pools.',
      'Adhere to strict requirements against deepfake creation without clear labeling.'
    ],
    adoptionTrend: [20, 40, 60, 75, 80]
  },
  {
    id: '6',
    title: 'UK AI Regulation White Paper: A Pro-Innovation Approach',
    country: 'United Kingdom',
    countryCode: 'GB',
    year: 2023,
    status: 'Under Review',
    summary: 'A sector-led, decentralized approach based on five key principles (safety, transparency, fairness, accountability, redress) to be enforced by existing regulators rather than a single super-body.',
    sentiment: 'Neutral',
    sentimentScores: { positive: 35, neutral: 45, restrictive: 20 },
    maturityScore: 78,
    riskScore: 45,
    topics: ['Sectoral Regulators', 'Innovation Sandboxes', 'Accountability', 'Safety & Security'],
    entities: ['ICO', 'CMA', 'HSE', 'DSIT'],
    keywords: ['Pro-innovation', 'Principles-based', 'Regulatory coordination', 'Sector-specific risk'],
    recommendations: [
      'Coordinate directly with sector-specific regulators (like FCA for finance, ICO for data).',
      'Leverage digital regulation cooperation sandboxes to test edge-case AI models.',
      'Document safety-by-design matrices in compliance with general consumer safety standards.',
      'Participate in public consultations for forthcoming statutory duties on frontier model developers.'
    ],
    adoptionTrend: [10, 25, 45, 65, 78]
  }
];

export const statsData: StatItem[] = [
  {
    id: 'stat-1',
    label: 'Total Analyzed Policies',
    value: '184',
    change: '+14% YoY',
    isPositive: true,
    iconName: 'FileSearch'
  },
  {
    id: 'stat-2',
    label: 'Countries Active',
    value: '42',
    change: '+8 countries',
    isPositive: true,
    iconName: 'Globe'
  },
  {
    id: 'stat-3',
    label: 'AI Maturity Score',
    value: '82.4',
    change: '+4.2 pts',
    isPositive: true,
    iconName: 'Brain'
  },
  {
    id: 'stat-4',
    label: 'Processed Documents',
    value: '1,249',
    change: '+29% MoM',
    isPositive: true,
    iconName: 'FileText'
  }
];

export const forecastData: ForecastMetric[] = [
  { year: 2024, growthRate: 15, restrictiveRegulations: 12, supportiveRegulations: 28, globalMaturityAvg: 68 },
  { year: 2025, growthRate: 24, restrictiveRegulations: 20, supportiveRegulations: 35, globalMaturityAvg: 72 },
  { year: 2026, growthRate: 35, restrictiveRegulations: 32, supportiveRegulations: 42, globalMaturityAvg: 76 },
  { year: 2027, growthRate: 48, restrictiveRegulations: 45, supportiveRegulations: 50, globalMaturityAvg: 80 },
  { year: 2028, growthRate: 62, restrictiveRegulations: 58, supportiveRegulations: 58, globalMaturityAvg: 84 },
  { year: 2029, growthRate: 78, restrictiveRegulations: 74, supportiveRegulations: 65, globalMaturityAvg: 88 },
  { year: 2030, growthRate: 95, restrictiveRegulations: 92, supportiveRegulations: 72, globalMaturityAvg: 92 }
];

export const popularChips = [
  'EU AI Act',
  'OECD Principles',
  'UNESCO AI Ethics',
  'India AI Mission',
  'US Executive Order',
  'Singapore AI Governance',
  'UK AI White Paper'
];
