export const Check = () => {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-8 h-8 stroke-current text-green-500 stroke-2 fill-none animate-check"
        style={{
            strokeDasharray: 30, // Define dash length
            strokeDashoffset: 30, // Start dash offset
        }}
        >
        <path d="M5 12.5l6 6 10-10" />
        </svg>
    );
};
