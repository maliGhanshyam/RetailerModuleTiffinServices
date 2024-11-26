import React from "react";
import { Box, Typography } from "@mui/material";
import { NoDataProps } from "./NoData.types";

const NoData: React.FC<NoDataProps> = ({ message, image, boxStyle,imgStyle }) => {
  return (
    <Box sx={boxStyle}>
      <img src={image} alt="No Data" style={imgStyle} />
      <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default NoData;
