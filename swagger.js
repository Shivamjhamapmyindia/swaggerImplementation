import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./routes/index.js"];

const doc = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple API to demonstrate Swagger in Node.js',
    },
    servers: [
      {
        url: `http://localhost:2000`,
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js' , './models/*.js', './middleware/*.js'], // Specify the path to your API files or controller files
};

// Generate the Swagger documentation
swaggerAutogen(outputFile, endpointsFiles).then(() => {
  console.log('Swagger documentation generated successfully!');
});
