import { useState } from "react";
import "./App.css";
import { movies, slots, seats } from "./data";

function App() {
  const [movieState, setMovieState] = useState("");
  const [slotState, setSlotState] = useState("");
  const [seatsState, setSeatsState] = useState({ A1: 0, A2: 0, A3: 0, A4: 0, D1: 0, D2: 0 });

  function handleBook() {
    if (movieState === "") alert("movie not selected");
    else if (slotState === "") alert("slot not selected");
    else if (Object.values(seatsState).reduce((acc, obj) => acc + obj) < 1) alert("seat not selected");
  }
  return (
    <div className='container'>
      <main>
        <div className='movie-row'>
          <h3 className='row-heading'>Select A Movie</h3>
          {movies.map((movie) => (
            <div key={movie} onClick={() => setMovieState(movie)} className={`movie-column ${movieState === movie && "movie-column-selected"}`}>
              {movie}
            </div>
          ))}
        </div>

        <div className='slot-row'>
          <h3 className='row-heading'>Select a Time slot</h3>
          {slots.map((slot) => (
            <div key={slot} onClick={() => setSlotState(slot)} className={`slot-column ${slotState === slot && "slot-column-selected"}`}>
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
                onChange={(evt) => setSeatsState((prev) => ({ ...prev, [seat]: parseInt(evt.target.value) }))}
              />
            </div>
          ))}
        </div>
        <div className='book-button'>
          <button onClick={handleBook}>Book</button>
        </div>
      </main>
      <aside className='last-order'>
        <h3 className='row-heading'>Last Booking Details:</h3>
        <p>
          <b>seats:</b>
        </p>
        {Object.entries(seatsState).map(([key, value]) => (
          <p key={key} className='last-seats'>
            <b>{key}: </b> {value}
          </p>
        ))}
        <p>
          <b>slot: </b>10:00 AM
        </p>
        <p>
          <b>movie: </b>Tenet
        </p>
      </aside>
    </div>
  );
}

export default App;
