import axios from "axios";
const apiUrl = "http://localhost:4000/task";

//~-----------------------* Get All Tasks *-----------------------~//

export function getAllTasks() {
    return axios.get(apiUrl);
}

//~-----------------------* Get Tasks By Id *-----------------------~//

export function getTasks(userId) {
    return axios.get(apiUrl + "/" + userId);
}

//~-----------------------* Add New Task *-----------------------~//

export function addTask(task) {
    return axios.post(apiUrl, task);
}

//~-----------------------* Update Task *-----------------------~//

export function updateTask(id, task) {
    return axios.put(apiUrl + "/" + id, task);
}

//~-----------------------* Delete Task *-----------------------~//

export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id);
}
