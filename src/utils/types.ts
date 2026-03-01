// blog------------------------------
export interface BlogType {
    _id: string;
    title: string;
    thumbnail: string;
    description: string;
    category: {
        _id: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface GetAllBlogsResponseType {
    success: boolean;
    count: number;
    data: BlogType[];
}

export interface GetSingleBlogResponseType {
    success: boolean;
    data: BlogType;
}

// blog category ------------------------------

export interface BlogSubCategoryType {
    _id: string;
    name: string;
    subCategories: BlogSubCategoryType[];
}

export interface BlogCategoryType {
    _id: string;
    name: string;
    subCategories: BlogSubCategoryType[];
    createdAt: string;
    updatedAt: string;
}

export interface GetAllBlogCategoriesResponseType {
    success: boolean;
    data: BlogCategoryType[];
}

export interface GetSingleBlogCategoryResponseType {
    success: boolean;
    data: BlogCategoryType;
}

// product category ------------------------------

export interface SubCategoryType {
    _id: string;
    name: string;
    subCategories: SubCategoryType[];
}

export interface CategoryType {
    _id: string;
    name: string;
    subCategories: SubCategoryType[];
    createdAt: string;
    updatedAt: string;
}

export interface GetAllCategoriesResponseType {
    success: boolean;
    data: CategoryType[];
}

export interface GetSingleCategoryResponseType {
    success: boolean;
    data: CategoryType;
}

// banner ------------------------------

export interface BannerType {
    _id: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetAllBannersResponseType {
    success: boolean;
    count: number;
    data: BannerType[];
}
