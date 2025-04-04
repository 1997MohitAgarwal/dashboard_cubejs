import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { HelpCircle } from "lucide-react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartCard = ({ title, description, data, type }) => {
  console.log(`ChartCard data for ${title}:`, data, type);

  const parseValue = (value) =>
    typeof value === "string" ? parseFloat(value) || 0 : value || 0;

  const prepareLineChartData = (data, title) => {
    if (!data || data.length < 2) return { labels: [], datasets: [] };

    const lastMonthData = (data[0]?.data || []).slice(0, 10);
    const prevMonthData = (data[1]?.data || []).slice(0, 10);

    const extractSales = (dataset) =>
      dataset.map((item) =>
        parseValue(
          item[
            title === "Sales (MRP)"
              ? "blinkit_insights_sku.sales_mrp_sum"
              : "blinkit_insights_sku.qty_sold"
          ]
        )
      );

    const lastMonthSales = extractSales(lastMonthData);
    const prevMonthSales = extractSales(prevMonthData);

    const labels = Array.from({ length: 10 }, (_, index) =>
      (index + 1).toString()
    );

    return {
      labels,
      datasets: [
        {
          label: "This Month",
          data: lastMonthSales,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.15)",
          fill: "origin",
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: "#4CAF50",
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          borderWidth: 2,
          order: 1,
        },
        {
          label: "Last Month",
          data: prevMonthSales,
          borderColor: "#FF9800",
          backgroundColor: "transparent",
          borderDash: [3, 3],
          tension: 0.3,
          pointRadius: 3,
          pointBackgroundColor: "#FF9800",
          pointBorderColor: "#FFFFFF",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          borderWidth: 2,
          fill: false,
          order: 0,
        },
      ],
    };
  };

  const prepareSemiPieChartData = (data) => {
    if (!data || data.length < 1) return { labels: [], datasets: [] };

    const pieData = data[0]?.data || [];
    const totalSales = pieData.reduce(
      (sum, item) =>
        sum + parseValue(item["blinkit_insights_city.sales_mrp_sum"] || 0),
      0
    );

    return {
      labels: pieData.map(
        (item) => item["blinkit_insights_city.name"] || "Unknown"
      ),
      datasets: [
        {
          data: pieData.map((item) =>
            parseValue(item["blinkit_insights_city.sales_mrp_sum"])
          ),
          backgroundColor: ["#3F51B5", "#F44336", "#FF9800", "#9E9E9E"],
          borderWidth: 1,
        },
      ],
      total: totalSales,
    };
  };

  const chartData =
    type === "linechart"
      ? prepareLineChartData(data, title)
      : prepareSemiPieChartData(data);

  const lastMonthTotal =
    data[0]?.data
      ?.slice(0, 10)
      .reduce(
        (sum, item) =>
          sum +
          parseValue(
            item[
              title === "Sales (MRP)"
                ? "blinkit_insights_sku.sales_mrp_sum"
                : "blinkit_insights_sku.qty_sold"
            ] || 0
          ),
        0
      ) || 0;
  const prevMonthTotal =
    data[1]?.data
      ?.slice(0, 10)
      .reduce(
        (sum, item) =>
          sum +
          parseValue(
            item[
              title === "Sales (MRP)"
                ? "blinkit_insights_sku.sales_mrp_sum"
                : "blinkit_insights_sku.qty_sold"
            ] || 0
          ),
        0
      ) || 0;
  const change =
    prevMonthTotal !== 0
      ? (((lastMonthTotal - prevMonthTotal) / prevMonthTotal) * 100).toFixed(
          1
        ) + "%"
      : "N/A";
  const changeIndicator =
    change !== "N/A" && !change.startsWith("-") ? "↑" : "↓";
  const changeColor =
    change !== "N/A" && change.startsWith("-")
      ? "text-red-600"
      : "text-green-600";

  const formattedLastMonthTotal =
    lastMonthTotal >= 100000
      ? (lastMonthTotal / 100000).toFixed(2)
      : (lastMonthTotal / 1000).toFixed(2);

  const formattedPrevMonthTotal =
    prevMonthTotal >= 100000
      ? (prevMonthTotal / 100000).toFixed(2)
      : (prevMonthTotal / 1000).toFixed(2);

  if (!chartData.labels.length || !chartData.datasets[0]?.data.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 h-full shadow-sm">
        <h3 className="text-lg font-semibold mb-2 pb-2 border-b">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">No data available</p>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>
    );
  }

  const allDataPoints = chartData.datasets.flatMap((d) => d.data);
  const dataMin = Math.min(...allDataPoints) * 0.95;
  const dataMax = Math.max(...allDataPoints) * 1.05;

  // Format total value with lakh symbol (L)
  const formattedTotal =
    chartData.total >= 100000
      ? `₹${(chartData.total / 100000).toFixed(1)}L`
      : `₹${(chartData.total / 1000).toFixed(1)}K`;

  // Custom plugin to display total inside the Doughnut chart
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart) {
      if (chart.config.type !== "doughnut") return;

      const { ctx, chartArea } = chart;
      const { width, height } = chartArea;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const centerX = width / 2 + chartArea.left;
      const centerY = height / 2 + chartArea.top;

      // Draw "Total" text
      ctx.font = "16px Arial";
      ctx.fillStyle = "#666666";
      ctx.fillText("Total", centerX, centerY - 0);

      // Draw the amount
      ctx.font = "bold 20px Arial";
      ctx.fillStyle = "#000000";
      ctx.fillText(formattedTotal, centerX, centerY + 25);

      ctx.restore();
    },
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 h-full shadow-sm">
      <div className="flex justify-between border-b mb-2">
        <h3 className="text-lg font-medium text-gray-800 pb-2">{title}</h3>
        <HelpCircle />
      </div>
      {type === "linechart" && (
        <div className="flex justify-between my-2">
          <div>
            <p className="text-2xl font-bold">{formattedLastMonthTotal}</p>
          </div>
          <div className="text-right">
            <p className={`text-sm font-semibold ${changeColor}`}>
              {change !== "N/A" ? `${changeIndicator} ${change}` : "N/A"}
            </p>
            <p className="text-xs text-gray-600">
              vs {formattedPrevMonthTotal} last month
            </p>
          </div>
        </div>
      )}
      <div className="relative h-[200px]">
        {type === "linechart" ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  left: 1,
                  right: 10,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  ticks: {
                    color: "#888888",
                    font: { size: 10 },
                  },
                  border: {
                    display: false,
                  },
                },
                y: {
                  min: dataMin,
                  max: dataMax,
                  ticks: {
                    color: "#888888",
                    font: { size: 10 },
                    stepSize: (dataMax - dataMin) / 4,
                    display: true,
                    callback: (value) => {
                      return value >= 100000
                        ? (value / 100000).toFixed(1)
                        : value >= 1000
                        ? (value / 1000).toFixed(1)
                        : value.toFixed(1);
                    },
                    padding: 5,
                  },
                  grid: {
                    color: "#EEEEEE",
                    drawBorder: false,
                    drawTicks: false,
                    tickLength: 0,
                  },
                  border: {
                    display: false,
                  },
                },
              },
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  align: "start",
                  labels: {
                    font: { size: 12 },
                    color: "#666666",
                    padding: 15,
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 8,
                    boxHeight: 8,
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.dataset.label || "";
                      const value = context.parsed.y;
                      return `${label}: ${
                        value >= 100000
                          ? (value / 100000).toFixed(2)
                          : (value / 1000).toFixed(2)
                      }`;
                    },
                  },
                },
              },
              elements: {
                line: {
                  tension: 0.4,
                },
              },
            }}
          />
        ) : (
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              rotation: -90,
              circumference: 180,
              cutout: "70%",
              plugins: {
                legend: {
                  display: true,
                  position: "bottom",
                  align: "center",
                  labels: {
                    font: { size: 13 },
                    color: "#666666",
                    padding: 10,
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 10,
                    boxHeight: 10,
                    boxPadding: 10, // Add padding between legend items
                    generateLabels: (chart) => {
                      const data = chart.data;
                      if (data.labels.length && data.datasets.length) {
                        return data.labels.map((label, i) => {
                          const value = data.datasets[0].data[i];
                          const formattedValue =
                            value >= 100000
                              ? `₹${(value / 100000).toFixed(1)}L`
                              : `₹${(value / 1000).toFixed(1)}K`;
                          return {
                            text: `${label} ${formattedValue}`,
                            fillStyle:
                              data.datasets[0].backgroundColor[
                                i % data.datasets[0].backgroundColor.length
                              ],
                            strokeStyle: "#fff",
                            lineWidth: 2,
                            hidden: !chart.getDataVisibility(i),
                            index: i,
                          };
                        });
                      }
                      return [];
                    },
                  },
                  onHover: (event) => {
                    event.native.target.style.cursor = "pointer";
                  },
                  onLeave: (event) => {
                    event.native.target.style.cursor = "default";
                  },
                },
                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const label = context.label || "";
                      const value = context.parsed;
                      return `${label}: ₹${(value / 100000).toFixed(1)}L`;
                    },
                  },
                },
              },
            }}
            plugins={[centerTextPlugin]}
            height={220}
          />
        )}
      </div>
    </div>
  );
};

export default ChartCard;
