import { GoogleGenAI } from "@google/genai";

export async function POST(req) {
  const { description } = await req.json();
  if (!description) {
    return Response.json({ error: "Missing description" }, { status: 400 });
  }

  const ai = new GoogleGenAI({}); // Auto-uses GEMINI_API_KEY

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze this internship description:\n${description}\n\nDecide scam score (0–100), label (Fake, Real, Suspicious), and red flags.`,
    });

    return Response.json({ aiText: result.text });
  } catch (err) {
    console.error("[Gemini Error]:", err.message);
    return Response.json({ error: err.message || "Gemini API error" }, { status: 500 });
  }
}
