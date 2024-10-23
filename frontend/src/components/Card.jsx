export function Card({ children }) {
    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            { children }
        </div>
    )
}
