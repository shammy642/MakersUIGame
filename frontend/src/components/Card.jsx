export function Card({ children }) {
    return (
        <div className="block max-w-lg min-w-120 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-400">
                { children }
        </div>
    )
}
