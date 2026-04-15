import "dotenv/config";
import {z} from "zod";

const envSchema = z.object({
    PORT: z.string().default('5000'),
    DB_HOST: z.string().default('localhost'),
    DB_PORT: z.string().default('8000'),
    DB_NAME: z.string().default('realtime_chat_and_threads_app'),
    DB_USER: z.string().default('MikasaN'),
    DB_PASSWORD: z.string().default('ming3465'),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    CLERK_SECRET_KEY: z.string(),
    FRONTEND_URL: z.string().default('http://localhost:4000')
});
const parsed = envSchema.safeParse(process.env);
// console.log(typeof process.env.HOME);
// console.log(parsed);
// console.log(parsed.data);
// console.log(parsed.success);
if (!parsed.success) {
  console.error("❌ Environment Validation Failed:");
  console.error(JSON.stringify(parsed.error.format(), null, 2)); // This will list exactly which keys are missing
  process.exit(1);
}
export const env = parsed.data; 