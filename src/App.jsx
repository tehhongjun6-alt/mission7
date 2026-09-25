import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Row } from "react-bootstrap";

async function fetchMovies() {
  const response = await fetch(
    "https://api.sampleapis.com/movies/classic"
  );
  const data = await response.json();
  return data;
}

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    fetchMovies()
      .then((data) => setMovies(data))
      .catch((error) => {
        console.error(error);
        setErrorMessage("Unable to load movies.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredMovies = movies.filter((movie) => {
    return movie.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  return (
    <main className="app">
      <img className="logo" src="/uncut.png" alt="Uncut logo" />

      <input
        className="search-input"
        type="text"
        placeholder="Search movies..."
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <p className="movie-count">
        Movies found: {filteredMovies.length}
      </p>
      {loading && <p className="loading-message">Loading...</p>}
      {filteredMovies.length === 0 && !loading && (
        <p className="no-movies">
          No movies found. Try another title.
        </p>
      )}

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      <Row className="movie-list">
        {filteredMovies.map((movie) => {
          return (
            <Col
              className="movie-column"
              key={movie.id}
              xs={12}
              sm={6}
              md={4}
              lg={2}
            >
              <div className="movie-card">
                <img
                  className="movie-poster"
                  src={movie.posterURL}
                  alt={movie.title}
                  onError={(event) => {
                    event.currentTarget.src = "/movie-placeholder.png";
                  }}
                />

                <h2>{movie.title}</h2>
              </div>
            </Col>
          );
        })}
      </Row>
    </main>
  );
}

export default App;
