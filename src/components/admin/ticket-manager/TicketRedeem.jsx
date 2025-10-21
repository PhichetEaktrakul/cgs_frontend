import { useState } from "react";
import {
  FormatDateFull,
  FormatNumber,
  GoldTypeText,
} from "../../../utility/function";

export default function TicketRedeem({ redeemData, handleRedeemUpdate }) {
  const [activeTab, setActiveTab] = useState("pending");
  const column = [
    "เลขที่ไถ่ถอน",
    "รหัสลูกค้า",
    "เลขที่สัญญา",
    "น้ำหนัก",
    "ประเภททอง",
    "ดอกเบี้ย",
    "เงินต้น",
    "ชำระรวม",
    "วันที่ทำรายการ",
  ];
  const filteredData = redeemData.filter((item) => item.status === activeTab);

  return (
    <>
      <fieldset className="fieldset w-[1300px] border border-sky-900 shadow-md p-3 rounded-md row-span-1 mt-3">
        <legend className="fieldset-legend text-2xl text-sky-900">
          รายการไถ่ถอน
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
                className={
                  activeTab === "approve" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab("approve")}>
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
                {column.map((col) => (
                  <th key={col}>{col}</th>
                ))}
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr
                    key={item.redeem_id}
                    className={`${
                      item.gold_type === 1
                        ? "bg-blue-100"
                        : item.gold_type === 2
                        ? "bg-yellow-100"
                        : ""
                    }`}>
                    <td>{item.redeem_id}</td>
                    <td>{item.customer_id}</td>
                    <td>{item.pledge_id}</td>
                    <td>
                      {item.weight} {item.gold_type == 1 ? "กิโล" : "บาท"}
                    </td>
                    <td>{GoldTypeText(item.gold_type)}</td>
                    <td>{FormatNumber(item.interest_paid)}</td>
                    <td>{FormatNumber(item.principal_paid)}</td>
                    <td>
                      {FormatNumber(item.principal_paid + item.interest_paid)}
                    </td>
                    <td>{FormatDateFull(item.transaction_date)}</td>

                    {activeTab === "pending" && (
                      <>
                        <td>
                          <button
                            className="bg-green-600 text-white w-[50px] p-1 rounded-lg cursor-pointer"
                            onClick={() =>
                              handleRedeemUpdate(
                                item.transaction_id,
                                item.pledge_id,
                                item.gold_type,
                                item.interest_paid,
                                item.principal_paid,
                                item.weight,
                                item.customer_id,
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
                              handleRedeemUpdate(
                                item.transaction_id,
                                item.pledge_id,
                                item.gold_type,
                                item.interest_paid,
                                item.principal_paid,
                                item.weight,
                                item.customer_id,
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
