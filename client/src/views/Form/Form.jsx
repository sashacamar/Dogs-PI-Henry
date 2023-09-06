import style from './Form.module.css';
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { postDog } from '../../redux/actions';

//const default_image = 'http://localhost:3001/dogs/default-image'
const default_image = 'http://henry-pi-back-production.up.railway.app/dogs/default-image'

const Form = () => {
    const [windowSuccess, setWindowSuccess] = useState("")
    const windowSuccessHandler = ()=>{
        setWindowSuccess(false)
    }
    //Estado de errores en el form
    const error = useSelector(state=>state.errors)
    //Estado de errores en el form
    const temperaments = useSelector(state => state.temperaments);
    const [show, setShow] = useState(false);
    const showHandler = ()=>{
        !show && setShow(true);
        show && setShow(false);
    }

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
    
    const submitHandler = async(event)=>{
        event.preventDefault();
        if((await dispatch(postDog(dogData))).type !=="ERROR"){
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
            setWindowSuccess(true)
        }
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

            {error
            ?(<p style={{color:"red"}}>{error}</p>)
            :(<></>)
            }
            {windowSuccess 
            ?(<div className={style.window}>
                <p onClick={windowSuccessHandler}>X</p>
                <h1>New dog was successfully created</h1>
            </div>)
            :(<></>)
            }

            <div className={style.imageContainer}>
                <img className={style.formImg} src={default_image} alt="default_image" />
            </div>

            <div className={style.inputsContainer}>
                <div className={style.formInputText}>
                    <input placeholder='INSERT RACE NAME' className={(error!==null && error.includes('Name'))?style.inputTextError:style.inputText} type="text" name="name" value={dogData.name} onChange={handleChange}/>
                    {(error!==null && error.includes('Name'))
                    ?(<p className={style.error}>{error}</p>)
                    :(<></>)
                    }
                </div>

                <div className={style.formInputNumber}>
                    <label>Height</label>
                    <input className={(error!==null && error.includes('Height min'))?style.inputNumberError:style.inputNumber} placeholder='min' type="number" name="heightMin" value={dogData.heightMin} onChange={handleChange}/>
                    <p>cm - </p>
                    <input className={(error!==null && error.includes('Height max'))?style.inputNumberError:style.inputNumber} placeholder='max' type="number" name="heightMax" value={dogData.heightMax} onChange={handleChange}/>
                    <p>cm</p>
                </div>
                    {(error!==null && error.includes('Height'))
                    ?(<p className={style.error}>{error}</p>)
                    :(<></>)
                    }

                <div className={style.formInputNumber}>
                    <label>Weight</label>
                    <input className={(error!==null && error.includes('Weight min'))?style.inputNumberError:style.inputNumber} placeholder='min' type="number" name="weightMin" value={dogData.weightMin} onChange={handleChange}/>
                    <p>kg - </p>
                    <input className={(error!==null && error.includes('Weight max'))?style.inputNumberError:style.inputNumber} placeholder='max' type="number" name="weightMax" value={dogData.weightMax} onChange={handleChange}/>
                    <p>kg</p>
                </div>
                    {(error!==null && error.includes('Weight'))
                    ?(<p className={style.error}>{error}</p>)
                    :(<></>)
                    }

                <div className={style.formInputNumber}>
                    <label>Life Span</label>
                    <input className={(error!==null && error.includes('Life span min'))?style.inputNumberError:style.inputNumber} placeholder='min' type="number" name="life_spanMin" value={dogData.life_spanMin} onChange={handleChange}/>
                    <p>years -</p>
                    <input className={(error!==null && error.includes('Life span max'))?style.inputNumberError:style.inputNumber} placeholder='max' type="number" name="life_spanMax" value={dogData.life_spanMax} onChange={handleChange}/>
                    <p>years</p>
                </div>
                    {(error!==null && error.includes('Life span'))
                    ?(<p className={style.error}>{error}</p>)
                    :(<></>)
                    }

                <div className={style.temperamentsContainer}>
                    <div className={style.titleContainer}>
                        <p className={style.buttonShow} onClick={showHandler}>{show?"˄":"˅"}</p>
                        <h3 className={(error!==null && error.includes('temperament'))?style.titleError:style.title} onClick={showHandler}>Temperaments</h3>
                        <p onClick={()=>{temperamentsHandler('deselect')}}>- deselect all -</p>
                    </div>
                    <div className={style.temperaments}>
                        <div className={!show?style.noShow:style.show}>
                        {temperaments.map(temp => 
                            dogData.temperament.includes(temp)
                            ?(<p className={style.changeColor} key={temp} onClick={()=>{temperamentsHandler(temp)}}>{temp}</p>)
                            :(<p className='' key={temp} onClick={()=>{temperamentsHandler(temp)}}>{temp}</p>)
                        )}
                        </div>
                    </div>
                    {(error!==null && error.includes('temperament'))
                    ?(<p className={style.error}>{error}</p>)
                    :(<></>)
                    }                
                </div>
            </div>
                <div className={style.submitContainer}>
                    <button className={style.buttonSubmit} type="submit" onClick={submitHandler}>CREATE</button>
                </div>
        </form>
    )
}
export default Form;