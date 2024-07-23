import { sendEmail } from "../../../lib/sendEmailUtils";

const notifyPasswordReset = async (email: string) => {
    const emailParams = {
        toAddresses: [email],
        subject: "Your password has been reset",
        body: `Hello,\n\n Your password has been successfully reset. If you did not request this change, please contact support immediately.`,
        source: "lokosman5@hotmail.com",
      };


    try {
        await sendEmail(emailParams);
      } catch (error) {
        console.error("Error sending password reset confirmation email:", error);
        throw error;
      }
    };
    
    export default notifyPasswordReset;