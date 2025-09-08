import { useState } from "react";
import {
  FormatNumber,
  FormatDate,
  FormatDateFull,
} from "../../../utility/function";

export default function InterestHistory({ data }) {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredData = data.filter((item) => item.status === activeTab);

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
                <th>ต่อดอกเลขที่</th>
                <th>เลขที่สัญญา</th>
                <th>ต่อจาก</th>
                <th>อัตราดอกเบี้ย</th>
                <th>ดอกเบี้ย</th>
                <th>ตัดต้น</th>
                <th>ยอดชำระ</th>
                <th className="px-9">งวด</th>
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
                    <td>{item.old_interest_rate} %</td>
                    <td>{FormatNumber(item.pay_interest)}</td>
                    <td>{FormatNumber(item.pay_loan)}</td>
                    <td>{FormatNumber(item.pay_interest + item.pay_loan)}</td>
                    <td>{FormatDate(item.due_date)}</td>
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
