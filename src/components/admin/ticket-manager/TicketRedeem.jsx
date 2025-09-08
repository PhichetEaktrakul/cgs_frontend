import { useState } from "react";
import {
  FormatDateFull,
  FormatNumber,
  GoldTypeText,
} from "../../../utility/function";

export default function TicketRedeem({ redeemData, handleRedeemUpdate }) {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredData = redeemData.filter((item) => item.status === activeTab);

  return (
    <>
      <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md max-w-2xl row-span-1 mt-3">
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
                <th>ไถ่ถอนเลขที่</th>
                <th>รหัสลูกค้า</th>
                <th>เลขที่สัญญา</th>
                <th>น้ำหนัก</th>
                <th>ประเภททอง</th>
                <th>เงินต้น</th>
                <th>ดอกเบี้ย</th>
                <th>ยอดรวม</th>
                <th>วันที่ทำรายการ</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.redeem_id}>
                    <td>{item.redeem_id}</td>
                    <td>{item.customer_id}</td>
                    <td>{item.pledge_id}</td>
                    <td>{item.weight}</td>
                    <td>{GoldTypeText(item.gold_type)}</td>
                    <td>{FormatNumber(item.principal_paid)}</td>
                    <td>{FormatNumber(item.interest_paid)}</td>
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
