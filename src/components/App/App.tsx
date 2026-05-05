import { useState } from "react";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import toast from "react-hot-toast";
import css from "./App.module.css";

export default function App() {
 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] =
    useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setMovies([]); 
      setError(false);
      setLoading(true);

      const data = await fetchMovies(query);

      if (!data.length) {
        toast.error("No movies found for your request.");
      }

      setMovies(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.app}>
      {}
      <SearchBar onSubmit={handleSearch} />

      {}
      {loading && <Loader />}

      {}
      {error && <ErrorMessage />}

      {}
      {!loading && !error && (
        <MovieGrid
          movies={movies}
          onSelect={setSelectedMovie}
        />
      )}

      {}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}