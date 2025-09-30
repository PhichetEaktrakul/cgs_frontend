import {
  FormatNumber,
  FormatDate,
  FormatDateFull,
} from "../../../utility/function";
import { HiOutlineDocumentMinus } from "react-icons/hi2";

export default function InterestHistory({ filteredData }) {
  return (
    <>
      <div className="h-[70vh] overflow-x-auto my-4">
        {filteredData.length ? (
          filteredData.map((item) => (
            <div
              key={item.transaction_id}
              className="grid grid-cols-[30%_20%_30%_20%] gap-y-1 border border-[#dabe96] rounded-lg my-3 p-3 text-[12px]">
              <p className="col-span-4 font-bold">
                ต่อดอกเลขที่ : {item.interest_id}
              </p>
              {[
                ["ต่อจาก", item.prev_interest_id],
                ["เลขที่สัญญา", item.pledge_id],
                [
                  "น้ำหนัก",
                  `${item.weight} ${item.gold_type == 1 ? "บาท" : "กิโล"}`,
                ],
                ["อัตราดอกเบี้ย", `${item.old_interest_rate}%`],
                ["ดอกเบี้ย", FormatNumber(item.pay_interest)],
                ["ตัดต้น", FormatNumber(item.pay_loan)],
                ["ยอดชำระ", FormatNumber(item.pay_interest + item.pay_loan)],
                ["งวด", FormatDate(item.due_date)],
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
