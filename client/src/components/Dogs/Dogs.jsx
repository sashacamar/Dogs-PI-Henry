import Dog from "../Dog/Dog";
import style from './Dogs.module.css'

const Dogs = ({dogs, currentPage, itemsPerPage})=>{

    //---Perros segun el paginado
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dogsToShow = dogs.slice(startIndex, endIndex)
    return(
        <div className={style.dogsContainer}>
            {dogsToShow?.map(dog=>
                <Dog
                key = {dog.id}
                id = {dog.id}
                image = {dog.image}
                name = {dog.name}
                weightMin = {dog.weightMin}
                weightMax = {dog.weightMax}
                />
            )}
        </div>
    )
}

export default Dogs;