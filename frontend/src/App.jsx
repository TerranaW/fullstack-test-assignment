import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import AddTrip from "./pages/AddTrip/index";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-trip" element={<AddTrip />} />
        {/* lanjutkan */}
      </Routes>

    </>
  );
};

export default App;
