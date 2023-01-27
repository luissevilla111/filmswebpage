import classes from "./Stat.module.css";
import { Rating } from "react-simple-star-rating";
import { useState } from "react";

const Stat: React.FC<{ value: number; desc: string; isStar: boolean }> = (
  props
) => {
  const [rating, setRating] = useState(0);
  
  return (
    <div className={classes["stat"]}>
      <p className={classes["value"]}>
        {props.isStar ? (
          <Rating initialValue={+props.value} readonly={true} size={20} />
        ) : (
          props.value
        )}
      </p>
      <p className={classes["desc"]}>{props.desc}</p>
    </div>
  );
};

export default Stat;
