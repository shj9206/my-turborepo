const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social Media API",
      version: "1.0.0",
      description: "소셜 미디어 플랫폼을 위한 RESTful API",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT 토큰을 입력하세요 (Bearer 제외)",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "사용자 ID",
            },
            username: {
              type: "string",
              description: "사용자명",
            },
            firstName: {
              type: "string",
              description: "이름",
            },
            lastName: {
              type: "string",
              description: "성",
            },
            profile: {
              type: "string",
              description: "프로필 이미지 URL",
            },
          },
        },
        Post: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "게시물 ID",
            },
            content: {
              type: "string",
              description: "게시물 내용",
            },
            image: {
              type: "string",
              description: "이미지 URL",
            },
            creator: {
              $ref: "#/components/schemas/User",
            },
            likes: {
              type: "number",
              description: "좋아요 수",
            },
            time: {
              type: "string",
              format: "date-time",
              description: "작성 시간",
            },
            comments: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Comment",
              },
            },
          },
        },
        Comment: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "댓글 ID",
            },
            content: {
              type: "string",
              description: "댓글 내용",
            },
            creator: {
              type: "object",
              properties: {
                _id: {
                  type: "string",
                },
                firstName: {
                  type: "string",
                },
                lastName: {
                  type: "string",
                },
              },
            },
            likes: {
              type: "number",
              description: "좋아요 수",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "string",
              description: "에러 메시지",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              description: "성공 메시지",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/**/*.js", "./app.js"], // Swagger 주석이 있는 파일 경로
};

const specs = swaggerJsdoc(options);

module.exports = specs;
