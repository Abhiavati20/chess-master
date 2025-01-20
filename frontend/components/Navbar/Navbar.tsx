import { Crown } from "lucide-react"
import { Button } from "../ui/button"
export const Navbar = () => {
  return (
    <div className="w-full p-5 flex  gap-2 justify-between md:items-center rounded-md shadow-md shadow-slate-700">
      <span className="flex gap-2 md:text-2xl lg:text-2xl text-xl items-center"><Crown size={26} className="font-semibold text-yellow-400" /> Chess Master</span>
      <Button className="bg-yellow-500 text-white hover:bg-yellow-400 ">Play Now</Button>
    </div>
  )
}
