import AWS from "aws-sdk";

const ses = new AWS.SES();

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

      try {
        await ses.sendEmail(params).promise();
        console.log(`Email sent to ${toAddresses.join(", ")}`);
      } catch (error) {
        console.error("Error sending email:", error);
        throw error;
      }
}