import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReservationSuccess() {
  return (
    <div className="flex items-center justify-center w-screen h-screen flex-col gap-4">
      <img src="/floyd-logo.png" alt="Floyd Food Factory Logo" className="w-[300px] h-auto" />

      <div className="text-center">
        <h1 className="font-[Fira_Sans_Condensed] text-2xl font-bold">Reservation Successful</h1>
        <p>Thank you for making a reservation at the Floyd Food Factory!</p>
      </div>
      <Link href={"/"}>
        <Button>Return to homepage</Button>
      </Link>
    </div>
  );
}
