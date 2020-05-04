import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    toppings: "",
    si: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    size: "",
    toppings: "",
    si: "",
  });

  const [submitButton, setSubmitButtonToDisabled] = useState(true);

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "Must have two or more characters",
        (val) => val.length === 2
      )
      .required("You must input your name."),
    size: Yup.string(),
    toppings: Yup.boolean(),
    si: Yup.string(),
  });

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setSubmitButtonToDisabled(false);
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
        setFormData(res.data);
        setFormData({
          name: "",
          size: "",
          toppings: "",
          si: "",
        });
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <label>
        Name:
        <input
          name="name"
          type="text"
          onChange={(event) => handleChange(event)}
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      <label>
        <select id="size" name="size" onChange={(event) => handleChange(event)}>
          <option value="Large">Large</option>
          <option value="Medium">Medium</option>
          <option value="Small">Small</option>
          <option value="Heart Attack">Heart Attack</option>
        </select>
        {errors.name.length > 0 ? <p className="error">{errors.size}</p> : null}
      </label>
      <label>
        Pepperoni:
        <input
          name="toppings"
          type="checkbox"
          checked={false}
          onChange={(event) => handleChange(event)}
        />
        Sausage:
        <input
          name="toppings"
          type="checkbox"
          checked={false}
          onChange={(event) => handleChange(event)}
        />
        Pinapple:
        <input
          name="toppings"
          type="checkbox"
          checked={false}
          onChange={(event) => handleChange(event)}
        />
        Bacon:
        <input
          name="toppings"
          type="checkbox"
          checked={false}
          onChange={(event) => handleChange(event)}
        />
      </label>
      <label>
        Special Instructions:
        <textarea
          name="si"
          onChange={(event) => handleChange(event)}
        ></textarea>
        {errors.name.length > 0 ? <p className="error">{errors.si}</p> : null}
      </label>
      <button disabled={setSubmitButtonToDisabled}>Add to Order!</button>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </form>
  );
};

export default Form;
