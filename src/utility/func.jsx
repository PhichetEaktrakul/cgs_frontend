const FormatDate = ({ dateStr }) => {
  if (!dateStr) return <>-</>;
  const date = new Date(dateStr);
  if (isNaN(date)) return <>-</>;
  return (
    <>
      {date.toLocaleDateString("th-TH-u-ca-buddhist", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })}
    </>
  );
};

export { FormatDate };
