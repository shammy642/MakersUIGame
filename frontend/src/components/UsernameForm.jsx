// A form that allows a user to input tet and numbers
import { useState } from "react";
import { AvatarDropdown } from "./AvatarDropdown";

export function UsernameForm({ input, setInput, avatar, setAvatar, error }) {
  const [avatarOpen, setAvatarOpen] = useState(false);

  //const [selectedAvatar, setSelectedAvatar] = useState(null);
  const handleOnChange = (e) => {
    if (e.target.value.length < 14) {
      setInput(e.target.value);
    }
    
  };
  return (
    <>
      <form className="max-w-sm mx-auto">
        <label
          htmlFor="website-admin"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        ></label>
        <div className="flex">
          <span
            data-testid="select-avatar"
            className="relative inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 cursor-pointer"
            onClick={() => setAvatarOpen(!avatarOpen)} // Toggle avatar dropdown on click
          >
            {avatar ? (
              <>
                <img
                  data-testid="avatar-img"
                  className="w-8 h-8 rounded-full"
                  src={avatar}
                  alt="Selected Avatar"
                />

                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-blue-700 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-2 h-2 text-white"
                    fill="none"
                    viewBox="0 0 64 64"
                    stroke="currentColor"
                    strokeWidth="0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M57.52 21.1111C57.5232 22.1978 57.311 23.2743 56.8956 24.2784C56.4803 25.2825 55.87 26.1943 55.1 26.9611L28.56 53.5111C28.2893 53.7779 27.9501 53.9648 27.58 54.0511L11.08 57.7411C10.7514 57.8123 10.4162 57.8492 10.08 57.8511C9.40545 57.8493 8.73969 57.6981 8.13047 57.4085C7.52125 57.1189 6.98368 56.698 6.55638 56.1761C6.12907 55.6542 5.8226 55.0441 5.65898 54.3897C5.49535 53.7353 5.47863 53.0528 5.61 52.3911L8.79002 36.5111C8.86868 36.1243 9.06003 35.7694 9.34001 35.4911L36.48 8.35113C38.0337 6.79994 40.1395 5.92871 42.335 5.92871C44.5305 5.92871 46.6363 6.79994 48.19 8.35113L55.1 15.2511C55.8694 16.0204 56.4792 16.9341 56.8945 17.9398C57.3098 18.9454 57.5223 20.0231 57.52 21.1111Z"
                      fill="#ffffff"
                    />
                  </svg>
                </span>
              </>
            ) : (
              <>
                <img
                  src="/src/assets/1.png"
                  aria-label="default avatar image"
                  className="w-8 h-8"
                ></img>
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-blue-700 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-2 h-2 text-white"
                    fill="none"
                    viewBox="0 0 64 64"
                    stroke="currentColor"
                    strokeWidth="0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M57.52 21.1111C57.5232 22.1978 57.311 23.2743 56.8956 24.2784C56.4803 25.2825 55.87 26.1943 55.1 26.9611L28.56 53.5111C28.2893 53.7779 27.9501 53.9648 27.58 54.0511L11.08 57.7411C10.7514 57.8123 10.4162 57.8492 10.08 57.8511C9.40545 57.8493 8.73969 57.6981 8.13047 57.4085C7.52125 57.1189 6.98368 56.698 6.55638 56.1761C6.12907 55.6542 5.8226 55.0441 5.65898 54.3897C5.49535 53.7353 5.47863 53.0528 5.61 52.3911L8.79002 36.5111C8.86868 36.1243 9.06003 35.7694 9.34001 35.4911L36.48 8.35113C38.0337 6.79994 40.1395 5.92871 42.335 5.92871C44.5305 5.92871 46.6363 6.79994 48.19 8.35113L55.1 15.2511C55.8694 16.0204 56.4792 16.9341 56.8945 17.9398C57.3098 18.9454 57.5223 20.0231 57.52 21.1111Z"
                      fill="#ffffff"
                    />
                  </svg>
                </span>
              </>
            )}
          </span>
          <input
            required
            value={input}
            onChange={handleOnChange}
            type="text"
            id="website-admin"
            className={`rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 
                ${error ? " border-blue-500 border-2 rounded-e-lg" : ""}`}
            placeholder="Username"
          />
        </div>
        {avatarOpen && (
          <div className="absolute z-10" data-testid="avatar-dropdown">
            <AvatarDropdown
              setAvatar={setAvatar}
              setAvatarOpen={setAvatarOpen}
              isOpen={avatarOpen}
            />
          </div>
        )}
        {error && <p data-testid="username-error">{error}</p>}
      </form>
    </>
  );
}
