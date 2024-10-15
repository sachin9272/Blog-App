import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }; 
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:8080/api/v1/user/login',{email:inputs.email, password:inputs.password})
      if(data.success){
        localStorage.setItem('userId', data?.user._id);
        dispatch(authActions.login())
        alert("User login Successfully");
        navigate('/');
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          borderRadius={5}
          // bgcolor={"#1a58c612"}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            Login
          </Typography>
          <TextField
            placeholder="Email"
            name="email"
            margin="normal"
            type="email"
            required
            value={inputs.email}
            onChange={handleChange}
          />
          <TextField
            placeholder="Password"
            name="password"
            margin="normal"
            type="password"
            required
            value={inputs.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a User? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
