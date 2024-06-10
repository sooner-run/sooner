import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useRef, useState } from "react";
import { getColorForLanguage } from "@/utils/getColorForLanguage";

Chart.register(CategoryScale);
Chart.defaults.plugins.legend.display = false;

const DonutChart = ({ labels, data }: { labels: string[]; data: number[] }) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      //@ts-ignore
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
      gradient.addColorStop(0, "rgba(102, 16, 242, 0.1)");
      gradient.addColorStop(1, "rgba(102, 16, 242, 0)");

      setGradient(gradient);
    }
  }, [chartRef]);
  return (
    <Doughnut
      className="!w-full"
      ref={chartRef}
      datasetIdKey="id"
      data={{
        labels: labels,
        datasets: [
          {
            data,
            backgroundColor: labels?.map((c) => getColorForLanguage(c)) as [],
          },
        ],
      }}
      options={{
        plugins: {
          tooltip: {
            displayColors: false,
            footerMarginTop: 10,
            bodySpacing: 10,
            // footerFontStyle: "bold",
            callbacks: {
              //@ts-ignore
              label: (context) => {
                return context.parsed.valueOf();
              },
            },
          },
        },
      }}
    />
  );
};

export default DonutChart;
