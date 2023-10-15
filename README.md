# Your API Name

## Description

This repository contains the source code for [Your API Name], a robust and scalable API built using Node.js. The API serves as the backend for web and mobile applications, facilitating seamless communication between clients and the server. It provides essential data access and functionality, making it a critical component of your software architecture.

## Key Features

- **Node.js:** The API leverages Node.js for high performance and scalability.
- **Express.js:** Built with Express.js for efficient routing and middleware management.
- **RESTful Design:** Follows RESTful principles for predictable and standardized endpoints.
- **Database Integration:** Seamlessly connects to [Your Database] for data storage and retrieval.
- **Authentication and Authorization:** Implements robust user authentication and authorization mechanisms.
- **Error Handling:** Comprehensive error handling and validation ensure reliability.
- **Logging and Monitoring:** Includes logging and monitoring tools for performance analysis.
- **Testing and Documentation:** Unit tests and well-documented endpoints for ease of use.

## Getting Started

To run this API locally, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies using [package manager].
3. Configure environment variables and database connections.
4. Run the API with [start command].
5. Access API documentation at [documentation URL] for endpoint details.

## Contributing

We welcome contributions! If you'd like to enhance or improve the API, feel free to:

- Open issues to report bugs or suggest enhancements.
- Submit pull requests for code improvements.
- Join discussions on [community platform] for feature requests and feedback.

## License

This project is licensed under the [License Name]. See the [LICENSE.md](LICENSE.md) file for details.

## Service Hosted Link: https://graduation24.onrender.com

```json
{
  "info": {
    "_postman_id": "1f648c01-5e2b-46a6-aeb1-d99b71fd1a86",
    "name": "GRADUATION PROJECT",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "25848842",
    "_collection_link": "https://winter-moon-655637.postman.co/workspace/GRADUATION24~afbafee7-f476-4e51-a142-98007729b25c/collection/25848842-1f648c01-5e2b-46a6-aeb1-d99b71fd1a86?action=share&source=collection_link&creator=25848842"
  },
  "item": [
    {
      "name": "Users",
      "item": [
        {
          "name": "Create New User",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"name\": \"Hussein AbdElkader\",\r\n    \"email\": \"hussein.abdalkader96@gmail.com\",\r\n    \"password\" : \"123456789\",\r\n    \"passwordConfirm\" :\"123456789\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}/api/v1/users/",
              "host": ["{{URL}}"],
              "path": ["api", "v1", "users", ""]
            }
          },
          "response": []
        },
        {
          "name": "Get All Users",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/users",
              "host": ["{{URL}}api"],
              "path": ["v1", "users"]
            }
          },
          "response": []
        },
        {
          "name": "Get User By Id",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/users/64b9f3adb911461caf293d8a",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "64b9f3adb911461caf293d8a"]
            }
          },
          "response": []
        },
        {
          "name": "Update User",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "PATCH",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n            \"name\": \"Mohamed\",\r\n            \"role\": \"admin\",\r\n            \"email\": \"Mohamed22@io.com\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/users/64a3d3e1a84fcb073ac79b85",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "64a3d3e1a84fcb073ac79b85"]
            }
          },
          "response": []
        },
        {
          "name": "Delete User",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/users/64b9f3adb911461caf293d8a",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "64b9f3adb911461caf293d8a"]
            }
          },
          "response": []
        },
        {
          "name": "Get Me",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/users/getMe",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "getMe"]
            }
          },
          "response": []
        },
        {
          "name": "Update Me",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "pm.environment.set(\"jwt\", pm.response.json().token);"
                ],
                "type": "text/javascript"
              }
            }
          ],
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "PATCH",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"role\" : \"serviceProvider\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/users/updateMe",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "updateMe"]
            }
          },
          "response": []
        },
        {
          "name": "Delete Me",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/users/deleteMe",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "deleteMe"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Authentication",
      "item": [
        {
          "name": "Sign Up",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "pm.environment.set(\"jwt\", pm.response.json().token);"
                ],
                "type": "text/javascript"
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"name\" : \"sp1\",\r\n    \"email\" : \"sp1@gmail.com\",\r\n    \"password\" : \"test1234\",\r\n    \"passwordConfirm\": \"test1234\",\r\n    \"role\": \"serviceProvider\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/users/signup",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "signup"]
            }
          },
          "response": []
        },
        {
          "name": "Log In",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "pm.environment.set(\"jwt\", pm.response.json().token);"
                ],
                "type": "text/javascript"
              }
            }
          ],
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"email\" : \"charliedavis@example.com\",\r\n    \"password\" : \"password789\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/users/login",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "login"]
            }
          },
          "response": []
        },
        {
          "name": "Forgot Password",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"email\":\"user5@io.com\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/users/forgotPassword",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "forgotPassword"]
            }
          },
          "response": []
        },
        {
          "name": "Update My Password",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "pm.environment.set(\"jwt\", pm.response.json().token);"
                ],
                "type": "text/javascript"
              }
            }
          ],
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "PATCH",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"passwordCurrent\":\"1793006667700\",\r\n    \"password\":\"179300666770011\",\r\n    \"passwordConfirm\":\"179300666770011\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/users/updateMyPassword",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "updateMyPassword"]
            }
          },
          "response": []
        },
        {
          "name": "Reset Password",
          "event": [
            {
              "listen": "test",
              "script": {
                "exec": [
                  "pm.environment.set(\"jwt\", pm.response.json().token);"
                ],
                "type": "text/javascript"
              }
            }
          ],
          "request": {
            "method": "PATCH",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"password\" : \"test12345\",\r\n    \"passwordConfirm\": \"test12345\"\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/users/resetPassword/22f85e117f8b851b5e3bfbbcf4a0e52159911d353da0cd7def8cc831e2af1083",
              "host": ["{{URL}}api"],
              "path": [
                "v1",
                "users",
                "resetPassword",
                "22f85e117f8b851b5e3bfbbcf4a0e52159911d353da0cd7def8cc831e2af1083"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Log Out",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/users/logout",
              "host": ["{{URL}}api"],
              "path": ["v1", "users", "logout"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Product Reviews",
      "item": [
        {
          "name": "Create New Products Review",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"review\":\"Great !!\",\r\n    \"rating\":2\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/productReviews/customers/products/6514d23134e825da90080533",
              "host": ["{{URL}}api"],
              "path": [
                "v1",
                "productReviews",
                "customers",
                "products",
                "6514d23134e825da90080533"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Get All Reviews",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/productReviews",
              "host": ["{{URL}}api"],
              "path": ["v1", "productReviews"],
              "query": [
                {
                  "key": "rating",
                  "value": "3",
                  "disabled": true
                }
              ]
            }
          },
          "response": []
        },
        {
          "name": "Get Review By Id",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/productReviews/65135ae92650694c2d606215",
              "host": ["{{URL}}api"],
              "path": ["v1", "productReviews", "65135ae92650694c2d606215"]
            }
          },
          "response": []
        },
        {
          "name": "Update Review",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "PATCH",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n     \"rating\": 1\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/productReviews/64b5c95eb297a89607905738",
              "host": ["{{URL}}api"],
              "path": ["v1", "productReviews", "64b5c95eb297a89607905738"]
            }
          },
          "response": []
        },
        {
          "name": "Delete Review",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/productReviews/6515a93e7462d7cd6ea951fb",
              "host": ["{{URL}}api"],
              "path": ["v1", "productReviews", "6515a93e7462d7cd6ea951fb"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Services Reviews",
      "item": [
        {
          "name": "Create New Services Review",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"review\":\"Great !!\",\r\n    \"rating\":5\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/serviceReviews/customers/services/6513578ed70ca1812afef406",
              "host": ["{{URL}}api"],
              "path": [
                "v1",
                "serviceReviews",
                "customers",
                "services",
                "6513578ed70ca1812afef406"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Get All Reviews",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/serviceReviews",
              "host": ["{{URL}}api"],
              "path": ["v1", "serviceReviews"],
              "query": [
                {
                  "key": "rating",
                  "value": "3",
                  "disabled": true
                }
              ]
            }
          },
          "response": []
        },
        {
          "name": "Get Review By Id",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/serviceReviews/65135ae92650694c2d606215",
              "host": ["{{URL}}api"],
              "path": ["v1", "serviceReviews", "65135ae92650694c2d606215"]
            }
          },
          "response": []
        },
        {
          "name": "Update Review",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "PATCH",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n     \"rating\": 1\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/serviceReviews/64b5c95eb297a89607905738",
              "host": ["{{URL}}api"],
              "path": ["v1", "serviceReviews", "64b5c95eb297a89607905738"]
            }
          },
          "response": []
        },
        {
          "name": "Delete Review",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/serviceReviews/6515a93e7462d7cd6ea951fb",
              "host": ["{{URL}}api"],
              "path": ["v1", "serviceReviews", "6515a93e7462d7cd6ea951fb"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Products",
      "item": [
        {
          "name": "Get All Products",
          "protocolProfileBehavior": {
            "disableBodyPruning": true
          },
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "body": {
              "mode": "formdata",
              "formdata": []
            },
            "url": {
              "raw": "{{URL}}api/v1/products",
              "host": ["{{URL}}api"],
              "path": ["v1", "products"],
              "query": [
                {
                  "key": "serviceProvider",
                  "value": "65160bbc4241fe770a9cff91",
                  "disabled": true
                }
              ]
            }
          },
          "response": []
        },
        {
          "name": "Create Product",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "POST",
            "header": [],
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "images",
                  "type": "file",
                  "src": [
                    "/D:/SW Engineering/Seventh term/GRADUATION PROJECT/Backend/Node-js-API/public/uploads/products/images (1).png",
                    "/D:/SW Engineering/Seventh term/GRADUATION PROJECT/Backend/Node-js-API/public/uploads/products/images (2).png",
                    "/D:/SW Engineering/Seventh term/GRADUATION PROJECT/Backend/Node-js-API/public/uploads/products/images (3).png"
                  ]
                },
                {
                  "key": "imageCover",
                  "type": "file",
                  "src": "/D:/SW Engineering/Seventh term/GRADUATION PROJECT/Backend/Node-js-API/public/uploads/products/car-accessories-with-copy-space_23-2149030401.png"
                },
                {
                  "key": "name",
                  "value": "Product2",
                  "type": "text"
                },
                {
                  "key": "description",
                  "value": "some text",
                  "type": "text"
                },
                {
                  "key": "price",
                  "value": "5000",
                  "type": "text"
                },
                {
                  "key": "quantity",
                  "value": "4",
                  "type": "text"
                },
                {
                  "key": "category",
                  "value": "categoryX",
                  "type": "text"
                },
                {
                  "key": "location",
                  "value": "asyut",
                  "type": "text"
                },
                {
                  "key": "phone",
                  "value": "+201556381677",
                  "type": "text"
                },
                {
                  "key": "status",
                  "value": "new",
                  "type": "text"
                },
                {
                  "key": "area",
                  "value": "Egypt",
                  "type": "text"
                }
              ]
            },
            "url": {
              "raw": "{{URL}}api/v1/products",
              "host": ["{{URL}}api"],
              "path": ["v1", "products"]
            }
          },
          "response": []
        },
        {
          "name": "Update Product",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "PATCH",
            "header": [
              {
                "key": "imageCover",
                "value": "",
                "type": "text",
                "disabled": true
              }
            ],
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "imageCover",
                  "type": "file",
                  "src": "/C:/Users/Hos10/OneDrive/Desktop/car cover.png"
                }
              ]
            },
            "url": {
              "raw": "{{URL}}api/v1/products/65164722af7f88e902e5570f",
              "host": ["{{URL}}api"],
              "path": ["v1", "products", "65164722af7f88e902e5570f"]
            }
          },
          "response": []
        },
        {
          "name": "Delete Product",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/products/6512c53007bc6fd1b75344ac",
              "host": ["{{URL}}api"],
              "path": ["v1", "products", "6512c53007bc6fd1b75344ac"]
            }
          },
          "response": []
        },
        {
          "name": "Get Product By ID",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/products/65164722af7f88e902e5570f",
              "host": ["{{URL}}api"],
              "path": ["v1", "products", "65164722af7f88e902e5570f"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Services",
      "item": [
        {
          "name": "Get All Services",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/services",
              "host": ["{{URL}}api"],
              "path": ["v1", "services"]
            }
          },
          "response": []
        },
        {
          "name": "Create Service",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "POST",
            "header": [],
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "imageCover",
                  "type": "file",
                  "src": "/D:/SW Engineering/Seventh term/GRADUATION PROJECT/Backend/Node-js-API/public/uploads/services/images.png"
                },
                {
                  "key": "name",
                  "value": "service",
                  "type": "text"
                },
                {
                  "key": "description",
                  "value": "some text",
                  "type": "text"
                },
                {
                  "key": "category",
                  "value": "categoryY",
                  "type": "text"
                },
                {
                  "key": "location",
                  "value": "asyut",
                  "type": "text"
                },
                {
                  "key": "phone",
                  "value": "+201556381677",
                  "type": "text"
                },
                {
                  "key": "availableTime.daysPerWeek",
                  "value": "Sunday",
                  "type": "text"
                },
                {
                  "key": "availableTime.startTime",
                  "value": "09:00",
                  "type": "text"
                },
                {
                  "key": "availableTime.endTime",
                  "value": "18:00",
                  "type": "text"
                },
                {
                  "key": "waitingTime",
                  "value": "2",
                  "type": "text"
                },
                {
                  "key": "area",
                  "value": "Egypt",
                  "type": "text"
                }
              ]
            },
            "url": {
              "raw": "{{URL}}api/v1/services",
              "host": ["{{URL}}api"],
              "path": ["v1", "services"]
            }
          },
          "response": []
        },
        {
          "name": "Update Service",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "PATCH",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n\"availableTime\": {\r\n            \"daysPerWeek\": [\r\n                \"Sunday\",\r\n                \"Monday\",\r\n                \"Tuesday\",\r\n                \"Wednesday\"\r\n            ],\r\n            \"startTime\": \"09:00\",\r\n            \"endTime\": \"18:00\"\r\n        }\r\n} ",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/services/6513578ed70ca1812afef406",
              "host": ["{{URL}}api"],
              "path": ["v1", "services", "6513578ed70ca1812afef406"]
            }
          },
          "response": []
        },
        {
          "name": "Delete Service",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/products/6512c53007bc6fd1b75344ac",
              "host": ["{{URL}}api"],
              "path": ["v1", "products", "6512c53007bc6fd1b75344ac"]
            }
          },
          "response": []
        },
        {
          "name": "Get Service By ID",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/services/65163492c22aa2667e9ca9b5",
              "host": ["{{URL}}api"],
              "path": ["v1", "services", "65163492c22aa2667e9ca9b5"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Admin",
      "item": [
        {
          "name": "Get a list of all Unapproved products",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/products/admin/unapproved",
              "host": ["{{URL}}api"],
              "path": ["v1", "products", "admin", "unapproved"]
            }
          },
          "response": []
        },
        {
          "name": "Get a list of all Unapproved services",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/services/admin/unapproved",
              "host": ["{{URL}}api"],
              "path": ["v1", "services", "admin", "unapproved"]
            }
          },
          "response": []
        },
        {
          "name": "Get a single Unapproved product by ID",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/products/admin/unapproved/65160bc94241fe770a9cff94",
              "host": ["{{URL}}api"],
              "path": [
                "v1",
                "products",
                "admin",
                "unapproved",
                "65160bc94241fe770a9cff94"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Get a single Unapproved service by ID",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/services/admin/unapproved/65160ca04241fe770a9cff9d",
              "host": ["{{URL}}api"],
              "path": [
                "v1",
                "services",
                "admin",
                "unapproved",
                "65160ca04241fe770a9cff9d"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Update a product by ID from Unapproved to approved",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "PATCH",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n     \"approved\": true\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/products/admin/approve/65160bc94241fe770a9cff94",
              "host": ["{{URL}}api"],
              "path": [
                "v1",
                "products",
                "admin",
                "approve",
                "65160bc94241fe770a9cff94"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Update a service by ID from Unapproved to approved",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "PATCH",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n     \"approved\": true\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/services/admin/approve/65160ca04241fe770a9cff9d",
              "host": ["{{URL}}api"],
              "path": [
                "v1",
                "services",
                "admin",
                "approve",
                "65160ca04241fe770a9cff9d"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Update a product by ID from Unapproved to be removed",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/products/admin/remove/651471e0a0f78ddc3b86d191",
              "host": ["{{URL}}api"],
              "path": [
                "v1",
                "products",
                "admin",
                "remove",
                "651471e0a0f78ddc3b86d191"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Update a services by ID from Unapproved to be removed",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{jwt}}",
                  "type": "string"
                }
              ]
            },
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/services/admin/remove/651471e0a0f78ddc3b86d191",
              "host": ["{{URL}}api"],
              "path": [
                "v1",
                "services",
                "admin",
                "remove",
                "651471e0a0f78ddc3b86d191"
              ]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Product/Review",
      "item": [
        {
          "name": "Create Review on Product",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"review\":\"Great !!\",\r\n    \"rating\":5\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/products/6515df82e86338f32f7dc0b9/reviews",
              "host": ["{{URL}}api"],
              "path": ["v1", "products", "6515df82e86338f32f7dc0b9", "reviews"]
            }
          },
          "response": []
        },
        {
          "name": "Get All Reviews for a Product",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/products/6516330c4a91d47a0665cb00/reviews",
              "host": ["{{URL}}api"],
              "path": ["v1", "products", "6516330c4a91d47a0665cb00", "reviews"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Service/Review",
      "item": [
        {
          "name": "Create Review on Service",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\r\n    \"review\":\"Great !!\",\r\n    \"rating\":2\r\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "{{URL}}api/v1/services/6514d23834e825da90080536/reviews",
              "host": ["{{URL}}api"],
              "path": ["v1", "services", "6514d23834e825da90080536", "reviews"]
            }
          },
          "response": []
        },
        {
          "name": "Get All Reviews for a Service",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{URL}}api/v1/services/6514d23834e825da90080536/reviews",
              "host": ["{{URL}}api"],
              "path": ["v1", "services", "6514d23834e825da90080536", "reviews"]
            }
          },
          "response": []
        }
      ]
    }
  ]
}
```
