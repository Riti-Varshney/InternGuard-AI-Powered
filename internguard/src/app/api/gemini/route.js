import { GoogleGenAI } from "@google/genai";
function cleanResponse(text) {
  // Remove code block markers like ``````
  text = text.replace(/```json\n?/g, '');
  text = text.replace(/```\n?/g, '');
  text = text.trim();

  // If it's a quoted string (escaped JSON), parse it
  if (text.startsWith('"') && text.endsWith('"')) {
    text = JSON.parse(text); // First parse to unescape characters
  }

  // If it's now a string that looks like a JSON object, parse again
  if (typeof text === 'string' && text.startsWith('{') && text.endsWith('}')) {
    text = JSON.parse(text); // Now we get actual JS object
  }

  return text;
}

// Instantiate GoogleGenAI once
const ai = new GoogleGenAI({});

export async function POST(req) {
  const body = await req.json();
  const description = body.desc;

  if (!description) {
    return new Response(
      JSON.stringify({ error: "Missing description" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const prompt = `
Analyze this internship description:

"${description}"

Return a JSON object with keys: scam_score (0-100), label (Fake, Real, or Suspicious), red_flags (array of strings), and analysis (detailed text).
`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash", 
      contents: prompt,
    });

    const cleanedText = cleanResponse(result.text);

    return new Response(JSON.stringify(cleanedText), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Gemini Error]:", err.message);
    return new Response(
      JSON.stringify({ error: err.message || "Gemini API error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
