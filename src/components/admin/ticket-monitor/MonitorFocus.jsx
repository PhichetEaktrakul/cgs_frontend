import {FormatNumber, FormatDate, GoldTypeText, CalRemainDays, CalFunctions} from "../../../utility/function";
import { RiExchangeBoxFill } from "react-icons/ri";

export default function MonitorFocus({
  data,
  prices,
  switchOrderStatus,
  selectedTickets,
  setSelectedTickets,
}) {
  const columns = ["#", "เลขที่ Ticket", "เลขที่สัญญา", "วันครบกำหนดสัญญา", "วัน", "สถานะ", "ประเภททอง", "Loan+Int", "น้ำหนัก (BAHT)", "Gain/Loss", "หมายเหตุ", "Tools"];



  return (
    <>
      <fieldset className="fieldset bg-white shadow-md border border-sky-900 p-3 rounded-md mt-6 max-w-7xl">
        <legend className="fieldset-legend text-2xl text-sky-900">Focus Ticket</legend>

        {/*------------Switch Ticket Order Status Button------------*/}
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-sky-700 text-white text-[16px] rounded cursor-pointer disabled:bg-gray-400 disabled:cursor-auto" onClick={() => switchOrderStatus("Long")} disabled={!selectedTickets.length}>Set Long</button>
          <button className="px-3 py-1 bg-sky-700 text-white text-[16px] rounded cursor-pointer disabled:bg-gray-400 disabled:cursor-auto" onClick={() => switchOrderStatus("Shot")} disabled={!selectedTickets.length}>Set Shot</button>
        </div>

        {/*------------Focus Ticket Table------------*/}
        <div className="overflow-x-auto my-2">
          <table className="table table-xs text-center">
            <thead className="bg-sky-700 text-white">
              <tr>{columns.map((col) => (<th key={col}>{col}</th>))}</tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((item) => {
                  const { avgLoan, gainLoss, adjustedWeight } =
                    CalFunctions(item, prices);
                  return (
                    <tr
                      key={item.pledge_id}
                      className={`text-[14px]! ${
                        item.gold_type === 1
                          ? "bg-yellow-100"
                          : item.gold_type === 2
                          ? "bg-blue-100"
                          : ""
                      }`}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedTickets.includes(item.pledge_id)}
                          onChange={(e) =>
                            setSelectedTickets(
                              e.target.checked
                                ? [...selectedTickets, item.pledge_id]
                                : selectedTickets.filter(
                                    (id) => id !== item.pledge_id
                                  )
                            )
                          }
                        />
                      </td>
                      <td>{item.transaction_id}</td>
                      <td>{item.pledge_id}</td>
                      <td>{FormatDate(item.end_date)}</td>
                      <td>{CalRemainDays(item.end_date)}</td>
                      <td>
                        <div
                          className={`badge text-white border-0 ${
                            item.pledge_order === "Shot"
                              ? "bg-red-500"
                              : item.pledge_order === "Long"
                              ? "bg-green-500"
                              : ""
                          }`}>
                          {item.pledge_order}
                        </div>
                      </td>
                      <td>{GoldTypeText(item.gold_type)}</td>
                      <td>{FormatNumber(avgLoan)}</td>
                      <td>{adjustedWeight}</td>
                      <td
                        className={
                          gainLoss < 0 ? "text-red-500" : "text-green-600"
                        }>
                        {FormatNumber(gainLoss)}
                      </td>
                      <td>{item.remark}</td>
                      <td className="text-xl text-sky-600">
                        <RiExchangeBoxFill />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-[14px]!">
                  <td colSpan={12}>ไม่มีรายการ</td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-sky-700 text-white">
              <tr>{columns.map((col) => (<th key={col}>{col}</th>))}</tr>
            </tfoot>
          </table>
        </div>

        {/*------------Mock Up Paginate------------*/}
        <div className="text-center my-2">
          <div className="join shadow-md">
            <button className="join-item btn btn-sm bg-white">1</button>
            <button className="join-item btn btn-sm bg-white">2</button>
            <button className="join-item btn btn-sm btn-disabled bg-white">
              ...
            </button>
            <button className="join-item btn btn-sm bg-white">99</button>
            <button className="join-item btn btn-sm bg-white">100</button>
          </div>
        </div>
      </fieldset>
    </>
  );
}
