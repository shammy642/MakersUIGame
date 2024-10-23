// imports
import { CardText } from "../components/CardText";

// A form that allows a user to input tet and numbers
export function GuessForm(props) {
  return (
    <>
    <form className="max-w-sm mx-auto">
      <div className="md-5">
        <CardText>
          <label htmlFor="website-admin">How much does this Pokémon weight?</label>
        </CardText>
        <br/>
        <div className="flex">
          
          <input type="number" value={props.input} onChange={(e) => props.setInput(e.target.value)} id="website-admin" className="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your guess"></input>
      </div>

      <div className="relative md-5 mb-6">
          <label htmlFor="labels-range-input" className="sr-only">Weight range</label>
          <input id="labels-range-input" type="range" value={props.input} onChange={(e) => props.setInput(e.target.value)} min="0.100" max="999" step="0.1" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">0.100kg</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">333kg</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">666kg</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">999kg</span>
      </div>

      </div>
    </form>
    </>
  )
}