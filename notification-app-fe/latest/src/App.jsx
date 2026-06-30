import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import AllNotifications from "./pages/AllNotifications";
import PriorityNotifications from "./pages/PriorityNotifications";

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            All Notifications
          </Button>

          <Button color="inherit" component={Link} to="/priority">
            Priority Notifications
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route
            path="/priority"
            element={<PriorityNotifications />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;