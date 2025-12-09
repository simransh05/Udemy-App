import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import './SubHeader.css'
import { Link } from "react-router-dom";

function SubHeader({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEnter = (cat) => {
    setSelectedCategory(cat);
  };

  const handleLeave = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="sub-header-container">
      <Box sx={{ position: "relative", display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: 'center',
            gap: 4,
            padding: "15px 20px",
            background: "#fff",
          }}
        >
          {categories.map((cat, i) => (
            <Typography
              key={i}
              onMouseEnter={() => handleEnter(cat)}
              sx={{ cursor: "pointer", "&:hover": { color: "blue" } }}
            >
              <Link to={`${cat.name.toLowerCase()}`}
              style={{textDecoration:'none',color:'inherit' ,width:'100%'}}>
                {cat.name}
              </Link>
            </Typography>
          ))}
        </Box>

        {selectedCategory && (
          <Paper
            elevation={5}
            onMouseLeave={handleLeave}
            sx={{
              position: "absolute",
              display: 'flex',
              justifyContent: 'center',
              top: "55px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              padding: "15px 20px",
              background: "#111",
              color: "#fff",
              gap: 4,
              zIndex: 10
            }}
          >
            {selectedCategory.sub.map((item, i) => (
              <Typography key={i} sx={{ "&:hover": { color: "violet" }, cursor: "pointer" }}>
                <Link to={`${selectedCategory.name.toLowerCase()}/${item.toLowerCase().replace(/ /g, "-")}`}
                style={{textDecoration:'none',color:'inherit' ,width:'100%'}}>
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
