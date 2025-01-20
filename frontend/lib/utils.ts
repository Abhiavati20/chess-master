import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum MESSAGE {
    init_game = "INIT_GAME",
    game_started = "GAME_STARTED",
    move = "MOVE",
    move_made = "MOVE_MADE",
    checkmate = "CHECKMATE"
}