import { Link } from "react-router-dom";
import style from './Dog.module.css'

const Dog = ({id, name, image, weightMin, weightMax, temperaments})=>{
    return(
        <div className={style.dogContainer}>
            <Link to={`/dog/${id}`}>
                <div className={style.dogImgContainer}>
                    <img src={image} alt="perro" />
                </div>
            </Link>
            <div className={style.infoContainer}>
                <p className={style.title}>{name}</p> 
                <p className={style.text}>{weightMin?weightMin:'--'} kg - {weightMax?weightMax:'--'} kg</p>
                <p className={style.text}>{temperaments[0]}{temperaments[1]&&`, ${temperaments[1]}`}{temperaments[2]&&'...'}</p>
            </div>
        </div>
    )
}

export default Dog;