import Image from "next/image";

const BlogCard = ({ url }: { url: string }) => {
    return (
        <div>
            <Image src={url} width={300} height={300} alt="al idaad blog" className="w-75 h-75 rounded"></Image>
            <p className="text-xl font-semibold line-clamp-1">This is Blog title</p>
            <p className="text-sm text-text_normal font-semibold">12 April, 2025</p>
        </div>
    );
};

export default BlogCard;
