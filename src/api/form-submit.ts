"use server";

export interface FormState {
  fullName: string;
  reservationDate: Date;
  reservationTime: string;
  numberOfPeople: number;
  phoneNumber: string;
}

const isValidPhone = (phone: string) => {
  console.log(phone.length);
  if (phone.length < 9 || phone.length % 2 !== 0) return false;
  return true;
};

export async function handleSubmit(formState: FormState) {
  if (!isValidPhone(formState.phoneNumber)) {
    return {
      success: false,
      message: "Invalid phone number",
    };
  }

  return {
    success: true,
    message: "Reservation successful",
  };
}
