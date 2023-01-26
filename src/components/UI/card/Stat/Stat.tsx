import classes from "./Stat.module.css";

const Stat = () => {
  return (
    <div className={classes["stat"]}>
      <p className={classes["value"]}>180</p>
      <p className={classes["desc"]}>Duration</p>
    </div>
  );
};

export default Stat;
