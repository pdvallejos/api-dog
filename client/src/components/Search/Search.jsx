import React from 'react'
import {useState} from "react";
import {useDispatch} from "react-redux";
import { getByName } from '../../action';
import FilterTemperaments from '../Orders/FilterTemperaments';
import OrderDogs from '../Orders/Order';
import SelectData from '../Orders/SelectData';
import style from './Search.module.css';

export default function Search() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInput(e){
        e.preventDefault()
        setName(e.target.value)
    };
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getByName(name))
        setName("")
    }
    return (
        <div className={style.search}>
            <div className={style.all} action="">
                <input className={style.search}
                type="text"
                placeholder="Search Dog"
                onChange={(e) => handleInput(e)} 
                />
                <button className={style.btn} type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
                <div className={style.options}>
                    <SelectData/>
                    <OrderDogs/>
                    <FilterTemperaments/>
                </div>
            </div>
        </div>
    )
}
