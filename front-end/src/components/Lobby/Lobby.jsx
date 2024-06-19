import { useDispatch, useSelector } from "react-redux"
import { addPlayer } from "../../features/lobbySlice";
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const Lobby = () => {
    const dispatch = useDispatch();
    const players = useSelector(state => state.lobby.players);
    const host = useSelector(state => state.lobby.host);

    // add player
    const handleAddPlayer = () => {
        const newPlayer = { id: Date.now(), name: 'Player' + (players.length + 1) };
        dispatch(addPlayer(newPlayer));
    }

    return (
        <div className="container mx-auto my-auto">
            <div>
                <h1 className="text-2xl text-rose-800 font-bold text-center my-5">Lobby</h1>
            </div>
            <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleAddPlayer}>
                <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                Button text
            </button>
            <div className="flex flex-col">
                <ul>
                    {players.map(player => {
                        <li key={player.id}>{player.name}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Lobby;