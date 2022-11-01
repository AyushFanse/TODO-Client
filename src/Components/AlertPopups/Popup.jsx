import { Stack, Alert, Snackbar, Slide } from "@mui/material";
import * as React from "react";

const Transition = (props) => {
    return <Slide {...props} direction="left" />;
};

const Message = ({ message, security, setWarning }) => {
    //^-------------------------------* STATE VALUES *-------------------------------^//
    const [open, setOpen] = React.useState(true);

    //^-------------------------------* CLOSE FUNCTION *-------------------------------^//

    if (!message === "") {
        return setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setWarning("");
    };

    return (
        <>
            {message ? (
                <Stack spacing={2} sx={{ width: "100%" }}>
                    <Snackbar
                        open={open}
                        TransitionComponent={Transition}
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        onClose={handleClose}
                        autoHideDuration={3000}
                    >
                        <Alert
                            elevation={6}
                            onClose={handleClose}
                            severity={security || "success"}
                            sx={{ width: "100%" }}
                        >
                            {message}
                        </Alert>
                    </Snackbar>
                </Stack>
            ) : null}
        </>
    );
};

export default Message;
