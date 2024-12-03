import React, { useEffect, useState } from "react";
import PieChartComponent from "../../components/Charts/PieChartComponent";
import Page from "../../components/PageComponent/Page";
import { Box, Container, Grid, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Organization } from "../../Types/Organization/Organization";
import { getOrganizations } from "../../Service/OrganisationService/OrganizationService";
import OrganisationCard from "../../components/OrganisationCardComp/OrganisationCard";
import {
  getAllOrders,
  getAllTiffins,
  getOrderRequests,
} from "../../Service/TiffinService.ts/TiffinService";
import { getMonthlyOrders } from "../../Service/OrderService/OrderService";
import { OrderCountData } from "../../Types/Order/OrderSummary";

const RetailerDashboard = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalTiffins, setTotalTiffins] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [approvedOrders, setApprovedOrders] = useState(0);
  const [rejectedOrders, setRejectedOrders] = useState(0);

const getOrderData = async () => {
  try {
    const statuses = ["pending", "delivered", "cancelled"];

    const allOrderData: OrderCountData[] = await getOrderRequests();
    console.log("Fetched All Orders:", allOrderData);

    // Filter and count orders by status
    const results = statuses.map((status) => {
      const orderData = allOrderData.find(
        (item: OrderCountData) => item.delivery_status === status
      ) || { count: 0 }; // Default to 0 if status is not found
      return { status, count: orderData.count };
    });

    // Update state based on the filtered results
    results.forEach(({ status, count }) => {
      if (status === "pending") setPendingOrders(count);
      if (status === "delivered") setApprovedOrders(count);
      if (status === "cancelled") setRejectedOrders(count);
    });
  } catch (error) {
    console.error("Error fetching orders by status:", error);
  }
};



  const fetchAllOrders = async () => {
    const response = await getAllOrders();
    setTotalOrders(response.pagination.totalItems);
  };

  const fetchAllTiffins = async () => {
    const response = await getAllTiffins();
    setTotalTiffins(response.pagination.totalItems);
  };

  // Fetch Organizations
  const fetchOrganizations = async () => {
    try {
      const data = await getOrganizations();
      console.log(data);
      setOrganizations(data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };
const fetchMonthlyOrders = async () => {
  let totalRevenue = 0; // Initialize total revenue

  try {
    const response = await getMonthlyOrders(2024);

    if (response.statusCode === 200 && Array.isArray(response.data)) {
      // Calculate the total revenue by summing the totalAmount from each month
      totalRevenue = response.data.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      setTotalRevenue(totalRevenue);
      console.log("Total Revenue for the Year:", totalRevenue);
    } else {
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    console.error("Error fetching monthly orders:", error);
  }
};


  // Refresh organizations after successful request
  const handleRequestSuccess = () => {
    fetchOrganizations();
  };

  useEffect(() => {
    fetchOrganizations();
    fetchAllOrders();
    fetchAllTiffins();
    getOrderData();
    fetchMonthlyOrders();
  }, []);

  const papers = [
    { text: "All Menus", square: false, value: totalTiffins },
    { text: "Total Orders", square: true, value: totalOrders },
    { text: "Total Revenue", square: false,value: totalRevenue},
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          centerMode: true,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <Container
      sx={{
        "@media (min-width: 1200px)": {
          maxWidth: "none",
          margin: "12px",
        },
      }}
    >
      <Grid container spacing={1} justifyContent="center">
        {papers.map((paper, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Page text={paper.text} square={paper.square} value={paper.value} />
          </Grid>
        ))}
      </Grid>
      <PieChartComponent
        chartData={[
          { name: "Pending", value: pendingOrders },
          { name: "Approved", value: approvedOrders },
          { name: "Rejected", value: rejectedOrders },
        ]}
      />
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Available Organizations
          </Typography>
        </Box>
        <div style={{ height: "800px"}}>
          <Slider {...settings}>
            {organizations.map((org) => (
              <Box key={org._id} sx={{ minWidth: 450, padding: "28px" }}>
                <OrganisationCard
                  orgId={org._id} // Pass organization ID
                  title={org.org_name}
                  description=""
                  image={
                    org.org_image_url || "https://picsum.photos/200/300/?blur"
                  }
                  fields={org.org_location.map((loc) => ({
                    label: `Location`,
                    value: loc.loc,
                  }))}
                  status={org.isActive ? "Active" : "Inactive"}
                  onRequestSuccess={handleRequestSuccess} // Add success handler
                />
              </Box>
            ))}
          </Slider>
        </div>
      </Box>
    </Container>
  );
};

export default RetailerDashboard;
