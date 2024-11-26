import "./App.css";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { SnackbarProvider } from "./context";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Box
      className="App"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <SnackbarProvider>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </SnackbarProvider>
    </Box>
  );
}

export default App;
