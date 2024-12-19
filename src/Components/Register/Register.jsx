import axios from "axios";
import Joi, { func } from "joi";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";

export default function Register() {
  const [joiErrors, setJoiErrors] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [clickedBtn, setClickedBtn] = useState(false);

  let nav = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  function getUser(e) {
    setApiMessage("");
    let inputValue = e.target.value;
    let propertyName = e.target.id;
    let newUser = { ...user };
    newUser[propertyName] = inputValue;
    setUser(newUser);
    console.log(newUser);
  }

  function submitUser(e) {
    setClickedBtn(true);
    e.preventDefault();

    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(15).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().min(6).required().label("password"),
      rePassword: Joi.any()
        .valid(Joi.ref("password"))
        .required()
        .label("Confirm Password")
        .messages({ "any.only": "Passwords do not match" }),
      phone: Joi.string()
        .regex(/^01[0125][0-9]{8}$/)
        .required(),
    });

    let joiRes = schema.validate(user, { abortEarly: false });
    if (joiRes.error == undefined) {
      sendUSer();
    } else {
      console.log(joiRes);
      setJoiErrors(joiRes.error.details);
      setClickedBtn(false);
    }
  }

  async function sendUSer() {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        user
      );

      if (response && response.data) {
        const { data } = response;

        if (response.data.message == "success") {
          nav("/login");
        }
      } else {
        setApiMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);

      setApiMessage(error.response.data.message);

      setClickedBtn(false);
    }
  }

  function getSpecificError(key) {
    if (joiErrors != null) {
      for (let i = 0; i < joiErrors.length; i++) {
        if (joiErrors[i].context.key == key) {
          return joiErrors[i].message;
        }
      }

      return "";
    }
  }

  return (
    <>
      <div className="w-50 m-auto my-4">
        <h3 className="mb-4">Registration Form </h3>

        <form onSubmit={submitUser}>
          {apiMessage ? (
            <div className="alert alert-danger"> {apiMessage} </div>
          ) : null}
          <div className="group my-1">
            <label htmlFor="name">User Name : </label>
            <input
              onChange={getUser}
              type="text "
              className=" mb-4 form-control"
              name="name"
              id="name"
              placeholder="User Name"
            />
          </div>
          {getSpecificError("name") ? (
            <div className="alert alert-danger">
              {" "}
              {getSpecificError("name")}
            </div>
          ) : (
            ""
          )}
          <div className="group my-1">
            <label htmlFor="email">Email : </label>
            <input
              onChange={getUser}
              type="email"
              className=" mb-4 form-control"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          {getSpecificError("email") ? (
            <div className=" alert alert-danger">
              {" "}
              {getSpecificError("email")}
            </div>
          ) : (
            ""
          )}

          <div className="group my-1 ">
            <label htmlFor="password">Password : </label>
            <div className={style.icons}>
              <input
              type="password"
                onChange={getUser}
                className="  mb-4 form-control"
                name="password"
                id="password"
                placeholder="password"
              />
            </div>
          </div>
          {getSpecificError("password") ? (
            <div className=" alert alert-danger">
              {" "}
              {getSpecificError("password")}
            </div>
          ) : (
            ""
          )}

          <div className="group my-1">
            <label htmlFor="rePassword">rePassword : </label>
            <div className={style.icons}>
              <input
              type="password"
                onChange={getUser}
                className=" mb-4 form-control"
                name="rePassword"
                id="rePassword"
                placeholder="rePassword"
              />
            </div>
          </div>

          {getSpecificError("rePassword") ? (
            <div className=" alert alert-danger">
              {" "}
              {getSpecificError("rePassword")}
            </div>
          ) : (
            ""
          )}

          <div className="group my-1">
            <label htmlFor="phone">Phone :</label>
            <input
              onChange={getUser}
              type="tel "
              className=" mb-4 form-control"
              name="phone"
              id="phone"
              placeholder="Phone"
            />
          </div>
          {getSpecificError("phone") ? (
            <div className=" alert alert-danger">
              {" "}
              {getSpecificError("phone")}
            </div>
          ) : (
            ""
          )}

          <button className="btn btn-outline-warning d-block ms-auto">
            {clickedBtn == false ? (
              "Register"
            ) : (
              <i className="fa-solid fa-spinner fa-spin text-white "></i>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
