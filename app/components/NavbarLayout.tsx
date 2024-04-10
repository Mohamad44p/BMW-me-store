"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarLayout() {
  const pathname = usePathname();

  const hideNavbar = pathname === "/";
  return <div>{!hideNavbar && <Navbar />}</div>;
}
