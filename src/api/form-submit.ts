"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface FormState {
  fullName: string;
  reservationDate: Date;
  reservationTime: string;
  numberOfPeople: number;
  phoneNumber: string;
  email: string;
}

export async function handleSubmit(values: FormState) {
  const FloydEmailResult = await FloydEmail(values);
  const UserEmailResult = await UserEmail(values);

  if (!FloydEmailResult || !UserEmailResult) {
    return {
      success: false,
      message:
        "Reservation failed, Fields : Full name, Number of People, Time, Date and Email are reqired ",
    };
  }
  return {
    success: true,
    message: "Reservation success",
  };
}

async function FloydEmail(values: FormState) {
  const emailContent = `
  Full Name : ${values.fullName}
  <br>
  Reservation Date : ${values.reservationDate}
  <br>
  Reservation Time : ${values.reservationTime}
  <br>
  Number of people : ${values.numberOfPeople}
  <br>
  Phone number : ${values.phoneNumber}
  <br>
  Email : ${values.email}`;

  const response = await resend.emails.send({
    from: "Floyd-Food-Factory-Reservations@qoobes.com",
    to: "arnautovic.feda@gmail.com",
    subject: "Floyd Food Factory Reservation",
    html: emailContent,
  });

  if (response.error) {
    return false;
  }
  return true;
}

async function UserEmail(values: FormState) {
  const emailContent = `<div><p> Thank you mr/mrs. ${values.fullName} , your reservation is set on ${values.reservationDate} at ${values.reservationTime}. <br>
  The table is reserved for ${values.numberOfPeople} people. We're looing forward to seeing you ! </p></div>`;

  const response = await resend.emails.send({
    from: "Floyd-Food-Factory-Reservations@qoobes.com",
    to: values.email,
    subject: "Floyd Food Factory Reservation",
    html: emailContent,
  });

  if (response.error) {
    return false;
  }
  return true;
}
