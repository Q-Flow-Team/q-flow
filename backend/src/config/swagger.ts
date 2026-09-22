import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const swaggerSpec = require('./swagger-spec.json');

export { swaggerSpec };