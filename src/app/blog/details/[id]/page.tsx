import BlogDetails from "@/components/ui/blog/BlogDetails";

const BlogDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return (
        <div className="">
            <BlogDetails id={id}></BlogDetails>
        </div>
    );
};

export default BlogDetailsPage;
