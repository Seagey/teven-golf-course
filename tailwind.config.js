/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#1A3522", /* Deep dark green */
                accent: "#D4AF37",  /* Metallic Gold */
                background: "#FDFBF7", /* Ivory / Cream */
                textdark: "#1c211e", /* Charcoal green */
            },
            fontFamily: {
                heading: ['"Playfair Display"', 'serif'],
                body: ['"Montserrat"', 'sans-serif'],
                cursive: ['"Great Vibes"', 'cursive']
            }
        },
    },
    plugins: [],
}
