import { useEffect, useState } from "react";
import { socket } from "../socket";

const avatars = import.meta.glob("/src/assets/*.png", { eager: true });

export function AvatarDropdown({ setAvatar, isOpen }) {
    const [avatarOptions, setAvatarOptions] = useState([]);

    useEffect(() => {
        const avatarUrls = Object.keys(avatars).map((key) => avatars[key].default || avatars[key]);
        setAvatarOptions(avatarUrls);
    }, []);

    /*     const avatarOptions = [
            "../assets/1.png",
            "../assets/2.png",
            "../assets/3.png",
            "../assets/4.png",
            "../assets/5.png",
            "../assets/6.png",
            "../assets/7.png",
            "../assets/8.png",
            "../assets/9.png",
            "../assets/10.png",
            "../assets/11.png",
            "../assets/12.png",
            "../assets/13.png",
            "../assets/14.png",
            "../assets/15.png",
            "../assets/16.png",
            "../assets/17.png",
            "../assets/18.png",
            "../assets/19.png",
            "../assets/20.png",
            "../assets/21.png",
            "../assets/22.png",
            "../assets/23.png",
            "../assets/24.png",
            "../assets/25.png",
            "../assets/26.png",
        ]; */

    const handleAvatarClick = (newAvatar) => {
        setAvatar(newAvatar);
        socket.emit("avatar-selected", newAvatar);
    };

    return (
        <>
        {isOpen && (
            <div
            id="dropdownUsers"
            className="z-10 bg-white rounded-lg shadow w-60 h-60 dark:bg-gray-700"
            >
            <ul
                className="grid grid-cols-3 gap-4 p-4"
                aria-labelledby="dropdownUsersButton"
            >
                {avatarOptions.length > 0 ? (
                avatarOptions.map((avatar, index) => (
                    <li key={index} className="flex justify-center">
                    <div
                        onClick={() => handleAvatarClick(avatar)}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <img
                        className="w-6 h-6 me-2 rounded-full"
                        src={avatar}
                        alt={`Avatar ${index}`}
                        />
                    </div>
                    </li>
                ))
                ) : (
                <li>No avatars found</li>
                )}
            </ul>
            </div>
        )}
        </>
    );
}
