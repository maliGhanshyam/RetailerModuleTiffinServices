import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box, Container, Typography, Paper } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import noTask from "../../assets/noTask.svg";
import { CenterFocusStrong } from "@mui/icons-material";
// import timeBloack from "../../assets/timeblock.png";
import MonthlyAreaChart from "./AreaChart";

const styles = {
  card: {
    padding: 2,
    boxShadow: 3,
    borderRadius: 4,
    transition: "0.3s",
    "&:hover": { boxShadow: 6 },
    height: "100%", // Ensure cards have same height
    display: "flex",
    flexDirection: "column",
  },
  taskBox: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    height: "100%", // Ensure full height
  },
};


export default function PieChartComponent({ chartData }) {

  // Custom responsive dimensions for PieChart
  const getChartDimensions = () => {
    if (window.innerWidth <= 600)
      return { width: 300, height: 250, outerRadius: 60 };
    if (window.innerWidth <= 960)
      return { width: 350, height: 280, outerRadius: 70 };
    return { width: 450, height: 300, outerRadius: 80 };
  };

  const chartDimensions = getChartDimensions();

  return (
    <>
      <Box
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container disableGutters maxWidth={false}>
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 2, md: 2 },
              flexDirection: { xs: "column", md: "row" }, // Stack vertically on mobile
            }}
          >
            {/* Chart Section */}
            <Paper
              sx={{
                ...styles.card,
                flexBasis: { xs: "100%", md: "35%" },
                minHeight: { xs: "400px", md: "400px" },
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                mb={2}
                align="center"
                sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
              >
                Order Status
              </Typography>
              <Box
                display="flex"
                justifyContent="center"
                sx={{
                  overflow: "auto",
                  "& .recharts-wrapper": {
                    minWidth: "300px", // Prevent chart from becoming too small
                  },
                }}
              >
                <PieChart
                  width={chartDimensions.width}
                  height={chartDimensions.height}
                >
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={chartDimensions.outerRadius}
                    innerRadius={chartDimensions.outerRadius * 0.625}
                    fill="#8884d8"
                  >
                    <Cell key="Pending" fill="#ff7300" />
                    <Cell key="Approved" fill="#239b56" />
                    <Cell key="Rejected" fill="#c0392b" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f5f5f5",
                      border: "1px solid #ddd",
                    }}
                  />
                  <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    wrapperStyle={{
                      paddingLeft: window.innerWidth <= 600 ? 10 : 30,
                      fontSize: window.innerWidth <= 600 ? "0.8rem" : "1rem",
                    }}
                  />
                </PieChart>
              </Box>
            </Paper>

            {/* Task Section */}
            <Paper
              sx={{
                ...styles.card,
                flexBasis: { xs: "100%", md: "65%" },
                minHeight: { xs: "400px", md: "auto" },
              }}
            >
              <Box
                sx={{
                  ...styles.taskBox,
                  height: "100%",
                  "& .recharts-wrapper": {
                    width: "100% !important",
                    height: "100% !important",
                  },
                }}
              >
                <MonthlyAreaChart year={2024 }></MonthlyAreaChart>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}
