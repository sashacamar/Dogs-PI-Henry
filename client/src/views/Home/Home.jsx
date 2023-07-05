import Dogs from "../../components/Dogs/Dogs";
import Filters from "../../components/Filters/Filters";
import Order from "../../components/Order/Order";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from './Home.module.css'

import { getDogs } from '../../redux/actions'


import loading_gif from '../../utils/assets/loading.gif'
import error_img from '../../utils/assets/error.png'

const Home = () => {
    //Estado de errores por buscar por nombre
    const error = useSelector(state=>state.errors)
    
    //---Armado de Paginado
    const dogsState = useSelector(state=>state.dogs)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    let totalItems = dogsState.length;
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePreviousPage = ()=> currentPage > 1 && setCurrentPage(currentPage - 1)
    const handleFirstPage = ()=> setCurrentPage(1)
    const handleNextPage = ()=> currentPage < totalPages && setCurrentPage(currentPage + 1)
    const handleLastPage = ()=> setCurrentPage(totalPages)
    
    //---Filtrado por Origen
    const [origin, setOrigin] = useState('')
    const originHandler = (origin)=>setOrigin(origin)
    const filterByOrigin = (arrayDogs)=>{
        if (origin === 'DDBB') return arrayDogs.filter(dog=>dog.created === true)
        if (origin === 'API') return arrayDogs.filter(dog=>dog.created === false)
        return arrayDogs;
    }

    //---Filtrado por temperamentos
    const [temp, setTemp] = useState([])
    const temperamentsHandler = (temperament)=>{
        if(temperament === 'deselect') return setTemp([])
        if(temp.includes(temperament)) setTemp(temp.filter(name=>name!==temperament))
        else setTemp([...temp, temperament])
    }
    const filterByTemperaments = (arrayDogs)=>{
        if(!temp.length) return arrayDogs;
        return arrayDogs.filter(dog =>temp.every(tempe =>dog.temperaments && dog.temperaments.includes(tempe)));
    }

    //---Ordenar info (asc y desc) 
    const [sort, setSort] = useState({
        key:'',
        order:''
    })
    const sortHandler = (key , order)=> setSort({
        key : key,
        order : order
    })
    const sortDogs = (arrayDogs)=>{
        switch(sort.key){
            case 'byName':
                if(sort.order === 'asc') return arrayDogs.sort((a,b)=>a.name.localeCompare(b.name)); 
                if(sort.order === 'desc') return arrayDogs.sort((a,b)=>b.name.localeCompare(a.name));
                break;
            case 'byWeightMin':
                if(sort.order === 'asc') return arrayDogs.sort((a,b)=>a.weightMin - b.weightMin)
                if(sort.order === 'desc') return arrayDogs.sort((a,b)=>b.weightMin - a.weightMin)
                break;
            case 'byWeightMax':
                if(sort.order === 'asc') return arrayDogs.sort((a,b)=>a.weightMax - b.weightMax)
                if(sort.order === 'desc') return arrayDogs.sort((a,b)=>b.weightMax - a.weightMax)
                break;
            default: return arrayDogs
        }
    }

    //---Array de perros a mostrar
    let dogs = dogsState;
    
    dogs = sortDogs(dogs);
    dogs = filterByOrigin(dogs)
    dogs = filterByTemperaments(dogs)
    totalItems = dogs.length;
    totalPages = Math.ceil(totalItems / itemsPerPage)

    //volver a la pagina 1 si hay modificaciones en la cant de paginas totales
    useEffect(()=>{
        if(currentPage>totalPages) handleFirstPage()
    },[totalPages])

    //Cargar el array de perros cuando se monte la view de home
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getDogs());
    },[])

    return (
        <div className={style.homeContainer}>
            <Order
            state={sort}
            sortHandler={sortHandler}
            />

            <Filters
            originState={origin}
            originHandler={originHandler}
            temperamentsHandler={temperamentsHandler}
            handleFirstPage={handleFirstPage}
            currentTemperaments={temp}
            />

            <div className={style.pagesContainer}>
                <button onClick={handleFirstPage}>START</button>
                <p>{"<"}</p>
                <button onClick={handlePreviousPage}>PREVIOUS</button>
                <p className={style.numberPage}>{currentPage}</p>
                <p>of</p>
                <p className={style.numberPage}>{totalPages}</p>
                <p>pages</p>
                <button onClick={handleNextPage}>NEXT</button>
                <p>{">"}</p>
                <button onClick={handleLastPage}>END</button>
            </div>
            {!dogsState.length 
            ?(<div className={style.loading}>
                <img src={loading_gif} alt="loading..." />
            </div>)
            :(<>{
                (dogsState.length && !dogs.length) || (error === "dogs not found")
                ?(<div className={style.noFound}>
                    <img src={error_img} alt="ERROR-404" />
                    <div className={style.errorText}>
                        <h1>UPS!</h1>
                        <p>No dog with these characteristics was found.</p>
                    </div>
                </div>
                )
                :(<Dogs
                dogs = {dogs}
                currentPage = {currentPage}
                itemsPerPage = {itemsPerPage}
                />)
            }</>)}
            <div className={style.pagesContainer}>
                <button onClick={handleFirstPage}>START</button>
                <p>{"<"}</p>
                <button onClick={handlePreviousPage}>PREVIOUS</button>
                <p className={style.numberPage}>{currentPage}</p>
                <p>of</p>
                <p className={style.numberPage}>{totalPages}</p>
                <p>pages</p>
                <button onClick={handleNextPage}>NEXT</button>
                <p>{">"}</p>
                <button onClick={handleLastPage}>END</button>
            </div>
            <div className={style.totalDogs}>Total dogs: {totalItems}</div>
        </div>
    )
}

export default Home;