import { useState, useEffect } from "react";
import {
  FormatNumber,
  FormatDate,
  FormatDateFull,
  GoldTypeText,
  CalRemainDays,
  CalFunctions,
} from "../../../utility/function";
import { apiAdmin } from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import { RiExchangeBoxFill } from "react-icons/ri";

export default function CustomerTable({ selected, prices }) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("none");
  const [viewSelected, setViewSelected] = useState("monitor");
  const monitorCol = [
    "เลขที่ Ticket",
    "เลขที่สัญญา",
    "วันครบกำหนดสัญญา",
    "วัน",
    "สถานะ",
    "ประเภททอง",
    "Loan+Int",
    "น้ำหนัก (BAHT)",
    "Gain/Loss",
    "หมายเหตุ",
    "Tools",
  ];
  const consignCol = [
    "เลขที่สัญญา",
    "น้ำหนัก",
    "ประเภททอง",
    "ราคาอ้างอิง",
    "วงเงิน (%)",
    "วงเงินขายฝาก",
    "อัตราดอกเบี้ย",
    "วันเริ่มต้นสัญญา",
    "วันสิ้นสุดสัญญา",
    "วันที่ทำรายการ",
    "สถานะ",
  ];
  const intCol = [
    "เลขที่ต่อดอก",
    "เลขที่สัญญา",
    "ต่อจาก",
    "อัตราดอกเบี้ย",
    "ดอกเบี้ย",
    "ตัดต้น",
    "ยอดชำระ",
    "งวด",
    "วันที่ทำรายการ",
    "สถานะ",
  ];
  const redeemCol = [
    "เลขที่ไถ่ถอน",
    "เลขที่สัญญา",
    "เงินต้น",
    "ดอกเบี้ย",
    "ชำระรวม",
    "วันที่ทำรายการ",
    "สถานะ",
  ];
  const endpoints = {
    monitor: `/consignment/monitor/${selected?.customer_id}`,
    consignment: `/consignment/history/${selected?.customer_id}`,
    interest: `/interest/history/${selected?.customer_id}`,
    redeem: `/redeem/history/${selected?.customer_id}`,
  };

  //----------------------------------------------------------------------------------------
  //  Fetch consignment , interest , redeem when view changes
  useEffect(() => {
    if (!selected) return;
    setData([]);
    apiAdmin
      .get(endpoints[viewSelected])
      .then((res) => {
        setData(res.data);
        setFilter("none");
      })
      .catch((err) => {
        console.error(err);
        toast.error("โหลดข้อมูลไม่สำเร็จ");
      });
  }, [viewSelected, selected]);
  //----------------------------------------------------------------------------------------

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "รออนุมัติ";
      case "active":
        return "อนุมัติ";
      case "redeem":
        return "ไถ่ถอน";
      case "paid":
        return "อนุมัติ";
      case "approve":
        return "อนุมัติ";
      case "reject":
        return "ไม่อนุมัติ";
      case "expire":
        return "หมดอายุ";
      default:
        return status || "-";
    }
  };

  //----------------------------------------------------------------------------------------
  //  Filter data to show by status
  const filteredData =
    filter === "none" ? data : data.filter((item) => item.status === filter);
  //----------------------------------------------------------------------------------------
  
  return (
    <>
      {/* ---------------------- Select Table & Filter ---------------------- */}
      <div className="flex items-center gap-3">
        <span>เลือกดู : </span>
        <select
          value={viewSelected}
          onChange={(e) => setViewSelected(e.target.value)}
          className="select select-bordered border-sky-700 h-[38px] bg-yellow-50">
          <option value="monitor">ตรวจสอบ Ticket</option>
          <option value="consignment">ขายฝาก</option>
          <option value="interest">ต่อดอก</option>
          <option value="redeem">ไถ่ถอน</option>
        </select>

        <span>ตัวกรอง : </span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          disabled={viewSelected === "monitor"}
          className="select select-bordered border-sky-700 h-[38px] bg-yellow-50">
          <option value="none">ไม่มี</option>
          {viewSelected === "consignment" && (
            <>
              <option value="pending">รออนุมัติ</option>
              <option value="active">อนุมัติ</option>
              <option value="redeem">ไถ่ถอน</option>
              <option value="reject">ไม่อนุมัติ</option>
              <option value="expire">หมดอายุ</option>
            </>
          )}
          {viewSelected === "interest" && (
            <>
              <option value="pending">รออนุมัติ</option>
              <option value="paid">อนุมัติ</option>
              <option value="reject">ไม่อนุมัติ</option>
            </>
          )}
          {viewSelected === "redeem" && (
            <>
              <option value="pending">รออนุมัติ</option>
              <option value="approve">อนุมัติ</option>
              <option value="reject">ไม่อนุมัติ</option>
            </>
          )}
        </select>
      </div>

      {/* ---------------------- Render selected table ---------------------- */}
      <div className="mt-4">
        {viewSelected === "consignment" && (
          <p>📋 รายการ ขายฝาก - {filteredData.length} รายการ</p>
        )}
        {viewSelected === "interest" && (
          <p>📋 รายการ ต่อดอก - {filteredData.length} รายการ</p>
        )}
        {viewSelected === "redeem" && (
          <p>📋 รายการ ไถ่คืน - {filteredData.length} รายการ</p>
        )}

        {viewSelected === "monitor" && (
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra- w-full text-center">
              <thead className="bg-sky-700 text-white">
                <tr>
                  {monitorCol.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => {
                    const { avgLoan, gainLoss, adjustedWeight } = CalFunctions(
                      item,
                      prices
                    );
                    return (
                      <tr key={item.transaction_id}>
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
                  <tr>
                    <td colSpan="11" className="text-center">
                      ไม่มีรายการ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {viewSelected === "consignment" && (
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra- w-full text-center">
              <thead className="bg-sky-700 text-white">
                <tr>
                  {consignCol.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.transaction_id}>
                      <td>{item.pledge_id}</td>
                      {item.gold_type == 1 ? (
                        <td>{item.weight} บาท</td>
                      ) : (
                        <td>{item.weight} กิโล</td>
                      )}
                      <td>{GoldTypeText(item.gold_type)}</td>
                      <td>{FormatNumber(item?.ref_price)}</td>
                      <td>{(item.loan_percent * 100).toFixed(2)}%</td>
                      <td>{FormatNumber(item.loan_amount)}</td>
                      <td>{item.interest_rate}%</td>
                      <td>{FormatDate(item.start_date)}</td>
                      <td>{FormatDate(item.end_date)}</td>
                      <td>{FormatDateFull(item.transaction_date)}</td>
                      {filter === "none" && (
                        <td>{getStatusText(item.status)}</td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      ไม่มีรายการ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {viewSelected === "interest" && (
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full text-center">
              <thead className="bg-sky-700 text-white">
                <tr>
                  {intCol.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.transaction_id}>
                      <td>{item.interest_id}</td>
                      <td>{item.pledge_id}</td>
                      <td>{item.prev_interest_id}</td>
                      <td>{item.old_interest_rate} %</td>
                      <td>{FormatNumber(item.pay_interest)}</td>
                      <td>{FormatNumber(item.pay_loan)}</td>
                      <td>{FormatNumber(item.pay_interest + item.pay_loan)}</td>
                      <td>{FormatDate(item.due_date)}</td>
                      <td>{FormatDateFull(item.transaction_date)}</td>
                      {filter === "none" && (
                        <td>{getStatusText(item.status)}</td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center">
                      ไม่มีรายการ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {viewSelected === "redeem" && (
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra w-full text-center">
              <thead className="bg-sky-700 text-white">
                <tr>
                  {redeemCol.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.transaction_id}>
                      <td>{item.redeem_id}</td>
                      <td>{item.pledge_id}</td>
                      <td>{FormatNumber(item.principal_paid)}</td>
                      <td>{FormatNumber(item.interest_paid)} </td>
                      <td>{FormatNumber(item.total_paid)}</td>
                      <td>{FormatDateFull(item.transaction_date)}</td>
                      {filter === "none" && (
                        <td>{getStatusText(item.status)}</td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      ไม่มีรายการ
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
