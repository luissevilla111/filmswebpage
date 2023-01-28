import { Film } from "../../../models/Film";
import classes from "./Card.module.css";
import Stat from "./Stat/Stat";
import React from "react";

const Card: React.FC<Film> = (props) => {
  const myStyle = {
    backgroundImage: `url(${props.Image_Url})`,
    backgroundSize: "cover",
  };

  const getShortenText = (text: string) => {
    return text.substring(0, 200).concat("...");
  };

  return (
    <div className={`${classes["card-container"]} ${classes["grayscale"]}`}>
      <div className={classes["card-img"]} style={myStyle}>
        {/* <img src={props.Image_Url} alt="no imag"></img> */}
      </div>
      <div className={classes["card-info"]}>
        <h2>{props.Name}</h2>
        <p>{getShortenText(props.Description)}</p>
      </div>
      <div className={classes["card-stats"]}>
        <Stat desc="Stars" value={+props.Stars} isStar={true}></Stat>
        <Stat
          desc="Minutes"
          value={+props.Duration_Minutes}
          isStar={false}
        ></Stat>
      </div>
    </div>
  );
};

export default Card;
