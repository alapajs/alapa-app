const { dotenv } = require("alapa");
dotenv.config();
const production =
  process.env.NODE_ENV == "production" ||
  process.env.APP_ENV == "production" ||
  process.env.DEBUG == "false";
module.exports = {
  content: ["./views/**/*.{html,js}", "./public/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
