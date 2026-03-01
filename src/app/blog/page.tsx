import BlogCard from "@/components/ui/blog/BlogCard";
import { getBlogs } from "@/utils/fetchData";

const BlogPage = async () => {
    const blogData = await getBlogs();

    return (
        <div className="py-20 max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-4">
                {blogData.map((ele) => (
                    <div key={ele._id}>
                        <BlogCard url={ele.thumbnail}></BlogCard>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
