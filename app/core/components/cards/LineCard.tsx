import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { Entry } from "@prisma/client"
import { useTheme } from "@emotion/react"
import { Paper, CardContent, Box } from "@mui/material"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
}

const labels = ["7", "6", "5", "4", "3", "2", "1"]

type LineCardProps = {
  entries: Entry[]
}

const LineCard = ({ entries }: LineCardProps) => {
  const theme = useTheme()

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Success",
        data: [3, 6, 4, 8, 8, 10, 7],
        borderColor: theme["palette"].success.main,
        backgroundColor: theme["palette"].success.main,
      },
      {
        label: "Info",
        data: [2, 2, 3, 0, 6, 3, 2],
        borderColor: theme["palette"].info.main,
        backgroundColor: theme["palette"].info.main,
      },
      {
        label: "Warning",
        data: [1, 1, 1, 0, 0, 3, 0],
        borderColor: theme["palette"].warning.main,
        backgroundColor: theme["palette"].warning.main,
      },
      {
        label: "Error",
        data: [0, 0, 0, 1, 0, 0, 0],
        borderColor: theme["palette"].error.main,
        backgroundColor: theme["palette"].error.main,
      },
    ],
  }

  return (
    <Paper>
      <CardContent>
        <Box
          alignItems={"center"}
          sx={{
            display: "flex",
            height: "300px",
            position: "relative",
          }}
        >
          <Line style={{ maxHeight: "300px", maxWidth: "600px" }} options={options} data={data} />
        </Box>
      </CardContent>
    </Paper>
  )
}

export default LineCard
