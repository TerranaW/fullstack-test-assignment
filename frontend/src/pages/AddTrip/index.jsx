import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddTrip = () => {
  const navigate = useNavigate();

  const [tripData, setTripData] = useState({
    titletrip: "",
    country: "",
    accommodation: "",
    transportation: "",
    eat: "",
    day: "",
    night: "",
    date: "",
    price: "",
    quota: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://organisational-swift-flowy-64f7bee4.koyeb.app/",
        tripData
      );

      Swal.fire({
        title: "Success!",
        text: "Trip berhasil ditambahkan.",
        icon: "success",
        confirmButtonText: "View Trip",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error adding trip:", error);
      Swal.fire({
        title: "Error!",
        text: "Gagal menambahkan trip.",
        icon: "error",
      });
    }
  };
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://countriesnow.space/api/v0.1/countries/");
        setCountries(response.data.data.map(country => country.country));
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);
  return (
    <Container className="d-flex justify-content-center align-items-center mb-2 fw-bold">
      <Card style={{ width: "70%", height: "100", padding: "3rem" }}>
        <h2 className="mb-4 ">Add Trip</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title Trip</Form.Label>
            <Form.Control type="text" name="titletrip" value={tripData.titletrip} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Select name="country" value={tripData.country} onChange={handleChange} required>
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Accommodation</Form.Label>
            <Form.Control type="text" name="accommodation" value={tripData.accommodation} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Transportation</Form.Label>
            <Form.Control type="text" name="transportation" value={tripData.transportation} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Eat</Form.Label>
            <Form.Control type="text" name="eat" value={tripData.eat} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Duration</Form.Label>
            <Row>
              <Col md={4}><Form.Control type="number" name="day" value={tripData.day} onChange={handleChange} required /></Col>
              <Col md={2} className="d-flex align-items-center">Day</Col>
              <Col md={4}><Form.Control type="number" name="night" value={tripData.night} onChange={handleChange} required /></Col>
              <Col md={2} className="d-flex align-items-center">Night</Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date Trip</Form.Label>
            <Form.Control type="date" name="date" value={tripData.date} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" value={tripData.price} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quota</Form.Label>
            <Form.Control type="number" name="quota" value={tripData.quota} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={tripData.description} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image Url</Form.Label>
            <Form.Control type="text" name="image" value={tripData.image} onChange={handleChange} required />
          </Form.Group>

          <Button type="submit" variant="warning" className="w-100 my-3 text-white fw-bold">
            Add Trip
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddTrip;
