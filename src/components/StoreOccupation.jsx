import React from "react";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { io } from "socket.io-client";

export function StoreOccupation() {
    const [sensor, setSensor] = useState({
        seat: [],
        occupation: {clients: 0}
    });
    const [switches, setSwitches] = useState([{name: "Stoel 1", value: true}]);

    useEffect(() => {
        const socket = io("http://localhost:8390");
        socket.on("pir-sensor",(data)=>{
            console.log(data)
            setSensor({...sensor, occupation: data})
        })
        socket.on("switch-sensor",(data)=>{  
            console.log(data)
            setSwitches(data)
        })
        return ()=> socket.disconnect(); 
    }, []);

    const max = 25;
    let pirCount = sensor.occupation.clients
    let count = max - pirCount;

    const doughData = {
        labels: [""],
        datasets: [
            {
                label: `${count}`,
                data: [pirCount, count],
                backgroundColor: ["#f89500", "#D3D3D3"],
                borderColor: ["#f89500", "#D3D3D3"],
                borderWidth: 0.1,
            },
        ],
    };

    const placement = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    

   

    return (
        <React.Fragment>
            <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
            >
                Winkel bezetting
            </Typography>
            <div className="flex md:flex-row w-full  flex-col items-center space-y-6 md:items-baseline">
                
                
                <div>
                <p className=" text-xl">Stoel bezetting:</p>
                    <div className="md:mr-auto flex flex-col space-y-4">
                        
                        {
                            switches.map((el, index) => {
                    
                                return(
                                <div key={index}>
                                    <label>Stoel {index + 1} </label>
                                    <div
                                        className={el.value == 1  ? "bg-orange-500 " : "bg-gray-500"}   
                                    >
                                        {el.value == 1 ? <p>Bezet</p> : <p>Niet bezet</p>}
                                    </div>
                                </div>)
                            })
                        }
                    </div>
                </div>
                <div className=" md:w-80 w-60 md:ml-auto flex flex-col items-center space-y-3">
                    <p className="text-xl">Winkel bezetting:</p>
                    <p className="text-orange-500">Bezetting</p>
                    <p className="text-gray-500">Totale bezetting</p>
                    <Doughnut data={doughData} options={placement} />
                </div>
            </div>
        </React.Fragment>
    );
}
