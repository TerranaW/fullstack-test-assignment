import React from "react";
import { useParams } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export async function fetchTripsById(id) {
    try {
        let endpoint = `https://organisational-swift-flowy-64f7bee4.koyeb.app/${id}`;

        const response = await axios.get(endpoint);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Something went wrong! ${error.response.data.message}`,
            });
        }
        throw error;
    }
}

function DetailTrip() {
    let { id } = useParams();

    const { isLoading, error, data } = useQuery({
        queryKey: ["trips", id],
        queryFn: () => fetchTripsById(id),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const trip = data?.data;

    return (
        <Container className="p-5">
            <h1 className="fw-bold">{trip?.titletrip}</h1>
            <p className="text-muted">{trip?.country}</p>

            <img src={trip?.image} alt={trip?.titletrip} className="img-fluid rounded mb-4" />

            <div className="d-flex justify-content-between mb-3">
                <p><strong>Accommodation</strong> {trip?.accommodation}</p>
                <p><strong>Transportation</strong> {trip?.transportation}</p>
                <p><strong>Eat</strong> {trip?.eat}</p>
                <p><strong>Duration</strong> {trip?.day} Days {trip?.night} Nights</p>
                <p><strong>Date Trip</strong>{new Date(trip?.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                })}</p>
            </div>

            <p className="fw-bold">Description</p>
            <p>{trip?.description}</p>

            <h3 className="text-warning fw-bold">IDR. {trip?.price?.toLocaleString()} / Person</h3>

            <Button variant="danger" className="mt-3">Delete Trip</Button>
        </Container>
    );
}

export default DetailTrip;
