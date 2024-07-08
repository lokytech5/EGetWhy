// import AWS from "aws-sdk";
import sgMail from '@sendgrid/mail';

// const ses = new AWS.SES();

const sendGridApiKey = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(sendGridApiKey);


interface EmailParams {
    toAddresses: string[];
    subject: string;
    body: string;
    source: string;
}

export const sendEmail = async ({ toAddresses, subject, body, source} : EmailParams) => {
    const params = {
        Destination: {
          ToAddresses: toAddresses,
        },
        Message: {
          Body: {
            Text: {
              Data: body,
            },
          },
          Subject: {
            Data: subject,
          },
        },
        Source: source,
      };

      const msg = {
        to: toAddresses,
        from: source,
        subject: subject,
        text: body,
    };


      try {
        // await ses.sendEmail(params).promise();
        await sgMail.send(msg);
        console.log(`Email sent to ${toAddresses.join(", ")}`);
      } catch (error) {
        console.error("Error sending email:", error);
        throw error;
      }
}