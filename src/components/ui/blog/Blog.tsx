import Link from "next/link";
import BlogCard from "./BlogCard";

const Blog = () => {
    const data = [
        {
            url: "https://i.postimg.cc/TPTKHhc9/blog-1.webp",
        },
        {
            url: "https://i.postimg.cc/mrTP6hSS/blog-2.webp",
        },
        {
            url: "https://i.postimg.cc/R0vWbqTQ/blog-3.webp",
        },
        {
            url: "https://i.postimg.cc/TPTKHhc9/blog-1.webp",
        },
    ];
    return (
        <div>
            <p className="text-3xl font-poppins text-center font-semibold mb-8">Our Latest News</p>
            <div className="flex justify-between">
                {data.map((ele, i) => (
                    <div key={i}>
                        <BlogCard url={ele.url}></BlogCard>
                    </div>
                ))}
            </div>
            <div className="flex w-full justify-end mt-4">
                <Link href="/blog" className="text-text_normal flex items-end gap-1 w-fit">
                    <span>Explore more</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-right-icon lucide-arrow-right"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default Blog;
