import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  Stack,
  Typography
} from "@mui/material";
import { useState } from "react";
import './Rating.css'

function RatingModal({ open, onClose, onSubmit }) {
  const [value, setValue] = useState(0);

  const handleSubmit = () => {
    if (!value) return;
    onSubmit(value);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Rate this course</DialogTitle>

      <DialogContent>
        <Stack spacing={2} alignItems="center">
          <Typography>Select your rating</Typography>

          <Rating
            name="course-rating"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            size="large"
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RatingModal;
