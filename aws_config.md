### Steps to configure AWS [S3](https://aws.amazon.com/s3/) bucket and [Cloudfront](https://aws.amazon.com/cloudfront/) for deployment.

### S3 

#### Create and configure S3 bucket for AWS web distribution

1.  Sign in to [AWS](https://signin.aws.amazon.com/)
2.  Select [S3] button to create an S3 bucket
3.  On the next screen select [Create Bucket] button
4.  Add [Bucket Name] field (*Ex. www.api.lionsentry.com*)
5.  *If applicable*: Copy settings from existing bucket and check the box *I acknowledge that the current settings might result in this bucket and the objects within becoming public.*
6.  **Turn Off** Block all public access 
7.  Click the [Create Bucket] button
8.  You should see your new bucket showing in the list
9.  Select your new bucket and select the [Properties] tab button on the next screen
10. Scroll down to Static website hosting and select the [Edit] button
11. On the next screen select the [Enable] radio button
12. Scroll down and input `index.html` in the field for index document
13. Select [Save Changes] button
14. Scroll to the bottom of the Properties tab and you will see the URL for your new bucket, which is empty.
15. Until CI/CD is finished, run `npm run build:web` on your local machine. This will create the `/web-build` folder of webpack artifacts for deployment. 
16. Select the [Objects] tab button in your AWS bucket and select the [Upload] button
17. Upload the individual files first (not nested in folders inside of the web-build folder) and then upload the folders. Select the [Upload] button to complete
18. Go to the [Permissions] tab and edit the Bucket Policy to add the contents below and select the [Save] buttons
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::www.your-bucket-name.com/*"
        }
    ]
}
```
19. Now if you go back to the [Properties] tab and scroll down to the bottom, you can click on your bucket website endpoint to see your live application. Next steps are to configure CloudFront and DNS to point your domain to the bucket website endpoint.

### CloudFront

#### Create and configure CloudFront for AWS web distribution 

1.  Sign in to [AWS](https://signin.aws.amazon.com/)
2.  Select [CloudFront] button
3.  Select [Create Distribution] button
4.  Paste the bucket website endpoint in the [origin domain] field
5.  Select Redirect HTTP to HTTPS
6.  Select all HTTP Methods (Get, Post, Put, Delete) needed
7.  Create https SSL cert
8.  Copy DNS records to DNS management system (Godaddy?) for validation and implementation
9.  Once your certificate in AWS is validated, update your www. or subdomain address with the new cloudfront url
