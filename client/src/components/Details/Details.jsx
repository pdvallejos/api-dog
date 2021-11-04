import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { resetDetails } from "../../action";
import Loading from "../Loading/Loading";
import style from "./Details.module.css";

export default function Details() {
  const history = useHistory()
  let result = useSelector((state) => state.detail);
  const loading = useSelector(state => state.loading)
  const { name, image, temperament, weight, height, life_span, id } = result;
  const dispatch = useDispatch()

  function handleBack(e) {
    e.preventDefault()
    history.goBack();
    dispatch(resetDetails())
  }

  return (
    <div className={style.back}>
      {loading ? (<Loading/>) : (
        <div className={style.card}>
          <button className={style.btn} onClick={(e) => handleBack(e)}>
            Back
          </button>

          <img className={style.img} src={image} alt="" />

          <div>
            <div className={style.title}>
              <h1>{name}</h1>
              <div className={style.details}>
                <span>
                  <strong>weight:</strong> {weight} kg
                </span>

                <span>
                  <strong>Height:</strong> {height} cm
                </span>

                {typeof id === "number" ? (
                  <>
                    <span>
                      <strong>Life span:</strong> {life_span}
                    </span>
                    <span>
                      <strong>Temperaments:</strong>
                      <div></div>
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <strong>Life span: </strong> {life_span} years
                    </span>
                    <span>
                      <strong>Temperaments:</strong>
                      <div></div>
                    </span>
                  </>
                )}
              </div>
              {typeof id === "number" ? (
                <div className={style.temp}>
                  <p>{temperament}</p>
                </div>
              ) : (
                <div className={style.temp}>
                  {temperament  && 
                  <p>{temperament.split(" ").join(", ")}</p>}
                  
                </div>
              )}
            </div>
          </div>
        </div>
      
      )}
    </div>
  );
}