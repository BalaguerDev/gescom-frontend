// ✅ Formatea números como moneda en euros
export const formatCurrency = (value) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

// ✅ Devuelve el color según el crecimiento (positivo o negativo)
export const getGrowthColor = (growth) =>
  growth >= 0 ? "text-green-600" : "text-red-600";

// ✅ Trunca textos largos
export const truncateText = (text, maxLength) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// ✅ Formatea el nombre del mes a partir de una fecha
export const formatMonth = (date) => {
  const monthName = date.toLocaleString("es-ES", { month: "long" });
  return monthName.charAt(0).toUpperCase() + monthName.slice(1);
};

// ✅ NUEVA FUNCIÓN: obtiene el nombre del mes por índice (0 = enero)
export const formatMonthName = (monthIndex) => {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  return meses[monthIndex] ?? "Mes inválido";
};

// ✅ Formatea porcentaje con una cifra decimal
export const formatPercentage = (value) => `${value.toFixed(1)}%`;
