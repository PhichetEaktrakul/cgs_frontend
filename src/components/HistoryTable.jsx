import { useState } from "react";

export default function HistoryTable({ data }) {
  const [activeTab, setActiveTab] = useState("pending");

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };



const formatDateBuddhist = (dateStr) => {
  return new Date(dateStr).toLocaleString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",  // last 2 digits of Buddhist year
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).replace(/\u200E/g, ""); // remove any invisible characters
};



  const goldTypeText = (type) => {
    if (type === 2) return "99.99%";
    if (type === 1) return "96.5%";
    return "-";
  };

  const filteredData = data.filter((item) => item.status === activeTab);

  return (
    <div className="mt-4">
      {/* Tabs */}
      <div className="flex justify-center mt-2">
        <ul className="menu menu-horizontal bg-base-200 p-0 rounded-md border border-[#dabe96]">
          <li>
            <a
              className={activeTab === "pending" ? "bg-[#dabe96]" : ""}
              onClick={() => setActiveTab("pending")}>
              รออนุมัติ
            </a>
          </li>
          <li>
            <a
              className={activeTab === "active" ? "bg-[#dabe96]" : ""}
              onClick={() => setActiveTab("active")}>
              อนุมัติแล้ว
            </a>
          </li>
          <li>
            <a
              className={activeTab === "reject" ? "bg-[#dabe96]" : ""}
              onClick={() => setActiveTab("reject")}>
              รายการไม่สำเร็จ
            </a>
          </li>
        </ul>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="table table-zebra w-full text-center">
          <thead>
            <tr>
              <th>เลขที่ขายฝาก</th>
              <th>น้ำหนัก (บาท)</th>
              <th>น้ำหนัก (กิโล)</th>
              <th>ประเภททอง</th>
              <th>ราคาอ้างอิง</th>
              <th>วงเงิน (%)</th>
              <th>วงเงินที่ได้</th>
              <th>อัตราดอกเบี้ย</th>
              <th>วันเริ่มต้นสัญญา</th>
              <th>วันครบกำหนดสัญญา</th>
              <th className="px-11">วันที่ทำรายการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.pledge_id}>
                  <td>{item.pledge_id}</td>
                  {item.gold_type == 1 ? (
                    <>
                      <td>{item.weight}</td>
                      <td></td>
                    </>
                  ) : (
                    <>
                      <td></td>
                      <td>{item.weight}</td>
                    </>
                  )}
                  <td>{goldTypeText(item.gold_type)}</td>
                  <td>{item.ref_price.toLocaleString()}</td>
                  <td>{(item.loan_percent * 100).toFixed(2)}%</td>
                  <td>{item.loan_amount.toLocaleString()}</td>
                  <td>{item.interest_rate}%</td>
                  <td>{formatDate(item.start_date)}</td>
                  <td>{formatDate(item.end_date)}</td>
                  <td>{formatDateBuddhist(item.transaction_date)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">
                  ไม่มีรายการ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
