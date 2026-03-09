import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyAu3GctaepVJTzA6zjnhP7hFRJvwl_vgXo";
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log(data.models.map(m => m.name));
}
run();
