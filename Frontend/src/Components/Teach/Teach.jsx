import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import { Link } from "react-router-dom";
import { categoryContext, loginContext } from "../../App";

function Teach() {
  const { categories } = useContext(categoryContext);
  const { isLogin } = useContext(loginContext);
  const [formData, setFormData] = useState({
    thumbnail: null,
    title: "",
    category: "",
    subCategory: "",
    price: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "category") {
      setFormData((prev) => ({ ...prev, subCategory: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("thumbnail", formData.thumbnail);
      if (isLogin) {
        const user = JSON.parse(localStorage.getItem('login-info'))
        data.append("userId", user?.id);
      }


      const entireData = {
        title,
        category: category.toLowerCase(),
        subCategory: subCategorytoLowerCase().replace(/ /g, "-"),
        price,
        data
      }

      const res = await api.postCard(entireData);

      console.log("Course Created:", res.data);
      alert("Course Successfully Created!");
    } catch (error) {
      console.error(error);
      alert("Error while creating course!");
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: 500,
          margin: "auto",
          mt: 4,
          p: 3,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Create a Course
        </Typography>

        <form onSubmit={handleSubmit}>
          <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Thumbnail Photo
            <input
              type="file"
              hidden
              accept="image/*"
              name="thumbnail"
              onChange={handleChange}
            />
          </Button>
          {formData.thumbnail && (
            <Typography variant="body2" mb={1}>
              Selected: {formData.thumbnail.name}
            </Typography>
          )}

          <TextField
            name="title"
            label="Course Title"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={formData.title}
            onChange={handleChange}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              label="Category"
              onChange={handleChange}
              required
            >
              {categories.map((c) => (
                <MenuItem key={c.name} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.category && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Sub Category</InputLabel>
              <Select
                name="subCategory"
                value={formData.subCategory}
                label="Sub Category"
                onChange={handleChange}
                required
              >
                {categories
                  .find((c) => c.name === formData.category)
                  ?.sub.map((sub) => (
                    <MenuItem key={sub} value={sub}>
                      {sub}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}

          <TextField
            name="price"
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 3 }}
            value={formData.price}
            onChange={handleChange}
          />

          <Stack direction="row" spacing={2}>

            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>

      <Button>
        <Link to="/">Home</Link>
      </Button>
    </>
  );
}

export default Teach;