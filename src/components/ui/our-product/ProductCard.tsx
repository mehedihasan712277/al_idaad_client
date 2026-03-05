import Image from "next/image";
import ButtonContainer from "./ButtonContainer";
import { ProductType } from "@/utils/types";
import Link from "next/link";

const ProductCard = ({ data }: { data: ProductType }) => {
    const { _id, thumbnail, name, price, category } = data;
    return (
        <div className="space-y-1 w-[calc(50vw-32px)] md:w-[calc(33vw-24px)] lg:w-[calc(25vw-24px)] xl:w-75 relative box-border">
            <Link href={`/all-products/details/${_id}`}>
                <div className="w-[calc(50vw-32px)] md:w-[calc(33vw-24px)] lg:w-[calc(25vw-24px)] xl:w-75 aspect-2/3 rounded overflow-hidden">
                    <Image
                        src={thumbnail}
                        alt="product"
                        width={300}
                        height={450}
                        className="w-[calc(50vw-32px)] md:w-[calc(33vw-24px)] lg:w-[calc(25vw-24px)] xl:w-75 aspect-2/3 rounded hover:scale-120 transition ease-in-out duration-250"
                    ></Image>
                </div>
            </Link>
            <div className="px-1">
                <Link href={`/all-products/details/${_id}`}>
                    <p className="font-semibold">{name}</p>
                </Link>
                <div className="flex items-center justify-between">
                    <span className="font-semibold text-text_normal">{price} BDT</span>
                    <div>
                        <ButtonContainer product={data} />
                    </div>
                </div>
                <span className="bg-yellow-400 px-3 py-1 rounded-full font-semibold  text-xs absolute top-2 right-2">{category.name}</span>
            </div>
        </div>
    );
};

export default ProductCard;
