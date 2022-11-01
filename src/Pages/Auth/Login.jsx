import {
    IconButton,
    Grid,
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
    VisibilityOff,
    AccountCircle,
    LockTwoTone,
} from "@mui/icons-material";
import Popup from "../../Components/AlertPopups/Popup";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../services/authServices";
import { Verify } from "../../Components/VerifyLogin/Verify";
import { TabTitle } from "../../Components/Common/CommonFunc";
import "./auth.css";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [warning, setWarning] = useState("");
    const history = useNavigate();
    const contactForm = useRef();

    //~-------------------------------* TITLE *-------------------------------~//

    TabTitle(`Sign-in`);

    //*-------------------------------* Use-Effect Function *-------------------------------*//

    useEffect(() => {
        history(Verify());
    }, [history]);

    //!-------------------------------* Password Visibility Function *-------------------------------!//

    const handleClickShowPassword = (e) => {
        setShowPassword(e.currentTarget);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        setShowPassword("");
    };

    //*-------------------------------* Login Account Function *-------------------------------*//

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = contactForm.current;

        if (!email.value || !password.value) {
            setWarning({
                status: "error",
                msg: "Please fill all the details..!!!",
            });
            return;
        }

        try {
            setLoading(true);
            let { data, status } = await Login({
                password: password.value,
                email: email.value,
            });

            setWarning(data);

            if (status === 200) {
                localStorage.setItem("token", data.userToken);
                history("/");
            }
        } catch (err) {
            //!--------------* Error *--------------!//

            setWarning({
                status: "error",
                msg: !err.response ? "Your Are offline" : err.response.data.msg,
            });
        }

        password.value = "";
        setLoading(false);
        return;
    };

    return (
        <>
            <Box className="AuthLayout">
                <Grid className="AuthCardLayout">
                    <h1 className="AuthHeading">Sign In</h1>
                    {warning === "" ? null : (
                        <Popup
                            security={warning.status}
                            message={warning.msg}
                            setWarning={setWarning}
                        />
                    )}
                    <br />
                    <form ref={contactForm} onSubmit={(e) => handleSubmit(e)}>
                        <Grid>
                            <FormControl sx={{ pl: 2, pr: 2 }}>
                                <InputLabel
                                    sx={{ ml: 0.2 }}
                                    id="title"
                                    htmlFor="input-with-icon-textfield"
                                >
                                    Email
                                </InputLabel>
                                <Input
                                    id="input-with-icon-textfield"
                                    name="email"
                                    className="title"
                                    sx={{ width: 293 }}
                                    label="Email"
                                    aria-describedby="component-warning-text"
                                    endAdornment={
                                        <InputAdornment position="start">
                                            <AccountCircle className="AuthIcon" />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Grid>
                        <br />
                        <Grid>
                            <FormControl sx={{ pl: 2, pr: 2 }} id="title">
                                <InputLabel
                                    sx={{ ml: 0.2 }}
                                    id="title"
                                    htmlFor="standard-adornment-password"
                                >
                                    Password
                                </InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    sx={{ width: 293 }}
                                    className="title"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
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
                        <Grid sx={{ textAlign: "center" }}>
                            <Button
                                id="AuthButton"
                                variant="contained"
                                type="submit"
                                title="Login"
                            >
                                Login
                                {loading ? (
                                    <CircularProgress
                                        size={22}
                                        id="CircularProgress"
                                    />
                                ) : (
                                    <LockTwoTone
                                        size={22}
                                        id="CircularProgress"
                                    />
                                )}
                            </Button>
                        </Grid>
                    </form>
                    <Grid sx={{ textAlign: "center", m: 1, cursor: "default" }}>
                        <p id="switchLogin">
                            Don&apos;t have account?{" "}
                            <span
                                id="switch"
                                onClick={() => {
                                    history("/register");
                                }}
                                style={{ cursor: "pointer" }}
                                variant="body2"
                            >
                                Sign-up
                            </span>
                        </p>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};
export default LoginPage;
