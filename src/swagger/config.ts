import swaggerJSDoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Pokemon API",
      version: "1.0.0",
      description: "Simple Pokemon API",
    },
    servers: [{ url: "/api" }],
  },
  apis: ["src/swagger/openapi.yaml"],
};

export const swaggerSpec = swaggerJSDoc(options);
