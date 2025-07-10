export default () => ({
  PORT: parseInt(process.env.PORT ?? '3000', 10),
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES ?? '1d',
});
