import { FormatNumber } from "../../../utility/function";

export default function ModalRedeem({ selectedData, postRedeem }) {
  return (
    <>
      {/*-----Redeem Modal-----*/}
      <dialog id="redeem_modal" className="modal">
        <div className="modal-box">
          <p className="font-bold text-lg mb-2">
            ทำรายการไถ่ถอน : {selectedData?.pledge_id}
          </p>

          <p className="py-4">
            น้ำหนัก :{" "}
            <span className="bg-amber-100 mx-3 px-2 py-1 rounded">
              {selectedData?.weight}
            </span>
            {selectedData?.gold_type == "1" ? "กิโล" : "บาท"}
          </p>

          <p className="py-4">
            เงินต้นชำระ :{" "}
            <span className="bg-amber-100 mx-3 px-2 py-1 rounded">
              {FormatNumber(selectedData?.remain_loan_amount)}
            </span>
            บาท
          </p>

          <p className="py-4">
            ดอกเบี้ยชำระ :{" "}
            <span className="bg-amber-100 mx-3 px-2 py-1 rounded">
              {selectedData?.remain_num_pay == 0
                ? 0
                : FormatNumber(
                    (selectedData?.remain_loan_amount *
                      selectedData?.interest_rate) /
                      100
                  )}
            </span>
            บาท
          </p>

          <p className="py-4">
            ยอดที่ต้องชำระรวม :{" "}
            <span className="bg-amber-100 mx-3 px-2 py-1 rounded">
              {selectedData?.remain_num_pay == 0
                ? FormatNumber(selectedData?.remain_loan_amount)
                : FormatNumber(
                    selectedData?.remain_loan_amount +
                      (selectedData?.remain_loan_amount *
                        selectedData?.interest_rate) /
                        100
                  )}
            </span>
            บาท
          </p>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn mr-2 bg-transparent border-[#2a53b3fc] text-[#2a53b3fc]">
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={postRedeem}
                className="btn ml-2 bg-[#2a53b3fc] text-white">
                ยืนยัน
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
