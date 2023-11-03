/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,jsx,ts,tsx}",
        './components/**/*.{js,ts,jsx,tsx}',
        'node_modules/daisyui/dist/**/*.js',
        'node_modules/daisyui/dist/**/*.jsx',
        'node_modules/react-daisyui/dist/**/*.js',
        'node_modules/react-daisyui/dist/**/*.jsx'
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui"), "@material-tailwind/react/utils/withMT"],
    daisyui: {
        styled: true,
        themes: true,
        base: false,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "dark",
    },
}
