import React from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TabTitle } from "../../Components/Common/CommonFunc";

const Error = () => {
    const history = useNavigate();
    //~-------------------------------* TITLE *-------------------------------~//

    TabTitle(`404`);

    return (
        <>
            <Grid
                container
                id="ErrorCont"
                sx={{
                    mt: "140px",
                    placeContent: "center",
                    background: "var(--clo)",
                    padding: "20px 25px",
                }}
            >
                <img
                    style={{ width: "400px" }}
                    src="https://i.ibb.co/SJdXspD/pngegg-2.png"
                    alt="Error"
                />
            </Grid>
            <Grid sx={{ textAlign: "center" }}>
                <Button
                    id="AuthButton"
                    variant="contained"
                    title="Go Back"
                    onClick={() => history(-1)}
                >
                    Go Back
                </Button>
            </Grid>
        </>
    );
};

export default Error;
