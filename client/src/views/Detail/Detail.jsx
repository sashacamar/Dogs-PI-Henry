import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog } from "../../redux/actions";
import { useLocation } from "react-router-dom";
import style from './Detail.module.css'

const Detail = () => {
    const id = (((useLocation()).pathname).split('/')).at(-1)
    const dog = useSelector(state=>state.dog)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDog(id))
    },[])
    
    return <div>
        {
            String(dog.id) === id
            ? (<div className={style.detailContainer}>
                <h1>{dog.name}</h1>
                <img src={dog.image} alt="Perro" />
                <p>Altura: {dog.heightMin} cm - {dog.heightMax} cm</p>
                <p>Peso: {dog.weightMin} kg - {dog.weightMax} kg</p>
                <p>Esperanza de vida: {dog.life_spanMin} años - {dog.life_spanMax} años</p>
                <p>Temperamentos: </p>
                {dog.temperaments.map(temperament=>
                    <p>{temperament}</p>
                )}
            </div>)
            : (<p>cargando...</p>)
        }
    </div>
}

export default Detail;