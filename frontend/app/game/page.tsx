"use client";
import { ChessBoard } from "@/components/ChessBoard/ChessBoard"
import { Button } from "@/components/ui/button";
import { useSocket } from "@/hooks/socket/useSocket";
import { MESSAGE } from "@/lib/utils";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";

const Home = () => {
    const socket = useSocket();
    // const [gameStatus, setGameStatus] = useState<"in-progress" | "abandoned" | "checkmate">()
    const [chess, setChess] = useState<Chess>(new Chess());
    const [board, setBoard] = useState(chess.board())
    const [started, setStarted]= useState<boolean>(false)
    useEffect(() => {
        if (!socket) return
        socket.onmessage = (event) => {
             const message = JSON.parse(event.data);

            switch (message.type) {
                case MESSAGE.init_game:
                    setBoard(chess.board());
                    // setStarted(true)
                    break;
                case MESSAGE.move:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    console.log("Move made");
                    break;
                case MESSAGE.checkmate:
                    console.log("Game over");
                    break;
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])
    if (!socket) return <div className="flex justify-center items-center h-[84vh] text-3xl animate-pulse">
        Connecting...
    </div>

    return (
        <div className="flex justify-between items-center gap-2 p-4">
            <ChessBoard chess={chess} board={board} setBoard={setBoard} socket={socket} />
            {!started
                && <div className='flex  w-full justify-center items-center border-2'>
                <Button
                    className="bg-yellow-500 text-white font-semibold text-lg hover:bg-yellow-400"
                    onClick={() => {
                        socket.send(JSON.stringify({
                            type:MESSAGE.init_game
                        }))
                        setStarted(true)
                    }}
                >
                    Start Game
                </Button>
            </div>}
        </div>
    )
}

export default Home