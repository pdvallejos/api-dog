import React from 'react'
import { Link } from 'react-router-dom'
import { getByName, getTemperaments, selectData } from '../../action'
// import { filterTemperament, getByName, getTemperament, orderDogs, resetPage, selectData } from '../../Redux/actions'
import style from "./NavBar.module.css"
import { useDispatch } from 'react-redux'



export default function NavBar() {
const dispatch = useDispatch();

    function handleHome(){
        dispatch(getByName(""))
        dispatch(selectData('All'))
    }
    return (
        <div className={style.nav}>
            <div className={style.title}  >
            <Link className={style.dogapp} onClick={()=>handleHome()} to="/home"> <h1 > Dogs App</h1></Link>
            <div className={style.links} >
            <Link onClick={()=>handleHome()} to="/home"><p className={style.p}>Home</p></Link>
            <Link onClick={()=>dispatch(getTemperaments())} to="/create"><p className={style.p}>Create</p></Link>
            <Link to="/AboutMe"><p className={style.p}>About me</p></Link>
            </div>
            </div>
        </div>
    )
}
