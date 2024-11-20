import "./App.css";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { SnackbarProvider } from "./context";

function App() {
  return (
    <Box
      className="App"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <main style={{ flex: 1 }}>
        <SnackbarProvider>
          <Outlet />
        </SnackbarProvider>
      </main>
    </Box>
  );
}

export default App;
