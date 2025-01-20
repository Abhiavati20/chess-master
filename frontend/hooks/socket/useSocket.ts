import { useEffect, useState } from "react"

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws = new WebSocket("ws://65.0.176.68:80");
        ws.onopen = () => {
            console.log("CONNECTED");
            setSocket(ws);
        }
        ws.onclose = () => {
            setSocket(null);
        }

        return () => {
            ws.close()
        }
    }, [])
    return socket
}