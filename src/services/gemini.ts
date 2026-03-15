import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";
import { PROPERTIES } from "../data";

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getChatResponse(messages: ChatMessage[], userLocation?: { lat: number; lng: number }) {
  if (!apiKey) {
    return "API Key not configured. Please add GEMINI_API_KEY to your environment.";
  }

  try {
    const model = "gemini-2.5-flash"; 
    
    const propertiesContext = PROPERTIES.map(p => 
      `- ${p.title} in ${p.location}: $${p.price.toLocaleString()}, ${p.beds} beds, ${p.baths} baths, ${p.sqft} sqft. ${p.description}`
    ).join('\n');

    const history = messages.slice(0, -1).map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const lastMessage = messages[messages.length - 1].text;

    const response = await ai.models.generateContent({
      model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: lastMessage }] }
      ],
      config: {
        systemInstruction: `You are LuxeEstate AI, a premium real estate assistant. You help users find luxury properties, provide market insights, and answer questions about locations. 

Current Property Catalog:
${propertiesContext}

Use Google Maps to provide accurate local information when asked about neighborhoods, amenities, or specific areas. Be professional, sophisticated, and helpful. When recommending properties, use the details from the catalog above.`,
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: userLocation ? {
              latitude: userLocation.lat,
              longitude: userLocation.lng
            } : undefined
          }
        }
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "An error occurred while communicating with the AI. Please try again later.";
  }
}
