import { Carousel } from "flowbite-react";
import { Table } from "./Table";
const carouselTheme = {
  root: {
    base: "relative w-full",
    leftControl:
      "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none group-hover:flex",
    rightControl:
      "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none group-hover:flex",
  },
  indicators: {
    active: {
      off: "bg-gray-400 hover:bg-gray-500",
      on: "bg-gray-600",
    },
    base: "h-1 w-1 rounded-full",
    wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "block w-full",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-400/50 hover:bg-gray-400 group-focus:outline-none group-focus:ring-2 group-focus:ring-gray-400 sm:h-4 sm:w-4",
    icon: "h-5 w-5 text-gray-600 sm:h-3 sm:w-3",
  },
  scrollContainer: {
    base: "flex snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};



export function TableCarousel({ players, weight }) {

  const playersByScore = players && [...players].sort((a, b) => b.totalScore - a.totalScore)
  const playersByGuess = players && [...players].sort((a, b) => Math.abs(weight - a.currentGuess) - Math.abs(weight - b.currentGuess))
  return (
    <Carousel theme={carouselTheme} leftControl=" " rightControl=" ">
      <div className="w-full">
        Last Game
        {players && <Table players={playersByGuess} sortBy="currentGuess"/>}

      </div>
      <div className="w-full overflow-auto">
        Leaderboard
        {players && <Table players={playersByScore} sortBy="totalScore"/>}
      </div>
    </Carousel>
  );
}

export default TableCarousel;