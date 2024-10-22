import { useState } from "react";
import { avatarPlaceholder } from "./AvatarPlaceholder";
import { socket } from "../socket";

const AvatarDropdown = () => {
    const [avatar, setAvatar] = useState(avatarPlaceholder);
    const [isOpen, setIsOpen] = useState(false);

    const avatarOptions = [
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
    ];

    const handleAvatarClick = (newAvatar) => {
        setAvatar(newAvatar);
        setIsOpen(false); // Close the dropdown after selecting

        socket.emit('avatar-selected', newAvatar);
    };

    return (
        <div className="relative inline-block">
            <img
                id="avatarButton"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full cursor-pointer"
                src={avatar}
                alt="User dropdown"
            />

            {isOpen && (
                <div
                    id="avatarDropdown"
                    className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>Choose an Avatar</div>
                </div>
                <div className="grid grid-cols-3 gap-2 p-2">
                    {avatarOptions.map((imageSrc, index) => (
                        <img
                            key={index}
                            src={imageSrc}
                            alt={`avatar-${index}`}
                            className="w-10 h-10 rounded-full cursor-pointer hover:opacity-80"
                            onClick={() => handleAvatarClick(imageSrc)}
                        />
                    ))}
                </div>
            </div>
            )}
        </div>
    );
};

export default AvatarDropdown;
