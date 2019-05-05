const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';
export const serverSalt = env.SALT;
export const mongoUser = env.MONGO_USER;
export const mongoPass = env.MONGO_PASS;

export default {
  port: env.PORT || 8080,
  host: env.HOST || '0.0.0.0',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  },
  salt: serverSalt,
  mongoUser: mongoUser,
  mongoPass: mongoPass
};
