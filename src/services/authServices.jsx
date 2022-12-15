import axios from "axios";
export const apiUrl = "https://todo-server-af.onrender.com/";

const AuthApis = apiUrl + "auth";
const UserApis = apiUrl + "user";

//~-----------------------* Register *-----------------------~//

export function Register(data) {
    return axios.post(AuthApis + "/register", data);
}

//~------------------------* Login *------------------------~//

export function Login(data) {
    return axios.post(AuthApis + "/login", data);
}

//~----------------------* User Data *----------------------~//

export function getUser(id) {
    return axios.get(UserApis + "/" + id);
}

//~---------------------* Delete User *---------------------~//

export function Delete(id) {
    return axios.put(UserApis + "/" + id);
}
