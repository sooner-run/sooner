import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);
Chart.defaults.plugins.legend.display = false;

const LineChart = ({ labels, data }: { labels: string[]; data: number[] }) => {
  return (
    <>
      <Line
        datasetIdKey="id"
        data={{
          labels,
          datasets: [
            {
              data,
              borderColor: "#6355ff",
              //@ts-ignore
              lineTension: 0.5,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              ticks: {
                callback(tickValue, index, ticks) {
                  return `${tickValue}h`;
                },
              },
            },
          },
          plugins: {
            tooltip: {
              displayColors: false,
              padding: {
                x: 25,
                y: 20,
              },
              backgroundColor: "#222222",
              footerMarginTop: 10,
              bodySpacing: 10,
              // footerFontStyle: "bold",
              callbacks: {
                //@ts-ignore
                label: (context) => {
                  return `${context.parsed.y} hours`;
                },
              },
            },
          },
        }}
      />
    </>
  );
};

export default LineChart;
