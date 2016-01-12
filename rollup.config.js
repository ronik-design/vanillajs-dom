import babel from "rollup-plugin-babel";

export default {
  entry: "lib/index.js",
  plugins: [babel()],
  dest: "dist/vanillajs-dom.js",
  format: "cjs"
};
