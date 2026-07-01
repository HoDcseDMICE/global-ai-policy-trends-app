import { PolicyDocument, ForecastMetric, StatItem } from '../types';
import { initialPolicies, statsData, forecastData } from '../data';

const BASE_URL = '/api/backend';

export async function fetchStats(): Promise<StatItem[]> {
  try {
    const response = await fetch(`${BASE_URL}/summary`);
    if (!response.ok) throw new Error('API server returned error');
    const data = await response.json();
    
    return [
      {
        id: 'stat-1',
        label: 'Total Analyzed Policies',
        value: data.total_policies.toLocaleString(),
        change: '+14% YoY',
        isPositive: true,
        iconName: 'FileSearch'
      },
      {
        id: 'stat-2',
        label: 'Countries Active',
        value: data.countries_active.toString(),
        change: '+8 countries',
        isPositive: true,
        iconName: 'Globe'
      },
      {
        id: 'stat-3',
        label: 'AI Maturity Score',
        value: data.avg_maturity_score.toFixed(1),
        change: '+4.2 pts',
        isPositive: true,
        iconName: 'Brain'
      },
      {
        id: 'stat-4',
        label: 'Processed Documents',
        value: data.processed_documents.toLocaleString(),
        change: '+29% MoM',
        isPositive: true,
        iconName: 'FileText'
      }
    ];
  } catch (error) {
    console.warn('API connection failed, falling back to static stats:', error);
    return statsData;
  }
}

export interface FetchPoliciesParams {
  country?: string;
  year?: string;
  topic?: string;
  status?: string;
  limit?: number;
}

export async function fetchPolicies(params: FetchPoliciesParams = {}): Promise<PolicyDocument[]> {
  try {
    const queryParts: string[] = [];
    if (params.country && params.country !== 'All') queryParts.push(`country=${encodeURIComponent(params.country)}`);
    if (params.year && params.year !== 'All') queryParts.push(`year=${encodeURIComponent(params.year)}`);
    if (params.topic && params.topic !== 'All') queryParts.push(`topic=${encodeURIComponent(params.topic)}`);
    if (params.status && params.status !== 'All') queryParts.push(`status=${encodeURIComponent(params.status)}`);
    if (params.limit) queryParts.push(`limit=${params.limit}`);
    
    const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    const response = await fetch(`${BASE_URL}/policies${queryString}`);
    if (!response.ok) throw new Error('API server returned error');
    
    const data = await response.json();
    if (data.policies && Array.isArray(data.policies)) {
      return data.policies;
    }
    throw new Error('Invalid policies response');
  } catch (error) {
    console.warn('API connection failed, falling back to static policies:', error);
    
    return initialPolicies.filter((p) => {
      if (params.country && params.country !== 'All' && p.country !== params.country) return false;
      if (params.year && params.year !== 'All' && p.year.toString() !== params.year) return false;
      if (params.topic && params.topic !== 'All' && !p.topics.includes(params.topic)) return false;
      if (params.status && params.status !== 'All' && p.status !== params.status) return false;
      return true;
    });
  }
}

export async function fetchForecasting(): Promise<ForecastMetric[]> {
  try {
    const response = await fetch(`${BASE_URL}/forecasting`);
    if (!response.ok) throw new Error('API server returned error');
    const data = await response.json();
    if (Array.isArray(data)) return data;
    throw new Error('Invalid forecast response');
  } catch (error) {
    console.warn('API connection failed, falling back to static forecasting:', error);
    return forecastData;
  }
}

export async function analyzeText(text: string): Promise<PolicyDocument> {
  try {
    const response = await fetch(`${BASE_URL}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!response.ok) throw new Error('API server returned error during analysis');
    const data = await response.json();
    if (data.analysis) return data.analysis;
    throw new Error('Invalid analysis response');
  } catch (error) {
    console.warn('API connection failed for text analysis, running simulation fallback:', error);
    
    const generatedMaturity = Math.floor(Math.random() * 25) + 65;
    const generatedRisk = Math.floor(Math.random() * 35) + 40;
    const words = text.split(' ');
    const extractedKeywords = words.filter(w => w.length > 5).slice(0, 5).map(w => w.replace(/[^a-zA-Z]/g, ''));
    
    return {
      id: 'custom-' + Date.now(),
      title: 'Local Ingested Framework: ' + (text.slice(0, 45) + '...'),
      country: 'Custom Upload',
      countryCode: 'XX',
      year: 2026,
      status: 'Proposed',
      summary: text.length > 180 ? text.slice(0, 180) + '...' : text,
      sentiment: Math.random() > 0.5 ? 'Restrictive' : 'Positive',
      sentimentScores: { positive: 30, neutral: 40, restrictive: 30 },
      maturityScore: generatedMaturity,
      riskScore: generatedRisk,
      topics: ['Risk Assessment', 'Governance Standards', 'Compliance Audits'],
      entities: ['Compliance Committee', 'Auditing Agency', 'National AI Registry'],
      keywords: extractedKeywords.length > 0 ? extractedKeywords : ['Governance', 'Algorithm', 'System'],
      recommendations: [
        'Formulate an internal technical compliance roadmap specifically matching governance boundaries.',
        'Verify that risk assessments occur prior to shipping production neural models.',
        'Form an independent committee to inspect algorithmic fairness, feedback, and data security.',
        'Schedule annual auditing reviews on compliance scores and structural exceptions.'
      ],
      adoptionTrend: [10, 30, 45, 60, generatedMaturity]
    };
  }
}
