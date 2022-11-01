import {
    IconButton,
    Grid,
    TextField,
    FormControl,
    CircularProgress,
    InputLabel,
    Input,
    InputAdornment,
    Box,
    Button,
} from "@mui/material";
import {
    Visibility,
    KeyboardBackspace,
    VisibilityOff,
    AccountCircle,
    AlternateEmail,
    PersonAddAltTwoTone,
} from "@mui/icons-material";
import React, { useState, useRef } from "react";
import Popup from "../../Components/AlertPopups/Popup";
import { useNavigate } from "react-router-dom";
import { Register } from "../../services/authServices";
import { TabTitle } from "../../Components/Common/CommonFunc";
import "./auth.css";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState("");
    const [showCPassword, setShowCPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");
    const history = useNavigate();
    const authForm = useRef();

    //~-------------------------------* TITLE *-------------------------------~//

    TabTitle(`Sign-up`);

    //!-------------------------------* Password Visibility Function *-------------------------------!//

    const handleClickShowPassword = (e) => {
        setShowPassword(e.currentTarget);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
        setShowPassword("");
    };

    const handleClickShowCPassword = (e) => {
        setShowCPassword(e.currentTarget);
    };

    const handleMouseDownCPassword = (e) => {
        e.preventDefault();
        setShowCPassword("");
    };

    //*-------------------------------* Create Account Function *-------------------------------*//

    const handleSubmit = async (e) => {
        e.preventDefault();

        let { first_name, last_name, email, password, c_password } =
            authForm.current;

        if (password.value !== c_password.value) {
            setWarning({
                status: "error",
                msg: "Password dose not match...",
            });
            setLoading(false);
            return;
        }

        if (
            !first_name.value &&
            !last_name.value &&
            !email.value &&
            !password.value
        ) {
            setWarning({
                status: "error",
                msg: "Please fill all the details..!!!",
            });
            setLoading(false);
            return;
        }

        try {
            setLoading(true);

            let response = await Register({
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                password: password.value,
            });

            if (response.status === 201) {
                setWarning({
                    status: response.data.status,
                    msg: response.data.msg,
                });
                e.target.reset();
                history("/login");
            }
        } catch (err) {
            setWarning({
                status: "error",
                msg: !err.response ? "Your Are offline" : err.response.data.msg,
            });
        }
        setLoading(false);
        return;
    };

    return (
        <>
            <IconButton
                onClick={() => {
                    history(-1);
                }}
                edge="start"
                aria-label="menu"
                id="backToLogin"
                sx={{ ml: 1, mt: 1, mb: -1, color: "#1b1b33" }}
            >
                <KeyboardBackspace className="AuthIcon" />
            </IconButton>
            <Box className="AuthLayout">
                <Grid className="AuthCardLayout">
                    <h1 className="AuthHeading">Sign Up</h1>
                    {warning === "" ? null : (
                        <Popup
                            security={warning.status}
                            message={warning.msg}
                            setWarning={setWarning}
                        />
                    )}
                    <br />
                    <form ref={authForm} onSubmit={(e) => handleSubmit(e)}>
                        <Box
                            sx={{
                                mt: -2,
                                "& .MuiTextField-root": {
                                    ml: 1.8,
                                    mr: 1.8,
                                    mb: 1,
                                    width: 293,
                                },
                            }}
                        >
                            <TextField
                                id="input-with-icon-textfield"
                                label="First Name"
                                name="first_name"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle className="AuthIcon" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Box>
                        <br />
                        <Box
                            sx={{
                                mt: -2,
                                "& .MuiTextField-root": {
                                    ml: 1.8,
                                    mr: 1.8,
                                    mb: 1,
                                    width: 293,
                                },
                            }}
                            className="title"
                        >
                            <TextField
                                id="input-with-icon-textfield"
                                label="Last Name"
                                name="last_name"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle className="AuthIcon" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Box>
                        <br />
                        <Box
                            sx={{
                                mt: -2,
                                "& .MuiTextField-root": {
                                    ml: 1.8,
                                    mr: 1.8,
                                    mb: 1,
                                    width: 293,
                                },
                            }}
                        >
                            <TextField
                                id="input-with-icon-textfield"
                                label="Email"
                                name="email"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start">
                                            <AlternateEmail className="AuthIcon" />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Box>
                        <br />
                        <Grid>
                            <FormControl
                                sx={{ ml: 1.8, mr: 1.8, mb: 1, mt: -2 }}
                                variant="standard"
                            >
                                <InputLabel
                                    htmlFor="standard-adornment-password"
                                    id="title"
                                >
                                    Password
                                </InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="title"
                                    sx={{ width: 293 }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff
                                                        sx={{
                                                            color: "var(--clo)",
                                                        }}
                                                    />
                                                ) : (
                                                    <Visibility className="AuthIcon" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <br />
                        <Grid>
                            <FormControl
                                sx={{ ml: 1.8, mr: 1.8, mb: 1, mt: -2 }}
                                variant="standard"
                            >
                                <InputLabel
                                    htmlFor="standard-adornment-password"
                                    id="title"
                                >
                                    Confirm-Password
                                </InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showCPassword ? "text" : "password"}
                                    name="c_password"
                                    className="title"
                                    sx={{ width: 293 }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowCPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownCPassword
                                                }
                                            >
                                                {showCPassword ? (
                                                    <VisibilityOff
                                                        sx={{
                                                            color: "var(--clo)",
                                                        }}
                                                    />
                                                ) : (
                                                    <Visibility className="AuthIcon" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <Grid sx={{ textAlign: "center" }}>
                            <Button
                                id="AuthButton"
                                variant="contained"
                                type="submit"
                                title="Submit"
                            >
                                Create
                                {loading ? (
                                    <CircularProgress
                                        size={22}
                                        id="CircularProgress"
                                    />
                                ) : (
                                    <PersonAddAltTwoTone
                                        size={22}
                                        id="CircularProgress"
                                    />
                                )}
                            </Button>
                        </Grid>
                        <Grid
                            sx={{
                                textAlign: "center",
                                m: 2,
                                cursor: "default",
                            }}
                        >
                            <p id="switchLogin">
                                Already have account ?{" "}
                                <span
                                    id="switch"
                                    onClick={() => {
                                        history("/login");
                                    }}
                                    variant="body2"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    Sign-in
                                </span>
                            </p>
                        </Grid>
                    </form>
                </Grid>
            </Box>
        </>
    );
};

export default RegisterPage;
