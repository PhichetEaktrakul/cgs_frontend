import { FormatNumber, FormatDateFull } from "../../../utility/function";
import { HiOutlineDocumentMinus } from "react-icons/hi2";

export default function RedeemHistory({ filteredData }) {
  return (
    <>
      <div className="h-[70vh] overflow-x-auto my-4">
        {filteredData.length ? (
          filteredData.map((item) => (
            <div
              key={item.redeem_id}
              className="grid grid-cols-[20%_30%_20%_30%] gap-y-1 border border-[#dabe96] rounded-lg my-3 p-3 text-[12px]">
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
    </>
  );
}
