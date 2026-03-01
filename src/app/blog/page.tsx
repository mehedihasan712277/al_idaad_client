import BlogCard from "@/components/ui/blog/BlogCard";
import { getBlogCategories, getBlogs } from "@/utils/fetchData";

const BlogPage = async () => {
    const blogData = await getBlogs();
    const blogCategoryData = await getBlogCategories();
    return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
            {/* <div className="h-80 bg-brand">
            </div> */}
            <p className="text-brand text-4xl font-bold text-center">Explore Our Blogs</p>
            <p className="text-center text-xl text-text_normal mt-3 mb-20">Stay connected with us and get our latest news here</p>
            <div className="flex gap-4 border-t border-border">
                <div className="w-60 shrink-0 border-r border-border pt-4">
                    <p className="font-semibold">Blog Category</p>
                    {blogCategoryData.map((ele) => (
                        <p key={ele._id} className="text-text_normal">
                            {ele.name}
                        </p>
                    ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                    {blogData.map((ele) => (
                        <div key={ele._id}>
                            <BlogCard data={ele}></BlogCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
