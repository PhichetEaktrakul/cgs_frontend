import { useState } from "react";
import {
  FormatDate,
  FormatDateFull,
  FormatNumber,
  GoldTypeText,
} from "../../../utility/function";

export default function ConsignmentHistory({ history }) {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredData = history.filter((item) => item.status === activeTab);

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
            <li>
              <a
                className={activeTab === "redeem" ? "bg-[#dabe96]" : ""}
                onClick={() => setActiveTab("redeem")}>
                ไถ่ถอนเเล้ว
              </a>
            </li>
          </ul>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr>
                <th>เลขที่สัญญา</th>
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
                        <td />
                      </>
                    ) : (
                      <>
                        <td />
                        <td>{item.weight}</td>
                      </>
                    )}
                    <td>{GoldTypeText(item.gold_type)}</td>
                    <td>{item.ref_price.toLocaleString()}</td>
                    <td>{(item.loan_percent * 100).toFixed(2)}%</td>
                    <td>{FormatNumber(item.loan_amount)}</td>
                    <td>{item.interest_rate}%</td>
                    <td>{FormatDate(item.start_date)}</td>
                    <td>{FormatDate(item.end_date)}</td>
                    <td>{FormatDateFull(item.transaction_date)}</td>
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
