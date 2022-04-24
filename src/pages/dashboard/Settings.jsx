import React from "react";
import { Header } from "../../components/Header";

function SettingsBody () {
    return(
        <h1></h1>
    )
}

export function Settings () {
    return (
        <Header title="Instellingen" body={SettingsBody()} />
    )
}