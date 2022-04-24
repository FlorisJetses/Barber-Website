import React from "react";
import { Header } from "../../components/Header";

function EditorBody () {
    return (
        <h1></h1>
    )
}

export function Editor () { 
    return (
        <Header title="Editor" body={EditorBody()} />
    )
} 