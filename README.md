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

### S3 import Lambda function

The endpoint for the API which return a signed URL to upload a csv file is here: https://8xxzwg30o7.execute-api.eu-central-1.amazonaws.com/import

After the upload CloudWatch successfully logs the JSON parsed from CSV file.
