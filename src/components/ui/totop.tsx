export default function totop() {
  const ToTop = document.getElementById(".to-top");

  <a
    href="#"
    id="to-top"
    className="relative bg-white b-[16px] r-[32px] w=[50px] h-[50px] flex rounded-sm align-center justify-center text-2xl text-black decoration-none opacity-15 pointer-events-none transition-all.4s "
  >
    <i id="nesto"></i>
  </a>;

  return window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      ToTop?.classList.add("active");
    } else {
      ToTop?.classList.remove("active");
    }
  });
}
