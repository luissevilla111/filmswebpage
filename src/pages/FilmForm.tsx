import FormOfFilms from "../components/UI/Form/FormOfFilms";
import { Film } from "../models/Film";
import { useLocation } from "react-router";

const FilmForm = () => {
  const location = useLocation();
  //console.log("Location");

  const filmState = location.state as Film;
  /* console.log(filmState); */
  const film = filmState ? filmState : null;
  return <FormOfFilms film={film} />;
};

export default FilmForm;
