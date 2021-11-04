import { useSelector , useDispatch} from 'react-redux'
import { filterTemperament, resetPage } from '../../action'
import style from "./FilterTemperaments.module.css"

export default function FilterTemperaments() {
  const temperaments = useSelector(state => state.Temperaments)
  const dispatch = useDispatch()
  
  
  
  
  function handleChange(e){
    e.preventDefault()
    dispatch(filterTemperament(e.target.value))
    dispatch(resetPage())
    // dispatch(searchStatus(true))
  } 
    
  
  
  
    return (
      <div className={style.back}>
          <span className={style.spanSelect}>Filter</span>
          <select onChange={(e) => handleChange(e)}  name="temperaments" id="temperaments">
              <option value="">Select</option>
              <option value="All">All</option>
            {temperaments.map((e,idx) => 
              <option key={idx} value={e.name}>{e.name}</option>
              )}
          </select>
      </div>
    )
  }