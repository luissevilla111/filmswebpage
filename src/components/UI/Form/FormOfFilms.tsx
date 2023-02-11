import axios, { AxiosResponse } from "axios";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikErrors,
  FormikHelpers,
} from "formik";
import { useState } from "react";
import { Film, FilmAdd, SweetAlert } from "../../../models/Film";
import Card from "../card/Card";
import classes from "./FormOfFilms.module.css";
import Swal from "sweetalert2";

interface filmErrorForm {
  isNameError: boolean;
  isSagaError: boolean;
  isDescriptionError: boolean;
  isDurationError: boolean;
  isImageUrlError: boolean;
  isStarsError: boolean;
}

const INITIAL_STATE: filmErrorForm = {
  isNameError: false,
  isSagaError: false,
  isDescriptionError: false,
  isDurationError: false,
  isImageUrlError: false,
  isStarsError: false,
};

const API_URL = process.env.REACT_APP_API_FILMS
  ? process.env.REACT_APP_API_FILMS
  : "";

const FormOfFilms: React.FC<{ film: Film | null }> = (props) => {
  const [errorStateFilm, setErrorStateFilm] =
    useState<filmErrorForm>(INITIAL_STATE);

  const filmPassed = props.film;
  const [nameInput, setNameInput] = useState(filmPassed ? filmPassed.Name : "");
  const [sagaInput, setSagaInput] = useState(filmPassed ? filmPassed.Saga : "");
  const [descriptionInput, setDescriptionInput] = useState(
    filmPassed ? filmPassed.Description : ""
  );
  const [durationInput, setDurationInput] = useState(
    filmPassed ? filmPassed.Duration_Minutes.toString() : ""
  );
  const [imageUrlInput, setImageUrlInput] = useState(
    filmPassed ? filmPassed.Image_Url : ""
  );
  const [starsInput, setStarsInput] = useState(
    filmPassed ? filmPassed.Stars.toString() : ""
  );

  const nameInputOnChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const newName = event.currentTarget.value;

    setNameInput(newName);
  };

  const sagaInputOnChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const newSaga = event.currentTarget.value;

    setSagaInput(newSaga);
  };

  const descriptionInputOnChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const newDescription = event.currentTarget.value;

    setDescriptionInput(newDescription);
  };

  const durationInputOnChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const newDuration = event.currentTarget.value;
    console.log(newDuration);

    setDurationInput(newDuration);
  };

  const imageUrlInputOnChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const newImageUrl = event.currentTarget.value;

    setImageUrlInput(newImageUrl);
  };

  const starsInputOnChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const newStars = event.currentTarget.value;

    setStarsInput(newStars);
  };

  const addFilm = async (film: FilmAdd) => {
    try {
      const options: any = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      };
      let response: any = "";
      if (!filmPassed) {
        response = await axios.post<Film>(`${API_URL}/films`, film, options);
      } else {
        //console.log("Update");
        response = await axios.put<Film>(`${API_URL}/films`, film, options);
      }
      const response1 = response as AxiosResponse<Film, any>;
      const newFilm = response1.data;
      console.log("Film que ??");
      console.log(newFilm);
      return newFilm;
    } catch (err) {
      //Print Error
      console.log(err);
      return null;
    }
  };

  const restartValuesFom = () => {
    setNameInput("");
    setSagaInput("");
    setDescriptionInput("");
    setDurationInput("");
    setImageUrlInput("");
    setStarsInput("");
  };

  const showAlert = async (alertObj: SweetAlert) => {
    const { icon, text, title } = alertObj;
    await Swal.fire({
      icon,
      title,
      text,
    });
  };

  return (
    <div className={classes["full-page"]}>
      <div className={classes["form-view"]}>
        <div className={classes["form-container"]}>
          <div className={classes["form-inside"]}>
            <h1>Film Registration</h1>

            <Formik
              enableReinitialize={true}
              initialValues={{
                nameFilm: nameInput,
                sagafilm: sagaInput,
                descriptionFilm: descriptionInput,
                durationtionFilm: durationInput,
                imageUrlFilm: imageUrlInput,
                starsFilm: starsInput,
              }}
              validateOnMount={true}
              validate={(values) => {
                const errorAuxFilm: filmErrorForm = { ...INITIAL_STATE };
                console.log("mi ninitla State default");
                /* console.log(errorAuxFilm); */

                const errors: FormikErrors<{
                  nameFilm: string;
                  sagafilm: string;
                  descriptionFilm: string;
                  durationtionFilm: string;
                  imageUrlFilm: string;
                  starsFilm: string;
                }> = {};
                const {
                  nameFilm,
                  sagafilm,
                  descriptionFilm,
                  durationtionFilm,
                  imageUrlFilm,
                  starsFilm,
                } = values;
                if (nameFilm.length === 0) {
                  console.log("empty " + nameFilm);
                  errors.nameFilm = "Required";
                  errorAuxFilm.isNameError = true;
                }
                if (sagafilm.length === 0) {
                  errors.sagafilm = "Required";
                  errorAuxFilm.isSagaError = true;
                }
                if (descriptionFilm.length === 0) {
                  errors.descriptionFilm = "Required";
                  errorAuxFilm.isDescriptionError = true;
                }

                if (isNaN(+durationtionFilm) || durationtionFilm.length === 0) {
                  errors.durationtionFilm = "You need to put a valid number";
                  errorAuxFilm.isDurationError = true;
                }
                if (imageUrlFilm.length === 0) {
                  errors.imageUrlFilm = "Required";
                  errorAuxFilm.isImageUrlError = true;
                }

                const isStarNumber = !isNaN(+starsFilm);

                if (!isStarNumber || starsFilm.length === 0) {
                  errors.starsFilm = "You need to put a valid number";
                  errorAuxFilm.isStarsError = true;
                }

                if (isStarNumber) {
                  if (+starsFilm > 5) {
                    errors.starsFilm += "You need to put a valid number";
                    errorAuxFilm.isStarsError = true;
                  }
                }

                setErrorStateFilm(errorAuxFilm);

                /*   if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (!values.password) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                
                
                return errors; */
                /* console.log(errors);
                console.log(errorStateFilm); */
                /* console.log("update error Aux");
                console.log(errorStateFilm); */
                /* console.log(errors); */
                //console.log(errors);
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                /* setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));

                  setSubmitting(false);
                }, 400); */

                const {
                  sagafilm: saga,
                  nameFilm: name,
                  starsFilm: stars,
                  descriptionFilm: description,
                  durationtionFilm: durationMinutes,
                  imageUrlFilm: imageUrl,
                } = values;

                const filmToAdd: FilmAdd = {
                  saga,
                  name,
                  stars: +stars,
                  description,
                  addedTimeUtc: "",
                  durationMinutes,
                  imageUrl,
                  genders: [],
                };
                const newFilm = await addFilm(filmToAdd);

                if (!newFilm) {
                  console.log("Error Film No Added 1");
                  const alertObj: SweetAlert = {
                    icon: "error",

                    text: "the Film Was Not Added try again",
                    title: "Upps Something Went Wrong",
                  };
                  await showAlert(alertObj);

                  return;
                }

                const alertObj: SweetAlert = {
                  icon: "success",
                  title: "Perfect",
                  text: !filmPassed
                    ? "the Film was Created"
                    : "The Film Was Updated",
                };
                await showAlert(alertObj);
                setSubmitting(false);
                resetForm({ values });
                restartValuesFom();
                console.log("Film Added");
              }}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form>
                  {/* <ErrorMessage name="email" component="div" /> */}

                  <div className={classes["input-container"]}>
                    {/*  <label htmlFor="nameFilm">Name</label> */}
                    <Field
                      type="text"
                      name="nameFilm"
                      placeholder="Name"
                      onChange={nameInputOnChangeHandler}
                      /* value={nameInput} */
                      disabled={filmPassed}
                      className={` ${
                        errorStateFilm.isNameError ? classes["error-class"] : ""
                      }`}
                    />
                  </div>

                  <div className={classes["input-container"]}>
                    {/*  <label htmlFor="sagafilm">Saga</label> */}
                    <Field
                      type="text"
                      name="sagafilm"
                      placeholder="Saga"
                      className={` ${
                        errorStateFilm.isSagaError ? classes["error-class"] : ""
                      }`}
                      onChange={sagaInputOnChangeHandler}
                      disabled={filmPassed}
                      /* value={sagaInput} */
                    />
                  </div>
                  <div className={classes["input-container"]}>
                    {/*  <label htmlFor="descriptionFilm">Description</label> */}
                    <Field
                      component="textarea"
                      name="descriptionFilm"
                      placeholder="Descripion"
                      className={` ${
                        errorStateFilm.isDescriptionError
                          ? classes["error-class"]
                          : ""
                      }`}
                      onChange={descriptionInputOnChangeHandler}
                      value={descriptionInput}
                    />
                  </div>
                  <div className={classes["input-container"]}>
                    {/*  <label htmlFor="durationtionFilm">Duration Minutes</label> */}
                    <Field
                      type="text"
                      name="durationtionFilm"
                      placeholder="Duration Minutes"
                      className={` ${
                        errorStateFilm.isDurationError
                          ? classes["error-class"]
                          : ""
                      }`}
                      onChange={durationInputOnChangeHandler}
                      /*  value={durationInput} */
                    />
                  </div>
                  <div className={classes["input-container"]}>
                    {/* <label htmlFor="imageUrlFilm">Image URL</label> */}
                    <Field
                      type="text"
                      name="imageUrlFilm"
                      placeholder="Image URL"
                      className={` ${
                        errorStateFilm.isImageUrlError
                          ? classes["error-class"]
                          : ""
                      }`}
                      onChange={imageUrlInputOnChangeHandler}
                      /* value={imageUrlInput} */
                    />
                  </div>
                  <div className={`${classes["input-container"]}`}>
                    {/* <label htmlFor="starsFilm">Stars</label> */}
                    <Field
                      type="text"
                      name="starsFilm"
                      placeholder="Stars"
                      className={` ${
                        errorStateFilm.isStarsError
                          ? classes["error-class"]
                          : ""
                      }`}
                      onChange={starsInputOnChangeHandler}
                      /* value={starsInput} */
                    />
                  </div>

                  {/* <ErrorMessage name="password" component="div" /> */}

                  {/* <p>{isValid.toString()} valid</p>
                  <p>{dirty.toString()} dirty</p>
                  <p>Disabled : {(isValid && !dirty).toString()}</p> */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={`${classes["btn-form"]} ${
                      isSubmitting || !isValid
                        ? classes["btn-form-disabled"]
                        : ""
                    }`}
                  >
                    {filmPassed ? "UPDATE" : "CREATE"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className={classes["card-Section"]}>
          <Card
            film={{
              Name: nameInput,
              Added_Time_Utc: "",
              Description: descriptionInput,
              Duration_Minutes: durationInput,
              Genders: [],
              Image_Url: imageUrlInput,
              Saga: sagaInput,
              Stars: +starsInput,
            }}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  );
};

export default FormOfFilms;
