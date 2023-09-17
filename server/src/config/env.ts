import { config } from "dotenv";
import { existsSync } from "fs";
import { join } from "path";
import { cwd } from "process";

const envPath = existsSync(join(cwd(), "..", ".env"))
  ? join(cwd(), "..", ".env")
  : join(cwd(), ".env");

export default config({
  path: envPath,
}).parsed;
