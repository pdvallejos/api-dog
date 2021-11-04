import React, { useEffect, useState } from 'react'
import CardsDogs from '../CardsDogs/CardsDogs'
import style from './Home.module.css'
import Search from '../Search/Search'
import NavBar from '../NavBar/NavBar'
import Paginate from '../Paginate/Paginate'
import { useSelector, useDispatch } from 'react-redux'
import { filterTemperament, getDogs, getTemperaments } from '../../action'


export default function Home() {

    let dogState = useSelector((state) => state.oneDogs);
    const dispatch = useDispatch()
    const data = useSelector((state) => state.data)
    const [currentPage, setCurrentPage] = useState(1)
    const [xPage] = useState(8)
    const filterTemp = useSelector((state) => state.filterTemp);

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
        dispatch(filterTemperament('All'))
    }, [dispatch]);

    let resultD = dogState;
    if (data === 'Created'){
        resultD = dogState.filter(e => typeof(e.id) === 'string')
    } else if (data === 'Other'){
        resultD = dogState.filter(e => typeof(e.id) === 'number')
    }

    const indexLast = currentPage * xPage;
    const indexFirst = indexLast - xPage;
    const currentDog = resultD.slice(indexFirst, indexLast);
    const paginate = (pageNumber) =>{setCurrentPage(pageNumber)};
    const allpages = Math.ceil(resultD.length / xPage)
    var next = currentPage;
    var previus = currentPage;

    if(currentPage < allpages){
        next = currentPage + 1;
    };
    if(currentPage > 1){
        previus = currentPage - 1;
    };

    if (dogState && filterTemp !== undefined){
    
        // eslint-disable-next-line array-callback-return
        dogState = dogState.filter((e) => {
          if (filterTemp === "All") {

            return dogState;
          } else if (e.temperament !== undefined) {
            return e.temperament.split(",").join("").match(filterTemp);
          }
        });
      }

    return (
        <div>

            <div className={style.background}>
            <NavBar/>
            <Search/>
            <Paginate 
                xPage={xPage} 
                result={resultD.length} 
                paginate={paginate}
                previus={previus}
                next={next}
                />
            <div className={style.back}>
                <CardsDogs stateDog={currentDog}/>
            </div>
            </div>
        </div>
    )
}
