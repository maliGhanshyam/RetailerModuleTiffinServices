import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getMonthlyOrders } from "../../Service/OrderService/OrderService"; // Adjust the path to where your API function is located

const MonthlyAreaChart = ({ year }: { year: number }) => {
  const [chartData, setChartData] = useState<
    { month: string; value: number }[]
  >([]);

  // Function to format data and update the chart data with API response
  const formatData = (monthlyData: any[]) => {
    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize data with all months as 0
    const formattedData = allMonths.map((month) => ({
      month,
      value: 0, // Default value is 0
    }));

    // Update the formattedData based on the API response
    monthlyData.forEach((item) => {
      const monthIndex = parseInt(item.month.split("-")[1], 10) - 1; // Get month index (e.g., '2024-11' => index 10 for Nov)
      if (monthIndex >= 0 && monthIndex < formattedData.length) {
        formattedData[monthIndex] = {
          month: allMonths[monthIndex],
          value: item.totalOrders, // Update value with totalOrders from API
        };
      }
    });

    return formattedData;
  };

  // Fetch monthly orders and set chart data
  useEffect(() => {
    const fetchMonthlyOrders = async () => {
      try {
        const response = await getMonthlyOrders(year);
        if (response.statuscode === 200 && response.data) {
          const formattedData = formatData(response.data);
          setChartData(formattedData); // Update state with the formatted data
        }
      } catch (error) {
        console.error("Failed to fetch monthly orders:", error);
      }
    };

    fetchMonthlyOrders();
  }, [year]); // Re-fetch data when the year changes

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer>
        <AreaChart data={chartData} margin={{ right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyAreaChart;
