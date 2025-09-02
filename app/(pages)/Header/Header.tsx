import Image from "next/image";
import company_logo_white from "@/public/hslogo-white.png";

export default function Header() {
  return (
    <header className="w-full bg-black h-[8vh] flex items-center px-4">
      <nav className="flex items-center">
        <Image
          src={company_logo_white}
          alt="Hidden Spot Logo"
          className="w-15"
        />
      </nav>
    </header>
  );
}
