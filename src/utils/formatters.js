export const formatters = {
  currency: (valor) =>
    typeof valor === "number" && !isNaN(valor)
      ? valor.toLocaleString("es-ES", { style: "currency", currency: "EUR" })
      : "– €",

  growthColor: (growth) => (growth >= 0 ? "text-green-600" : "text-red-600"),

  truncate: (text, maxLength) =>
    !text ? "" : text.length > maxLength ? text.slice(0, maxLength) + "..." : text,

  month: (date) => {
    const name = date.toLocaleString("es-ES", { month: "long" });
    return name.charAt(0).toUpperCase() + name.slice(1);
  },

  monthName: (index) =>
    [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
    ][index] ?? "Mes inválido",

  percentage: (value) => `${(Number(value) || 0).toFixed(1)}%`,
  
  date: (value) => {
  if (!value) return "–";
  const date = new Date(value);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
},
};
