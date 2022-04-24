import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';


// Generate Sales Data
const createData = (time, amount) => {
    return { time, amount };
  }
  
  const data = [
    createData('Do', 100),
    createData('Vr', 20),
    createData('Za', 0),
    createData('Zo', 0),
    createData('Ma', 50),
    createData('Di', 30),
    createData('Wo', 110),
    createData('Do', 50),
    createData('Vr', 40),
  ];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>Afgelopen Week</Typography>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Omzet (€)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}