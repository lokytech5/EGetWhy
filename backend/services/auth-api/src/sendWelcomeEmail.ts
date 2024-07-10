

export const handler = async (event: any) => {
  const { email, fullName } = event;

  const emailParams = {
    toAddresses: [email],
    subject: "Welcome to Egetwhy",
    body: `Hello ${fullName},\n\nCongratulations! You have successfully verified your email with Egetwhy. Welcome aboard! We are excited to have you onboard.`,
    source: "lokosman5@hotmail.com",
  };

  try {
    await sendEmail(emailParams);
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};
