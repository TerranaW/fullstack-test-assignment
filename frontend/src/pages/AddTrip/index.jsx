import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddTrip = () => {
  const navigate = useNavigate();

  // State untuk menyimpan input
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

  // Handle perubahan input
  const handleChange = (e) => {
    setTripData({ ...tripData, [e.target.name]: e.target.value });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    //simpan ke API
    try {
      await axios.post(
        "https://organisational-swift-flowy-64f7bee4.koyeb.app/",
        tripData
      );

      // nampilin SweetAlert jika berhasil
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

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Add Trip</h2>
      <Form onSubmit={handleSubmit}>
        {/* Title Trip */}
        <Form.Group className="mb-3">
          <Form.Label>Title Trip</Form.Label>
          <Form.Control
            type="text"
            name="titletrip"
            value={tripData.titletrip}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Country */}
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Select
            name="country"
            value={tripData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="Australia">Australia</option>
            <option value="South Korea">South Korea</option>
            <option value="Japan">Japan</option>
            <option value="Indonesia">Indonesia</option>
            <option value="USA">USA</option>
          </Form.Select>
        </Form.Group>

        {/* Accommodation */}
        <Form.Group className="mb-3">
          <Form.Label>Accommodation</Form.Label>
          <Form.Control
            type="text"
            name="accommodation"
            value={tripData.accommodation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Transportation */}
        <Form.Group className="mb-3">
          <Form.Label>Transportation</Form.Label>
          <Form.Control
            type="text"
            name="transportation"
            value={tripData.transportation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Eat */}
        <Form.Group className="mb-3">
          <Form.Label>Eat</Form.Label>
          <Form.Control
            type="text"
            name="eat"
            value={tripData.eat}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Duration */}
        <Form.Group className="mb-3">
          <Form.Label>Duration</Form.Label>
          <Row>
            <Col md={2}>
              <Form.Control
                type="number"
                name="day"
                value={tripData.day}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={1} className="d-flex align-items-center">Day</Col>
            <Col md={2}>
              <Form.Control
                type="number"
                name="night"
                value={tripData.night}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={1} className="d-flex align-items-center">Night</Col>
          </Row>
        </Form.Group>

        {/* Date Trip */}
        <Form.Group className="mb-3">
          <Form.Label>Date Trip</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={tripData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Price */}
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={tripData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Quota */}
        <Form.Group className="mb-3">
          <Form.Label>Quota</Form.Label>
          <Form.Control
            type="number"
            name="quota"
            value={tripData.quota}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={tripData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Image URL */}
        <Form.Group className="mb-3">
          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={tripData.image}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Button Submit */}
        <Button type="submit" variant="warning" className="w-100">
          Add Trip
        </Button>
      </Form>
    </Container>
  );
};

export default AddTrip;
