import React, { useState } from "react";
import { Box, Button, MenuItem } from "@mui/material";

function Explore({ categories }) {
    const [open, setOpen] = useState(false);
    const [currentSubList, setCurrentSubList] = useState([]);

    const handleOpenMenu = () => {
        setOpen(true);
        setCurrentSubList([]); 
    };

    const handleCloseMenu = () => {
        setOpen(false);
        setCurrentSubList([]);
    };

    return (
        <Box
            onMouseEnter={handleOpenMenu}
            onMouseLeave={handleCloseMenu}
            sx={{ position: "relative", display: "inline-block" }}
        >
            <Button sx={{ textTransform: "none", fontSize: "16px" }}>
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
                                onMouseEnter={() => setCurrentSubList(item.sub)}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "15px",
                                    py: "10px",
                                }}
                            >
                                {item.name}
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
                                    {sub}
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