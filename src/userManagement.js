import { useState } from 'react';
import { isTokenExpired } from './JanDeKapper';
import { AdminLogin } from './pages/AdminLogin';

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function isAuthenticated(Component) {
    const { setUser, user } = ManageUser();

    if (isTokenExpired(user?.token))
        return <AdminLogin setUser={setUser} />
    else
        return Component;
}

export default function ManageUser() {
    const getUser = () => {
        const userStr = localStorage.getItem("user");

        if (!isJson(userStr))
            return null

        const user = JSON.parse(userStr);
        return user
    };

    // Value 'user' and function 'setUser' are now created. 'useState()' will also re-render this will load the dashboard.
    // The default value for 'user' is 'getUser()'
    const [user, setUser] = useState(getUser());

    const saveUser = user => {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(JSON.stringify(user));
    };

    return {
        setUser: saveUser,
        user
    }
}