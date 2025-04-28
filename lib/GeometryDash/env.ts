import { config } from "dotenv";

export const { GD_VERIFY_RESPONSES, GD_API_ENDPOINT } = config().parsed ?? {};
