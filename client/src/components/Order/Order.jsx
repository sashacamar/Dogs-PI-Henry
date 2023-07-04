const Order = ({sortHandler})=>{
    return(
        <div>
            <h3>Ordernar por:</h3>
            <label>Nombre</label>
            <button onClick={()=>{sortHandler('byName', 'asc')}}>↓</button>
            <button onClick={()=>{sortHandler('byName', 'desc')}}>↑</button>

            <label>Peso min</label>
            <button onClick={()=>{sortHandler('byWeightMin', 'asc')}}>↓</button>
            <button onClick={()=>{sortHandler('byWeightMin', 'desc')}}>↑</button>

            <label>Peso max</label>
            <button onClick={()=>{sortHandler('byWeightMax', 'asc')}}>↓</button>
            <button onClick={()=>{sortHandler('byWeightMax', 'desc')}}>↑</button>
        </div>
    )
}

export default Order;