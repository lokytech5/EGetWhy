import AWS from "aws-sdk";

const ses = new AWS.SES();

export const handler = async(event: any) => {
    const { email, fullName } = event;

    const params = {
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Text: {
              Data: `Hello ${fullName},\n Congratulations! You have successfully verified your email with Egetwhy. Welcome aboard! We are excited to have you onboard.`,
            },
          },
          Subject: {
            Data: "Welcome to Egetwhy",
          },
        },
        Source: "your-verified-email@egetwhy.club",
      };

      try {
        await ses.sendEmail(params).promise();
        console.log(`Welcome email send to ${email}`);
      } catch (error) {
        console.error("Error sending welcome email:", error);
      }

}
