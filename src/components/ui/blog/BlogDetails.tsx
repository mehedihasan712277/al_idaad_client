"use client";

import { formatMongoDate, processImageHTML } from "@/utils/helper";
import { BlogType, GetSingleBlogResponseType } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BlogDetails = ({ id }: { id: string }) => {
    const [blogDetails, setBlogDetails] = useState<GetSingleBlogResponseType | null>(null);
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchlogDetails = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
                    next: { revalidate: 300 },
                });
                const data = await response.json();
                if (data.success) {
                    setBlogDetails(data);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
                // setLoading(false);
            }
        };
        fetchlogDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="h-[calc(100vh-100px)] flex justify-center items-center">
                <p>Loading Blog Details...</p>
            </div>
        );
    }
    const { title, description, category, createdAt, thumbnail } = blogDetails?.data as BlogType;

    return (
        <div className="relative">
            <div className="max-w-200 mx-auto space-y-4">
                <p className="text-3xl font-bold text-main">{title}</p>
                <div className="flex justify-between items-center">
                    <p>Written on : {formatMongoDate(createdAt)}</p>
                    <p>Category : {category.name}</p>
                </div>
                <Image src={thumbnail} alt="blog banner image" width={800} height={450} className="w-200 h-112.5 rounded"></Image>
                <div
                    dangerouslySetInnerHTML={{
                        __html: description ? processImageHTML(description) : "",
                    }}
                    className="text-soft ProseMirror"
                />
            </div>
            <div className="flex justify-center gap-4 pt-4">
                <button
                    onClick={() => router.push(`/blog`)}
                    className="flex items-center gap-2 px-4 py-2 bg-brand text-text_dark rounded active:scale-90 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-arrow-left-icon lucide-arrow-left"
                    >
                        <path d="m12 19-7-7 7-7" />
                        <path d="M19 12H5" />
                    </svg>
                    <span className="font-bold">Go back</span>
                </button>
            </div>
        </div>
    );
};

export default BlogDetails;
