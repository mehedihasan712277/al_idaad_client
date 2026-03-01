import { formatMongoDate } from "@/utils/helper";
import { BlogType, GetSingleBlogResponseType } from "@/utils/types";
import Image from "next/image";

export const revalidate = 300;

async function getSingleBlog(id: string): Promise<BlogType> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
        next: { revalidate: 300 },
    });

    if (!res) {
        throw new Error("Failed to fetch blog");
    }

    const data: GetSingleBlogResponseType = await res.json();
    return data.data;
}

const BlogDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const blog = await getSingleBlog(id);

    if (!blog) {
        return <div>error</div>;
    }
    const { title, description, category, createdAt, thumbnail } = blog as BlogType;

    return (
        <div className="max-w-200 mx-auto space-y-4 px-4 py-20">
            <h1 className="text-3xl font-bold text-main">{title}</h1>

            <div className="flex justify-between items-center">
                <p>Written on : {formatMongoDate(createdAt)}</p>
                <p>Category : {category.name}</p>
            </div>

            <Image src={thumbnail} alt={title} width={800} height={450} className="w-200 h-112.5 rounded" />

            <div dangerouslySetInnerHTML={{ __html: description }} className="text-soft ProseMirror" />
        </div>
    );
};
export default BlogDetailsPage;
