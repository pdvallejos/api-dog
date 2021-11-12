import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByName } from "../../action";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import style from "./CreateDog.module.css";

const defaultForn = {
  name: "",
  height: "",
  weight: "",
  life_span: "",
  image: "",
  temperament: [],
  temperamentSelected: [],
};
const defaultMinMax = {
  heightMin: "",
  heightMax: "",
  weightMin: "",
  weightMax: "",
  life_spanMin: "",
  life_spanMax: "",
};

export default function Create() {
  const [form, setForm] = useState(defaultForn);
  const [create, setCreate] = useState(false);
  const [minMax, setMinMax] = useState(defaultMinMax);
  const [numbers, setNumbers] = useState({});
  const [validate, SetValidate] = useState(true);
  const history = useHistory();
  const temperament = useSelector((state) => state.Temperaments);
  const dispatch = useDispatch();

  useEffect(() => {
    let i = 1;
    let max = 100;
    let num = [];
    while (i < max) {
      num.push(i);
      i++;
    }
    setNumbers(num);
  }, []);
  useEffect(() => {
    if (
      parseInt(minMax.weightMin) < parseInt(minMax.weightMax) &&
      parseInt(minMax.heightMin) < parseInt(minMax.heightMax) &&
      parseInt(minMax.life_spanMin) < parseInt(minMax.life_spanMax)
    ) {
      setForm({
        ...form,
        weight: minMax.weightMin + " - " + minMax.weightMax,
        height: minMax.heightMin + " - " + minMax.heightMax,
        life_span: minMax.life_spanMin + " - " + minMax.life_spanMax,
      });
    } else {
      setForm({
        ...form,
        weight: "",
        height: "",
        life_span: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    minMax.heightMax,
    minMax.heightMin,
    minMax.life_spanMax,
    minMax.life_spanMin,
    minMax.weightMax,
    minMax.weightMin,
  ]);

  function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  function validateForm({
    name,
    life_span,
    height,
    weight,
    temperament,
    image,
  }) {
    if (
    
      name.trim().length > 2  && 
      life_span.length > 0 &&
      height.length > 0 &&
      weight.length > 0 &&
      temperament.length > 0 &&
      image.trim().length > 5
      
    ) {
      
    SetValidate(true)
      return true;
    }
    SetValidate(false)
      return false;
  }

  function handleTemperament(e) {
    if (
      form.temperament.length < 15 &&
      !form.temperament.includes(e.target.value)
    ) {
      e.preventDefault();
      const opciones = e.target.options;
      var seleccionadas = "";
      for (let i = 0; i < opciones.length; i++) {
        if (opciones[i].selected) {
          seleccionadas += opciones[i].label;
        }
      }

      setForm({
        ...form,
        temperament: [...form.temperament, e.target.value],
        temperamentSelected: [...form.temperamentSelected, seleccionadas],
      });
    }
  }

  function handleDeleteTemp(e) {
    e.preventDefault();
    let tempName = form.temperamentSelected;
    let allTemp = temperament;
    let tempAux = "";
    let tempid = form.temperament;
    let value = e.target.outerText;
    tempName = tempName.filter((e) => e + " x" !== value );
    allTemp.map((e) => {
      if (e.name + " x" === value) {
        tempAux = e.id;
      }
    });
    

    tempid = tempid.filter((i) => parseInt(i) !== tempAux);
    

    setForm({
      ...form,
      temperamentSelected: tempName,
      temperament: tempid,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validateForm(form)) {
      axios
      .post("http://localhost:3001/dog", form)
      .then((response) => {
        console.log(response);
        setForm(defaultForn);
        setCreate(true);
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
   
  }
  function handleAcep(e) {
    e.preventDefault();
    dispatch(getByName);
    history.push("/home");
    setForm(defaultForn);
  }

  function handleSelectNumber(e) {
    e.preventDefault();
    setMinMax({
      ...minMax,
      [e.target.name]: e.target.value,
    });
  }
  function handleAlert(e){
    e.preventDefault()
    SetValidate(true)
  }

  return (
    <div className={style.back}>
      {!create ? (
        <div>
          <form className={style.form} type="submit">
          <Link to={'/home'}>
          <button className={style.homeBack}>Back</button>
          </Link>
            <div className={style.formInt}>
              <h1>Create Dog</h1>
              <label className={style.formTxt}> Name:</label>
              <input
                autoComplete="off"
                maxLength="30"
                className={style.input}
                placeholder="name"
                onChange={(e) => {
                  handleChange(e);
                }}
                name="name"
                value={form.name}
                type="text"
              />
              <div className={style.minmaxBack}>
                <label className={style.formTxt}>Height:</label>
                <span>min:</span>
                <select
                  className={style.mimMaxSelector}
                  onChange={(e) => handleSelectNumber(e)}
                  name="heightMin"
                  id="heightMin"
                >
                  <option value="">min</option>
                  {numbers.length > 0 &&
                    numbers.map((e) => {
                      return (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      );
                    })}
                </select>

                <span>max:</span>
                <select
                  className={style.mimMaxSelector}
                  onChange={(e) => handleSelectNumber(e)}
                  name="heightMax"
                  id="heightMax"
                >
                  <option value="">max</option>
                  {numbers.length > 0 &&
                    numbers.map((e, idx) => {
                      return (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      );
                    })}
                </select>

                <label className={style.formTxt}> Weight:</label>

                <span>min:</span>
                <select
                  className={style.mimMaxSelector}
                  onChange={(e) => handleSelectNumber(e)}
                  name="weightMin"
                  id="weightMin"
                >
                  <option value="">min</option>
                  {numbers.length > 0 &&
                    numbers.map((e, idx) => {
                      return (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      );
                    })}
                </select>

                <span>max:</span>
                <select
                  className={style.mimMaxSelector}
                  onChange={(e) => handleSelectNumber(e)}
                  name="weightMax"
                  id="weightMax"
                >
                  <option value="">max</option>
                  {numbers.length > 0 &&
                    numbers.map((e, idx) => {
                      return (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      );
                    })}
                </select>

                <label className={style.formTxt}> Life Span:</label>
                <span>min:</span>
                <select
                  className={style.mimMaxSelector}
                  onChange={(e) => handleSelectNumber(e)}
                  name="life_spanMin"
                  id="life_spanMin"
                >
                  <option value="">min</option>
                  {numbers.length > 0 &&
                    numbers.map((e, idx) => {
                      return (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      );
                    })}
                </select>

                <span>max:</span>
                <select
                  className={style.mimMaxSelector}
                  onChange={(e) => handleSelectNumber(e)}
                  name="life_spanMax"
                  id="life_spanMax"
                >
                  <option value="">max</option>
                  {numbers.length > 0 &&
                    numbers.map((e, idx) => {
                      return (
                        <option key={e} value={e}>
                          {e}
                        </option>
                      );
                    })}
                </select>
              </div>

              <label className={style.formTxt}>Image:</label>
              <input
                autoComplete="off"
                className={style.input}
                placeholder="Paste url"
                onChange={(e) => {
                  handleChange(e);
                }}
                name="image"
                value={form.image}
                type="text"
              />

              <label className={style.tempSelect}>
                Temperaments:
                <select
                  className={style.mimMaxSelector}
                  onChange={(e) => handleTemperament(e)}
                  value={form}
                  type="checkbox"
                >
                  <option value="">Select</option>
                  {temperament !== undefined &&
                    temperament.map((e, idx) => (
                      <option key={idx} name={e.name} value={parseInt(e.id)}>
                        {e.name}
                      </option>
                    ))}
                </select>
              </label>

              <div className={style.tempcontains}>
                {form.temperamentSelected.length > 0 ? (
                  <div className={style.tempback}>
                    {form.temperamentSelected !== undefined &&
                      form.temperamentSelected.map((e, i) => {
                        return (
                          <p
                            onClick={(e) => handleDeleteTemp(e)}
                            value={e}
                            key={i}
                            className={style.btnTemp}
                          >
                            {e} x
                          </p>
                        );
                      })}
                  </div>
                ) : (
                  <span> add temperaments </span>
                )}
              </div>
              <div>
                {!validate ? 
              <div className={style.alert}>
                
                <p>
                Verify the data.
                 All fields are mandatory.
                 Respect min and max. 
                    <button
                    onClick={e => handleAlert(e)}
                    className={style.alettBtn}
                    >ok</button>
                    </p> </div> : <button
                  className={style.btnCreate}
                  onClick={(e) => handleSubmit(e)}
                >
                  CREATE
                  
                </button> }
                      
                
               
               
              </div>
                
            </div>
          </form>
        </div>
      ) : (
        <div className={style.backSucces} >
          <h1 className={style.succesCreate}>The new breed was successfully created
          <button className={style.succesBtn} onClick={(e) => handleAcep(e)}>OK</button></h1>
          
        </div>
      )}
    </div>
  );
}