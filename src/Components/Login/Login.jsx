import axios from "axios";
import Joi, { func } from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ logVer }) {
  const [joiErrors, setJoiErrors] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [clickedBtn, setClickedBtn] = useState(false);

  let nav = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUser(e) {
    let inputValue = e.target.value;
    let propertyName = e.target.id;
    let newUser = { ...user };
    newUser[propertyName] = inputValue;
    setUser(newUser);
    console.log(newUser);
  }

  function submitUser(e) {
    e.preventDefault();

    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().min(6).required().label("password"),
    });

    let joiRes = schema.validate(user, { abortEarly: false });
    if (joiRes.error == undefined) {
      sendUSer();
    } else {
      console.log(joiRes);
      setJoiErrors(joiRes.error.details);
    }
  }

  async function sendUSer() {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        user
      );

      if (response && response.data) {
        const { data } = response;

        console.log(data);
        if (response.data.message == "success") {
          // token
          localStorage.setItem("tkn", data.token);
          logVer();
          nav("/home");
        }
      } else {
        setApiMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);

      setApiMessage(error.response.data.message);
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
        <h3 className="mb-4">Login Form </h3>

        <form onSubmit={submitUser}>
          {apiMessage ? (
            <div className="alert alert-danger"> {apiMessage} </div>
          ) : null}

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

          <div className="group my-1">
            <label htmlFor="password">Password : </label>
            <input
              onChange={getUser}
              type="password"
              className=" mb-4 form-control"
              name="password"
              id="password"
              placeholder="password"
            />
          </div>
          {getSpecificError("password") ? (
            <div className=" alert alert-danger">
              {" "}
              {getSpecificError("password")}
            </div>
          ) : (
            ""
          )}
    <button className="btn btn-outline-warning d-block ms-auto">
            {clickedBtn == false ? (
              "Login"
            ) : (
              <i className="fa-solid fa-spinner fa-spin text-white "></i>
            )}
          </button>
       
        </form>
      </div>
    </>
  );
}
