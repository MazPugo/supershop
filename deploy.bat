@echo off
:: Usage: deploy.bat your-unique-bucket-name
:: Example: deploy.bat supershop-marzena-001
:: NOTE: Deploys to us-east-1 (required for WAF + CloudFront)

set BUCKET_NAME=%1
if "%BUCKET_NAME%"=="" (
  echo ERROR: Please provide a bucket name.
  echo Usage: deploy.bat your-unique-bucket-name
  exit /b 1
)
set STACK_NAME=supershop
set REGION=us-east-1

echo.
echo [1/2] Deploying CloudFormation stack (S3 + CloudFront + WAF)...
aws cloudformation deploy --template-file deploy.yaml --stack-name %STACK_NAME% --parameter-overrides BucketName=%BUCKET_NAME% --region %REGION% --no-verify-ssl
if %ERRORLEVEL% neq 0 (
  echo ERROR: CloudFormation deploy failed.
  exit /b 1
)

echo.
echo [2/2] Uploading website files to s3://%BUCKET_NAME%/...
aws s3 cp index.html s3://%BUCKET_NAME%/index.html --content-type "text/html" --no-verify-ssl
aws s3 cp app.js     s3://%BUCKET_NAME%/app.js     --content-type "application/javascript" --no-verify-ssl
aws s3 cp styles.css s3://%BUCKET_NAME%/styles.css --content-type "text/css" --no-verify-ssl

echo.
echo Done! Your website is live at:
aws cloudformation describe-stacks --stack-name %STACK_NAME% --region %REGION% --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" --output text --no-verify-ssl
