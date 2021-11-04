import React from 'react'
import style from './Card.module.css'

export default function Card({name, image, temperament, weight, id}) {
    return(

        <div className={style.card}>
          
          <div className={style.imgCard} >
          <img  className={style.img} src={image}  alt={name} />
          </div>
          <span>
              <h3> {name} </h3> 
          </span>
          <hr />
          <div className={style.details}>
          <span>
              <strong>Weight: </strong> {weight}
          </span>
          {typeof(id) === "number" ?
          <span>
              <strong>Temperaments:</strong> {temperament}
          </span> :
          <span>
             <strong>Temperaments:</strong> {temperament.split(" ").join(", ")}
          </span> 
        
          }
          
          </div>
          
        
      </div>
      
      ) 
    }
    