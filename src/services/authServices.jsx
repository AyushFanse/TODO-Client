import axios from "axios";
const AuthApis = "http://localhost:4000/auth";
const UserApis = "http://localhost:4000/user";

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
