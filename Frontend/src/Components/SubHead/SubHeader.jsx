import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import "./SubHeader.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { categoryContext } from "../../App";

function SubHeader() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const {categories} = useContext(categoryContext)

  const handleEnter = (cat) => {
    setSelectedCategory(cat);
  };

  const handleLeave = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="sub-header-container">
      <Box className="subheader-wrapper"
        onMouseLeave={handleLeave}>
        <Box className="main-category-row">
          {categories.map((cat, i) => (
            <Typography
              key={i}
              className="category-item"
              onMouseEnter={() => handleEnter(cat)}
            >
              <Link
                to={`${cat.name.toLowerCase()}`}
                className="category-link"
              >
                {cat.name}
              </Link>
            </Typography>
          ))}
        </Box>

        {selectedCategory && (
          <Paper
            elevation={5}
            className="subcategory-box"
            onMouseLeave={handleLeave}
          >
            {selectedCategory.sub.map((item, i) => (
              <Typography key={i} className="subcategory-item">
                <Link
                  to={`${selectedCategory.name.toLowerCase()}/${item
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="subcategory-link"
                >
                  {item}
                </Link>
              </Typography>
            ))}
          </Paper>
        )}
      </Box>
    </div>
  );
}

export default SubHeader;