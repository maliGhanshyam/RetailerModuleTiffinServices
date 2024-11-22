import * as React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

// const PageStyle = styled(Paper)(({ theme }) => ({
//   width: 220,
//   height: 220,
//   padding: theme.spacing(2),
//   ...theme.typography.body2,
//   textAlign: "center",
// }));
const PageStyle = styled(Paper)(({ theme }) => ({
  width: "100%", // Allow the parent to control the width
  height: "150px", // Keep the height fixed
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  boxSizing: "border-box", // Include padding in width calculations
}));

// Define Props Interface
interface ReusablePaperProps {
  text: string;
  value?: number;
  square: boolean;
  elevation?: number;
}

const Page: React.FC<ReusablePaperProps> = ({ text, value=0,square, elevation = 4,}) => {
  return (
    <PageStyle square={square} elevation={elevation}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        {text}
      </Typography>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        {value}
      </Typography>
    </PageStyle>
  );
}
export default Page;
