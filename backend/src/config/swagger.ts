import swaggerJSDoc from 'swagger-jsdoc';

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
  apis: ['./src/routes/*.ts', './src/app.ts'], // Path to files containing JSDoc annotations
};

export const swaggerSpec = swaggerJSDoc(options);