"use client";

import BlogCard from "@/components/ui/blog/BlogCard";
import { BlogCategoryType, BlogType } from "@/utils/types";
import { useState } from "react";

interface Props {
    blogData: BlogType[];
    blogCategoryData: BlogCategoryType[];
}

const BlogPageClient = ({ blogData, blogCategoryData }: Props) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    // Recursively get all IDs of a category and its subcategories
    const getAllCategoryIds = (category: BlogCategoryType): string[] => {
        let ids = [category._id];
        if (category.subCategories?.length > 0) {
            category.subCategories.forEach((sub) => {
                ids = [...ids, ...getAllCategoryIds(sub as BlogCategoryType)];
            });
        }
        return ids;
    };

    // Recursively find category by ID
    const findCategoryById = (categories: BlogCategoryType[], id: string): BlogCategoryType | undefined => {
        for (const cat of categories) {
            if (cat._id === id) return cat;
            if (cat.subCategories?.length > 0) {
                const found = findCategoryById(cat.subCategories as BlogCategoryType[], id);
                if (found) return found;
            }
        }
        return undefined;
    };

    const getCategoryFilterIds = (): string[] => {
        if (selectedCategory === "all") return [];
        const found = findCategoryById(blogCategoryData, selectedCategory);
        return found ? getAllCategoryIds(found) : [];
    };

    const filteredBlogs = selectedCategory === "all" ? blogData : blogData.filter((blog) => getCategoryFilterIds().includes(blog.category._id));

    // Recursively render category buttons with indentation
    const renderCategoryButtons = (categories: BlogCategoryType[], level: number = 0) => {
        return categories.map((cat) => (
            <div key={cat._id}>
                <button
                    onClick={() => setSelectedCategory(cat._id)}
                    style={{ paddingLeft: `${level * 12}px` }}
                    className={`w-full text-left py-1 text-sm transition-colors ${
                        selectedCategory === cat._id ? "text-brand font-semibold" : "text-text_normal hover:text-brand"
                    }`}
                >
                    {level > 0 && <span className="mr-1 text-border">└</span>}
                    {cat.name}
                </button>
                {cat.subCategories?.length > 0 && renderCategoryButtons(cat.subCategories as BlogCategoryType[], level + 1)}
            </div>
        ));
    };

    return (
        <div className="flex gap-4 border-t border-border">
            <div className="w-60 shrink-0 border-r border-border pt-4">
                <p className="font-semibold mb-2">Blog Category</p>
                <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left py-1 text-sm transition-colors ${
                        selectedCategory === "all" ? "text-brand font-semibold" : "text-text_normal hover:text-brand"
                    }`}
                >
                    All Categories
                </button>
                {renderCategoryButtons(blogCategoryData)}
            </div>
            <div className="grid grid-cols-3 justify-between gap-11.5 w-full pt-4">
                {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((ele) => (
                        <div key={ele._id}>
                            <BlogCard data={ele} />
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 text-center text-text_normal py-20">No blogs found in this category.</div>
                )}
            </div>
        </div>
    );
};

export default BlogPageClient;
