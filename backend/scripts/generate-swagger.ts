import fs from 'fs';
import path from 'path';
import { swaggerSpec } from '../src/config/swagger.js';

const outputPath = path.join(process.cwd(), 'src', 'config', 'swagger-spec.json');

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
console.log('✅ Swagger JSON spec generated successfully!');