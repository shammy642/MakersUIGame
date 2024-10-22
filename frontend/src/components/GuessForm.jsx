// A form that allows a user to input tet and numbers
export function GuessForm(props) {
  return (
    <>
    <form className="max-w-sm mx-auto">
      <div className="md-5">
        <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">How much does this Pokémon weight?</label>
        <br/>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
            </svg>
          </span>
          <input type="number" value={props.input} onChange={(e) => props.setInput(e.target.value)} id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your guess"></input>
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