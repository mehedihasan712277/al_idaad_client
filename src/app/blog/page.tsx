import BlogPageClient from "@/components/ui/blog/BlogPageClient";
import { getBlogCategories, getBlogs } from "@/utils/fetchData";

const BlogPage = async () => {
    const blogData = await getBlogs();
    const blogCategoryData = await getBlogCategories();

    return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
            <p className="text-brand text-4xl font-bold text-center">Explore Our Blogs</p>
            <p className="text-center text-xl text-text_normal mt-3 mb-20">Stay connected with us and get our latest news here</p>
            <BlogPageClient blogData={blogData} blogCategoryData={blogCategoryData} />
        </div>
    );
};

export default BlogPage;
