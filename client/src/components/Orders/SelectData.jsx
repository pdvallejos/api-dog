import React from 'react'
import { useDispatch} from 'react-redux'
import { selectData } from '../../action'
import style from './SelectData.module.css'

export default function SelectData() {
    const dispatch = useDispatch()

    function handleFilterCreate(e){
        e.preventDefault()
        dispatch(selectData(e.target.value))
    }

    return (
        <div className={style.select}>
            <span className={style.spanSelect}>
            <select onChange={(e) => handleFilterCreate(e)} name="filtercreate" id="filtercreate">
                    <option value="All">All</option>
                    <option value="Created">Created</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </div>
    )
}
