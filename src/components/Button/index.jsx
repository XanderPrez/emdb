import styles from "./style.module.scss";

const empty = () => {};

const Button = (props) => {
  const type = props.type || "submit";
  const danger = props.danger || false;
  const cb = props.cb || empty;

  const classes = [styles.button, danger ? styles.danger : ""];

  return (
    <button type={type} className={classes.join(" ")} onClick={cb}>
      {props.children}
    </button>
  );
};

export { Button };
