import React, { useEffect, useState } from 'react'
import PieChartComponent from '../../components/Charts/PieChartComponent';
import Page from '../../components/PageComponent/Page';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Slider from 'react-slick';
import VisibilityIcon from "@mui/icons-material/Visibility";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Organization} from "../../Types/Organization/Organization"
import { getOrganizations } from '../../Service/OrganisationService/OrganizationService';
import OrganisationCard from '../../components/OrganisationCardComp/OrganisationCard';
import { getAllOrders, getAllTiffins } from "../../Service/TiffinService.ts/TiffinService";
const RetailerDashboard = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalTiffins, setTotalTiffins] = useState(0);
  
  const fetchAllOrders = async () => { 
    const response = await getAllOrders();
    setTotalOrders(response.pagination.totalItems);
  }
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
  useEffect(() => {
    fetchOrganizations();
    fetchAllOrders();
    fetchAllTiffins();
  },[]);

  const papers = [
    { text: "All Menus", square: false, value:totalTiffins},
    { text: "Total Orders", square: true, value:totalOrders },
    { text: "Total Revenue", square: false },
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
          maxWidth: "none", // Remove the max-width for large screens
          margin:"12px"
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
          { name: "Pending", value: 29 },
          { name: "Approved", value: 12 },
          { name: "Rejected", value: 28 },
        ]}
      ></PieChartComponent>
      {/*TODO:}
      {/* Main Container */}
      <Box
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        {/* <Container sx={{ flexGrow: 1, py: 3 }}> */}
        {/* Organizations Section */}
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
          <Button
            variant="outlined" // Uses the default variant from the theme
            color="primary" // Uses the primary color defined in the theme
            size="small" // Uses the default size defined in the theme
            startIcon={<VisibilityIcon />} // Adds the icon
            // onClick={() => navigate("/supAdmin")} // Navigation logic
          >
            View More
          </Button>
        </Box>
        <Slider {...settings}>
          {organizations.map((org) => (
            <Box key={org._id} sx={{ minWidth: 450, padding: "0 18px" }}>
              <OrganisationCard
                title={org.org_name}
                description=""
                image="https://picsum.photos/200/300/?blur"
                fields={[
                  ...org.org_location.map((loc) => ({
                    label: `Location `,
                    value: loc.loc,
                  })),
                ]}
                status={org.isActive ? "Active" : "Inactive"}
                actions={[
                  {
                    label: "Register",
                    color: "primary",
                    onClick: () => {
                      console.log("Register");
                      alert("Register success");
                  },

                  },
                  // {
                  //   label: "Delete",
                  //   color: "error",
                  //   onClick: () => console.log("Delete"),
                  // },
                ]}
              />
            </Box>
          ))}
        </Slider>
        {/* </Container> */}
      </Box>
    </Container>
  );
};

export default RetailerDashboard;
