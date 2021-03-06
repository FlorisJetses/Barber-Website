import React from "react";
import { Header } from "../../components/Header";
import Chart from "../../components/SalesChart";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { UpcomingReservations } from "../../components/UpcomingReservations";

function DashboardContent() {
    return (
        <div>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {/* Chart */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 240,
                            }}>
                            <Chart />
                        </Paper>
                    </Grid>
                    {/* Recent Deposits */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 240,
                            }}>
                            <UpcomingReservations />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export function Dashboard() {
    return <Header title="Dashboard" body={DashboardContent()} />;
}
