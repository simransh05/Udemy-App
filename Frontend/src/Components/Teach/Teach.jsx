import React, { useState, useContext, useEffect } from "react";
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
import { toast } from 'react-toastify'
import './Teach.css'
import ROUTES from "../../Constant/Routes";

function Teach() {
  const navigate = useNavigate()
  const { categories } = useContext(categoryContext);
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState('')
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subCategory: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('login-info'));
    if (!user) {
      toast.error("Login First!")
      navigate(ROUTES.LOGIN);
      return;
    } if (user.role === 'learner') {
      toast.error("Access Denied! Only instructors can create courses.");
      navigate(ROUTES.HOME);
      return;
    }
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "thumbnail") {
      setThumbnail(files[0]);
    } else if (name === 'video') {
      setVideo(files[0]);
      setPreview(URL.createObjectURL(files[0]))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "category") {
      setFormData((prev) => ({ ...prev, subCategory: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("thumbnail", thumbnail);
      data.append("video", video);
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

      console.log("final FormData:", [...data]);

      const res = await api.postCard(data);

      console.log("Course Created:", res.data);
      navigate(ROUTES.HOME)

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
          {thumbnail && (
            <img src={URL.createObjectURL(thumbnail)} alt="image" width='100%' height={180} />
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

          {preview && (
            <video src={preview} width='100%' height={180} controls />
          )}
          <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
            Upload Demo Video
            <input
              type="file"
              hidden
              accept="video/*"
              name="video"
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
      <Link to={ROUTES.HOME} className="home-btn">Home</Link>
    </>
  );
}

export default Teach;