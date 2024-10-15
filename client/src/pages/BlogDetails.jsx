import React, { useState, useEffect } from "react";
import { Box, InputLabel, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  //get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/get-blog/${id}`
      );
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
            title:data?.blog.title,
            description:data?.blog.description,
            image:data?.blog.image,
        })
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);
  console.log(blog);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        alert("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width={"60%"}
        border={3}
        borderRadius={10}
        padding={3}
        margin="auto"
        boxShadow={"10px 10px 20px #ccc"}
        display="flex"
        flexDirection={"column"}
        marginTop="30px"
      >
        <Typography
          variant="h2"
          textAlign={"center"}
          fontWeight="bold"
          padding={3}
          color="gray"
        >
          Update Post
        </Typography>
        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
          Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />

        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
          Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />

        <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
          Image URL
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <Button type="submit" color="warning" variant="contained" width="50%">
          UPDATE
        </Button>
      </Box>
    </form>
  );
};

export default BlogDetails;
