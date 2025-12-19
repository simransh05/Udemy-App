import React, { useState } from "react";
import { Box, Button, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { categoryContext } from "../../App";


function Explore() {
    const [open, setOpen] = useState(false);
    const [currentSubList, setCurrentSubList] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    const { categories } = useContext(categoryContext);

    const handleOpenMenu = () => {
        setOpen(true);
        setCurrentSubList([]);
        setCurrentCategory(null);
    };

    const handleCloseMenu = () => {
        setOpen(false);
        setCurrentSubList([]);
        setCurrentCategory(null);
    };

    const handleMouse = (name, sub) => {
        setCurrentCategory(name)
        setCurrentSubList(sub);
    }

    return (
        <Box
            onMouseEnter={handleOpenMenu}
            onMouseLeave={handleCloseMenu}
            sx={{ position: "relative", display: "inline-block" }}
        >
            <Button sx={{ textTransform: "none", fontSize: "16px", color: 'black' }}>
                Explore
            </Button>

            {open && (
                <Box
                    sx={{
                        position: "absolute",
                        top: "40px",
                        left: 0,
                        display: "flex",
                        bgcolor: "white",
                        borderRadius: "10px",
                        boxShadow: 4,
                        zIndex: 999,
                        overflow: "hidden",
                    }}
                >

                    <Box sx={{ width: "240px", p: 1 }}>
                        {categories.map((item) => (
                            <MenuItem
                                key={item.name}

                                onMouseEnter={() => handleMouse(item.name, item.sub)
                                }
                            >
                                <Link

                                    to={`/${item.name.toLowerCase()}`}
                                    style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                                >
                                    {item.name}

                                </Link>
                                <span style={{ opacity: 0.7 }}>›</span>
                            </MenuItem>
                        ))}
                    </Box>

                    {currentSubList.length > 0 && (
                        <Box
                            sx={{
                                width: "240px",
                                p: 1,
                                borderLeft: "1px solid #eee",
                                background: "white",
                            }}
                        >
                            {currentSubList.map((sub) => (
                                <MenuItem key={sub} sx={{ fontSize: "14px" }}>
                                    <Link
                                        to={`/${currentCategory.toLowerCase()}/${sub.toLowerCase().replace(/ /g, "-")}`}
                                        style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                                        {sub}
                                    </Link>

                                </MenuItem>
                            ))}
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}

export default Explore;