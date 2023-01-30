import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import { useState } from "react";
import Card from "../card/Card";
import classes from "./FormOfFilms.module.css";

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

const FormOfFilms = () => {
  const [errorStateFilm, setErrorStateFilm] =
    useState<filmErrorForm>(INITIAL_STATE);

  return (
    <div className={classes["full-page"]}>
      <div className={classes["form-view"]}>
        <div className={classes["form-container"]}>
          <div className={classes["form-inside"]}>
            <h1>Film Registration</h1>

            <Formik
              initialValues={{
                nameFilm: "",
                sagafilm: "",
                descriptionFilm: "",
                durationtionFilm: "",
                imageUrlFilm: "",
                starsFilm: "",
              }}
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
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));

                  setSubmitting(false);
                }, 400);
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
                    />
                  </div>

                  {/* <ErrorMessage name="password" component="div" /> */}

                  <button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    className={`${classes["btn-form"]} ${
                      !isValid || !dirty ? classes["btn-form-disabled"] : ""
                    }`}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className={classes["card-container"]}>
          <h2>Card</h2>
        </div>
      </div>
    </div>
  );
};

export default FormOfFilms;
