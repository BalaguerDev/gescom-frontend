export default function ModalFooter({ step, handleBack, handleNext, handleSave }) {
  return (
    <div className="flex justify-between mt-6">
      {step > 1 && (
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={handleBack}>
          Atrás
        </button>
      )}
      {step === 1 ? (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded ml-auto"
          onClick={handleNext}
        >
          Siguiente
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-green-600 text-white rounded ml-auto"
          onClick={handleSave}
        >
          Guardar
        </button>
      )}
    </div>
  );
}
