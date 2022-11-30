## AWS hosted backend for Diving Shop

This is a part of a project for AWS JavaScript Developer course.

### Lambda functions

- List all products:
  - https://tvk13qhroe.execute-api.eu-central-1.amazonaws.com/products


- Get a product by ID:
  - https://tvk13qhroe.execute-api.eu-central-1.amazonaws.com/products/{productId}


- Create a product:
  - https://tvk13qhroe.execute-api.eu-central-1.amazonaws.com/products?title={{title}}&description={{description}}&price={{price}}&image={{image}}&count={{count}}

### Swagger

Swagger deployed at:
- https://tvk13qhroe.execute-api.eu-central-1.amazonaws.com/swagger

### Frontend

The repo for the frontend for this app is here https://github.com/artabr/diveshop-aws-project

The frontend is deployed at http://artabr-diveshop-aws-project.s3-website.eu-central-1.amazonaws.com/