import style from './Form.module.css';
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { postDog } from '../../redux/actions';

const default_image = 'http://localhost:3001/dogs/default-image'

const Form = () => {
    const temperaments = useSelector(state => state.temperaments);

    const dispatch = useDispatch()

    const [dogData, setDogData] = useState({
        name:'', 
        heightMin:'', 
        heightMax:'', 
        weightMin:'', 
        weightMax:'', 
        life_spanMin:'', 
        life_spanMax:'',
        temperament:[]
    })
    
    const submitHandler = (event)=>{
        event.preventDefault();
        dispatch(postDog(dogData))
        setDogData({
            name:'', 
            heightMin:'', 
            heightMax:'', 
            weightMin:'', 
            weightMax:'', 
            life_spanMin:'', 
            life_spanMax:'',
            temperament:[]
        })
        /// este alert cambiarlo a algo bonico 
        alert('agregado exitosamente')
    }

    const temperamentsHandler = (value)=>{
        if(value === 'deselect') return setDogData({...dogData, temperament:[]})
        if(dogData.temperament.includes(value)) return setDogData({...dogData, temperament: dogData.temperament.filter(name=>name!==value)})
        else return setDogData({...dogData, temperament: [...dogData.temperament, value]})
    }

    function handleChange (event) {
        const key = event.target.name;
        const value = event.target.value;
        setDogData({...dogData, [key]:value})
    }

    return (
        <form className={style.formContainer}>
            <img className={style.formImg} src={default_image} alt="default_image" />

            <div className={style.formInputText}>
                <label>NOMBRE</label>
                <input className={style.inputText} type="text" name="name" value={dogData.name} onChange={handleChange}/>
            </div>

            <div className={style.formInputNumber}>
                <label>ALTURA</label>
                <input className={style.inputNumber} placeholder='min' type="number" name="heightMin" value={dogData.heightMin} onChange={handleChange}/>
                <p>cm - </p>
                <input className={style.inputNumber} placeholder='max' type="number" name="heightMax" value={dogData.heightMax} onChange={handleChange}/>
                <p>cm</p>
            </div>

            <div className={style.formInputNumber}>
                <label>PESO</label>
                <input className={style.inputNumber} placeholder='min' type="number" name="weightMin" value={dogData.weightMin} onChange={handleChange}/>
                <p>kg - </p>
                <input className={style.inputNumber} placeholder='max' type="number" name="weightMax" value={dogData.weightMax} onChange={handleChange}/>
                <p>kg</p>
            </div>

            <div className={style.formInputNumber}>
                <label>ESPERANZA DE VIDA</label>
                <input className={style.inputNumber} placeholder='min' type="number" name="life_spanMin" value={dogData.life_spanMin} onChange={handleChange}/>
                <p>años -</p>
                <input className={style.inputNumber} placeholder='max' type="number" name="life_spanMax" value={dogData.life_spanMax} onChange={handleChange}/>
                <p>años</p>
            </div>

            <div className={style.temperamentsContainer}>
                <h3>lista de temperamentos</h3>
                <div className={style.listTemperaments}>
                    <p onClick={()=>{temperamentsHandler('deselect')}}>deseleccionar todos</p>
                
                {temperaments.map(temp => 
                    dogData.temperament.includes(temp)
                    ?(<p className={style.red} key={temp} onClick={()=>{temperamentsHandler(temp)}}>{temp}</p>)
                    :(<p className='' key={temp} onClick={()=>{temperamentsHandler(temp)}}>{temp}</p>)
                )}
                </div>
            </div>
            <button className={style.buttonSubmit} type="submit" onClick={submitHandler}>SUBMIT</button>
        </form>
    )
}
export default Form;