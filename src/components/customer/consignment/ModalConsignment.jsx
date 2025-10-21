import { FormatNumber, FormatDateHyphen } from "../../../utility/function";

export default function ModalConsignment({
  tempValue,
  postConsignment,
  isLoading,
  selected,
}) {
  return (
    <>
      <dialog id="submit_modal" className="modal">
        <div className="modal-box">
          <p className="font-bold text-lg mb-2">ยืนยันการทำรายการ</p>

          <p className="py-4">
            จำนวนที่ขายฝาก :{" "}
            <span className="bg-amber-100 mx-3 px-2 py-1 rounded">{tempValue.weight}</span>
            {selected == 1 ? "กิโล" : "บาท"}
          </p>

          <p className="py-4">
            วงเงินที่ได้รับ :{" "}
            <span className="bg-amber-100 mx-3 px-2 py-1 rounded">{FormatNumber(tempValue.loanAmount)}</span>
            {" "}บาท
          </p>

          <p className="py-4">
            ดอกเบี้ยที่ต้องชำระ :{" "}
            <span className="bg-amber-100 mx-3 px-2 py-1 rounded">{FormatNumber(tempValue.interestPay)}</span>
            {" "}บาท
          </p>

          <p className="py-4">
            ระยะสัญญา :{" "}
            <span className="bg-amber-100 mx-3 px-2 py-1 rounded">{tempValue.numPay}</span>
            {" "}เดือน
          </p>

          <p className="py-4">
            วันสิ้นสุดสัญญา :{" "}
            <span className="bg-amber-100 mx-3 px-2 py-1 rounded">{FormatDateHyphen(tempValue.endDate)}</span>
          </p>

          <div className="modal-action">
            <div>
              <button
                className="btn mr-2 bg-transparent border-[#2a53b3fc] text-[#2a53b3fc]"
                onClick={() => document.getElementById("submit_modal").close()}>
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={postConsignment}
                className="btn ml-2 bg-[#2a53b3fc] text-white"
                disabled={isLoading === 1}>
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
