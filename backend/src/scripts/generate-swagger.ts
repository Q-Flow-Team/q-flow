import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Navigate up from src/scripts to the project root
const rootDir = path.resolve(__dirname, '../../');

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Q-Flow API Documentation',
      version: '1.0.0',
      description: 'REST API documentation for Q-Flow Queue Management System',
    },
    servers: [
      {
        url: process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}/api/v1`
          : 'http://localhost:5000/api/v1',
        description: process.env.VERCEL_URL ? 'Production Server' : 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // Ensure we are scanning the correct route files from the root directory
  apis: [
    './src/routes/**/*.ts',
    './src/routes/*.ts',
    '../routes/**/*.ts'
  ],
};

const spec = swaggerJSDoc(options);
const outputPath = path.join(__dirname, '../config/swagger-spec.json');

fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2));
console.log(`✅ Swagger JSON spec generated successfully at ${outputPath}`);