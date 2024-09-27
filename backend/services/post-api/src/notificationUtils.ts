import { sendEmail } from "../../../lib/sendEmailUtils";


export const sendNotification = async (event: any) => {
    const { userEmail, userName, postContent } = event;
  
    const emailParams = {
      toAddresses: [userEmail],
      subject: "Notification: Your post was created",
      body:`Hello ${userName},\n\nYour post "${postContent}" has been successfully created.`,
      source: "lokosman5@hotmail.com",
    };
  
    try {
      await sendEmail(emailParams);
      console.log(`Email sent to ${userEmail}`);
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw error;
    }
  };