import Image from "next/image";
import ButtonContainer from "./ButtonContainer";
type Prouct = {
    _id: string;
    url: string;
    title: string;
    price: string;
    category: string;
};
const ProductCard = ({ data }: { data: Prouct }) => {
    const { url, title, price, category } = data;
    return (
        <div className="space-y-1 w-[41vw] md:w-75 mt-6 md:mt-0">
            <Image src={url} alt="product" width={300} height={450} className="w-[41vw] md:w-75 h-[61vw] md:h-112.5 rounded"></Image>
            <p className="font-semibold">{title}</p>
            <div className="flex items-center justify-between">
                <span className="text-red-400 sm:text-xl font-semibold">{price}</span>
                <span className="sm:bg-brand/50 sm:px-3 sm:py-1 rounded-full font-semibold text-brand sm:text-text_normal text-xs">{category}</span>
            </div>
            <ButtonContainer product={data} />
        </div>
    );
};

export default ProductCard;
