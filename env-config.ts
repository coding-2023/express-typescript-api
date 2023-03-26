import * as dotenv from "dotenv";

switch (process.env.NODE_ENV) {
  case "production":
    dotenv.config({ path: "pro.env", debug: true });
    console.log("Production mode >>", process.env.NODE_ENV);
    break;
  default:
    dotenv.config({ path: "dev.env", debug: true });
    console.log("Development mode >>", process.env.NODE_ENV);
}

export const { PORT } = process.env;
