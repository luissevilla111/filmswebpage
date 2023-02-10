import { Film, SweetAlert } from "../../../models/Film";
import classes from "./Card.module.css";
import Stat from "./Stat/Stat";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.REACT_APP_API_FILMS
  ? process.env.REACT_APP_API_FILMS
  : "";
const Card: React.FC<{
  film: Film;
  isEditing: boolean;
  refreshPageByDelete?: (name: string, saga: string) => {};
}> = (props) => {
  const myStyle = {
    backgroundImage: `url(${props.film.Image_Url})`,
    backgroundSize: "cover",
  };

  const showAlert = async (alertObj: SweetAlert) => {
    const { icon, text, title, showCloseButton, showConfirmButton } = alertObj;
    return await Swal.fire({
      icon,
      title,
      text,
      showCloseButton,
      showConfirmButton,
    });
  };

  const deleteFilm = async (name: string, saga: string) => {
    console.log(name, saga);
    try {
      const resultAlert = await showAlert({
        icon: "warning",
        title: `Are you sure you want to delete this film ${name}?`,
        text: "This operation can not be undo",
        showCloseButton: true,
        showConfirmButton: true,
      });

      if (!resultAlert.isConfirmed) {
        console.log("No Elimines");
        return;
      }
      console.log("Eliminar");
      const filmDeleted = await axios.delete<{ message: string }>(
        `${API_URL}/films`,
        {
          data: {
            name,
            saga,
          },
        }
      );

      console.log(filmDeleted.data.message);
      if (filmDeleted.data.message === "deleted") {
        await showAlert({
          icon: "success",
          title: "Success",
          text: "The Film was Deleted Correctly",
        });
      }
      if (props.refreshPageByDelete)
        await props.refreshPageByDelete(name, saga);
    } catch (err) {}
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
      <div
        className={classes["icon-container"]}
        onClick={deleteFilm.bind(null, props.film.Name, props.film.Saga)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </div>
  );
};

export default Card;
