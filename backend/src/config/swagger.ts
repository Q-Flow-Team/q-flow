import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

// Normalize path separators to forward slashes for cross-platform globbing
const rootDir = process.cwd().replace(/\\/g, '/');

const routesPath = `${rootDir}/src/routes/**/*.ts`;
const distRoutesPath = `${rootDir}/dist/routes/**/*.js`;

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
          : 'http://localhost:3000/api/v1',
        description: process.env.VERCEL_URL ? 'Production' : 'Development',
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
  apis: [routesPath, distRoutesPath],
};

export const swaggerSpec = swaggerJSDoc(options);