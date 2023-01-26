import classes from "./Card.module.css";
import Stat from "./Stat/Stat";

const Card = () => {
  return (
    <div className={`${classes["card-container"]} ${classes["grayscale"]}`}>
      <div className={classes["card-img"]}>
        <img
          src="https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2021/08/spider-man1.jpg?fit=1200%2C675&quality=60&strip=all&ssl=1"
          alt="no imag"
        ></img>
      </div>
      <div className={classes["card-info"]}>
        <h2>SPIDERMAN</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis,
          quaerat porro temporibus est quisquam mollitia fugit rerum ad, veniam
          vel hic? Officia nulla reiciendis ullam minus optio atque quisquam
          incidunt!
        </p>
      </div>
      <div className={classes["card-stats"]}>
        <Stat></Stat>
        <Stat></Stat>
      </div>
    </div>
  );
};

export default Card;
