import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated, admin } = useContext(Context);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-hms-92pp.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
        toast.error("Failed to fetch appointments.");
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `https://backend-hms-92pp.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed.");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello,</p>
              <h5>
                {admin ? `${admin.firstName} ${admin.lastName}` : "Admin"}
              </h5>
            </div>
            <p>
              Welcome to your dashboard! Here, you can manage your appointments,
              track patient visits, and oversee the overall operations of your
              hospital. Keep up the great work in providing excellent care to
              your patients.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>1500</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>10</h3>
        </div>
      </div>
      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td data-label="Patient">{`${appointment.firstName || ""} ${
                    appointment.lastName || ""
                  }`}</td>
                  <td data-label="Date">
                    {appointment.appointment_date?.substring(0, 16) || "N/A"}
                  </td>
                  <td data-label="Doctor">{`${
                    appointment.doctor?.firstName || ""
                  } ${appointment.doctor?.lastName || ""}`}</td>
                  <td data-label="Department">
                    {appointment.department || "N/A"}
                  </td>
                  <td data-label="Status">
                    <select
                      className={
                        appointment.status === "Pending"
                          ? "value-pending"
                          : appointment.status === "Accepted"
                          ? "value-accepted"
                          : "value-rejected"
                      }
                      value={appointment.status}
                      onChange={(e) =>
                        handleUpdateStatus(appointment._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td data-label="Visited">
                    {appointment.hasVisited ? (
                      <GoCheckCircleFill className="green" />
                    ) : (
                      <AiFillCloseCircle className="red" />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Appointments Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
