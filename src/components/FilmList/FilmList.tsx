import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Film, GetFilmsResponse, ILastKey } from "../../models/Film";
import Button from "../UI/Button/Button";
import Card from "../UI/card/Card";
import classes from "./FilmList.module.css";

interface IPagination {
  firstPage: null;
  nextPage: ILastKey;
  previousPage: ILastKey;
}

const FilmList = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [pagination, setPagination] = useState<ILastKey | null>(null);

  const fetchFilmsHandler = useCallback(async (params: ILastKey | null) => {
    try {
      let uri = `${process.env.REACT_APP_API_FILMS}/films`;

      if (params) {
        uri += `?Saga=${params.Saga}&Name=${params.Name}`;
      }

      const filmsFetchedObj = await axios.get<GetFilmsResponse>(uri);

      console.log(filmsFetchedObj.data.films);
      const allFilms = filmsFetchedObj.data.films;
      const nextLink = filmsFetchedObj.data.lastKey
        ? filmsFetchedObj.data.lastKey
        : null;

      setPagination(nextLink);
      console.log(nextLink);
      setFilms(allFilms);
    } catch (err) {
      setFilms([]);
    }
  }, []);

  useEffect(() => {
    fetchFilmsHandler(null);
  }, [fetchFilmsHandler]);

  return (
    <>
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
          return <Card film={film} isEditing={false} key={`${Saga}_${Name}`} />;
        })}
      </div>
      <Button
        text={!pagination ? "Back to Page 1" : "Next..."}
        fxClick={fetchFilmsHandler}
        params={pagination}
      />
    </>
  );
};

export default FilmList;
