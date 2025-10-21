import { useState } from "react";
import {
  FormatDate,
  FormatDateFull,
  FormatNumber,
  GoldTypeText,
} from "../../../utility/function";

export default function TicketConsignment({ pledgeData, handleConsignmentUpdate }) {
  const [activeTab, setActiveTab] = useState("pending");
  const column = [
    "เลขที่สัญญา",
    "รหัสลูกค้า",
    "น้ำหนัก",
    "ประเภททอง",
    "ราคาอ้างอิง",
    "วงเงิน (%)",
    "วงเงินขายฝาก",
    "อัตราดอกเบี้ย",
    "วันเริ่มต้นสัญญา",
    "วันสิ้นสุดสัญญา",
    "วันที่ทำรายการ"
  ];
  const filteredData = pledgeData.filter((item) => item.status === activeTab);

  return (
    <>
      <fieldset className="fieldset w-[1500px] border border-sky-900 shadow-md p-3 rounded-md overflow-auto row-span-1 mb-3">
        <legend className="fieldset-legend text-2xl text-sky-900">รายการขายฝาก</legend>

        {/*------------Tabs------------*/}
        <div className="flex justify-center mt-2">
          <ul className="menu menu-horizontal bg-base-200 p-0 rounded-md border border-sky-700">
            <li>
              <a
                className={
                  activeTab === "pending" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab("pending")}>
                รออนุมัติ
              </a>
            </li>
            <li>
              <a
                className={
                  activeTab === "active" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab("active")}>
                อนุมัติ
              </a>
            </li>
            <li>
              <a
                className={
                  activeTab === "reject" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab("reject")}>
                ไม่อนุมัติ
              </a>
            </li>
            <li>
              <a
                className={
                  activeTab === "redeem" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab("redeem")}>
                ไถ่ถอน
              </a>
            </li>
            <li>
              <a
                className={
                  activeTab === "expire" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab("expire")}>
                เลยกำหนด
              </a>
            </li>
          </ul>
        </div>

        {/*------------Table------------*/}
        <div className="mt-4">
          <table className="table w-full text-center">
            <thead>
              <tr className="bg-sky-700 text-white">
                {column.map((col) => (<th key={col}>{col}</th>))}
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.transaction_id}
                    className={`${
                      item.gold_type === 1
                        ? "bg-blue-100"
                        : item.gold_type === 2
                        ? "bg-yellow-100"
                        : ""
                    }`}>
                    <td>{item.pledge_id}</td>
                    <td>{item.customer_id}</td>
                    <td>
                      {item.weight} {item.gold_type == 1 ? "กิโล" : "บาท"}
                    </td>
                    <td>{GoldTypeText(item.gold_type)}</td>
                    <td>{FormatNumber(item.ref_price)}</td>
                    <td>{(item.loan_percent).toFixed(2)}%</td>
                    <td>{FormatNumber(item.loan_amount)}</td>
                    <td>{item.interest_rate}%</td>
                    <td>{FormatDate(item.start_date)}</td>
                    <td>{FormatDate(item.end_date)}</td>
                    <td>{FormatDateFull(item.transaction_date)}</td>

                    {activeTab === "pending" && (
                      <>
                        <td>
                          <button
                            className="bg-green-600 text-white w-[50px] p-1 rounded-lg cursor-pointer"
                            onClick={() =>
                              handleConsignmentUpdate(
                                item.transaction_id,
                                item.pledge_id,
                                item.customer_id,
                                item.gold_type,
                                item.weight,
                                item.loan_amount,
                                "approve"
                              )
                            }>
                            อนุมัติ
                          </button>
                        </td>
                        <td>
                          <button
                            className="bg-red-600 text-white w-[60px] p-1  rounded-lg cursor-pointer"
                            onClick={() =>
                              handleConsignmentUpdate(
                                item.transaction_id,
                                item.pledge_id,
                                item.customer_id,
                                item.gold_type,
                                item.weight,
                                item.loan_amount,
                                "reject"
                              )
                            }>
                            ไม่อนุมัติ
                          </button>
                        </td>
                      </>
                    )}

                    {activeTab !== "pending" && (
                      <>
                        <td></td>
                        <td></td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    ไม่มีรายการ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </fieldset>
    </>
  );
}
