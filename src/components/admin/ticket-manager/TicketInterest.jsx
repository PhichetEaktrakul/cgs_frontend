import { useState } from "react";
import {
  FormatDate,
  FormatDateFull,
  FormatNumber,
} from "../../../utility/function";

export default function TicketInterest({ interestData, handleInterestUpdate }) {
  const [activeTab, setActiveTab] = useState("pending");
  const column = [
    "เลขที่ต่อดอก",
    "รหัสลูกค้า",
    "เลขที่สัญญา",
    "ต่อจาก",
    "อัตราดอกเบี้ย",
    "ดอกเบี้ย",
    "ตัดต้น",
    "ชำระรวม",
    "วันครบกำหนด",
    "วันที่ทำรายการ"
  ];
  const filteredData = interestData.filter((item) => item.status === activeTab);

  return (
    <>
      <fieldset className="fieldset w-[1300px] border border-sky-900 shadow-md p-3 rounded-md row-span-1 my-3">
        <legend className="fieldset-legend text-2xl text-sky-900">รายการต่อดอก</legend>

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
                className={activeTab === "paid" ? "bg-sky-700 text-white" : ""}
                onClick={() => setActiveTab("paid")}>
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
                    key={item.interest_id}
                    className={`${
                      item.gold_type === 1
                        ? "bg-yellow-100"
                        : item.gold_type === 2
                        ? "bg-blue-100"
                        : ""
                    }`}>
                    <td>{item.interest_id}</td>
                    <td>{item.customer_id}</td>
                    <td>{item.pledge_id}</td>
                    <td>{item.prev_interest_id}</td>
                    <td>{item.old_interest_rate}%</td>
                    <td>{FormatNumber(item.pay_interest)}</td>
                    <td>{FormatNumber(item.pay_loan)}</td>
                    <td>{FormatNumber(item.pay_interest + item.pay_loan)}</td>
                    <td>{FormatDate(item.due_date)}</td>
                    <td>{FormatDateFull(item.transaction_date)}</td>

                    {activeTab === "pending" && (
                      <>
                        <td>
                          <button
                            className="bg-green-600 text-white w-[50px] p-1 rounded-lg cursor-pointer"
                            onClick={() =>
                              handleInterestUpdate(
                                item.interest_id,
                                item.transaction_id,
                                item.pledge_id,
                                item.due_date,
                                item.end_date,
                                item.pay_interest,
                                item.old_loan_amount - item.pay_loan,
                                item.old_interest_rate,
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
                              handleInterestUpdate(
                                item.interest_id,
                                item.transaction_id,
                                item.pledge_id,
                                item.due_date,
                                item.end_date,
                                item.pay_interest,
                                item.old_loan_amount - item.pay_loan,
                                item.old_interest_rate,
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
                  <td colSpan="10" className="text-center">
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
