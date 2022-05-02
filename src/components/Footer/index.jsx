import styles from "./style.module.scss";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <hr />
      <p>Copyright {year} Edgemony</p>
    </footer>
  );
};

export { Footer };
