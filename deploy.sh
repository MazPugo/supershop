#!/bin/bash
# Usage: ./deploy.sh your-unique-bucket-name

BUCKET_NAME=${1:-supershop-website}
STACK_NAME=supershop

echo "Deploying CloudFormation stack..."
aws cloudformation deploy \
  --template-file deploy.yaml \
  --stack-name $STACK_NAME \
  --parameter-overrides BucketName=$BUCKET_NAME

echo "Uploading website files..."
aws s3 cp index.html s3://$BUCKET_NAME/index.html
aws s3 cp app.js     s3://$BUCKET_NAME/app.js
aws s3 cp styles.css s3://$BUCKET_NAME/styles.css

echo "Done! Website URL:"
aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query "Stacks[0].Outputs[?OutputKey=='WebsiteURL'].OutputValue" \
  --output text
