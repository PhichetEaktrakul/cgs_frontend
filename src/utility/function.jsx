const FormatDate = (dateStr) => {
  return new Date(dateStr)
    .toLocaleString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replace(/\u200E/g, "");
};

const FormatDateFull = (dateStr) => {
  return new Date(dateStr)
    .toLocaleString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/\u200E/g, "");
};

const FormatNumber = (n, d = 2) =>
  isNaN(n)
    ? "-"
    : n.toLocaleString("en-US", {
        minimumFractionDigits: d,
        maximumFractionDigits: d,
      });

const FormatDateHyphen = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  if (isNaN(date)) return "-";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const yearBE = (date.getFullYear() + 543).toString().slice(-2); // last 2 digits of Buddhist year

  return `${day}-${month}-${yearBE}`;
};

const GoldTypeText = (type) => {
  if (type === 2) return "99.9%";
  if (type === 1) return "96.5%";
  return "-";
};
//----------------------------------------------------------------------------------------
export { FormatDate, FormatDateFull, FormatNumber, FormatDateHyphen, GoldTypeText };
