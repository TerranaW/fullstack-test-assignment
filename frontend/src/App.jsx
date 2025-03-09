import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import AddTrip from "./pages/AddTrip/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import DetailTrip from "./pages/DetailTrip/index"


const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-trip" element={<AddTrip />} />
        <Route path="/trip/:id" element={<DetailTrip />} />
        {/* lanjutkan */}
      </Routes>

    </>
  );
};

export default App;
