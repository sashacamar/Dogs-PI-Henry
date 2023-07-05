import style from './Order.module.css'

const Order = ({sortHandler, state})=>{
    return(
        <div className={style.orderContainer}>
            <h3 className={style.title}>Sort by</h3>
            <div className={style.handler}>
                <button className={state.key==="byName"&&state.order==="desc"?style.changeColor:""} onClick={()=>{sortHandler('byName', 'desc')}}>↓</button>
                <label className={state.key==="byName"?style.changeColor:""}>Name</label>
                <button className={state.key==="byName"&&state.order==="asc"?style.changeColor:""} onClick={()=>{sortHandler('byName', 'asc')}}>↑</button>
            </div>
            <div className={style.handler}>
                <button className={state.key==="byWeightMin"&&state.order==="desc"?style.changeColor:""} onClick={()=>{sortHandler('byWeightMin', 'desc')}}>↓</button>
                <label className={state.key==="byWeightMin"?style.changeColor:""}>Weight Min</label>
                <button className={state.key==="byWeightMin"&&state.order==="asc"?style.changeColor:""} onClick={()=>{sortHandler('byWeightMin', 'asc')}}>↑</button>
            </div>
            <div className={style.handler}>
                <button className={state.key==="byWeightMax"&&state.order==="desc"?style.changeColor:""} onClick={()=>{sortHandler('byWeightMax', 'desc')}}>↓</button>
                <label className={state.key==="byWeightMax"?style.changeColor:""}>Weight Max</label>
                <button className={state.key==="byWeightMax"&&state.order==="asc"?style.changeColor:""} onClick={()=>{sortHandler('byWeightMax', 'asc')}}>↑</button>
            </div>
        </div>
    )
}

export default Order;