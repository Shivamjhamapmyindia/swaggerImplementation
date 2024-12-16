import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db.js";
const app = express();
import apiRoute from './routes/index.js'
import swaggerUiExpress from "swagger-ui-express";
import path from "path"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerAutogen from "swagger-autogen";
const __dirname = path.resolve();
app.use(express.json());
app.use(cors());
connectDB();
app.use("/views", express.static("views"));
app.set("view engine", "ejs");
app.use("/", apiRoute);
const swaggerOutputFile = path.join(__dirname, "swagger_output.json");

// app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerOutputFile));
 
app.use('/api-docs',swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerJsdoc({
  swaggerDefinition: {
    "openapi": "3.0.0",
    "info": {
      "version": "1.0.0",
      "title": "REST API",
      "description": ""
    },
    "servers": [
      {
        "url": "http://localhost:2000"
      }
    ],
    "paths": {
      "/": {
        "get": {
          "description": "",
          "responses": {
            "default": {
              "description": ""
            }
          }
        }
      },
      "/signup": {
        "post": {
          "description": "",
          "responses": {
            "default": {
              "description": ""
            }
          }
        }
      },
      "/login": {
        "post": {
          "description": "",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "userId": {
                      "type": "string",
                      "example": "any"
                    },
                    "password": {
                      "type": "string",
                      "example": "any"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "401": {
              "description": "Unauthorized"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/update": {
        "put": {
          "description": "",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string",
                      "example": "any"
                    },
                    "userId": {
                      "type": "string",
                      "example": "any"
                    },
                    "fa": {
                      "type": "string",
                      "example": "any"
                    },
                    "ta": {
                      "type": "string",
                      "example": "any"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/users": {
        "get": {
          "description": "",
          "responses": {
            "200": {
              "description": "OK"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/addLed": {
        "post": {
          "description": "",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "dev_name": {
                      "type": "string",
                      "example": "any"
                    },
                    "metaData": {
                      "type": "string",
                      "example": "any"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK"
            },
            "201": {
              "description": "Created"
            },
            "400": {
              "description": "Bad Request"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/getLeds": {
        "get": {
          "description": "",
          "responses": {
            "200": {
              "description": "OK"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/updateLed": {
        "put": {
          "description": "",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "dev_name": {
                      "type": "string",
                      "example": "any"
                    },
                    "metaDataId": {
                      "type": "string",
                      "example": "any"
                    },
                    "status": {
                      "type": "string",
                      "example": "any"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      },
      "/deleteLed": {
        "delete": {
          "description": "",
          "parameters": [
            {
              "name": "dev_name",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "metaDataId",
              "in": "query",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "OK"
            },
            "400": {
              "description": "Bad Request"
            },
            "404": {
              "description": "Not Found"
            },
            "500": {
              "description": "Internal Server Error"
            }
          }
        }
      }
    }
  },  
  apis: ["./routes/index.js", "./controller/signup.controller.js", "./controller/login.controller.js", "./controller/led.controller.js", "./middleware/multer.js"],
})))



app.listen(process.env.PORT, () => {
  console.log("http://localhost:" + process.env.PORT);
});
