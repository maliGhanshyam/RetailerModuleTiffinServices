import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import tiff3 from "../../assets/tiff3.png";
import { getToken, logoutUser } from "../../services/LoginService/loginUser";
import { style, styles } from "./Navbar.styles";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../store/authSlice";
import { RootState } from "../../store/Store";
import { RETAILER_ROLE_ID } from "../../constants/ROLES";
import { useSnackbar } from "../../hook";
import { Theme } from "../materialUI";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const userRoleId = useSelector((state: RootState) => state.auth.userRoleId);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const token = getToken();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleAuthToggle = () => {
    if (token) {
      logoutUser();
      dispatch(clearAuthData());
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={styles.drawerBox}>
      <List>
        {token && (
          <>
            <ListItem
              component={Link}
              to="/dashboard"
              sx={styles.listItemStyle}
            >
              <ListItemText primary="Home" />
            </ListItem>
            {userRoleId === RETAILER_ROLE_ID && (
              <>
                <ListItem
                  component={Link}
                  to="/tiffin"
                  sx={styles.listItemStyle}
                >
                  <ListItemText primary="Tiffins" />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/order"
                  sx={styles.listItemStyle}
                >
                  <ListItemText primary="Orders" />
                </ListItem>
                <ListItem
                  component={Link}
                  to="/addTiffin"
                  sx={styles.listItemStyle}
                >
                  <ListItemText primary="Add Tiffins" />
                </ListItem>
              </>
            )}
          </>
        )}
        {location !== "/login" && (
          <ListItem
            component={Link}
            to={token ? "#" : "/login"}
            onClick={token ? handleAuthToggle : undefined}
            sx={styles.listItemStyle}
          >
            <ListItemText primary={token ? "Logout" : "Login"} />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar sx={styles.appBar}>
        <Toolbar sx={styles.toolbar}>
          <Box sx={styles.toolbar}>
            <img src={tiff3} alt="Logo" style={style.logoStyle} />
            <Typography
              variant="h5"
              sx={{ ...styles.title, fontFamily: "Futura, Avenir, sans-serif" }}
            >
              <span style={style.logoWordBlack}>Neo</span>
              <span style={style.logoWordWhite}>Tiffins</span>
            </Typography>
            {token && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  sx={styles.button}
                >
                  Home
                </Button>
                {token && userRoleId === RETAILER_ROLE_ID && (
                  <>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/tiffin"
                      sx={styles.button}
                    >
                      Tiffins
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/order"
                      sx={styles.button}
                    >
                      Orders
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/addTiffin"
                      sx={styles.button}
                    >
                      Add Tiffins
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>
          <Box sx={styles.boxRight}>
            {open && !token && location !== "/login" && (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                variant="outlined"
              >
                Login
              </Button>
            )}
            {location !== "/login" && (
              <>
                {token && userRoleId === RETAILER_ROLE_ID && (
                  <IconButton
                    color="inherit"
                    component={Link}
                    to="/update-profile"
                    sx={styles.updateNavigate}
                  >
                    <AccountCircleIcon sx={styles.profileIcon} />
                  </IconButton>
                )}
                <Button
                  color="inherit"
                  component={Link}
                  to={token ? "#" : "/login"}
                  onClick={token ? handleAuthToggle : undefined}
                  sx={styles.buttonOutlined}
                  variant="outlined"
                >
                  {token ? "Logout" : "Login"}
                </Button>
              </>
            )}
            {location !== "/register" && !token && (
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={styles.buttonOutlined}
                variant="outlined"
              >
                Register
              </Button>
            )}
          </Box>
          {token && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={styles.iconButton}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {token && (
        <Drawer
          anchor="right"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: "auto", backgroundColor: "#f4f6f7" } }}
        >
          {drawer}
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
