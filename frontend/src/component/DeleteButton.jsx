import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const DeleteTripButton = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`https://organisational-swift-flowy-64f7bee4.koyeb.app/${id}`);

            Swal.fire({
                title: "Trip Deleted",
                text: "The trip has been successfully deleted.",
                icon: "success",
                confirmButtonText: "View List Trip",
                confirmButtonColor: "#FF6200",
            }).then(() => {
                navigate("/");
            });

        } catch (error) {
            console.error("Error deleting trip:", error);

            Swal.fire({
                title: "Error",
                text: "Failed to delete the trip.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <button
            className="mt-3 w-100 text-white rounded-1 shadow-none p-1"
            style={{ backgroundColor: "#FF6200", borderColor: "#FF6200" }}
            onClick={handleDelete}
        >
            <strong>Delete Trip</strong>
        </button>
    );
};

export default DeleteTripButton;
