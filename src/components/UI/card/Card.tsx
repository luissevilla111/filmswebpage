import { Film } from "../../../models/Film";
import classes from "./Card.module.css";
import Stat from "./Stat/Stat";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark,faTrash } from "@fortawesome/free-solid-svg-icons";

const Card: React.FC<{ film: Film; isEditing: boolean }> = (props) => {
  const myStyle = {
    backgroundImage: `url(${props.film.Image_Url})`,
    backgroundSize: "cover",
  };

  const getShortenText = (text: string) => {
    return text.substring(0, 200).concat("...");
  };

  return (
    <div className={classes["card-holder"]}>
      <div
        className={`${classes["card-container"]} ${
          props.isEditing ? classes["card-edit"] : ""
        }`}
      >
        <div className={classes["card-img"]} style={myStyle}>
          {/* <img src={props.film.Image_Url} alt="no imag"></img> */}
        </div>
        <div className={classes["card-info"]}>
          <h2>{props.film.Name}</h2>
          <p>{getShortenText(props.film.Description)}</p>
        </div>
        <div className={classes["card-stats"]}>
          <Stat desc="Stars" value={+props.film.Stars} isStar={true}></Stat>
          <Stat
            desc="Minutes"
            value={+props.film.Duration_Minutes}
            isStar={false}
          ></Stat>
        </div>
      </div>
      <div className={classes["icon-container"]}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};

export default Card;
