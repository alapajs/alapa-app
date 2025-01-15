const { dotenv } = require("alapa");
dotenv.config();
const production =
  process.env.NODE_ENV == "production" ||
  process.env.APP_ENV == "production" ||
  process.env.DEBUG == "false";
module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    production ? require("cssnano") : undefined,
  ],
};
