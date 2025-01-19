import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { MESSAGE } from "../Messages";

export class Game {
    public player1: WebSocket | null;
    public player2: WebSocket | null;
    private board: Chess
    private movesCount: number
    private winner:string
    private created_at: Date
    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess()
        this.movesCount = 0;
        this.created_at = new Date()
        this.winner=""
        this.player1.send(JSON.stringify({
            type:MESSAGE.game_started,
            payload: {
                "color" :"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: MESSAGE.game_started,
            payload: {
                "color": "black"
            }
        }));
        console.log("GAME STARTED")
    }

    makeMove(socket: WebSocket, move: { from: string, to: string }) {
        // validate the move
        
        // validate the user
        // if moveCount is even then its white player's chance
        if (this.movesCount % 2 === 0 && this.player1 !== socket) return;
        if (this.movesCount % 2 === 1 && this.player2 !== socket) return;
        
        const { from, to } = move
        try {   
            this.board.move({
                from,
                to
            })
        } catch (error) {
            console.log(error)
        }
        if (this.board.isGameOver()) {
            const winner = this.board.turn() === "b" ? "white" : "black"
            this.player1?.send(JSON.stringify({
                type: MESSAGE.checkmate,
                winner
            }))
            this.player2?.send(JSON.stringify({
                type: MESSAGE.checkmate,
                winner
            }))
        }
        if (this.movesCount % 2 === 0) {
            this.player2?.send(JSON.stringify({
                type: MESSAGE.move_made,
                payload: {
                    move
                }
            }))
        }
        else {
            this.player1?.send(JSON.stringify({
                type: MESSAGE.move_made,
                payload: {
                    move
                }
            }))
        }
        this.movesCount++
    }
}