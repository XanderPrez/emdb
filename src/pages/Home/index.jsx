import { useState, useEffect } from "react";
import { Card } from "./../../components/Card";
import { GET } from "./../../libs/http";
import styles from "./style.module.scss";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");

  const getData = async () => {
    const response = await GET("/movies");
    setMovies(response);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const data = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.genres.join().includes(search.toLowerCase())
    );
    setResults(data);
  }, [search, movies]);

  return (
    <section>
      <h1>Edgemony Movie DataBase</h1>
      <form className={styles.search}>
        <label htmlFor="search">Search by title or categories:</label>
        <input
          placeholder="ex: deadpool"
          type="text"
          name="search"
          autoComplete="off"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </form>
      <ul className={styles.list}>
        {results.map((movie, index) => (
          <li key={index}>
            <Card movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
