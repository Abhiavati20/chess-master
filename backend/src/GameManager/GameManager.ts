import { WebSocket } from "ws"
import { MESSAGE } from "../Messages";
import { Game } from "./Game";


export class GameManager {
    private games: Game[]
    private pendingPlayer: WebSocket | null
    private users: WebSocket[];
    constructor() {
        this.games = []
        this.pendingPlayer = null
        this.users = []
    }

    addUser(socket: WebSocket) {
        this.users.push(socket)
        this.messageHandler(socket);
    }
    
    removeUser(socket: WebSocket) {
        this.users = this.users.filter(user => user !== socket)
    }

    private messageHandler(socket:WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString())
            if (message.type === MESSAGE.init_game) {
                console.log("STARTING THE GAME")
                if (this.pendingPlayer) {
                    // will start a game
                    const game = new Game(this.pendingPlayer, socket);
                    this.games.push(game);
                    this.pendingPlayer = null;
                }
                else this.pendingPlayer = socket
            }
            if (message.type === MESSAGE.move) {
                const game = this.games.find(game => game.player1 === socket || game.player2)
                game?.makeMove(socket, message.move)
            }
        })
    }

}