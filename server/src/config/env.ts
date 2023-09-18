import { config, DotenvParseOutput } from "dotenv";
import { existsSync } from "fs";
import { join } from "path";
import { cwd } from "process";

const envPath = existsSync(join(cwd(), "..", ".env"))
  ? join(cwd(), "..", ".env")
  : join(cwd(), ".env");

const env:
  | DotenvParseOutput
  | {
      [key: string]: string;
    } =
  config({
    path: envPath,
  }).parsed || {};

for (const [key, value] of Object.entries(process.env)) {
  if (value) env[key] = value;
  else continue;
}

export default env;
