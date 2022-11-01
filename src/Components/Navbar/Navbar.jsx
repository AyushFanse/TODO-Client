import React, { useState } from "react";
import {
    IconButton,
    Box,
    Typography,
    AppBar,
    Toolbar,
    MenuItem,
    Menu,
    Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
    NavigateBefore,
    AccountCircle,
    LogoutRounded,
    HomeRounded,
} from "@mui/icons-material";
import "./navbar.css";

const Navbar = ({ page, user }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const history = useNavigate();

    //#-------------------------------* NAVIGATION MENU STATE *-------------------------------#//
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //#-------------------------------* NAVIGATION MENU FUNCTIONS *-------------------------------#//
    const Home = () => {
        history("/");
    };

    const Logout = () => {
        localStorage.removeItem("token");
        history("/login");
    };

    return (
        <>
            <AppBar id="appbar">
                <Toolbar>
                    {page === "TODO" ? null : (
                        <IconButton
                            onClick={() => {
                                history(-1);
                            }}
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <NavigateBefore
                                id="icons"
                                sx={{
                                    fontSize: "2rem",
                                    color: "white",
                                }}
                            />
                        </IconButton>
                    )}
                    <Box
                        sx={{
                            flexGrow: 1,
                        }}
                        id="navHeader"
                    >
                        {page}
                    </Box>
                    {page === "Error" ? null : (
                        <Box sx={{ margin: 1 }}>
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0, width: "45px" }}
                                >
                                    <AccountCircle
                                        sx={{
                                            fontSize: "2rem",
                                            color: "white",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem id="menuItemsOut">
                                    <Typography
                                        id="menuItemsUser"
                                        sx={{ fontFamily: "Montserrat" }}
                                    >
                                        Hi {user ? user : "User"}
                                        <img
                                            className="wave"
                                            src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif"
                                            alt=""
                                        />
                                    </Typography>
                                </MenuItem>
                                {page === "TODO" ? null : (
                                    <MenuItem id="menuItemsOut" onClick={Home}>
                                        <HomeRounded id="menuItemsIcon" />
                                        &nbsp; &nbsp;
                                        <Typography id="menuItems">
                                            Home
                                        </Typography>
                                    </MenuItem>
                                )}
                                <MenuItem id="menuItemsOut" onClick={Logout}>
                                    <LogoutRounded id="menuItemsIcon" />
                                    &nbsp; &nbsp;
                                    <Typography id="menuItems">
                                        Logout
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
