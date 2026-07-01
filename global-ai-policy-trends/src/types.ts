export interface PolicyDocument {
  id: string;
  title: string;
  country: string;
  countryCode: string;
  year: number;
  status: 'Adopted' | 'Draft' | 'Proposed' | 'Under Review';
  summary: string;
  sentiment: 'Positive' | 'Neutral' | 'Restrictive';
  sentimentScores: {
    positive: number;
    neutral: number;
    restrictive: number;
  };
  maturityScore: number; // 0-100
  riskScore: number; // 0-100
  topics: string[];
  entities: string[];
  keywords: string[];
  recommendations: string[];
  adoptionTrend: number[]; // 5 years trend
}

export interface SearchFilter {
  query: string;
  country: string;
  status: string;
  year: string;
  topic: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  progress: number;
  aiAnalysis?: PolicyDocument;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
}

export interface ForecastMetric {
  year: number;
  growthRate: number;
  restrictiveRegulations: number;
  supportiveRegulations: number;
  globalMaturityAvg: number;
}
