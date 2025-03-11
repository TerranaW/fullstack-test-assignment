import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

const MySwal = withReactContent(Swal);

const EditButton = ({ tripData, onUpdate }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleEdit = () => {
        if (!tripData) {
            MySwal.fire("Error", "Data trip tidak ditemukan!", "error");
            return;
        }

        MySwal.fire({
            title: "Edit Trip",
            html: `
                <div style="padding: 20px;">
                    <div style="margin-bottom: 15px;">
                        <label for="swal-titletrip-${id}" style="display: block; font-weight: bold;">Title Trip</label>
                        <input id="swal-titletrip-${id}" class="swal2-input" style="width: 100%;" value="${tripData.titletrip || ''}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-country-${id}" style="display: block; font-weight: bold;">Country</label>
                        <input id="swal-country-${id}" class="swal2-input" style="width: 100%;" value="${tripData.country || ''}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-accommodation-${id}" style="display: block; font-weight: bold;">Accommodation</label>
                        <input id="swal-accommodation-${id}" class="swal2-input" style="width: 100%;" value="${tripData.accommodation || ''}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-transportation-${id}" style="display: block; font-weight: bold;">Transportation</label>
                        <input id="swal-transportation-${id}" class="swal2-input" style="width: 100%;" value="${tripData.transportation || ''}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-eat-${id}" style="display: block; font-weight: bold;">Eat</label>
                        <input id="swal-eat-${id}" class="swal2-input" style="width: 100%;" value="${tripData.eat || ''}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-day-${id}" style="display: block; font-weight: bold;">Day</label>
                        <input id="swal-day-${id}" class="swal2-input" style="width: 100%;" value="${tripData.day || ''}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-night-${id}" style="display: block; font-weight: bold;">Night</label>
                        <input id="swal-night-${id}" class="swal2-input" style="width: 100%;" value="${tripData.night || ''}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-date-${id}" style="display: block; font-weight: bold;">Date</label>
                        <input id="swal-date-${id}" class="swal2-input" type="date" style="width: 100%;" value="${tripData.date || ''}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-price-${id}" style="display: block; font-weight: bold;">Price</label>
                        <input id="swal-price-${id}" class="swal2-input" type="text" style="width: 100%;" value="${tripData.price.toLocaleString('id-ID') || ''}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-quota-${id}" style="display: block; font-weight: bold;">Quota</label>
                        <input id="swal-quota-${id}" class="swal2-input" type="number" style="width: 100%;" value="${tripData.quota || ''}">
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-description-${id}" style="display: block; font-weight: bold;">Description</label>
                        <textarea id="swal-description-${id}" class="swal2-textarea" style="width: 100%;">${tripData.description || ''}</textarea>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label for="swal-image-${id}" style="display: block; font-weight: bold;">Image URL</label>
                        <input id="swal-image-${id}" class="swal2-input" style="width: 100%;" value="${tripData.image || ''}">
                    </div>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: "Simpan",
            preConfirm: () => {
                return {
                    titletrip: document.getElementById(`swal-titletrip-${id}`).value,
                    country: document.getElementById(`swal-country-${id}`).value,
                    accommodation: document.getElementById(`swal-accommodation-${id}`).value,
                    transportation: document.getElementById(`swal-transportation-${id}`).value,
                    eat: document.getElementById(`swal-eat-${id}`).value,
                    day: document.getElementById(`swal-day-${id}`).value,
                    night: document.getElementById(`swal-night-${id}`).value,
                    date: document.getElementById(`swal-date-${id}`).value,
                    price: document.getElementById(`swal-price-${id}`).value,
                    quota: document.getElementById(`swal-quota-${id}`).value,
                    description: document.getElementById(`swal-description-${id}`).value,
                    image: document.getElementById(`swal-image-${id}`).value,
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`https://organisational-swift-flowy-64f7bee4.koyeb.app/${id}`, result.value)
                    .then((response) => {
                        onUpdate(response.data); // Update state

                        MySwal.fire({
                            title: "Sukses!",
                            text: "Trip berhasil diperbarui.",
                            icon: "success",
                            confirmButtonText: "View Trip",
                        }).then(() => {
                            navigate("/"); // Navigasi ke home
                        });
                    })
                    .catch(() => {
                        MySwal.fire("Error", "Gagal memperbarui trip", "error");
                    });
            }
        });
    };

    return <button onClick={handleEdit} className=" rounded-1 align-text-top" style={{
        backgroundColor: "#FF6200",
        color: "#FFFFFF",
        borderColor: " #FF6200", transition: "all 0.3s ease",
        cursor: "pointer",
    }} > Edit Trip <FaRegEdit /></button>;
};

export default EditButton;
