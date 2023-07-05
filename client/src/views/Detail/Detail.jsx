import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog } from "../../redux/actions";
import { useLocation } from "react-router-dom";
import style from './Detail.module.css'
import loading_gif from '../../utils/assets/loading.gif'


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
                <div className={style.imgContainer}>
                    <img src={dog.image} alt="Perro" />
                </div>
                <div className={style.infoContainer}>
                    <h1>{dog.name}</h1>
                    <div className={style.info}>
                        <h3>height: </h3>
                        <p>{dog.heightMin} cm - {dog.heightMax} cm</p>
                    </div>
                    <div className={style.info}>
                        <h3>weight: </h3>
                        <p>{dog.weightMin} kg - {dog.weightMax} kg</p>
                    </div>
                    <div className={style.info}>
                        <h3>life span: </h3>
                        <p>{dog.life_spanMin} years - {dog.life_spanMax} years</p>
                    </div>
                    <div className={style.temperamentsContainer}>
                        <h3>Temperaments: </h3>
                        {dog.temperaments.map(temperament=>
                            <p>{temperament},</p>
                        )}
                    </div>
                </div>
            </div>)
            : (<div className={style.loading}>
                <img src={loading_gif} alt="loading..." />
            </div>)
        }
    </div>
}

export default Detail;