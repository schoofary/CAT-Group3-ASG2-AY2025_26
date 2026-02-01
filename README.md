# **Cloud Architeture Assignment 2**
## **Static Webpage**
This is all hosted on a S3 bucket.

The webpage has the following features:

- Shows current records of NoSQL DB:
	- shows each item (per ID) as a individual list item
	- uses a get request from the API gateway to get the items of the NoSQL db

- input field for user to be used to add to the DynamoDB.
	1. ID (Mandatory)
	2. Name 
	3. Category
	4. Price
	5. Stock

## **Watermark function**
user adds image to S3 -> Triggers Lambda Function -> Lambda Function adds watermark -> Adds watermarked image to S3 -> Deletes original image
