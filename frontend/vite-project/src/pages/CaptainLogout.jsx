import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CaptainLogout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("captain-token");
        toast.success("Logged out successfully!");
        navigate("/captain-login");
      }
    });
  return <div>Captain logout</div>;
}

export default CaptainLogout;
