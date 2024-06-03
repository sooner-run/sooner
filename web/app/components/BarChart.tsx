import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { time_to_human } from "~/utils/time_to_human";

Chart.register(CategoryScale);
Chart.defaults.plugins.legend.display = false;

const BarChart = ({ labels, data }: { labels: string[]; data: number[] }) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      //@ts-ignore
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, "rgba(102, 16, 242, 0.5)");
      gradient.addColorStop(1, "rgba(102, 16, 242, 0)");

      setGradient(gradient);
    }
  }, [chartRef]);
  return (
    <Bar
      className="!w-full"
      ref={chartRef}
      datasetIdKey="id"
      data={{
        labels,
        datasets: [
          {
            data,
            borderColor: "#6355ff",
            backgroundColor: gradient!,
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
            grid: {
              display: false,
            },
            ticks: {
              callback(tickValue, index, ticks) {
                return "";
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
                return `${time_to_human(context.parsed.y)}`;
              },
            },
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
      }}
    />
  );
};

export default BarChart;
