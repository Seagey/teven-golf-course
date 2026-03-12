import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, input } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API Key not configured on server' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Use the model specified in your frontend, or a stable one like gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

    const systemPrompt = `You are the Teven Golf Course Digital Caddy. You are a polite, helpful expert in Golf Australia (GA) Rules, general golf etiquette, and specifically Teven Golf Course's Local Rules. Answer concisely and conversationally. Do not use extremely long paragraphs. Use your knowledge of these local rules to guide answers even if the situation isn't an exact match.

TEVEN GOLF COURSE LOCAL RULES:
1. Out of Bounds (OOB) - General (Rule 18-2): Defined by white markers, any boundary fence, and on or over the main internal road. Trespassing on adjoining properties is prohibited.
2. Out of Bounds, Stroke and Distance (Model Local Rule E-5): Players may proceed for a 2-stroke penalty, instead of returning to the tee (applies to Holes 1, 3, 8, etc.). For example, Hole 8 has a Drop Zone peg to drop within one club length for a 2-shot penalty.
3. OOB Fence: If a ball is in bounds but resting against an OOB fence, there is NO free relief. Play it as it lies, or take a 1-shot penalty for an unplayable lie.
4. Waterways (Red Penalty Areas - Rule 17.1d): All waterways on course are defined as red penalty areas (1-shot penalty). Drop on the side where it crossed the margin. For convenience on Hole 3, there is a designated Drop Zone to avoid steep banks.
5. Hole 1 Tee Bush/Hazard Drop Zone: If you duff into the left bush or slice into the right bush off the 1st tee, you can use the Drop Zone closer to the green for a 1-shot penalty (playing your 3rd shot) instead of re-teeing.
6. Hole 1 Green Drop Zone (Model Local Rule E-1.1): If a player's ball is in the penalty area to the right of the first green, relief may be taken within two club lengths of the blue stake at the bottom of the hill, under penalty of one stroke.
7. Roads and Paths (Rule 16.1): Free relief is available within course bounds.
8. Overhead Wires Rule (Model Local Rule E-11): A ball striking overhead wires must be replayed without penalty.
9. "The Scorpion" & Garden Beds (Hole 9): Long over the 9th green into the bordered garden beds (metal edging) is Ground Under Repair. You get FREE RELIEF (no penalty) to protect the garden and yourself. Pick up the ball, find the nearest point of complete relief on an arc (no closer to the hole) where both your ball and swing are unobstructed, drop within a club length, and play.

Always refer to standard Golf Australia rules for scenarios outside these local exceptions.`;

    let chatHistory = systemPrompt + "\n\n";
    messages.forEach(m => {
        chatHistory += `\n${m.role}: ${m.content}`;
    });
    chatHistory += `\nuser: ${input}\nassistant: `;

    const result = await model.generateContent(chatHistory);
    const responseText = result.response.text();

    return res.status(200).json({ text: responseText });
  } catch (error) {
    console.error("AI Proxy Error:", error);
    return res.status(500).json({ error: 'The caddy is having trouble connecting to the rules engine.' });
  }
}
