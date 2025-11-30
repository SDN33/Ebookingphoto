import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the client only if the key is present to avoid runtime errors on load
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateArtCritique = async (query: string): Promise<string> => {
  if (!ai) {
    return "La clé API est manquante. Veuillez configurer l'environnement.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `Tu es un curateur d'art avant-gardiste et l'assistant photographe d'Alessandro Romagnoli. 
    Ton ton est sophistiqué, minimaliste et légèrement abstrait, correspondant à l'esthétique haute couture noir et blanc du site web.
    Réponds toujours en français. Sois concis (moins de 50 mots) et artistique. Concentre-toi sur la composition, la lumière et l'émotion.`;

    const response = await ai.models.generateContent({
      model,
      contents: query,
      config: {
        systemInstruction,
      }
    });

    return response.text || "Je suis actuellement perdu dans l'exposition. Veuillez reformuler.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "La connexion à la conscience artistique a échoué.";
  }
};