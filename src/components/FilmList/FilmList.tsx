import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Film, GetFilmsResponse } from "../../models/Film";
import Card from "../UI/card/Card";
import classes from "./FilmList.module.css";

const FilmList = () => {
  const [films, setFilms] = useState<Film[]>([]);

  const fetchFilmsHandler = useCallback(async () => {
    try {
      const filmsFetchedObj = await axios.get<GetFilmsResponse>(
        "https://......"
      );

      console.log(filmsFetchedObj.data.films);
      const allFilms = filmsFetchedObj.data.films;
      setFilms(allFilms);
    } catch (err) {
      setFilms([]);
    }
  }, []);

  useEffect(() => {
    fetchFilmsHandler();
  }, [fetchFilmsHandler]);

  return (
    <div className={classes["list-films"]}>
      {films.map((film) => {
        const {
          Name,
          Description,
          Added_Time_Utc,
          Duration_Minutes,
          Genders,
          Image_Url,
          Saga,
          Stars,
        } = film;
        return (
          <Card
          key={`${Saga}_${Name}`}
            Name={Name}
            Description={Description}
            Added_Time_Utc= {Added_Time_Utc}
            Duration_Minutes={Duration_Minutes}
            Genders={Genders}
            Image_Url={Image_Url}
            Saga={Saga}
            Stars={Stars}
          />
        );
      })}
    </div>
  );
};

export default FilmList;
