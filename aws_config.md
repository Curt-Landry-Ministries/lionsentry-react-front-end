### Steps to configure AWS [S3](https://aws.amazon.com/s3/) bucket and [Cloudfront](https://aws.amazon.com/cloudfront/) for deployment.

### S3 

1.  Sign in to [AWS](https://signin.aws.amazon.com/)
2.  Select [S3] to create an S3 bucket
3.  On the next screen select [Create Bucket] button
4.  Add [Bucket Name] field (*Ex. www.api.lionsentry.com*)
5.  *If applicable*: Copy settings from existing bucket and check the box *I acknowledge that the current settings might result in this bucket and the objects within becoming public.*
6.  **Turn Off** Block all public access 
7.  Click [Create Bucket]
8.  You should see your new bucket showing in the list
9.  Select your new bucket and select [properties] button on the next screen
10. Scroll down to Static website hosting and select [edit] button
11. On the next screen select [Enable] radio button
12. Scroll down and input `index.html` in the field for index document
13. Select [Save Changes] button
14. Scroll to the bottom of the Properties tab and you will see the URL for your new bucket, which is empty.
15. Until CI/CD is finished, run `npm run build:web` on your local machine. This will create the `/web-build` folder of webpack artifacts for deployment. 
16. Select the [Objects] tab button in your AWS bucket and select the [Upload] button
17. Upload the individual files first (not nested in folders inside of the web-build folder) and then upload the folders. Select [Upload] to complete

### CloudFront