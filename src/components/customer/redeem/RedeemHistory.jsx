import { useState } from "react";
import { FormatNumber, FormatDateFull } from "../../../utility/function";

export default function RedeemHistory({ data }) {
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
                className={activeTab === "approve" ? "bg-[#dabe96]" : ""}
                onClick={() => setActiveTab("approve")}>
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
                <th>ไถ่ถอนเลขที่</th>
                <th>เลขที่สัญญา</th>
                <th>เงินต้น</th>
                <th>ดอกเบี้ย</th>
                <th>ยอดรวม</th>
                <th className="px-11">วันที่ทำรายการ</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.redeem_id}>
                    <td>{item.redeem_id}</td>
                    <td>{item.pledge_id}</td>
                    <td>{FormatNumber(item.principal_paid)}</td>
                    <td>{FormatNumber(item.interest_paid)} </td>
                    <td>{FormatNumber(item.total_paid)}</td>
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
