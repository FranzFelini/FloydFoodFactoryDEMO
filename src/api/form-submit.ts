"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const keyNamesToLabelMap = {
  fullName: "Full Name  ",
  reservationDate: "Reservation Date ",
  reservationTime: "Reservation Time ",
  numberOfPeople: "Number of people ",
  phoneNumber: "Phone Number ",
  email: "Email ",
};

export interface FormState {
  fullName: string;
  reservationDate: Date;
  reservationTime: string;
  numberOfPeople: number;
  phoneNumber: string;
  email: string;
}

export async function handleSubmit(values: FormState) {
  const floydEmailResult = await sendFloydEmail(values);
  const userEmailTresult = await sendUserEmail(values);

  if (!floydEmailResult || !userEmailTresult) {
    return {
      success: false,
      message: "Reservation failed",
    };
  }
  return {
    success: true,
    message: "Reservation successful",
  };
}

async function sendFloydEmail(values: FormState) {
  const emailContent = `
  <div>
    ${Object.keys(values)
      .map(
        (key) =>
          `<p style="margin-bottom: 1rem">${
            keyNamesToLabelMap[key as keyof FormState]
          }: ${values[key as keyof FormState]}</p>`
      )
      .join("")}
  </div>
`;

  const response = await resend.emails.send({
    to: "arnautovic.feda@gmail.com",
    from: "me@qoobes.com",
    subject: "Floyd Food Factory Reservation",
    html: emailContent,
  });

  if (response.error) {
    console.log(response.error);
    return false;
  }

  return true;
}

async function sendUserEmail(values: FormState) {
  const emailContent = `
  <div> Reservation Successful! Thank you mr/mrs${values.fullName}! </div>
`;

  const response = await resend.emails.send({
    to: values.email,
    from: "reservations@qoobes.com",
    subject: "Floyd Food Factory Reservation",
    html: emailContent,
  });

  if (response.error) {
    console.log(response.error);
    return false;
  }

  return true;
}
