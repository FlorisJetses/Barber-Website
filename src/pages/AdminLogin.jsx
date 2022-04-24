import React, { useState } from "react";
import { authenticateUser } from "../JanDeKapper.js";
import { Button } from "@mui/material";

export function AdminLogin({ setUser }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function loginUser(e) {
        e.preventDefault();
        authenticateUser(username, password).then((user) => {
            window.location.reload(false);
            setUser(user);
        });
    }

    return (
        <div className="flex h-screen">
            <form className="bg-gray-100 m-auto p-4 w-80 rounded-lg shadow-lg border-orange-400 border-4">
                <label htmlFor="login-username">Gebruikersnaam</label>
                <input
                    className="mt-1 mb-1 border-2 w-full focus-within:text-black"
                    type="text"
                    placeholder="bv. kapper_jan"
                    id="login-username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="login-password">Wachtwoord</label>
                <input
                    className="mt-1 mb-1 border-2 w-full"
                    type="password"
                    placeholder="bv. veilig_wachtwoord123"
                    id="login-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    className="bg-yellow-500 text-white mt-1 mb-1 p-2 w-full shadow rounded-lg block hover:bg-yellow-600 cursor-pointer"
                    type="submit"
                    variant="contained"
                    onClick={(e) => loginUser(e)}
                >Inloggen</Button>
            </form>
        </div>
    );
}
