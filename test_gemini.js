import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyAu3GctaepVJTzA6zjnhP7hFRJvwl_vgXo";
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  let chatHistory = "You are the Teven Golf Course Digital Caddy.\nassistant: Hello\nuser: I hit my ball in the water\nassistant: ";
  try {
    const result = await model.generateContent(chatHistory);
    console.log(result.response.text());
  } catch (e) {
    console.error("API ERROR:", e);
  }
}
run();
