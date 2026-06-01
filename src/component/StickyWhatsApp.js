import Link from "next/link";

export default function StickyWhatsApp() {
  const phoneNumber = "99363229627";
  const message =
    "Hello Yola Rowana, I would like to plan a Central Asia trip.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Yola Rowana on WhatsApp"
      className="fixed right-5 bottom-5 z-[9999] flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg transition-all hover:scale-105"
    >
      <i className="fa-brands fa-whatsapp text-2xl" />
      <span className="hidden sm:inline font-semibold">WhatsApp</span>
    </Link>
  );
}