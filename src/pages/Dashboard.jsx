"use client";

import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import FirstLoginModal from "../components/dashboard/FirstLoginModal";


export default function DashboardPage() {
  const { user, isLoading } = useAuth0();
  const [isNewUser, setIsNewUser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form del modal
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    if (!isLoading && user) {
      const firstLoginKey = `firstLogin_${user.sub}`;
      const firstLogin = localStorage.getItem(firstLoginKey);
      if (!firstLogin) {
        setIsNewUser(true);
        setShowModal(true); // Abrir modal
        localStorage.setItem(firstLoginKey, "true");
      }
    }
  }, [isLoading, user]);

  const handleSave = (data) => {
    // Aquí puedes enviar los datos a tu backend para guardar
    console.log("Datos guardados del primer login:", data);

    // Guardar localmente si quieres
    setStartAddress(data.startAddress);
    setEndAddress(data.endAddress);
    setStartTime(data.startTime);
    setEndTime(data.endTime);
    setUserName(data.userName);
    setUserImage(data.userImage);

    setShowModal(false);
  };

  if (isLoading) return <p>Cargando usuario...</p>;

  return (
    <div className="">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug">Bienvenido {user.name}</h2>

      {showModal && (
        <FirstLoginModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
