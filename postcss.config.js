require("dotenv").config();
const { ENV } = require("alapa/dist/shared/constant/environment");
const production = ENV === "production";
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    production ? require("cssnano") : undefined,
  ],
};
