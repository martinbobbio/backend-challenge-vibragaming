declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    API_URL_WORLDTIME: string;
    BBDD_REDIS_HOST: string;
    BBDD_REDIS_PASS: string;
  }
}
