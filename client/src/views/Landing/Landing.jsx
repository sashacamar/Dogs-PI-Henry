import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <>
            <h1>ESTA ES LA VIEW DE LANDING</h1>
            <Link to='/home'>
                <button>Entrar</button>
            </Link>
        </>
    )
}

export default Landing;