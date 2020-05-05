import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    pep: false,
    sas: false,
    pin: false,
    bacon: false,
    si: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    pep: false,
    sas: false,
    pin: false,
    bacon: false,
    si: "",
  });

  const [post, setPost] = useState({});

  const [submitButton, setSubmitButton] = useState(true);

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .test("len", "Must have two or more characters", (val) => val.length > 2)
      .required("You must input your name."),
    size: Yup.string(),
    pep: Yup.boolean(),
    sas: Yup.boolean(),
    pin: Yup.boolean(),
    bacon: Yup.boolean(),
    si: Yup.string(),
  });

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setSubmitButton(!valid);
    });
  }, [formSchema, formData]);

  const validate = (e) => {
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const handleChange = (event) => {
    event.persist();
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
    validate(event);
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <label>
        Name:
        <input
          name="name"
          type="text"
          onChange={(event) => handleChange(event)}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <br />
      <br />
      <br />
      <label>
        Size:
        <select id="size" name="size" onChange={(event) => handleChange(event)}>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
          <option value="Heart Attack">Heart Attack</option>
        </select>
      </label>
      <br />
      <br />
      <br />
      <label>
        Pepperoni:
        <input
          name="pep"
          id="pep"
          type="checkbox"
          checked={formData.pep}
          onChange={(event) => handleChange(event)}
        />
        Sausage:
        <input
          name="sas"
          id="sas"
          type="checkbox"
          checked={formData.sas}
          onChange={(event) => handleChange(event)}
        />
        Pinapple:
        <input
          name="pin"
          id="pin"
          type="checkbox"
          checked={formData.pin}
          onChange={(event) => handleChange(event)}
        />
        Bacon:
        <input
          name="bacon"
          id="bacon"
          type="checkbox"
          checked={formData.bacon}
          onChange={(event) => handleChange(event)}
        />
      </label>
      <br />
      <br />
      <br />
      <label>
        Special Instructions:
        <textarea
          name="si"
          onChange={(event) => handleChange(event)}
        ></textarea>
      </label>
      <br />
      <br />
      <br />
      <button disabled={submitButton}>Add to Order!</button>
      <pre>Form State: {JSON.stringify(formData, null, 2)}</pre>
      <pre>Post Data: {JSON.stringify(post, null, 2)}</pre>
    </form>
  );
};

export default Form;
