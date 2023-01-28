import { ILastKey } from "../../../models/Film";
import classes from "./Button.module.css";

interface IButton {
  text: string;
  params: ILastKey | null;
  fxClick(params: ILastKey | null): Promise<void>;
}

const Button: React.FC<IButton> = (props) => {
  //const handleONClick = () => {};

  return (
    <button
      className={classes["button-34"]}
      onClick={props.fxClick.bind(null, props.params)}
    >
      {props.text}
    </button>
  );
};

export default Button;
