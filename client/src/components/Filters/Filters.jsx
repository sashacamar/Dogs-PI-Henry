import { useState } from 'react';
import style from './Filters.module.css'
import { useSelector } from "react-redux";

const Filters = ({originState,originHandler, temperamentsHandler, handleFirstPage, currentTemperaments})=>{
    const temperamentos = useSelector(state => state.temperaments)
    const [show, setShow] = useState(false);
    const showHandler = ()=>{
        !show && setShow(true);
        show && setShow(false);
    }

    return <div className={style.filtersContainer}>
        <div className={style.searchContainer}>
            <h3 className={style.title}>SEARCH BY</h3>
            <button className={originState==='ALL'?style.changeColor:''} onClick={()=>{originHandler('ALL');handleFirstPage()}}>ALL</button>
            <p>|</p>
            <button className={originState==='DDBB'?style.changeColor:''} onClick={()=>{originHandler('DDBB');handleFirstPage()}}>Data Base</button>
            <p>|</p>
            <button className={originState==='API'?style.changeColor:''} onClick={()=>{originHandler('API');handleFirstPage()}}>API</button>
        </div>
        <div className={style.temperamentsContainer}>
            <div className={style.titleContainer}>
                <button className={style.buttonShow} onClick={showHandler}>{show?"˄":"˅"}</button>
                <h3 className={style.title} onClick={showHandler}>Temperaments</h3>
                <button onClick={()=>{temperamentsHandler('deselect')}}>- deselect all -</button>
            </div>
            <div className={style.temperaments}>
                <div className={!show?style.noShow:style.show}>
                {temperamentos.map(temp => 
                    currentTemperaments.includes(temp)
                    ?(<button className={style.changeColor} key={temp} onClick={()=>{temperamentsHandler(temp)}}>{temp}</button>)
                    :(<button className='' key={temp} onClick={()=>{temperamentsHandler(temp)}}>{temp}</button>)
                )}
                </div>
            </div>                
        </div>
    </div>
}

export default Filters