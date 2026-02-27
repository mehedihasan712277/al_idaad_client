import logo from "@/assets/logo_idaad.jpeg";
import Image from "next/image";
import NavItems from "./NavItems";

const Navbar = () => {
    return (
        <nav className="border border-b border-border">
            <div className="flex justify-between items-center py-4 px-4 max-w-375 mx-auto">
                <Image src={logo} width={200} height={200} alt="al idaad" className="w-16 h-16"></Image>
                <NavItems></NavItems>
            </div>
        </nav>
    );
};

export default Navbar;
