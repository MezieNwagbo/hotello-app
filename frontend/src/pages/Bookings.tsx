import { useState, useEffect, use } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";

import { useQuery, useMutation } from "@tanstack/react-query";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import BookingForm from "../forms/bookingForm/BookingForm";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Bookings = () => {
  const { stripePromise } = useAppContext();
  const { hotelId } = useParams();
  const search = useSearchContext();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelById", hotelId],
    queryFn: () => apiClient.fetchHotelById(hotelId as string),
  });
  const { data: currentUser } = useQuery({
    queryKey: ["bookings"],
    queryFn: apiClient.fetchCurrentUser,
  });

  const { data: paymentIntentData } = useQuery({
    queryKey: ["createPaymentIntent"],
    queryFn: () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    enabled: !!hotelId && numberOfNights > 0,
  });

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(
        (new Date(search.checkOut).getTime() -
          new Date(search.checkIn).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  if (!hotel) {
    return <span>Hotel not found</span>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />

      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Bookings;
