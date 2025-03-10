import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import AddTrip from "./pages/AddTrip/index";
import DetailTrip from "./pages/DetailTrip/index";
import Footer from "./component/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-trip" element={<AddTrip />} />
          <Route path="/trip/:id" element={<DetailTrip />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
