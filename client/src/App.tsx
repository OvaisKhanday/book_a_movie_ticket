import { useEffect, useState } from "react";
import "./App.css";
import { movies, slots, seats } from "./data";

interface SeatsInterface {
  A1: number;
  A2: number;
  A3: number;
  A4: number;
  D1: number;
  D2: number;
}

interface Booking {
  movie: string;
  slot: string;
  seats: SeatsInterface;
}

function App() {
  const initialSeats: SeatsInterface = { A1: 0, A2: 0, A3: 0, A4: 0, D1: 0, D2: 0 };
  const [movieState, setMovieState] = useState<string>(localStorage.getItem("movie") ?? "");
  const [slotState, setSlotState] = useState<string>(localStorage.getItem("slot") ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seatsState, setSeatsState] = useState<SeatsInterface>(JSON.parse(localStorage.getItem("seats") ?? JSON.stringify(initialSeats)));

  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);

  async function getLatestBooking() {
    const response = await fetch("https://book-a-movie-ticket.onrender.com/api/booking");
    const body = await response.json();
    return { movie: body.movie, slot: body.slot, seats: body.seats };
  }

  useEffect(() => {
    getLatestBooking().then(setLatestBooking);
  }, []);

  async function handleBook() {
    if (movieState === "") alert("movie not selected");
    else if (slotState === "") alert("slot not selected");
    else if (Object.values(seatsState).reduce((acc: number, obj: number) => acc + obj, 0) < 1) alert("seat not selected");
    else {
      setIsSubmitting(true);
      fetch("https://book-a-movie-ticket.onrender.com/api/booking", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie: movieState, slot: slotState, seats: seatsState }),
      })
        .then(() => {
          getLatestBooking().then(setLatestBooking);

          localStorage.removeItem("movie");
          localStorage.removeItem("slot");
          localStorage.removeItem("seats");
          alert("Movie Ticket Added Successfully");
          setMovieState("");
          setSlotState("");
          setSeatsState(initialSeats);
        })
        .catch(() => {
          alert("There occurred an error");
        })
        .finally(() => setIsSubmitting(false));
    }
  }

  function updateMovie(movie: string) {
    setMovieState(movie);
    localStorage.setItem("movie", movie);
  }
  function updateSlot(slot: string) {
    setSlotState(slot);
    localStorage.setItem("slot", slot);
  }
  function updateSeats(seat: string, seats: number) {
    setSeatsState((prev) => ({ ...prev, [seat]: seats }));
    localStorage.setItem("seats", JSON.stringify(seatsState));
  }

  return (
    <>
      <h2>Book that show!!</h2>
      <div className='container'>
        <main>
          <div className='movie-row'>
            <h3 className='row-heading'>Select A Movie</h3>
            {movies.map((movie) => (
              <div key={movie} onClick={() => updateMovie(movie)} className={`movie-column ${movieState === movie && "movie-column-selected"}`}>
                {movie}
              </div>
            ))}
          </div>

          <div className='slot-row'>
            <h3 className='row-heading'>Select a Time slot</h3>
            {slots.map((slot) => (
              <div key={slot} onClick={() => updateSlot(slot)} className={`slot-column ${slotState === slot && "slot-column-selected"}`}>
                {slot}
              </div>
            ))}
          </div>

          <div className='seat-row'>
            <h3 className='row-heading'>Select the seats</h3>
            {seats.map((seat) => (
              <div key={seat} className={`seat-column ${seatsState[seat] > 0 && "seat-column-selected"}`}>
                <h4>Type {seat}</h4>
                <input
                  min={0}
                  type='number'
                  id='seat-A1'
                  name='A1'
                  value={seatsState[seat]}
                  onChange={(evt) => updateSeats(seat, parseInt(evt.target.value))}
                />
              </div>
            ))}
          </div>
          <div className='book-button'>
            {isSubmitting ? (
              <button disabled className='booking-loader'>
                booking...
              </button>
            ) : (
              <button onClick={handleBook}>Book</button>
            )}
          </div>
        </main>
        <aside className='last-order'>
          {latestBooking === null ? (
            <p>no previous booking found</p>
          ) : (
            <div>
              <h3 className='row-heading'>Last Booking Details:</h3>
              <p>
                <b>seats:</b>
              </p>
              {Object.entries(latestBooking.seats).map(([key, value]) => (
                <p key={key} className='last-seats'>
                  <b>{key}: </b> {value}
                </p>
              ))}
              <p>
                <b>slot: </b>
                {latestBooking.slot}
              </p>
              <p>
                <b>movie: </b>
                {latestBooking.movie}
              </p>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

export default App;
