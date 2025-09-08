import { FormatDate, FormatNumber } from "../../../utility/function";

export default function InterestCard({ intList, handleSelectInt }) {
  //----------------------------------------------------------------------------------------
  // Calculate Remaining Days
  const getRemainingDays = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Render Remaining Badge
  const RemainingDaysBadge = ({ dueDate }) => {
    const days = getRemainingDays(dueDate);

    let text, color;
    if (days < 0) {
      text = "เลยกำหนด";
      color = "bg-gray-600";
    } else if (days <= 7) {
      text = `${days} วัน`;
      color = "bg-red-600";
    } else {
      text = `${days} วัน`;
      color = "bg-gradient-to-br from-[#3b6fb3fc] to-[#244dacfc]";
    }
    return <div className={`badge text-white ${color}`}>{text}</div>;
  };
  //----------------------------------------------------------------------------------------

  if (intList.length === 0) {
    return <p className="text-gray-500 my-8 text-center">ไม่มีรายการที่สามารถต่อดอกได้</p>;
  }

  return (
    <>
      <div className="h-[60vh] overflow-auto mb-8">
        {intList.map((item) => (
          <div
            key={item.interest_id}
            className="grid grid-cols-3 gap-x-1 gap-y-1 border-2 border-sky-900 rounded-lg my-3 p-3 text-md">
            <div className="text-end pr-1">ต่อดอกเลขที่ :</div>
            <div>{item.interest_id}</div>
            <div className="text-end">
              <RemainingDaysBadge dueDate={item.due_date} />
            </div>

            <div className="text-end pr-1">เลขที่สัญญา :</div>
            <div className="col-span-2">{item.pledge_id}</div>

            <div className="text-end pr-1">น้ำหนัก :</div>
            <div className="col-span-2">
              {item.weight} {item.gold_type == "1" ? "บาท" : "กิโล"}
            </div>

            <div className="text-end pr-1">ยอดชำระ :</div>
            <div className="col-span-2">
              {FormatNumber(
                (item.old_loan_amount * item.old_interest_rate) / 100
              )}{" "}
              บาท
            </div>

            <div className="text-end pr-1">สิ้นสุดสัญญา :</div>
            <div className="col-span-2">
              {FormatDate(item.end_date)}
            </div>

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
    </>
  );
}
