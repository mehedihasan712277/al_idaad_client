import { getCategories, getCategoryImage } from "@/utils/fetchData";
// import AllCategoriesClient from "./AllCategoriesClient";
// import AllCategorySlider from "./AllCategorySlider";
import AllCategoryImageSlider from "./AllCategoryImageSlider";

const AllCategories = async () => {
    const categoryData = await getCategories();
    const categoryImageData = await getCategoryImage();
    return (
        <div>
            {/* <AllCategoriesClient categories={categoryData}></AllCategoriesClient> */}
            {/* <AllCategorySlider categories={categoryData}></AllCategorySlider> */}
            <AllCategoryImageSlider categories={categoryData} categoryImages={categoryImageData}></AllCategoryImageSlider>
        </div>
    );
};

export default AllCategories;
