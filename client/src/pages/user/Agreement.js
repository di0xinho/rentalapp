import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../../components/MyDocument";

const Agreement = () => {
  const dispatch = useDispatch();
  const [rentalDetails, setRentalDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bookingId } = useParams();

  const getRentalDetails = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        `/api/bookings/get-booking-details/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setRentalDetails(response.data.data);
      } else {
        console.log("Doszło do błędu");
      }

      dispatch(hideLoading());
      setLoading(false);
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getRentalDetails();
  }, []);

  return (
    <>
      {loading ? (
        <p>Ładowanie...</p>
      ) : (
        <div>
          <PDFViewer>
            <MyDocument bookingDetails={rentalDetails} />
          </PDFViewer>
        </div>
      )}
    </>
  );
};

export default Agreement;
