import { useEffect, useState } from "react";
import TicketConsignment from "./TicketConsignment";
import TicketInterest from "./TicketInterest";
import TicketRedeem from "./TicketRedeem";
import { apiAdmin } from "../../../api/axiosInstance";
import toast from "react-hot-toast";

export default function TicketManager({ refetchKey }) {
  const [pledgeData, setPledgeData] = useState([]);
  const [interestData, setInterestData] = useState([]);
  const [redeemData, setRedeemData] = useState([]);

  //----------------------------------------------------------------------------------------
  // Fetch helper
  const fetchData = async (url, setter, errorMsg = "โหลดข้อมูลล้มเหลว") => {
    try {
      const { data } = await apiAdmin.get(url);
      setter(data);
    } catch (error) {
      console.error(error);
      toast.error(errorMsg);
    }
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Update helper
  const updateStatus = async (url, payload, successMsg, refetch) => {
    try {
      await apiAdmin.post(url, payload);
      toast.success(successMsg);
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("อัพเดทสถานะล้มเหลว");
    }
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Update Consignment Status
  const handleConsignmentUpdate = (
    transactionId,
    pledgeId,
    customerId,
    goldType,
    weight,
    loanAmount,
    method
  ) => {
    const payload = {
      transactionId,
      pledgeId,
      customerId,
      goldType,
      weight,
      loanAmount,
      method,
    };
    console.log("reach here");
    console.log(payload);
    const msg =
      method === "approve"
        ? `อนุมัติรายการขายฝาก ID ${pledgeId} เเล้ว!`
        : `ไม่อนุมัติรายการขายฝาก ID ${pledgeId} เเล้ว!`;
    updateStatus("/consignment/approve/status", payload, msg, () =>
      fetchData("/consignment/history/all", setPledgeData)
    );
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Update Interest Status
  const handleInterestUpdate = (
    interestId,
    transactionId,
    pledgeId,
    dueDate,
    endDate,
    interestAmount,
    loanAmount,
    intRate,
    method
  ) => {
    const formattedDueDate = new Date(dueDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedEndDate = new Date(endDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const payload = {
      interestId,
      transactionId,
      pledgeId,
      dueDate: formattedDueDate,
      endDate: formattedEndDate,
      interestAmount,
      loanAmount,
      intRate,
      method,
    };
    console.log("reach here");
    console.log(payload);
    const msg =
      method === "approve"
        ? `อนุมัติรายการต่อดอก ID ${interestId} เเล้ว!`
        : `ไม่อนุมัติรายการต่อดอก ID ${interestId} เเล้ว!`;
    updateStatus("/interest/approve/status", payload, msg, () =>
      fetchData("/interest/history/all", setInterestData)
    );
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Update Redeem Status
  const handleRedeemUpdate = (
    transId,
    pledgeId,
    goldType,
    intPaid,
    prinPaid,
    weight,
    custId,
    method
  ) => {
    const payload = { transId, pledgeId, goldType, intPaid, prinPaid, weight, custId, method };
    const msg = method === "approve" ? "อนุมัติเรียบร้อย" : "ปฏิเสธเรียบร้อย";
    updateStatus("/redeem/approve/status", payload, msg, () => {
      fetchData("/redeem/history/all", setRedeemData);
      fetchData("/consignment/history/all", setPledgeData);
    });
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Refetch
  useEffect(() => {
    if (refetchKey) {
      fetchData("/consignment/history/all", setPledgeData);
      fetchData("/interest/history/all", setInterestData);
      fetchData("/redeem/history/all", setRedeemData);
    }
  }, [refetchKey]);
  //----------------------------------------------------------------------------------------

  return (
    <>
      <div>
        {/* ------------------------- Consignment Ticket Section ------------------------- */}
        <TicketConsignment
          pledgeData={pledgeData}
          handleConsignmentUpdate={handleConsignmentUpdate}
        />

        {/* ------------------------- Interest Ticket Section ------------------------- */}
        <TicketInterest
          interestData={interestData}
          handleInterestUpdate={handleInterestUpdate}
        />

        {/* ------------------------- Redeem Ticket Section ------------------------- */}
        <TicketRedeem
          redeemData={redeemData}
          handleRedeemUpdate={handleRedeemUpdate}
        />
      </div>
    </>
  );
}
