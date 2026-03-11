import { getCategories } from "@/utils/fetchData";
import AllCategoriesClient from "./AllCategoriesClient";

const AllCategories = async () => {
    const categoryData = await getCategories();

    return (
        <div>
            <AllCategoriesClient categories={categoryData}></AllCategoriesClient>
        </div>
    );
};

export default AllCategories;
