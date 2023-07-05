import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from './NavBar.module.css'
import homeImg from '../../utils/assets/icons/house-icon.png'
import createImg from '../../utils/assets/icons/plus-icon.png'
import { useLocation } from "react-router-dom";

const NavBar = ()=>{
    const location = useLocation();

    return(
        <div className={style.navBarContainer}>
            {location.pathname.includes('dog') || location.pathname.includes('create')
                ?(<></>)
                :(<SearchBar/>)
            }
            
            <div className={style.linksContainer}>
                <Link className={style.link} to='/home'>
                    <img className={style.homeImg} src={homeImg} alt="home" />
                </Link>
    
                {location.pathname.includes('create')
                    ?(<></>)
                    :(
                        <Link className={style.link} to='/create'>
                        <img className={style.createImg}  src={createImg} alt="create" />
                        New Dog
                        </Link>
                    )
                }
                
            </div>
        </div>
    )
}

export default NavBar;