import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { Button } from "./../../components/Button";
import { POST } from "./../../libs/http";
import styles from "./style.module.scss";

const Add = (props) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [poster, setPoster] = useState("");
  const [genres, setGenres] = useState([]);
  const [description, setDescription] = useState("");

  const submitData = async (event) => {
    event.preventDefault();

    const movie = { title, year, poster, genres, description };

    await POST("/movies", movie);
    props.addCallback();
    navigate("/");
  };

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
          <FaPlus /> Add to the database
        </Button>
      </div>
    </form>
  );
};

export default Add;
