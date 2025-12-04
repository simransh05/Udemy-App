import React, { useState } from "react";
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

function Teach() {
  const [thumbnail, setThumbnail] = useState(null);
  const [courseType, setCourseType] = useState("");
  const [subType, setSubType] = useState("");

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      thumbnail,
      title: e.target.title.value,
      courseType,
      subType,
      price: e.target.price.value,
    };

    console.log("FORM SUBMITTED: ", formData);
  };

  return (
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
        {/* preview of the photo will be shown */}
        <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
          Upload Thumbnail
          <input type="file" hidden onChange={handleThumbnailChange} />
        </Button>
        {thumbnail && (
          <Typography variant="body2" mb={1}>
            Selected: {thumbnail.name}
          </Typography>
        )}

        <TextField
          name="title"
          label="Course Title"
          variant="outlined"
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Course Type</InputLabel>
          <Select
            value={courseType}
            label="Course Type"
            onChange={(e) => setCourseType(e.target.value)}
            required
          >
            <MenuItem value="development">Development</MenuItem>
            <MenuItem value="business">Business</MenuItem>
          </Select>
        </FormControl>

        {courseType === "development" && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Sub Type (Language)</InputLabel>
            <Select
              value={subType}
              label="Sub Type"
              onChange={(e) => setSubType(e.target.value)}
              required
            >
              <MenuItem value="javascript">JavaScript</MenuItem>
              <MenuItem value="python">Python</MenuItem>
              <MenuItem value="java">Java</MenuItem>
              <MenuItem value="cpp">C++</MenuItem>
              <MenuItem value="react">React</MenuItem>
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
        />

        <Stack direction="row" spacing={2}>
          <Button
            type="button"
            variant="outlined"
            fullWidth
            onClick={() => window.history.back()}
          >
            Back
          </Button>

          <Button type="submit" variant="contained" fullWidth>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
export default Teach;