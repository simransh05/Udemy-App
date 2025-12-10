import { MenuItem, Typography } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";

function Heading({ title, subcategories }) {
    return (
        <div className="heading-container">
            <h4 className="title">{title}</h4>

            <div className="sub-heading">
                {subcategories.map((sub) => (
                    <MenuItem
                        key={sub}
                        className="sub-menu"
                    >
                        <Link to={`/${title.toLowerCase()}/${sub.toLowerCase().replace(/ /g, "-")}`}
                        className="link-sub">
                            {sub}
                        </Link>
                    </MenuItem>
                ))}
            </div>
        </div>
    );
}

export default Heading;
