import { useDispatch } from "react-redux";
import { getDogsByName } from "../../redux/actions";
import { useState } from "react";
import style from './SearchBar.module.css'

const SearchBar = ()=>{
    const [searchByName, setSearchByName] = useState({
        name:''
    })
    const dispatch = useDispatch()

    const changeHandler = (event)=>{
        const key = event.target.name;
        const value = event.target.value;
        setSearchByName({...searchByName, [key]:value})
        dispatch(getDogsByName({...searchByName, [key]:value}.name))
    };

    return(
        <div className={style.searchBarContainer}>
            <input className={style.input} placeholder="SEARCH BY RACE" type="text" name="name" value={searchByName.name} onChange={changeHandler}/>
        </div>
    )
}

export default SearchBar;