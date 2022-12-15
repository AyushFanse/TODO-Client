import axios from "axios";
//*-------------* Imported Server URL from authServices *-------------*//
import { apiUrl } from "./authServices";
const TakApi = apiUrl + "task/";

//~-----------------------* Get All Tasks *-----------------------~//

export function getAllTasks() {
    return axios.get(TakApi);
}

//~-----------------------* Get Tasks By Id *-----------------------~//

export function getTasks(userId) {
    return axios.get(TakApi + userId);
}

//~-----------------------* Add New Task *-----------------------~//

export function addTask(task) {
    return axios.post(TakApi, task);
}

//~-----------------------* Update Task *-----------------------~//

export function updateTask(id, task) {
    return axios.put(TakApi + id, task);
}

//~-----------------------* Delete Task *-----------------------~//

export function deleteTask(id) {
    return axios.delete(TakApi + id);
}
