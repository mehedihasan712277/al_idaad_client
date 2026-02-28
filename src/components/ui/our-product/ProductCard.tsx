import Image from "next/image";
import ButtonContainer from "./ButtonContainer";
type Prouct = {
    url: string;
    title: string;
    price: string;
    category: string;
};
const ProductCard = ({ data }: { data: Prouct }) => {
    const { url, title, price, category } = data;
    return (
        <div className="space-y-1">
            <Image src={url} alt="product" width={300} height={450} className="w-75 h-112.5 rounded"></Image>
            <p className="font-semibold">{title}</p>
            <div className="flex items-center justify-between">
                <span className="text-red-400 text-xl font-semibold">{price}</span>
                <span className="bg-brand/50 px-3 py-1 rounded-full font-semibold text-xs">{category}</span>
            </div>
            <ButtonContainer product={data} />
        </div>
    );
};

export default ProductCard;
