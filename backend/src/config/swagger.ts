import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

let spec: object;

if (process.env.NODE_ENV === 'production') {
  // Read pre-generated JSON spec in production/Vercel
  const jsonPath = path.join(process.cwd(), 'src', 'config', 'swagger-spec.json');
  if (fs.existsSync(jsonPath)) {
    spec = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } else {
    spec = {};
  }
} else {
  // Dynamic scanning for local development
  const rootDir = process.cwd().replace(/\\/g, '/');
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
          url: 'http://localhost:3000/api/v1',
          description: 'Development Server',
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
    apis: [`${rootDir}/src/routes/**/*.ts`],
  };
  spec = swaggerJSDoc(options);
}

export const swaggerSpec = spec;