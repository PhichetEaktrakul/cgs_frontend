import {
  FormatDate,
  FormatNumber,
  GoldTypeText,
} from "../../../utility/function";

export default function RedeemCard({ redeemList, handleSelectRed }) {

  if (redeemList.length === 0) {
    return <p className="text-gray-500 my-8 text-center">ไม่มีรายการที่สามารถไถ่ถอนได้</p>;
  }

  return (
    <>
      <div className="h-[60vh] overflow-auto mb-8">
        {redeemList.map((item) => (
          <div
            key={item.transaction_id}
            className="grid grid-cols-[40%_60%] gap-x-1 gap-y-1 border-1 border-sky-900 rounded-lg my-3 p-3 text-md">
            <div className="text-end pr-1">เลขที่สัญญา :</div>
            <div>{item.pledge_id}</div>

            <div className="text-end pr-1">ประเภททอง :</div>
            <div>{GoldTypeText(item.gold_type)}</div>

            <div className="text-end pr-1">น้ำหนัก :</div>
            <div>
              {item.weight} {item.gold_type == "1" ? "กิโล" : "บาท"}
            </div>

            <div className="text-end pr-1">ดอกเบี้ยที่ต้องชำระ :</div>
            <div>
              {item.remain_num_pay == 0 ? 0 : FormatNumber((item.remain_loan_amount * item.interest_rate) / 100)} บาท
            </div>

            <div className="text-end pr-1">ยอดเงินต้นคงเหลือ :</div>
            <div>{FormatNumber(item.remain_loan_amount)} บาท</div>

            <div className="text-end pr-1">วันเริ่มต้นสัญญา :</div>
            <div>{FormatDate(item.start_date)}</div>

            <div className="text-end pr-1">วันสิ้นสุดสัญญา :</div>
            <div>{FormatDate(item.end_date)}</div>

            <div className="col-span-2 text-end mt-2">
              <button
                type="button"
                className="cursor-pointer border border-transparent bg-[#dabe96] text-[#081f55fc] hover:border hover:border-[#dabe96] hover:bg-white hover:text-[#dabe96] py-0.5 px-6 rounded text-[16px]"
                onClick={() => handleSelectRed(item)}>
                ไถ่ถอน
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
