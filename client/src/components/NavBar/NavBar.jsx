import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ()=>{
    return(
        <div>
            <SearchBar/>
            <Link to='/home'>Home</Link>
            <Link to='/create'>New Dog</Link>
        </div>
    )
}

export default NavBar;