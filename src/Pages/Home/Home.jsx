import React, { useState, useEffect, useRef } from "react";
import {
    addTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../../services/taskServices";
import { Box, Paper, TextField, Checkbox, Button } from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import Navbar from "../../Components/Navbar/Navbar";
import { Verify } from "../../Components/VerifyLogin/Verify";
import Popup from "../../Components/AlertPopups/Popup";
import { TabTitle } from "../../Components/Common/CommonFunc";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import "./Home.css";

const App = () => {
    const [tasks, setTask] = useState([]);
    const FetchRef = useRef();
    const newTaskRef = useRef();
    const [warning, setWarning] = useState("");
    const localToken = localStorage.getItem("token");
    const { user } = jwt.decode(localToken);
    const history = useNavigate();

    //~-------------------------------* TITLE *-------------------------------~//

    TabTitle(`Home`);

    //*-------------------------------* Use-Effect Function *-------------------------------*//

    useEffect(() => {
        history(Verify());
    }, [history]);

    useEffect(() => {
        FetchRef.current();
    }, []);

    //*-------------------------------* Fetch Function *-------------------------------*//

    let Fetch = async () => {
        try {
            const { data } = await getTasks(user._id);
            setTask(data);
        } catch (err) {
            setWarning({
                status: "error",
                msg: !err.response ? "Your Are offline" : err.response.data.msg,
            });
        }
    };

    FetchRef.current = Fetch;

    //*-------------------------------* ADD Task Function *-------------------------------*//

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { task } = newTaskRef.current;

        if (!task.value) {
            setWarning({
                status: "error",
                msg: "Oops..! you forgot to type",
            });
            return;
        }

        const originalTasks = tasks;
        try {
            const tasks = [...originalTasks];
            const { data } = await addTask({
                task: task.value,
                userId: user._id,
            });
            tasks.push(data);
            setTask(tasks);
            e.target.reset();
        } catch (err) {
            setWarning({
                status: "error",
                msg: !err.response ? "Your Are offline" : err.response.data.msg,
            });
        }
    };

    //*-------------------------------* Check Task Function *-------------------------------*//

    const handleUpdate = async (id) => {
        const originalTasks = tasks;
        try {
            const tasks = [...originalTasks];
            const index = tasks.findIndex((task) => task._id === id);
            tasks[index] = { ...tasks[index] };
            tasks[index].completed = !tasks[index].completed;
            setTask(tasks);
            await updateTask(id, {
                completed: tasks[index].completed,
            });
        } catch (err) {
            setTask(originalTasks);
            setWarning({
                status: "error",
                msg: !err.response ? "Your Are offline" : err.response.data.msg,
            });
        }
    };

    //*-------------------------------* Delete Task Function *-------------------------------*//

    const handleDelete = async (id) => {
        const originalTasks = tasks;
        try {
            const tasks = originalTasks.filter((task) => task._id !== id);
            setTask(tasks);
            await deleteTask(id);
        } catch (err) {
            setTask(originalTasks);
            setWarning({
                status: "error",
                msg: !err.response ? "Your Are offline" : err.response.data.msg,
            });
        }
    };

    return (
        <>
            <Navbar page="TODO" user={user.first_name} />
            {warning === "" ? null : (
                <Popup
                    security={warning.status}
                    message={warning.msg}
                    setWarning={setWarning}
                />
            )}
            <div className="App flex">
                <Paper elevation={3} className="container">
                    <form
                        onSubmit={handleSubmit}
                        ref={newTaskRef}
                        className="flex"
                        style={{ margin: "15px 0" }}
                    >
                        <TextField
                            id="input-with-icon-textfield"
                            label="Add New Task"
                            type="text"
                            style={{ width: "80%", paddingLeft: "0px" }}
                            name="task"
                            variant="filled"
                            InputProps={{
                                endAdornment: (
                                    <Button type="submit" title="Add task">
                                        <Add
                                            sx={{
                                                borderRadius: "10px",
                                                fontSize: "2rem",
                                                p: 1,
                                                background: "var(--cl)",
                                                color: "white",
                                            }}
                                        />
                                    </Button>
                                ),
                            }}
                        />
                    </form>
                    <div>
                        {tasks.map((task) => (
                            <Paper
                                key={task._id}
                                className="flex task_container"
                            >
                                <Checkbox
                                    checked={task.completed}
                                    onClick={() => handleUpdate(task._id)}
                                    sx={{ m: 1 }}
                                />
                                <div
                                    onClick={() => handleUpdate(task._id)}
                                    className={
                                        task.completed
                                            ? "task line_through"
                                            : "task"
                                    }
                                    id="title"
                                >
                                    {task.task}
                                </div>
                                <Box sx={{ m: 2 }} title="Delete">
                                    <Delete
                                        color="error"
                                        onClick={() => handleDelete(task._id)}
                                    />
                                </Box>
                            </Paper>
                        ))}
                    </div>
                </Paper>
            </div>
        </>
    );
};

export default App;
