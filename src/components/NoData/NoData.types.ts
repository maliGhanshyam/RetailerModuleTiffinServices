import { SxProps, Theme } from "@mui/material";

export interface NoDataProps {
  message: string;
  image: string;
  boxStyle?: SxProps<Theme>;
  imgStyle?: React.CSSProperties;
}
