export default function InterestCard({ intList, handleSelectInt }) {
  const getRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const RemainingDaysBadge = ({ dueDate }) => {
    const days = getRemainingDays(dueDate);
    const isCritical = days <= 7;

    return (
      <div
        className={`badge text-white ${
          isCritical
            ? "bg-red-600"
            : "bg-gradient-to-br from-[#3b6fb3fc] to-[#244dacfc]"
        }`}>
        {days} วัน
      </div>
    );
  };

  if (intList.length === 0) {
    return <p className="text-gray-500">ไม่มีรายการต่อดอก</p>;
  }

  return (
    <div className="h-[60vh] overflow-auto mb-8">
      {intList.map((item) => (
        <div
          key={item.interest_id}
          className="grid grid-cols-3 gap-x-1 gap-y-1 border-2 border-sky-900 rounded-lg my-3 p-3 text-md">
          <div className="text-end pr-1">รหัสต่อดอก :</div>
          <div>{item.interest_id}</div>
          <div className="text-end">
            <RemainingDaysBadge dueDate={item.due_date} />
          </div>

          <div className="text-end pr-1">เลขที่ขายฝาก :</div>
          <div>{item.pledge_id}</div>
          <div />

          <div className="text-end pr-1">น้ำหนัก :</div>
          <div>
            {item.weight} {item.gold_type == "1" ? "บาท" : "กิโล"}
          </div>
          <div />

          <div className="text-end pr-1">ยอดชำระ :</div>
          <div>
            {((item.old_loan_amount * item.old_interest_rate) / 100).toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}{" "}
            บาท
          </div>
          <div />

          <div className="text-end pr-1">วันสิ้นสุดสัญญา :</div>
          <div>{new Date(item.end_date).toLocaleDateString("th-TH")}</div>
          <div />

          <div className="col-span-3 text-end mt-2">
            <button
              type="button"
              className="cursor-pointer border border-transparent bg-[#dabe96] text-[#081f55fc] hover:border hover:border-[#dabe96] hover:bg-white hover:text-[#dabe96] py-0.5 px-6 rounded text-[16px]"
              onClick={() => handleSelectInt(item)}>
              ต่อดอก
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
