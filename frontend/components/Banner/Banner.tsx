"use client";
import React from 'react'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation';

const Banner = () => {
    const router = useRouter();
  return (
    <div className="flex flex-col gap-2 items-center text-center justify-center">
        <h1 className="font-semibold md:text-6xl lg:text-6xl text-3xl">Chess Master <span className="text-yellow-400">Play Anywhere</span></h1>
        <p className="font-thin">Challenge players worldwide, improve your skills, and become a grandmaster in our thriving chess community.</p>
        <div className="flex gap-2">
          <Button onClick={() => {router.push("/game")}} className="bg-yellow-500 text-white font-semibold text-lg hover:bg-yellow-400 flex gap-0.5">
            Start Playing <ChevronRight size={10} className="animate-ping"/>
          </Button>
          <Button className="text-white font-semibold border border-gray-500 bg-transparent hover:bg-transparent">
            Learn More
          </Button>
        </div>
      </div>
  )
}

export default Banner