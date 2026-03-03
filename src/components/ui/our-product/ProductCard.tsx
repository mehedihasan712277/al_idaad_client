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
        <div className="space-y-1 w-[calc(50vw-32px)] md:w-[calc(33vw-24px)] lg:w-[calc(25vw-24px)] xl:w-75 relative box-border">
            <div className="w-[calc(50vw-32px)] md:w-[calc(33vw-24px)] lg:w-[calc(25vw-24px)] xl:w-75 aspect-2/3 rounded overflow-hidden">
                <Image
                    src={url}
                    alt="product"
                    width={300}
                    height={450}
                    className="w-[calc(50vw-32px)] md:w-[calc(33vw-24px)] lg:w-[calc(25vw-24px)] xl:w-75 aspect-2/3 rounded hover:scale-120 transition ease-in-out duration-250"
                ></Image>
            </div>
            <div className="px-1">
                <p className="font-semibold">{title}</p>
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-text_normal">{price.split(" ")[1]} BDT</span>
                    <div>
                        <ButtonContainer product={data} />
                    </div>
                </div>
                <span className="bg-yellow-400 px-3 py-1 rounded-full font-semibold  text-xs absolute top-2 right-2">{category}</span>
            </div>
        </div>
    );
};

export default ProductCard;
