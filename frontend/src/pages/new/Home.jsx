import { useNavigate } from "react-router-dom"

export const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="container">
            <div className="flex justify-center align-middle">
                <button className="text-cyan-300" onClick={() => navigate('/NumberGame')}>Number Game</button>
            </div>
        </div>
    )
}