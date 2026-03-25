import icon from "@/assets/whatsapp.svg";
import Image from "next/image";

const WhatsApp = () => {
    return (
        <div className="w-32 h-32 fixed z-40 -bottom-10 -right-10">
            <a href="https://wa.me/8801734874385" target="_blank">
                <Image src={icon} width={32} height={32} alt="whatsapp" className="w-8 h-8"></Image>
            </a>
        </div>
    );
};

export default WhatsApp;
