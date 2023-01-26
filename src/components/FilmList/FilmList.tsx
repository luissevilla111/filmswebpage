import Card from "../UI/card/Card";
import classes from "./FilmList.module.css";

const FilmList = () => {
  return (
    <div className={classes["list-films"]}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default FilmList;
