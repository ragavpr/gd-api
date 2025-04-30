import { config } from 'dotenv';

export const { GD_VERIFY_RESPONSES, GD_API_ENDPOINT, GD_AUDIOLIB_ENDPOINT } =
  config().parsed ?? {};
