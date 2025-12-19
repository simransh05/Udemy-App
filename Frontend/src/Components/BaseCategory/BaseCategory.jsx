import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { categoryContext } from "../../App";
import Header from "../Header/Header";
import Heading from "../Heading/Heading";
import Cards from "../Cards/Cards";

function BaseCategory() {
    const { category, sub } = useParams();
    const { categories } = useContext(categoryContext);

    function formatName(str) {
        if (!str) return "";
        return str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    const formattedCategory = formatName(category)
    const formattedSub = formatName(sub)
    const categoryObj = categories.find(
        (c) => c.name.toLowerCase() === formattedCategory.toLowerCase()
    );

    return (
        <div>
            <Header />

            <Heading
                title={formattedCategory}
                subcategories={categoryObj?.sub || []}
            />

            <h2>{sub ? formattedSub : formattedCategory} Courses</h2>

            <Cards title={sub ? sub : category} />
        </div>
    );
}

export default BaseCategory;