import { formatMongoDate } from "@/utils/helper";
import { BlogType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ data }: { data: BlogType }) => {
    if (!data) {
        return <div className="text-red-400 w-75 h-50 flex items-center justify-center p-4 bg-bg_secondary rounded">Error in Loading Blog</div>;
    }
    const { _id, thumbnail, title, createdAt } = data;
    return (
        <Link href={`/blog/details/${_id}`}>
            <div className="w-75">
                <Image src={thumbnail} width={300} height={200} alt="al idaad blog" className="w-75 h-50 rounded"></Image>
                <p className="text-xl font-semibold truncate">{title}</p>
                <p className="text-sm text-text_normal font-semibold">{formatMongoDate(createdAt)}</p>
            </div>
        </Link>
    );
};

export default BlogCard;
