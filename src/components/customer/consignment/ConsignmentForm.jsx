import { FormatDateHyphen, FormatNumber } from "../../../utility/function";

export default function ConsignmentForm({
  tempValue,
  setTempValue,
  selected,
  setSelected,
  error,
  setError,
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 text-center mb-3">
        <div>
          <p>เลขที่สัญญา</p>
          <p>{tempValue.pledgeId}</p>
        </div>
        <div>
          <p>ราคาทองปัจจุบัน {selected == "1" ? "96.5" : "99.9"}</p>
          <p>
            {selected == "1"
              ? tempValue.refPrice1.toLocaleString()
              : tempValue.refPrice2.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center mb-3">
        <div>
          <p>วันที่เริ่มต้นสัญญา</p>
          <p>{FormatDateHyphen(tempValue.startDate)}</p>
        </div>
        <div>
          <p>วันที่สิ้นสุดสัญญา</p>
          <p>{FormatDateHyphen(tempValue.endDate)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center mb-3">
        <div>
          <p>อัตราดอกเบี้ย</p>
          <p>{tempValue.interestRate} %</p>
        </div>
        <div>
          <p>วงเงิน</p>
          <p>{tempValue.loanPercent * 100} %</p>
        </div>
      </div>

      <hr className="text-gray-400 my-3" />

      <div className="text-center mb-4">
        <p className="text-lg">ประเภททองที่ต้องการขายฝาก</p>
        <div className="grid grid-cols-2 grid-rows-1">
          <div className="justify-end">
            <input
              type="radio"
              name="gold_percent"
              value="1"
              checked={selected === "1"}
              onChange={(e) => setSelected(e.target.value)}
            />{" "}
            ทอง 96.5%
          </div>
          <div>
            <input
              type="radio"
              name="gold_percent"
              value="2"
              checked={selected === "2"}
              onChange={(e) => setSelected(e.target.value)}
            />{" "}
            ทอง 99.99%
          </div>
        </div>
      </div>
      
      <form
        className="px-3"
        onSubmit={(e) => {
          e.preventDefault();
          setError(false);
          if (
            (selected == "1" && tempValue.weight > tempValue.goldBalance96) ||
            (selected == "2" && tempValue.weight > tempValue.goldBalance99) ||
            tempValue.weight <= 0
          )
            return setError(true);
          document.getElementById("submit_modal").showModal();
        }}>

        <div className="mt-2">
          <p>
            จำนวนที่ต้องการขายฝาก <span className="text-red-600">*</span>
          </p>
          <label
            className={`input w-full mt-2 h-[35px] ${
              error ? "border-red-600 border-1" : ""
            }`}>
            <input
              type="number"
              placeholder="0"
              value={tempValue.weight || ""}
              onChange={(e) => {
                const value = e.target.value.replace(/^0+/, "");
                setTempValue((prev) => ({
                  ...prev,
                  weight: value === "" ? "" : Number(value),
                }));
              }}
            />
            <span className="label">{selected == "1" ? "บาท" : "กิโล"}</span>
          </label>
          {error == true ? (
            <p className="text-red-600">กรุณากรอกจำนวนให้ถูกต้อง</p>
          ) : (
            <></>
          )}
        </div>

        <div className="mt-2">
          <p>คงเหลือทอง</p>
          <label className="input w-full mt-2 h-[35px] bg-yellow-50">
            <input
              type="number"
              placeholder="0"
              value={
                selected == "1"
                  ? FormatNumber(
                      Number(tempValue.goldBalance96) - Number(tempValue.weight)
                    )
                  : FormatNumber(
                      Number(tempValue.goldBalance99) - Number(tempValue.weight)
                    )
              }
              readOnly
            />
            <span className="label">{selected == "1" ? "บาท" : "กิโล"}</span>
          </label>
        </div>

        <div className="mt-2">
          <p>วงเงินที่ได้รับ</p>
          <label className="input w-full mt-2 h-[35px] bg-yellow-50">
            <input
              type="text"
              value={FormatNumber(tempValue.loanAmount)}
              readOnly
            />
            <span className="label">บาท</span>
          </label>
        </div>

        <div className="mt-2">
          <p>ดอกเบี้ยที่ต้องชำระ</p>
          <label className="input w-full mt-2 h-[35px] bg-yellow-50">
            <input
              type="text"
              value={FormatNumber(tempValue.interestPay)}
              readOnly
            />
            <span className="label">บาท</span>
          </label>
        </div>

        <div className="py-3">
          <button
            type="submit"
            className="cursor-pointer mt-1 p-1 text-[#081f55fc] bg-[#dabe96] w-full rounded-md">
            ยืนยัน
          </button>
        </div>
      </form>
    </>
  );
}
