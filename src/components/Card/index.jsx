import { Link } from "react-router-dom";
import styles from "./style.module.scss";

const Card = (props) => {
  const { id, title, year, genres, description, poster } = props.movie;
  return (
    <div className={styles.card}>
      <h3>
        <Link to={`/edit/${id}`}>{title}</Link>
      </h3>
      <p className={styles.year}>{year}</p>
      <img src={poster} alt={title} />
      <p className={styles.description}>{description}</p>
      <ul className={styles.tags}>
        {genres.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
      <div className={styles.actions}></div>
    </div>
  );
};

export { Card };
