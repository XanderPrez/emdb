import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import { Button } from "./../../components/Button";
import { GET, PUT, DELETE } from "./../../libs/http";
import styles from "./style.module.scss";

const Edit = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [poster, setPoster] = useState("");
  const [genres, setGenres] = useState([]);
  const [description, setDescription] = useState("");

  const submitData = async (event) => {
    event.preventDefault();

    const movie = { title, year, poster, genres, description };

    await PUT("/movies", id, movie);
    props.editCallback();
    navigate("/");
  };

  const deleteMovie = async () => {
    await DELETE("/movies", id);
    props.deleteCallback();
    navigate("/");
  };

  const getData = async () => {
    const data = await GET(`/movies/${id}`);
    setTitle(data.title);
    setYear(data.year);
    setPoster(data.poster);
    setGenres(data.genres);
    setDescription(data.description);
  };

  /* eslint-disable */
  useEffect(() => {
    getData();
  }, []);

  return (
    <form className={styles.form} onSubmit={submitData}>
      <h3>Create a new movie card</h3>
      <div className={styles.row}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          placeholder="My movie title"
          autoComplete="off"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          name="year"
          min="1895"
          max={year}
          value={year}
          onChange={(event) => setYear(parseInt(event.target.value))}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="poster">Poster:</label>
        <input
          type="url"
          name="poster"
          placeholder="https://i.picsum.photos/id/317/200/300.jpg"
          value={poster}
          onChange={(event) => setPoster(event.target.value)}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="genres">Genres:</label>
        <input
          type="text"
          autoComplete="off"
          name="genres"
          placeholder="action, comedy, dramatic"
          value={genres.join()}
          onChange={(event) => setGenres(event.target.value.split(","))}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </div>
      <div className={styles.actions}>
        <Button>
          <FaPen /> Edit movie
        </Button>

        <Button type="button" danger={true} cb={deleteMovie}>
          <FaTrash /> Delete movie
        </Button>
      </div>
    </form>
  );
};

export default Edit;
