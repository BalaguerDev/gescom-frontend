export default function RouteStep({
  startAddress,
  setStartAddress,
  sameAddress,
  setSameAddress,
  endAddress,
  setEndAddress,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) {
  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        Configura tu ruta inicial para generar tus recorridos de forma automática. Indica las direcciones y horarios.
      </p>

      <div className="flex gap-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
          alt="Mapa ilustrativo"
          className="w-24 h-24 object-contain"
        />
        <div className="flex-1 space-y-2">
          <div>
            <label className="block mb-1">Dirección de salida</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={startAddress}
              onChange={(e) => setStartAddress(e.target.value)}
              placeholder="Ej: Calle Mayor 10, Barcelona"
            />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              id="sameAddress"
              checked={sameAddress}
              onChange={(e) => setSameAddress(e.target.checked)}
            />
            <label htmlFor="sameAddress" className="text-sm">
              Destino igual que origen
            </label>
          </div>

          {!sameAddress && (
            <div>
              <label className="block mb-1">Dirección de llegada</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={endAddress}
                onChange={(e) => setEndAddress(e.target.value)}
                placeholder="Ej: Avenida Diagonal 200, Barcelona"
              />
            </div>
          )}

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block mb-1">Hora de salida</label>
              <input
                type="time"
                className="w-full border p-2 rounded"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">Hora de llegada</label>
              <input
                type="time"
                className="w-full border p-2 rounded"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
