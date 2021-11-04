import React, {useEffect} from 'react'
import Card from '../Card/Card'
import {useDispatch, useSelector} from 'react-redux'
import {getDetails, getDogs, setLoading} from '../../action'
import {Link} from 'react-router-dom';
import Loading from '../Loading/Loading'
import style from './CardsDogs.module.css'

export default function CardsDogs({stateDog}) {
    const dispatch = useDispatch();
    // const allD = useSelector((state) => state.oneDogs)
    const loading = useSelector(state => state.loading)

    useEffect(() => {
        dispatch(setLoading())
        dispatch(getDogs())
    }, [dispatch])
    return (
        <div>
            { loading ? (<Loading/>) : (
                <ul className={style.grid}>
                {
                    stateDog?.map( (e, idx) => {
                        return <li key={idx}>
                            <Link onClick={() => dispatch(getDetails(e.id))} to={`/details/${e.id}`}>
                                <Card image={e.image} name={e.name} temperament={e.temperament} weight={e.weight} id={e.id}/>
                            </Link>
                        </li>
                    })
                }
                </ul>
            )}
        </div>
    )
}
