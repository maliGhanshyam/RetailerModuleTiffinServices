import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

export const styles: { [key: string]: SxProps<Theme> } = {
  appBar: {
    position: "static",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  button: {
    fontSize: "1.05rem",
    marginLeft: 4,
    display: { xs: "none", sm: "block" },
  },
  buttonOutlined: {
    fontSize: "1.05rem",
    display: { xs: "none", sm: "block" },
  },
  buttonOutlinedLogin: {
    fontSize: "1.05rem",
    display: { xs: "none", sm: "block" },
  },
  drawerBox: {
    width: "auto",
    padding: 2,
  },
  iconButton: {
    display: { sm: "none" },
  },
  listItemStyle: { color: "black", textDecoration: "none" },
  boxRight: { display: "flex", alignItems: "center" },
  profileIcon: {
    height: "120%",
    width: "120%",
  },
  updateNavigate: {
    marginRight: { sm: 2, xs: 0 },
    height: 40,
    width: 40,
  },
};

export const style = {
  logoStyle: {
    height: "45px",
    width: "30px",
    borderRadius: "45%",
    marginRight: "10px",
  },
  imgStyle: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    marginRight: "15px",
  },
  imgChange: { marginTop: "10px", marginLeft: "10px" },
  logoWordBlack: { color: "black", fontWeight: "bold" },
  logoWordWhite: { color: "white", fontWeight: "bold" },
};
