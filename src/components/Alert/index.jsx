import styles from "./style.module.scss";

export const Alert = (props) => {
  const visible = props.visible || false;
  const content = props.content || "Testo da visualizzare";
  const backgroundColor = props.backgroundColor || visible;

  const classes = [styles.alert, visible ? styles.visible : ""];

  return (
    <div className={classes.join(" ")}>
      <p>{content}</p>
    </div>
  );
};
