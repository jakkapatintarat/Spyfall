import { useDispatch, useSelector } from "react-redux"
import { endGame, resetGame } from "../../features/gameSlice";

const Game = () => {
    const dispatch = useDispatch();
    const players = useSelector(state => state.game.players);
    const spy = useSelector(state => state.game.spy);
    const location = useSelector(state => state.game.location);
    const gameState = useSelector(state => state.game.gameState);

    if (gameState === 'waiting') {
        return (
            <div>
                Waiting to start...
            </div>
        )
    }

    return (
        <div>
            <h2>Game</h2>
            <div>Location: {location}</div>
            <ul>
                {players.map(player => (
                    <li key={player.id}>{player.name} {player.id === spy ? '(Spy)' : ''}</li>
                ))}
            </ul>
            <button onClick={() => dispatch(endGame())}>End Game</button>
            <button onClick={() => dispatch(resetGame())}>Reset Game</button>
        </div>
    )
}

export default Game;