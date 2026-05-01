"use client";

const ScrollButton = ({ label }) => {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <button
      onClick={scrollToTop}
      className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
    >
      {label}
    </button>
  );
};

export default ScrollButton;
