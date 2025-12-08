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
import { Link, useNavigate } from "react-router-dom";
import { categoryContext } from "../../App";
import api from "../../utils/api";
import Header from "../Header/Header";

function Teach() {
  const navigate = useNavigate()
  const { categories } = useContext(categoryContext);
  const [formData, setFormData] = useState({
    thumbnail: null,
    title: "",
    category: "",
    subCategory: "",
    price: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      setFormData((prev) => ({ ...prev, thumbnail: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "category") {
      setFormData((prev) => ({ ...prev, subCategory: formData.subCategory || '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("thumbnail", formData.thumbnail);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("category", formData.category.toLowerCase());
      data.append(
        "subCategory",
        formData.subCategory.toLowerCase().replace(/ /g, "-")
      );
      data.append("price", formData.price);

      const user = JSON.parse(localStorage.getItem("login-info"));
      data.append("userId", user?._id);

      // console.log("final FormData:", [...data]);

      const res = await api.postCard(data);

      // console.log("Course Created:", res.data);
      navigate('/')

    } catch (error) {
      console.error(error);
      alert("Error while creating course!");
    }
  };

  return (
    <>
      <Header categories={categories} />
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
          {formData.thumbnail && (
            <img src={URL.createObjectURL(formData.thumbnail)} alt="image" width={160} height={80} />
          )}

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
          <TextField
            name="description"
            label="Course Description"
            variant="outlined"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={formData.description}
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