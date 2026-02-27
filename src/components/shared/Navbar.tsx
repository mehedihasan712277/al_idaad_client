import logo from "@/assets/logo_idaad.jpeg";
import Image from "next/image";
import NavItems from "./NavItems";

const Navbar = () => {
    return (
        <nav>
            <div className="flex justify-between items-center">
                <Image src={logo} width={200} height={200} alt="al idaad" className="w-20 h-20"></Image>
                <NavItems></NavItems>
            </div>
        </nav>
    );
};

export default Navbar;
