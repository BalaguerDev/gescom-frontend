import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserModal from "./UserModal";

const UserInfo = () => {
    const { user } = useAuth0();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-4 border-t border-gray-200 flex items-center space-x-3 cursor-pointer hover:bg-gray-50 transition"
            >
                <img
                    src={user?.picture}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full border border-gray-300"
                />
                <div>
                    <p className="text-sm font-semibold text-gray-800">
                        {user?.name || "Usuario"}
                    </p>
                    <p className="text-xs text-gray-500">Comercial</p>
                </div>
            </div>

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default UserInfo;
