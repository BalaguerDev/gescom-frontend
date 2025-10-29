import { useState, useEffect } from "react";
import ProfileStep from "./modal/ProfileStep";
import RouteStep from "./modal/RouteStep";
import ModalFooter from "./modal/ModalFooter";
import { useAuth0 } from "@auth0/auth0-react";

export default function FirstLoginModal({ showModal, onClose, onSave, }) {
  const { getAccessTokenSilently } = useAuth0();
  const [step, setStep] = useState(1);

  // Datos usuario
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");

  // Datos ruta
  const [startAddress, setStartAddress] = useState("");
  const [endAddress, setEndAddress] = useState("");
  const [sameAddress, setSameAddress] = useState(true);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (sameAddress) setEndAddress(startAddress);
  }, [sameAddress, startAddress]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSave = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: userName,
          userImage,
          startPoint: startAddress,
          endPoint: endAddress,
          startTime,
          endTime,
        }),
      });

      if (!response.ok) throw new Error("Error al guardar datos de usuario");
      const data = await response.json();
      onSave(data.user);
      onClose();
    } catch (error) {
      console.error("❌ Error al guardar configuración:", error);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md backdrop-saturate-150 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-4">
          {step === 1 ? "Configura tu perfil" : "Configura tu ruta inicial"}
        </h2>

        {step === 1 && (
          <ProfileStep
            userName={userName}
            setUserName={setUserName}
            userImage={userImage}
            setUserImage={setUserImage}
          />
        )}

        {step === 2 && (
          <RouteStep
            startAddress={startAddress}
            setStartAddress={setStartAddress}
            sameAddress={sameAddress}
            setSameAddress={setSameAddress}
            endAddress={endAddress}
            setEndAddress={setEndAddress}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        )}

        <ModalFooter
          step={step}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSave={handleSave}
        />
      </div>
    </div>
  );
}
