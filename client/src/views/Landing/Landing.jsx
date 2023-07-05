import style from "./Landing.module.css"
import { Link } from "react-router-dom";
import image from '../../utils/assets/shiba-dog.png'

const Landing = () => {
    return (
        <div className={style.landingConatiner}>
            <div className={style.landingImg}>
                <img src={image} alt="perro-landing" />
            </div>
            <div className={style.landingGo}>
                <h1 className={style.landingTitle}>{`< DOGS APP />`}</h1>
                <Link className={style.landingLink} to='/home'>
                    <h3 className={style.landingAccess}>GET IN</h3>
                </Link>
            </div>
        </div>
    )
}

export default Landing;