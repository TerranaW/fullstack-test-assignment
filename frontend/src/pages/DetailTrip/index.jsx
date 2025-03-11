import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaHotel, FaPlane, FaUtensils, FaClock, FaCalendarAlt } from "react-icons/fa";
import DeleteTripButton from "../../component/DeleteButton";
import EditButton from "../../component/EditButton"; // Impor EditButton

export async function fetchTripsById(id) {
    try {
        const response = await axios.get(`https://organisational-swift-flowy-64f7bee4.koyeb.app/${id}`);
        return response.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Something went wrong! ${error.response?.data?.message || error.message}`,
        });
        throw error;
    }
}

function DetailTrip() {
    const { id } = useParams();

    const { isLoading, error, data } = useQuery({
        queryKey: ["trip", id],
        queryFn: () => fetchTripsById(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const trip = data?.data;

    return (
        <Container className="p-5">
            <h1 className="fw-bold">{trip?.titletrip}</h1>
            <p className="text-muted">{trip?.country}</p>

            <img
                src={trip?.image}
                alt={trip?.titletrip}
                className="img-fluid rounded mb-4"
                style={{ width: "100%", height: "50%", objectFit: "cover" }}
            />

            <Row className="text-center justify-content-between align-items-start mb-2">
                <Col xs={12} sm={2} className="d-flex flex-column align-items-start gap-1">
                    <small className="text-muted">Accommodation</small>
                    <div className="d-flex align-items-center gap-2">
                        <FaHotel size={20} className="text-dark" />
                        <span className="fw-bold">Hotel {trip?.night} Nights</span>
                    </div>
                </Col>

                <Col xs={12} sm={2} className="d-flex flex-column align-items-start gap-1">
                    <small className="text-muted">Transportation</small>
                    <div className="d-flex align-items-center gap-2">
                        <FaPlane size={20} className="text-dark" />
                        <span className="fw-bold">{trip?.transportation}</span>
                    </div>
                </Col>

                <Col xs={12} sm={2} className="d-flex flex-column align-items-start gap-1">
                    <small className="text-muted">Eat</small>
                    <div className="d-flex align-items-center gap-2">
                        <FaUtensils size={20} className="text-dark" />
                        <span className="fw-bold">{trip?.eat}</span>
                    </div>
                </Col>

                <Col xs={12} sm={2} className="d-flex flex-column align-items-start gap-1">
                    <small className="text-muted">Duration</small>
                    <div className="d-flex align-items-center gap-2">
                        <FaClock size={20} className="text-dark" />
                        <span className="fw-bold">{trip?.day} Day {trip?.night} Night</span>
                    </div>
                </Col>

                <Col xs={12} sm={2} className="d-flex flex-column align-items-start gap-1">
                    <small className="text-muted">Date Trip</small>
                    <div className="d-flex align-items-center gap-2">
                        <FaCalendarAlt size={20} className="text-dark" />
                        <span className="fw-bold">
                            {new Date(trip?.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>
                </Col>
            </Row>

            <p className="fw-bold">Description</p>
            <p>{trip?.description}</p>
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-warning fw-bold mb-0">
                    IDR. {trip?.price?.toLocaleString()}
                    <span className="text-black"> / Person</span>
                </h3>

                <EditButton tripData={trip} onUpdate={(updatedTrip) => console.log(updatedTrip)} />
            </div>
            <DeleteTripButton tripId={id} />
        </Container>
    );
}

export default DetailTrip;
