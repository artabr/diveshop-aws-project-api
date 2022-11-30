// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "diveshop-aws-project-api",
    "version": "1"
  },
  "paths": {
    "/products": {
      "get": {
        "summary": "getProductsList",
        "description": "",
        "operationId": "getProductsList.get./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "List of products was served",
            "schema": {
              "$ref": "#/definitions/Products"
            }
          },
          "500": {
            "description": "Unexpected error happened"
          }
        }
      },
      "post": {
        "summary": "createProduct",
        "description": "",
        "operationId": "createProduct.post./products",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "in": "query",
            "name": "title",
            "type": "string",
            "description": "The product title. Required.",
            "required": true
          },
          {
            "in": "query",
            "name": "description",
            "type": "string",
            "description": "The product description. Less than 256 symbols.",
            "required": false
          },
          {
            "in": "query",
            "name": "price",
            "type": "string",
            "description": "The product price. Required.",
            "required": true
          },
          {
            "in": "query",
            "name": "image",
            "type": "string",
            "description": "The product image URL.",
            "required": false
          }
        ],
        "responses": {
          "200": {
            "description": "Product was created.",
            "schema": {
              "$ref": "#/definitions/Product"
            }
          },
          "400": {
            "description": "Bad request"
          },
          "500": {
            "description": "Unexpected error happened"
          }
        }
      }
    },
    "/products/{productId}": {
      "get": {
        "summary": "getProductsById",
        "description": "",
        "operationId": "getProductsById.get./products/{productId}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "productId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "Product with given ID was found",
            "schema": {
              "$ref": "#/definitions/Product"
            }
          },
          "404": {
            "description": "Product not found"
          },
          "500": {
            "description": "Unexpected error happened"
          }
        }
      }
    }
  },
  "definitions": {
    "Product": {
      "properties": {
        "itemId": {
          "title": "Product.itemId",
          "type": "number"
        },
        "itemName": {
          "title": "Product.itemName",
          "type": "string"
        },
        "itemPrice": {
          "title": "Product.itemPrice",
          "type": "number"
        },
        "itemImage": {
          "title": "Product.itemImage",
          "type": "string"
        },
        "itemDescription": {
          "title": "Product.itemDescription",
          "type": "string"
        }
      },
      "required": [
        "itemId",
        "itemName",
        "itemPrice"
      ],
      "additionalProperties": false,
      "title": "Product",
      "type": "object"
    },
    "Products": {
      "items": {
        "$ref": "#/definitions/Product",
        "title": "Products.[]"
      },
      "title": "Products.[]",
      "type": "array"
    }
  },
  "securityDefinitions": {}
};