// import logo from "@/assets/logo_idaad.jpeg";
import NavItems from "./NavItems";

const Navbar = () => {
    return (
        <nav className="border border-b border-border fixed top-0 left-0 right-0 z-10 bg-bg_main">
            <div className="flex justify-between items-center h-18 md:h-25 px-4 max-w-7xl mx-auto">
                {/* <Image src={logo} width={200} height={200} alt="al idaad" className="w-12 h-12 md:w-16 md:h-16"></Image> */}
                <h1 className="text-3xl font-bold font-proza-libre">Al Idaad</h1>
                <NavItems></NavItems>
            </div>
        </nav>
    );
};

export default Navbar;
