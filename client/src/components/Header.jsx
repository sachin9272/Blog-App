import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem('userId');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const handleLogout = () =>{
    try {
      dispatch(authActions.logout())
      alert('Logout Successfully');
      navigate('/login');
      localStorage.clear();
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
          {isLogin && (
            <Box>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" component={Link} to="/blogs" />
                <Tab label="My Blogs" component={Link} to="/my-blogs" />
                <Tab label="Create Blog" component={Link} to="/create-blog"/>
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button sx={{ margin: 1, color: "white" }}>
                  <Link
                    to="/login"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Login
                  </Link>
                </Button>
                <Button sx={{ margin: 1, color: "white" }}>
                  <Link
                    to="/register"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    REGISTER
                  </Link>
                </Button>
              </>
            )}
            {
              isLogin && <Button sx={{ margin: 1, color: "white" }} onClick={handleLogout}>Logout</Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
