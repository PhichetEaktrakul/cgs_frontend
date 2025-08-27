import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TicketManager() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);

  const [activeTab, setActiveTab] = useState("pending");
  const [activeTab2, setActiveTab2] = useState("pending");

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchData = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/consignment/status/all`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchData2 = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/interest/status/all`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setData2(response.data);
        console.log("reach here!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData2();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const goldTypeText = (type) => {
    if (type === 2) return "99.9%";
    if (type === 1) return "96.5%";
    return "-";
  };

  const formatDateBuddhist = (dateStr) => {
    return new Date(dateStr)
      .toLocaleString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit", // last 2 digits of Buddhist year
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(/\u200E/g, ""); // remove any invisible characters
  };

  //-------------------------------------------------------------------------------------------------------------------
  const handlerConsignmentApprove = (
    TransId,
    pledgeId,
    custId,
    goldType,
    weight,
    method
  ) => {
    axios
      .post(`${apiUrl}/consignment/update/status`, {
        transactionId: TransId,
        pledgeId: pledgeId,
        customerId: custId,
        goldType: goldType,
        weight: weight,
        method: method,
      })
      .then(() => {
        toast.success(`อนุมัติรายการขายฝาก ID ${pledgeId} เเล้ว!`);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //-------------------------------------------------------------------------------------------------------------------
  const handlerConsignmentReject = (
    TransId,
    pledgeId,
    custId,
    goldType,
    weight,
    method
  ) => {
    axios
      .post(`${apiUrl}/consignment/update/status`, {
        transactionId: TransId,
        pledgeId: pledgeId,
        customerId: custId,
        goldType: goldType,
        weight: weight,
        method: method,
      })
      .then(() => {
        toast.success(`ไม่อนุมัติรายการขายฝาก ID ${pledgeId} เเล้ว!`);
        fetchData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //-------------------------------------------------------------------------------------------------------------------

  const handleInterestAction = (
    interestId,
    transactionId,
    pledgeId,
    dueDate,
    loanAmount,
    intRate,
    method
  ) => {
    console.log(method);
    const formattedDate = new Date(dueDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    axios
      .post(`${apiUrl}/interest/update/status`, {
        interestId,
        transactionId,
        pledgeId,
        dueDate: formattedDate,
        loanAmount: Number(loanAmount),
        intRate,
        method,
      })
      .then(() => {
        const message =
          method === "approve"
            ? `อนุมัติรายการต่อดอก ID ${interestId} เเล้ว!`
            : `ไม่อนุมัติรายการต่อดอก ID ${interestId} เเล้ว!`;

        toast.success(message);
        fetchData2();
      });
  };

  //-------------------------------------------------------------------------------------------------------------------

  const filteredData = data.filter((item) => item.status === activeTab);
  const filteredData2 = data2.filter((item) => item.status === activeTab2);

  return (
    <div className="max-w-[1300px]">
      {/* ------------------------------------------------------------------------------------------------------------ */}
      <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md max-w-2xl row-span-1 mb-3">
        <legend className="fieldset-legend text-2xl text-sky-900">
          รายการขายฝาก
        </legend>

        {/* Tabs */}
        <div className="flex justify-center mt-2">
          <ul className="menu menu-horizontal bg-base-200 p-0 rounded-md border border-sky-700">
            <li>
              <a
                className={
                  activeTab === "pending" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab("pending")}>
                รออนุมัติ
              </a>
            </li>
            <li>
              <a
                className={
                  activeTab === "active" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab("active")}>
                อนุมัติแล้ว
              </a>
            </li>
            <li>
              <a
                className={
                  activeTab === "reject" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab("reject")}>
                ไม่อนุมัติ
              </a>
            </li>
          </ul>
        </div>

        {/* Table */}
        <div className="mt-4">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-sky-700 text-white">
                <th>เลขที่ขายฝาก</th>
                <th>รหัสลูกค้า</th>
                <th>น้ำหนัก (บาท)</th>
                <th>น้ำหนัก (กิโล)</th>
                <th>ประเภททอง</th>
                <th>ราคาอ้างอิง</th>
                <th>วงเงิน (%)</th>
                <th>วงเงินที่ได้</th>
                <th>อัตราดอกเบี้ย</th>
                <th>วันเริ่มต้นสัญญา</th>
                <th>วันครบกำหนดสัญญา</th>
                <th>วันที่ทำรายการ</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.transaction_id}>
                    <td>{item.pledge_id}</td>
                    <td>{item.customer_id}</td>
                    {item.gold_type == 1 ? (
                      <>
                        <td>{item.weight}</td>
                        <td></td>
                      </>
                    ) : (
                      <>
                        <td></td>
                        <td>{item.weight}</td>
                      </>
                    )}
                    <td>{goldTypeText(item.gold_type)}</td>
                    <td>{item.ref_price.toLocaleString()}</td>
                    <td>{(item.loan_percent * 100).toFixed(2)}%</td>
                    <td>{item.loan_amount.toLocaleString()}</td>
                    <td>{item.interest_rate}%</td>
                    <td>{formatDate(item.start_date)}</td>
                    <td>{formatDate(item.end_date)}</td>
                    <td>{formatDate(item.transaction_date)}</td>

                    {activeTab === "pending" && (
                      <>
                        <td>
                          <button
                            className="bg-green-600 text-white w-[50px] p-1 rounded-lg cursor-pointer"
                            onClick={() =>
                              handlerConsignmentApprove(
                                item.transaction_id,
                                item.pledge_id,
                                item.customer_id,
                                item.gold_type,
                                item.weight,
                                "approve"
                              )
                            }>
                            อนุมัติ
                          </button>
                        </td>
                        <td>
                          <button
                            className="bg-red-600 text-white w-[60px] p-1  rounded-lg cursor-pointer"
                            onClick={() =>
                              handlerConsignmentReject(
                                item.transaction_id,
                                item.pledge_id,
                                item.customer_id,
                                item.gold_type,
                                item.weight,
                                "reject"
                              )
                            }>
                            ไม่อนุมัติ
                          </button>
                        </td>
                      </>
                    )}

                    {activeTab !== "pending" && (
                      <>
                        <td></td>
                        <td></td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    ไม่มีข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </fieldset>

      {/* ------------------------------------------------------------------------------------------------------------ */}
      <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md max-w-2xl row-span-1 my-3">
        <legend className="fieldset-legend text-2xl text-sky-900">
          รายการต่อดอก
        </legend>

        {/* Tabs */}
        <div className="flex justify-center mt-2">
          <ul className="menu menu-horizontal bg-base-200 p-0 rounded-md border border-sky-700">
            <li>
              <a
                className={
                  activeTab2 === "pending" ? "bg-sky-700 text-white" : ""
                }
                onClick={() => setActiveTab2("pending")}>
                รออนุมัติ
              </a>
            </li>
            <li>
              <a
                className={activeTab2 === "paid" ? "bg-sky-700 text-white" : ""}
                onClick={() => setActiveTab2("paid")}>
                อนุมัติแล้ว
              </a>
            </li>
            <li>
              <a
                className={activeTab2 === "reject" ? "bg-sky-700 text-white" : ""}
                onClick={() => setActiveTab2("reject")}>
                รายการไม่สำเร็จ
              </a>
            </li>
          </ul>
        </div>

        {/* Table */}
        <div className="mt-4">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-sky-700 text-white">
                <th>รายการต่อดอกเลขที่</th>
                <th>เลขที่ขายฝาก</th>
                <th>ต่อจาก</th>
                <th>ดอกเบี้ย</th>
                <th>ตัดต้น</th>
                <th>ชำระ</th>
                <th>อัตราดอกเบี้ย</th>
                <th className="px-11">วันครบกำหนด</th>
                <th className="px-11">วันที่ทำรายการ</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData2.length > 0 ? (
                filteredData2.map((item) => (
                  <tr key={item.interest_id}>
                    <td>{item.interest_id}</td>
                    <td>{item.pledge_id}</td>
                    <td>{item.prev_interest_id}</td>
                    <td>{item.pay_interest}</td>
                    <td>{item.pay_loan}</td>
                    <td>{item.pay_interest + item.pay_loan}</td>
                    <td>{item.old_interest_rate}</td>
                    <td>{formatDate(item.due_date)}</td>
                    <td>{formatDateBuddhist(item.transaction_date)}</td>
                    {activeTab2 === "pending" && (
                      <>
                        <td>
                          <button
                            className="bg-green-600 text-white w-[50px] p-1 rounded-lg cursor-pointer"
                            onClick={() =>
                              handleInterestAction(
                                item.interest_id,
                                item.transaction_id,
                                item.pledge_id,
                                item.due_date,
                                item.old_loan_amount - item.pay_loan,
                                item.old_interest_rate,
                                "approve"
                              )
                            }>
                            อนุมัติ
                          </button>
                        </td>
                        <td>
                          <button
                            className="bg-red-600 text-white w-[60px] p-1  rounded-lg cursor-pointer"
                            onClick={() =>
                              handleInterestAction(
                                item.interest_id,
                                item.transaction_id,
                                item.pledge_id,
                                item.due_date,
                                item.old_loan_amount - item.pay_loan,
                                item.old_interest_rate,
                                "reject"
                              )
                            }>
                            ไม่อนุมัติ
                          </button>
                        </td>
                      </>
                    )}

                    {activeTab2 !== "await" && (
                      <>
                        <td></td>
                        <td></td>
                      </>
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
      </fieldset>
      {/* ------------------------------------------------------------------------------------------------------------ */}
      {/*       <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md max-w-2xl row-span-1 mt-3">
        <legend className="fieldset-legend text-2xl text-sky-900">
          รายการไถ่ถอน
        </legend>
        <p className="text-center text-black text-lg">ยังไม่มีรายการขณะนี้</p>
      </fieldset> */}
    </div>
  );
}
