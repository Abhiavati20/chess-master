import { MESSAGE } from '@/lib/utils';
import { Square,PieceSymbol,Color, Chess } from 'chess.js';
import { Crown,  } from 'lucide-react';
import Image from 'next/image';
import React, { SetStateAction, useState } from 'react'

export interface IChessBoardProps {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    setBoard: React.Dispatch<SetStateAction<({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]>>
    chess: Chess;
    socket: WebSocket;
}

export const ChessBoard = ({ chess, setBoard,board, socket }: IChessBoardProps) => {
    const [from, setFrom] = useState<Square | null>(null);
    return (
        <div className='flex flex-col w-full justify-center items-center border-2'>
            {board.map((row, i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i) as Square;

                    return <div onClick={() => {
                        if (!from) {
                            setFrom(squareRepresentation);
                        } else {
                            socket.send(JSON.stringify({
                                type: MESSAGE.move,
                                payload: {
                                    move: {
                                        from,
                                        to: squareRepresentation
                                    }
                                }
                            }))
                            
                            setFrom(null)
                            chess.move({
                                from,
                                to: squareRepresentation
                            });
                            setBoard(chess.board());
                            console.log({
                                from,
                                to: squareRepresentation
                            })
                        }
                    }} key={j} className={`w-16 h-16 ${(i+j)%2 === 0 ? 'bg-slate-100' : 'bg-green-700'}`}>
                        <div className="w-full justify-center flex h-full">
                            <div className="h-full justify-center flex flex-col">
                                {square ?
                                    <>
                                        {
                                            square.type === "k" ? <Crown size={22} className={`${square.color === "b" ? "text-black" : "text-white"}`} fill={`${square.color === "b" ? "#000" : "transparent"}`} />
                                                : <Image height={22} width={22} className="flex" src={square.color === "b" ? `/images/black_${square.type}.png` : `/images/${square.type}.png`} alt={"pawn image"} />
                                        }
                                    </>
                                    : null} 
                            </div>
                        </div>
                    </div>
                })}
            </div>
        })}
        </div>
    )
}
