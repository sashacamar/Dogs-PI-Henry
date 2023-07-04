import { Link } from "react-router-dom";
import style from './Dog.module.css'

const Dog = ({id, name, image, weightMin, weightMax})=>{
    return(
        <div className={style.dogContainer}>
            <Link to={`/dog/${id}`}>
                <img src={image} alt="perro" />
            </Link>
            <p>name: {name}</p> 
            <p>peso: {weightMin} kg - {weightMax} kg</p>
        </div>
    )
}

export default Dog;