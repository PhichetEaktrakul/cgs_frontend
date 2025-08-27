import { useState } from "react";

export default function InterestHistory({ data }) {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredData = data.filter((item) => item.status === activeTab);

  const formatDateBuddhist = (dateStr) => {
    return new Date(dateStr)
      .toLocaleString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit", // last 2 digits of Buddhist year
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(/\u200E/g, ""); // remove any invisible characters
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };
  return (
    <>
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
                className={activeTab === "paid" ? "bg-[#dabe96]" : ""}
                onClick={() => setActiveTab("paid")}>
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
                <th>รายการต่อดอกเลขที่</th>
                <th>เลขที่ขายฝาก</th>
                <th>ต่อจาก</th>
                <th>ดอกเบี้ย</th>
                <th>ตัดต้น</th>
                <th>ชำระ</th>
                <th>อัตราดอกเบี้ย</th>
                <th className="px-11">วันครบกำหนด</th>
                <th className="px-11">วันที่ทำรายการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.transaction_id}>
                    <td>{item.interest_id}</td>
                    <td>{item.pledge_id}</td>
                    <td>{item.prev_interest_id}</td>
                    <td>{item.pay_interest}</td>
                    <td>{item.pay_loan}</td>
                    <td>{item.pay_interest + item.pay_loan}</td>
                    <td>{item.old_interest_rate}</td>
                    <td>{formatDate(item.due_date)}</td>
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
    </>
  );
}
