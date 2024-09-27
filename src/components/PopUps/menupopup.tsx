export default function Meni() {
  return (
    <a href="/meni.pdf">
      <button className="flex justify-center items-center text-white rounded-lg border border-gray-500 px-12 py-2 text-lg font-[Fira_Sans_Condensed] font-bold z-[2] bg-[#8D7BD6] tracing-wider hover:bg-[#8D7BD6]/90 transition-all disabled:bg-[#8D7BD6]/50 disabled:cursor-not-allowed">
        {" "}
        Prices{" "}
      </button>
    </a>
  );
}
