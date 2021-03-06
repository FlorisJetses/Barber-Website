import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar.jsx";
import { Footer } from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Background from "../img/Side.jpg";
import Side2 from "../img/Side2.jpg";
import Shop from "../img/Shop.jpg";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import scissor from "../img/scissor.svg";
import scissors from "../img/scissors.svg";
import { treatments } from "../treatments.js";
import { employees } from "../employees.js";


export function HomePage() {
    return (
        <div
            style={{ backgroundImage: `url(${scissors})` }}
            className="bg-contain bg-repeat"
        >
            <NavBar />

            <div className=" flex md:flex-row flex-col md:h-screen justify-center items-center md:-mt-16">
                <div className="flex flex-col items-center md:items-baseline mb-8 md:ml-10 lg:ml-16 xl:ml-224">
                    <h1 className="text-5xl m-3 mb-8 font-semibold text-orange-500 bg-white">
                        Jan de Kapper
                    </h1>
                    <p className=" text-lg w-7/12 mb-5 bg-white">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Iste voluptatem eaque porro laboriosam sequi
                        saepe, omnis veritatis? Recusandae, minima fuga
                        voluptate autem cum at tempore rem qui magni veniam
                        dolore pariatur ullam quisquam?
                    </p>

                    <Link to="/reservering">
                        <Button variant="contained">Maak een afspraak</Button>
                    </Link>
                </div>
                <div className="flex flex-row-reverse mr-2">
                    <img
                        src={Background}
                        alt="Knipbeurt"
                        className=" xl:w-auto w-90  rounded-md xl:relative -top-20 md:h-128 hidden md:block mr-2 max-w-max w-auto"
                    />
                    <img
                        src={Side2}
                        alt="Knipbeurt"
                        className=" w-auto ml-auto rounded-md xl:self-end xl:relative xl:-right-20 xl:top-20 xl:block md:hidden h-[250px]"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center mb-20">
                <div className="flex flex-col items-center mb-20">
                    <div className="m-5 flex flex-col items-center">
                        <h1 className="text-3xl m-3 " id="over_ons">Over ons</h1>

                        <div className="flex flex-row items-center">
                            <div className="line mr-2"></div>
                            <img
                                src={scissor}
                                alt="Schaar"
                                className="scissor "
                            />
                            <div className="line ml-2"></div>
                        </div>
                        <p className=" text-lg md:w-6/12 m-8 bg-white">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Iste voluptatem eaque porro laboriosam sequi
                            saepe, omnis veritatis? Recusandae, minima fuga
                            voluptate autem cum at tempore rem qui magni veniam
                            dolore pariatur ullam quisquam? Recusandae fugiat ex
                            corrupti deleniti alias. Ipsam voluptatem dolores
                            officiis eius quaerat amet eos ut, rerum molestiae?
                        </p>
                    </div>
                    <img
                        src={Shop}
                        alt="Kapperszaak"
                        className="rounded-md w-10/12 md:w-auto"
                    />
                </div>

                <div className="mb-10 flex flex-col items-center">
                    <h1 className="text-3xl m-3" id="prijzen">Prijzen</h1>
                    <div className="flex flex-row items-center ">
                        <div className="line mr-2"></div>
                        <img
                            src={scissor}
                            alt="Schaar"
                            className="scissor"
                        />
                        <div className="line ml-2"></div>
                    </div>
                    <div className="flex md:flex-row flex-col md:space-x-5 space-y-8 md:space-y-0 bg-white">
                        <div>
                            <p className="text-xl my-2">Knipbehandelingen:</p>
                            <ul >
                                {treatments.cuttingTreatments.map((treatment) => {
                                    return (
                                        <li className="text-lg" key={treatment.title}> {treatment.title} ???{treatment.price + ",-"} </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div>
                            <p className="text-xl my-2">Styling:</p>
                            <ul >
                                {treatments.stylingTreatments.map((treatment) => {
                                    return (
                                        <li className="text-lg" key={treatment.title}>{treatment.title}: ???{ treatment.price + ",-"}  </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <h1 className="text-3xl my-3 " id="medewerkers">Medewerkers</h1>
                <div className="flex flex-row items-center mb-8">
                    <div className="line mr-2"></div>
                    <img
                        src={scissor}
                        alt=""
                        className="scissor"
                    />
                    <div className="line ml-2"></div>
                </div>
                <div className="flex flex-col md:flex-row flex-wrap gap-4 justify-center">
                 {employees.map((employee) => {
                     
                     return(
                            <Card sx={{ maxWidth: 300}} key={employee.firstName}>
                                <CardMedia>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={employee.img}
                                        alt="Kapper"
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                        >
                                            {employee.firstName}
                                        </Typography>
                                    </CardContent>
                                </CardMedia>
                            </Card>
                        )})}
                </div>
            </div>

            <Footer />
        </div>
    );
}
