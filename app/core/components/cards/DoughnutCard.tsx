import { Card, CardContent, Box, useTheme, CardHeader, Divider, Paper } from "@mui/material"
import { Title } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { ArcElement, Chart, Legend, Tooltip } from "chart.js"
import { Entry } from "@prisma/client"
import groupBy from "app/core/utils/groupBy"

Chart.register(ArcElement, Tooltip, Legend)

type DoughnutCardProps = {
  entries: Entry[]
}

const DoughnutCard = ({ entries }: DoughnutCardProps) => {
  const theme = useTheme()
  const entryGroupedByType = groupBy(entries, "type")
  const data = {
    //@ts-ignore
    labels: [...Object.keys(entryGroupedByType)].map(
      ([first, ...rest]) => first + rest.join("").toLowerCase()
    ),
    datasets: [
      {
        label: "# of entries",
        data: Object.values(entryGroupedByType).map((arr: any[]) => arr.length),
        backgroundColor: Object.keys(entryGroupedByType).map(
          (key: string) => theme["palette"][key.toLocaleLowerCase()]["main"]
        ),
      },
    ],
  }
  return (
    <Paper>
      <CardContent>
        <Box
          sx={{
            height: "300px",
            position: "relative",
          }}
        >
          <Doughnut
            data={data}
            options={{
              layout: { padding: 0 },
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </Box>
      </CardContent>
    </Paper>
  )
}

export default DoughnutCard
