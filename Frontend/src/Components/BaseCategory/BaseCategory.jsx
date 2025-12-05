import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { categoryContext } from "../../App";
import Header from "../Header/Header";
import Heading from "../Heading/Heading";
import Cards from "../Cards/Cards";

function BaseCategory() {
    const { category, sub } = useParams();
    const { categories } = useContext(categoryContext);

    // Convert URL to proper names
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    const categoryObj = categories.find(
        (c) => c.name.toLowerCase() === formattedCategory.toLowerCase()
    );

    return (
        <div>
            <Header categories={categories} />

            <Heading
                title={formattedCategory}
                subcategories={categoryObj?.sub || []}
            />

            <h2>Courses</h2>

            <Cards title={sub ? sub : category} />
        </div>
    );
}

export default BaseCategory;