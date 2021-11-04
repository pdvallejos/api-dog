import React from 'react'
import styles from './Paginate.module.css'

export default function Paginado({xPage, result, paginate, next, previus}) {
   const pageNumber = [];
   
   for (let i = 1; i <= Math.ceil(result / xPage); i++){
       pageNumber.push(i)
   }

    return (

        <nav className={styles.nav} >
            <ul className={styles.p_ul}>
                <button className={styles.loader} onClick={() => paginate(previus)} >Before</button>
                {pageNumber.map(number => 
                <li className={styles.p_li} key={number} >
                    <div >
                    <button className={styles.p_button} onClick={() => paginate(number)} >
                        {number}
                    </button>
                    </div>
                </li>
                    )}
                <button className={styles.loader2} onClick={() => paginate(next)} > N e x t </button>
            </ul>
        </nav>

    )
}
