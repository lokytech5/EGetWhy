import { sendEmail } from "../../../lib/sendEmailUtils";


export const sendNotification = async (event: any) => {
    const { userEmail, userName, postContent, notificationType } = event;

    let subject = " ";
    let body = " ";

    switch(notificationType) {
        case 'post_created':
            subject = "Notification: Your post was created";
            body = `Hello ${userName}, \n\nYour post "${postContent}" has been successfully created. `;
            break;

        case 'post_liked':
            subject = "Notification: Your post was liked";
            body = `Hello ${userName}, \n\nYour post "${postContent}" has been liked. `;
            break;

        case 'post_commented':
            subject = "Notification: New comment on your post";
            body = `Hello ${userName}, \n\nYour post "${postContent}" has received a new comment. `;
            break;

        default:
            subject = "Notification";
            body = `Hello ${userName}, \n\nYou have a new notification about your post: "${postContent}". `;
    }
  
    const emailParams = {
      toAddresses: [userEmail],
      subject: subject,
      body: body,
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