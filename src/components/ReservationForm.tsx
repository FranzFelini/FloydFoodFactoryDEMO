"use client";

import { FormState, handleSubmit } from "@/api/form-submit";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { TimeSelect } from "./time-select";
import { DatePicker } from "./ui/date-picker";
import { PhoneInput } from "./ui/phone-input";

interface FormField {
  label: string;
  type: string;
  id: string;
  placeholder: string;
}

const formFields: FormField[] = [
  {
    label: "Full name",
    type: "text",
    id: "fullName",
    placeholder: "Eg. John Doe",
  },
  {
    label: "Reservation date",
    type: "date",
    id: "reservationDate",
    placeholder: "Reservation date",
  },
  {
    label: "Reservation time",
    type: "time",
    id: "reservationTime",
    placeholder: "Reservation time",
  },
  {
    label: "How many people?",
    type: "number",
    id: "numberOfPeople",
    placeholder: "Eg. 5",
  },
  {
    label: "Your Email?",
    type: "email",
    id: "email",
    placeholder: "Eg. johndoe@gmail.com",
  },
  {
    label: "Your Local phone number?",
    type: "phone",
    id: "phoneNumber",
    placeholder: "Eg. 1234567890",
  },
];

const Form = () => {
  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    reservationDate: new Date(),
    reservationTime: "8:00",
    numberOfPeople: 2,
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function Reserve() {
    setLoading(true);

    const response = await handleSubmit(formState);
    if (!response.success) {
      setError(response.message);
      setLoading(false);
      return;
    } else {
      router.push("/reservation-success");
    }
  }

  return (
    <>
      <div
        id="reservations"
        className="bg-white justify-center items-center w-full lg:min-h-[70vh] max-w-full flex"
      >
        <div className="w-full lg:w-[70%] lg:py-4 flex justify-center items-center gap-4 relative overflow-hidden flex-col lg:px-4 rounded-lg">
          <div className="flex flex-col gap-2 items-center rounded-xl lg:p-6 w-full z-20 max-w-[90%] lg:max-w-[60%]">
            {formFields.map((field) => (
              <div key={field.id} className="w-full pr-4 flex flex-col gap-1">
                <label
                  htmlFor={field.id}
                  className="text-lg font-medium align-center relative"
                >
                  {field.label}
                </label>

                {field.type === "date" ? (
                  <DatePicker
                    className="w-full border border-gray-500 rounded-xl h-[50px]"
                    date={formState.reservationDate}
                    setDate={(date) =>
                      setFormState({
                        ...formState,
                        reservationDate: date ?? new Date(),
                      })
                    }
                  />
                ) : field.type === "time" ? (
                  <TimeSelect
                    time={formState.reservationTime}
                    setTime={(time) =>
                      setFormState({ ...formState, reservationTime: time })
                    }
                  />
                ) : field.type === "phone" ? (
                  <PhoneInput
                    className="text-lg font-medium align-center relative"
                    value={formState.phoneNumber}
                    onChange={(value) =>
                      setFormState({ ...formState, phoneNumber: value })
                    }
                    defaultCountry="ME"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    placeholder={field.placeholder}
                    value={formState[field.id as "fullName" | "numberOfPeople"]}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        [field.id]: e.target.value,
                      })
                    }
                    className="w-full border border-gray-500 rounded-xl py-2 px-4 text-lg font-sans h-[50px]"
                    required
                  />
                )}
              </div>
            ))}
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            onClick={Reserve}
            disabled={loading}
            className={cn(
              "flex justify-center items-center text-white",
              "rounded-lg border border-gray-500 px-12 py-2",
              "text-lg font-[Fira_Sans_Condensed] font-bold z-[2] bg-[#8D7BD6] tracing-wider",
              "hover:bg-[#8D7BD6]/90 transition-all",
              "disabled:bg-[#8D7BD6]/50 disabled:cursor-not-allowed"
            )}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                Sending...{" "}
                <FaSpinner className="animate-spin h-5 w-5 text-white" />
              </div>
            ) : (
              "Reserve now"
            )}
          </button>
          <p>Your phone number is not required</p>
        </div>
      </div>
    </>
  );
};

export default Form;
