import Image from "next/image";

export default function Prikaz() {
  return (
    <section className="p-8 z-20">
      <Image
        src="/floyd-logo.png"
        alt=""
        className="max-w-full brightness-200"
      />
    </section>
  );
}
