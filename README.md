# Amazon Expense Mailer

Simple utility to download last Amazon (UK) purchase order summary as a pdf and mail it to the specified list of recipients.

By default it downloads and sends the order summary for **last purchase**. I may add support for downloading/searching for specified orders as well.

## Running

`yarn` (only first time to install dependencies)

`yarn start` (to start the process)

Sample log can be seen below

```
$ yarn start
Logging in to Amazon with 'mail@gmail.com'...
Navigating to account...
Navigating to orders...
Waiting for Invoices...
Saving invoice to ./invoice.pdf...
Sending invoice..
Sending email to 'recipient@gmail.com' with subject 'Expense invoice'...
✨  Done in 20.42s.
```

## Configuration

In order to run the project please fill in the information required in the `.env` file. You can rename the `_env` file within the project.

## Troubleshooting

If you're using Gmail to send the emails, you'll likely need to change your `less secure app access` settings. Check out the links below for documentation and settings.

https://support.google.com/accounts/answer/6010255
https://myaccount.google.com/lesssecureapps
