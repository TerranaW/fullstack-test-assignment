
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
const TripCards = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const AddTrip = () => {
    navigate("/add-trip");
  }
  const DetailTrip = (id) => {
    navigate(`/trip/${id}`);
  };

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch('https://organisational-swift-flowy-64f7bee4.koyeb.app/');
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data)) {
          setTrips(data.data);
        } else {
          console.error('Data from API is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };
    fetchTrips();

  }, []);

  return (
    <Container className='p-5'>
      <div className="d-flex justify-content-between align-items-center mt-auto mb-3">
        <h1 className='fw-bold'>Income Trip</h1>
        <Button onClick={AddTrip} className='bg-warning text-white fw-bold border-warning' style={{ width: "15%" }}>Add Trip</Button>
      </div>
      <Row>
        {Array.isArray(trips) && trips.length > 0 ? (
          trips.map((trip, index) => (
            <Col key={index} md={4} className='mb-5'>
              <Link to={`/trip/${trip._id}`} style={{ textDecoration: "none", color: "black" }}>
                <Card className="shadow-sm border-2 d-flex flex-column rounded-3" style={{ width: "20rem", height: "100%" }}>
                  <div className="position-relative">
                    <Card.Img
                      className=" rounded-4 p-2"
                      variant='top'
                      src={trip.image}
                      alt={trip.titletrip}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <Badge
                      bg="light"
                      text="dark"
                      className=" position-absolute top-0 end-0 my-3 mx-1 p-2 rounded"
                    >
                      {trip.booked}/{trip.quota}
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
                    <Card.Title className="fw-bold">
                      {trip.titletrip?.length > 23
                        ? trip.titletrip
                          .split(" ")
                          .reduce((acc, word) => (acc.length + word.length <= 23 ? acc + " " + word : acc), "")
                          .trim() + " ..."
                        : trip.titletrip || "No Title"}
                    </Card.Title>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <Card.Text className="text-warning fw-bold">IDR. {trip.price.toLocaleString()}</Card.Text>
                      <Card.Text className="text-muted">{trip.country}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </Container>
  );
};

export default TripCards;

