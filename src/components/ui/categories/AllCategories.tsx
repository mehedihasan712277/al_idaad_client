import { getCategories } from "@/utils/fetchData";
// import AllCategoriesClient from "./AllCategoriesClient";
import AllCategorySlider from "./AllCategorySlider";

const AllCategories = async () => {
    const categoryData = await getCategories();

    return (
        <div>
            {/* <AllCategoriesClient categories={categoryData}></AllCategoriesClient> */}
            <AllCategorySlider categories={categoryData}></AllCategorySlider>
        </div>
    );
};

export default AllCategories;
