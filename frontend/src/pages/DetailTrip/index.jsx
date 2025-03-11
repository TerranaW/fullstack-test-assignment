import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaHotel, FaPlane, FaUtensils, FaClock, FaCalendarAlt } from "react-icons/fa";
import DeleteTripButton from "../../component/DeleteButton";
import EditButton from "../../component/EditButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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

    if (error) return <p>Error: {error.message}</p>;

    const trip = data?.data;

    return (
        <Container className="p-5">
            {/* Title and Country */}
            <h1 className="fw-bold">{isLoading ? <Skeleton width={300} /> :
                trip?.day + 'D' + '/' + trip?.night + 'N ' + trip?.titletrip}</h1>
            <p className="text-muted">{isLoading ? <Skeleton width={150} /> : trip?.country}</p>

            {/* Image */}
            {isLoading ? (
                <Skeleton height={300} width="100%" className="rounded mb-4" />
            ) : (
                <img
                    src={trip?.image}
                    alt={trip?.titletrip}
                    className="img-fluid rounded mb-4"
                    style={{ width: "100%", height: "50%", objectFit: "cover" }}
                />
            )}

            {/* Trip Details */}
            <Row className="text-center justify-content-between align-items-start mb-2">
                {[
                    { label: "Accommodation", icon: <FaHotel size={20} className="text-dark" />, value: `Hotel ${trip?.night} Nights` },
                    { label: "Transportation", icon: <FaPlane size={20} className="text-dark" />, value: trip?.transportation },
                    { label: "Eat", icon: <FaUtensils size={20} className="text-dark" />, value: trip?.eat },
                    { label: "Duration", icon: <FaClock size={20} className="text-dark" />, value: `${trip?.day} Day ${trip?.night} Night` },
                    { label: "Date Trip", icon: <FaCalendarAlt size={20} className="text-dark" />, value: new Date(trip?.date).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) }
                ].map((item, index) => (
                    <Col key={index} xs={12} sm={2} className="d-flex flex-column align-items-start gap-1 text-nowrap">
                        <small className="text-muted">{item.label}</small>
                        <div className="d-flex align-items-center gap-2">
                            {item.icon}
                            <span className="fw-bold">
                                {isLoading ? <Skeleton width={100} /> : item.value}
                            </span>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Description */}
            <p className="fw-bold">Description</p>
            <p>{isLoading ? <Skeleton count={3} /> : trip?.description}</p>

            {/* Price and Edit Button */}
            <div className="d-flex justify-content-between align-items-center">
                {isLoading ? (
                    <Skeleton width={200} height={30} />
                ) : (
                    <h3 className="text-warning fw-bold mb-0">
                        IDR. {trip?.price?.toLocaleString()}
                        <span className="text-black"> / Person</span>
                    </h3>
                )}

                {isLoading ? <Skeleton width={100} height={40} /> : <EditButton tripData={trip} onUpdate={(updatedTrip) => console.log(updatedTrip)} />}
            </div>

            {/* Delete Button */}
            {isLoading ? <Skeleton width={150} height={40} /> : <DeleteTripButton tripId={id} />}
        </Container>
    );
}

export default DetailTrip;
