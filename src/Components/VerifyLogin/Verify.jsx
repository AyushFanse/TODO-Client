import jwt from "jsonwebtoken";

export const Verify = () => {
    
    const localToken = localStorage.getItem("token");
    const decodedToken = jwt.decode(localToken);

    if (!decodedToken || decodedToken.exp * 1000 <= Date.now()) {
        return "/login";
    }

    return '/';
};