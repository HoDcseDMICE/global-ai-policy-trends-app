import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Lazy initialization of GoogleGenAI SDK to prevent crash if key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set. Using local simulation fallback.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI analysis of policies using Gemini
  app.post('/api/analyze', async (req, res) => {
    const { text } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text prompt is required.' });
    }

    try {
      const ai = getGeminiClient();
      
      const prompt = `Analyze the following AI governance policy document or clauses. 
Return a structured JSON object according to the schema. Make the summary and recommendations highly accurate, mature, and professional.

Text to analyze:
"${text}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction: 'You are an elite legal and machine-learning policy analyzer for global regulations.',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'Short title of the analyzed draft.' },
              country: { type: Type.STRING, description: 'Name of country or region.' },
              countryCode: { type: Type.STRING, description: 'Two letter ISO code like US, EU, JP.' },
              year: { type: Type.INTEGER, description: 'Current release year.' },
              status: { type: Type.STRING, description: 'Must be one of: Adopted, Draft, Proposed, Under Review.' },
              summary: { type: Type.STRING, description: 'Professional concise 2-sentence summary.' },
              sentiment: { type: Type.STRING, description: 'Must be one of: Positive, Neutral, Restrictive.' },
              sentimentScores: {
                type: Type.OBJECT,
                properties: {
                  positive: { type: Type.INTEGER },
                  neutral: { type: Type.INTEGER },
                  restrictive: { type: Type.INTEGER }
                },
                required: ['positive', 'neutral', 'restrictive']
              },
              maturityScore: { type: Type.INTEGER, description: 'Policy maturity rating from 0 to 100.' },
              riskScore: { type: Type.INTEGER, description: 'Policy risk score from 0 to 100.' },
              topics: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3-4 main focus areas like Copyright, Watermarking, etc.'
              },
              entities: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 regulatory agencies, committees, or legal entities.'
              },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3-4 semantic tags or hashtags.'
              },
              recommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '4 actionable enterprise alignment steps.'
              }
            },
            required: [
              'title', 'country', 'countryCode', 'year', 'status', 'summary', 
              'sentiment', 'sentimentScores', 'maturityScore', 'riskScore', 
              'topics', 'entities', 'keywords', 'recommendations'
            ]
          }
        }
      });

      const responseText = response.text;
      if (responseText) {
        const parsedAnalysis = JSON.parse(responseText.trim());
        // Append a dynamic ID
        parsedAnalysis.id = 'gemini-' + Date.now();
        parsedAnalysis.adoptionTrend = [15, 30, 48, 65, parsedAnalysis.maturityScore];
        return res.json({ analysis: parsedAnalysis });
      } else {
        throw new Error('Empty response from model.');
      }

    } catch (err: any) {
      console.warn('Gemini parser API issue:', err.message);
      // Fail gracefully: Let the client handle the fallback safely
      return res.status(503).json({ 
        error: 'Inference service offline', 
        message: err.message 
      });
    }
  });

  // Proxy all backend API requests to the Python FastAPI server
  app.all('/api/backend/*', async (req, res) => {
    const backendPath = req.params[0] || '';
    const queryStr = req.url.split('?')[1] || '';
    const targetUrl = `http://127.0.0.1:8000/${backendPath}${queryStr ? '?' + queryStr : ''}`;
    
    try {
      const options: RequestInit = {
        method: req.method,
        headers: {
          'Content-Type': req.headers['content-type'] || 'application/json',
        },
      };
      
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        options.body = JSON.stringify(req.body);
      }
      
      const response = await fetch(targetUrl, options);
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (err: any) {
      console.error('Error forwarding to backend:', err.message);
      res.status(502).json({ error: 'Backend server unreachable', details: err.message });
    }
  });

  // Serve static assets or mount Vite Dev Middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Global AI Policy server running on http://localhost:${PORT} [ENV: ${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer();
