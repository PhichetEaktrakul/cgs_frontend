import { useState } from "react";
import {
  FormatDate,
  FormatDateFull,
  FormatNumber,
} from "../../../utility/function";

export default function TicketInterest({ interestData, handleInterestUpdate }) {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredData = interestData.filter((item) => item.status === activeTab);

  return (
    <>
      <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md max-w-2xl row-span-1 my-3">
        <legend className="fieldset-legend text-2xl text-sky-900">
          รายการต่อดอก
        </legend>

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
                อนุมัติแล้ว
              </a>
            </li>
            <li>
              <a
                className={
                  activeTab === "reject" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab("reject")}>
                รายการไม่สำเร็จ
              </a>
            </li>
          </ul>
        </div>

        {/*------------Table------------*/}
        <div className="mt-4">
          <table className="table table-zebra w-full text-center">
            <thead>
              <tr className="bg-sky-700 text-white">
                <th>ต่อดอกเลขที่</th>
                <th>รหัสลูกค้า</th>
                <th>เลขที่สัญญา</th>
                <th>ต่อจาก</th>
                <th>ดอกเบี้ย</th>
                <th>ตัดต้น</th>
                <th>ชำระ</th>
                <th>อัตราดอกเบี้ย</th>
                <th>วันครบกำหนด</th>
                <th>วันที่ทำรายการ</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.interest_id}>
                    <td>{item.interest_id}</td>
                    <td>{item.customer_id}</td>
                    <td>{item.pledge_id}</td>
                    <td>{item.prev_interest_id}</td>
                    <td>{FormatNumber(item.pay_interest)}</td>
                    <td>{FormatNumber(item.pay_loan)}</td>
                    <td>{FormatNumber(item.pay_interest + item.pay_loan)}</td>
                    <td>{item.old_interest_rate}%</td>
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
                  <td colSpan="9" className="text-center">
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
