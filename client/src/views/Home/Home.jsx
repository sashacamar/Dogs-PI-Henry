import Dogs from "../../components/Dogs/Dogs";
import Filters from "../../components/Filters/Filters";
import Order from "../../components/Order/Order";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
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

    return (
        <div>
            <h1>Hola</h1>
            <Order
            sortHandler={sortHandler}
            />

            <Filters
            originHandler={originHandler}
            temperamentsHandler={temperamentsHandler}
            handleFirstPage={handleFirstPage}
            currentTemperaments={temp}
            />

            <p>Total perros: {totalItems}</p>
            <button onClick={handleFirstPage}>Pincipio</button>
            <button onClick={handlePreviousPage}>Atras</button>
            <p>{currentPage} de {totalPages} paginas</p>
            <button onClick={handleNextPage}>Siguiente</button>
            <button onClick={handleLastPage}>Final</button>
            {!dogsState.length 
            ?(<p>cargando...</p>)
            :(<>{
                dogsState.length && !dogs.length
                ?(<p>no se encontraron perros con esas caracteristicas</p>)
                :(<Dogs
                dogs = {dogs}
                currentPage = {currentPage}
                itemsPerPage = {itemsPerPage}
                />)
            }</>)}
            <button onClick={handlePreviousPage}>Atras</button>
            <p>{currentPage} de {totalPages} paginas</p>
            <button onClick={handleNextPage}>Siguiente</button>
        </div>
    )
}

export default Home;