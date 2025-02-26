import { WebSocket } from "ws";
import { Chess } from 'chess.js'
import { MESSAGE } from "../Messages";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess
    private startTime: Date;
    private moveCount = 0;

    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: MESSAGE.init_game,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: MESSAGE.init_game,
            payload: {
                color: "black"
            }
        }));
    }

    makeMove(socket: WebSocket, move: {
        from: string;
        to: string;
    }) {
        // validate the type of move using zod
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            return
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }

        try {
            this.board.move(move);
        } catch(e) {
            console.log(e);
            return;
        }
        
        if (this.board.isGameOver()) {
            // Send the game over message to both players
            this.player1.emit(JSON.stringify({
                type: MESSAGE.checkmate,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            this.player2.emit(JSON.stringify({
                type: MESSAGE.checkmate,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return;
        }

        if (this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: MESSAGE.move,
                payload: move
            }))
        } else {
            this.player1.send(JSON.stringify({
                type: MESSAGE.move,
                payload: move
            }))
        }
        this.moveCount++;
    }
}