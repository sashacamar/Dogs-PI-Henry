import style from './Filters.module.css'
import { useSelector } from "react-redux";

const Filters = ({originHandler, temperamentsHandler, handleFirstPage, currentTemperaments})=>{
    const temperamentos = useSelector(state => state.temperaments)

    return <div>
        <h3>Filtrar por:</h3>
        <button onClick={()=>{originHandler('DDBB');handleFirstPage()}}>DDBB</button>
        <button onClick={()=>{originHandler('API');handleFirstPage()}}>API</button>
        <button onClick={()=>{originHandler('ALL');handleFirstPage()}}>ALL</button>

        <h3>Temperamentos</h3>
        <button onClick={()=>{temperamentsHandler('deselect')}}>deseclecionar todos</button>
        {temperamentos.map(temp => 
            currentTemperaments.includes(temp)
            ?(<button className={style.red} key={temp} onClick={()=>{temperamentsHandler(temp)}}>{temp}</button>)
            :(<button className='' key={temp} onClick={()=>{temperamentsHandler(temp)}}>{temp}</button>)
        )}
    </div>
}

export default Filters