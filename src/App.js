import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShortenerPage from "./pages/ShortenerPage";
import StatsPage from "./pages/StatsPage";
import RedirectPage from "./pages/RedirectPage";
import { Container, AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Shortener</Button>
          <Button color="inherit" component={Link} to="/stats">Statistics</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:shortcode" element={<RedirectPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
