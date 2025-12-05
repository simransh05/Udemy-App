import { MenuItem, Typography } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";

function Heading({ title, subcategories }) {
    return (
        <div style={{  display: 'flex' }}>
            <h4 style={{ fontSize: "28px", fontWeight: "600", marginRight: '20px' }}>{title}</h4>

            <div style={{ marginTop: "10px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {subcategories.map((sub) => (
                    <MenuItem
                        key={sub}
                        style={{
                            cursor: "pointer"
                        }}
                    >
                        <Link to={`/${title.toLowerCase()}/${sub.toLowerCase().replace(/ /g, "-")}`}
                        style={{textDecoration:'none', color:'inherit'}}>
                            {sub}
                        </Link>
                    </MenuItem>
                ))}
            </div>
        </div>
    );
}

export default Heading;
