import {
    BannerType,
    BlogCategoryType,
    BlogType,
    CategoryType,
    GetAllBannersResponseType,
    GetAllBlogCategoriesResponseType,
    GetAllBlogsResponseType,
    GetAllCategoriesResponseType,
    GetSingleBlogCategoryResponseType,
    GetSingleBlogResponseType,
    GetSingleCategoryResponseType,
} from "./types";

// ----------------------------------------------------------------------------------------------------
// get all blogs
export const getBlogs = async (): Promise<BlogType[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
        next: { revalidate: 300 },
    });

    const result: GetAllBlogsResponseType = await res.json();

    return result.data;
};
// get single blog
export const getSingleBlog = async (id: string): Promise<BlogType> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
        next: { revalidate: 300 },
    });

    if (!res) {
        throw new Error("Failed to fetch blog");
    }

    const data: GetSingleBlogResponseType = await res.json();
    return data.data;
};
// ----------------------------------------------------------------------------------------------------
// get all blog categories
export const getBlogCategories = async (): Promise<BlogCategoryType[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog-categories`, {
        next: { revalidate: 300 },
    });

    const result: GetAllBlogCategoriesResponseType = await res.json();

    return result.data;
};

// get single blog category
export const getBlogCategory = async (id: string): Promise<BlogCategoryType> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog-categories/${id}`, {
        next: { revalidate: 300 },
    });

    const result: GetSingleBlogCategoryResponseType = await res.json();

    return result.data;
};
// ----------------------------------------------------------------------------------------------------
// get all product categories
export const getCategories = async (): Promise<CategoryType[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        next: { revalidate: 300 },
    });

    const result: GetAllCategoriesResponseType = await res.json();

    return result.data;
};

// get single product category
export const getCategory = async (id: string): Promise<CategoryType> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
        next: { revalidate: 300 },
    });

    const result: GetSingleCategoryResponseType = await res.json();

    return result.data;
};
// ----------------------------------------------------------------------------------------------------
// get banners
export const getBanners = async (): Promise<BannerType[]> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banners`, {
        next: { revalidate: 300 },
    });

    const result: GetAllBannersResponseType = await res.json();

    return result.data;
};
// ----------------------------------------------------------------------------------------------------
