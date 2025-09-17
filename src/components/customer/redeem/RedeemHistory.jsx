import { useState } from "react";
import { FormatNumber, FormatDateFull } from "../../../utility/function";
import { HiOutlineDocumentMinus } from "react-icons/hi2";

export default function RedeemHistory({ data }) {
  const [activeTab, setActiveTab] = useState("pending");
  const tabs = [
    { key: "pending", label: "รออนุมัติ" },
    { key: "approve", label: "สำเร็จ" },
    { key: "reject", label: "ไม่สำเร็จ" },
  ];
  const filteredData = data.filter((item) => item.status === activeTab);

  return (
    <>
      <div className="mt-4">
        
        {/* ---------------------- Tabs ---------------------- */}
        <div className="flex justify-center mt-2">
          <ul className="menu menu-horizontal bg-base-200 p-0 rounded-md border border-[#dabe96] text-[12px]">
            {tabs.map((tab) => (
              <li key={tab.key}>
                <a
                  className={activeTab === tab.key ? "bg-[#dabe96]" : ""}
                  onClick={() => setActiveTab(tab.key)}>
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ---------------------- History ---------------------- */}
        <div className="h-[70vh] overflow-x-auto my-4">
          {filteredData.length ? (
            filteredData.map((item) => (
              <div
                key={item.redeem_id}
                className="grid grid-cols-[30%_20%_30%_20%] gap-y-1 border border-[#dabe96] rounded-lg my-3 p-3 text-[12px]">
                <p className="col-span-4 font-bold">
                  ไถ่ถอนเลขที่ : {item.redeem_id}
                </p>
                {[
                  ["เลขที่สัญญา", item.pledge_id],
                  ["จ่ายเงินต้น", FormatNumber(item.principal_paid)],
                  ["จ่ายดอกเบี้ย", FormatNumber(item.interest_paid)],
                  ["ยอดรวม", FormatNumber(item.total_paid)],
                ].map(([label, value], i) => (
                  <span key={i} className="contents">
                    <span className="text-center pr-1">{label}</span>
                    <span>: {value}</span>
                  </span>
                ))}
                <span className="text-center pr-1">วันที่ทำรายการ</span>
                <span className="col-span-3">
                  : {FormatDateFull(item.transaction_date)}
                </span>
              </div>
            ))
          ) : (
            <div className="flex text-gray-400 items-center justify-center">
              <HiOutlineDocumentMinus className="mb-1 mr-2" />
              ไม่มีรายการ
            </div>
          )}
        </div>
      </div>
    </>
  );
}
