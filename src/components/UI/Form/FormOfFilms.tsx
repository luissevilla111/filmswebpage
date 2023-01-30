import { Formik, Form, Field, ErrorMessage } from "formik";
import Card from "../card/Card";
import classes from "./FormOfFilms.module.css";
const FormOfFilms = () => {
  return (
    <div className={classes["full-page"]}>
      <div className={classes["form-view"]}>
        <div className={classes["form-container"]}>
          <div className={classes["form-inside"]}>
            <h1>Film Registration</h1>

            <Formik
              initialValues={{ email: "dd", password: "yy" }}
              validate={(values) => {
                const errors: any = {};

                if (!values.email) {
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

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));

                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {/* <ErrorMessage name="email" component="div" /> */}

                  <div className={classes["input-container"]}>
                    {/*  <label htmlFor="nameFilm">Name</label> */}
                    <Field type="text" name="nameFilm" placeholder="Name" />
                  </div>

                  <div className={classes["input-container"]}>
                    {/*  <label htmlFor="sagafilm">Saga</label> */}
                    <Field type="text" name="sagafilm" placeholder="Saga" />
                  </div>
                  <div className={classes["input-container"]}>
                    {/*  <label htmlFor="descriptionFilm">Description</label> */}
                    <Field
                      component="textarea"
                      name="descriptionFilm"
                      placeholder="Descripion"
                    />
                  </div>
                  <div className={classes["input-container"]}>
                    {/*  <label htmlFor="durationtionFilm">Duration Minutes</label> */}
                    <Field
                      type="text"
                      name="durationtionFilm"
                      placeholder="Duration Minutes"
                    />
                  </div>
                  <div className={classes["input-container"]}>
                    {/* <label htmlFor="imageUrlFilm">Image URL</label> */}
                    <Field
                      type="text"
                      name="imageUrlFilm"
                      placeholder="Image URL"
                    />
                  </div>
                  <div className={classes["input-container"]}>
                    {/* <label htmlFor="starsFilm">Stars</label> */}
                    <Field type="text" name="starsFilm" placeholder="Stars" />
                  </div>

                  {/* <ErrorMessage name="password" component="div" /> */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={classes["btn-form"]}
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
