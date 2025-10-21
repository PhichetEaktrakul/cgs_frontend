import {
  FormatDate,
  FormatDateFull,
  FormatNumber,
  GoldTypeText,
} from "../../../utility/function";
import { HiOutlineDocumentMinus } from "react-icons/hi2";

export default function ConsignmentHistory({ filteredData }) {
  return (
    <>
      <div className="h-[70vh] overflow-x-auto my-4">
        {filteredData.length ? (
          filteredData.map((item) => (
            <div
              key={item.pledge_id}
              className="grid grid-cols-[30%_20%_30%_20%] gap-y-1 border border-[#dabe96] rounded-lg my-3 p-3 text-[12px]">
              <p className="col-span-4 font-bold">
                เลขที่สัญญา : {item.pledge_id}
              </p>
              {[
                ["ประเภททอง", GoldTypeText(item.gold_type)],
                [
                  "น้ำหนัก",
                  `${item.weight} ${item.gold_type === 1 ? "กิโล" : "บาท"}`,
                ],
                ["วงเงิน (%)", `${(item.loan_percent).toFixed(2)}%`],
                ["วงเงินที่ได้", FormatNumber(item.loan_amount)],
                ["ราคาอ้างอิง", item.ref_price.toLocaleString()],
                ["อัตราดอกเบี้ย", `${item.interest_rate}%`],
                ["วันเริ่มต้นสัญญา", FormatDate(item.start_date)],
                ["วันสิ้นสุดสัญญา", FormatDate(item.end_date)],
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
    </>
  );
}
