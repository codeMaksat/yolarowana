import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { supabase } from "@/utils/supabaseClient";

const menuItems = [
  {
    label: "Inquiries",
    href: "/booking-dashboard",
    icon: "/assets/images/dashboard.svg",
    match: pathname => pathname === "/booking-dashboard",
  },
  {
    label: "Review Requests",
    href: "/booking-dashboard/reviews",
    icon: "/assets/images/booking-icon.svg",
    match: pathname => pathname.startsWith("/booking-dashboard/reviews"),
  },
  {
    label: "Tours",
    href: "/tour-dashboard",
    icon: "/assets/images/hiking-icon-1.svg",
    match: pathname =>
      pathname === "/tour-dashboard" ||
      pathname.startsWith("/tour-dashboard/create") ||
      pathname.startsWith("/tour-dashboard/edit"),
  },
  {
    label: "Tour Order",
    href: "/tour-dashboard/order",
    icon: "/assets/images/data-blob.svg",
    match: pathname => pathname.startsWith("/tour-dashboard/order"),
  },
  {
    label: "Travel Mates",
    href: "/tour-dashboard/travel-mates",
    icon: "/assets/images/group-user-icon.svg",
    match: pathname => pathname.startsWith("/tour-dashboard/travel-mates"),
  },
  {
    label: "Contact page",
    href: "/contact",
    icon: "/assets/images/data-blob.svg",
    match: () => false,
  },
];

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = router.pathname || "";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/belet-admin");
  };

  return (
    <div className="md:max-w-[220px] w-full shrink-0 py-6 md:py-10 px-4 md:px-5 bg-white">
      <ul className="dashboard-list">
        {menuItems.map(item => {
          const isActive = item.match(pathname);

          return (
            <li key={item.href} className={isActive ? "active" : ""}>
              <Link href={item.href}>
                <span>
                  <img src={item.icon} alt={item.label.toLowerCase()} />
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}

        <li>
          <Link href="/">
            <span>
              <img src="/assets/images/logout.svg" alt="home" />
            </span>
            Back to website
          </Link>
        </li>

        <li>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-3"
          >
            <span>
              <img src="/assets/images/logout.svg" alt="logout" />
            </span>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}