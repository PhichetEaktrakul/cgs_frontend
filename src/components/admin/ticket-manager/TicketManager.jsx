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

  // Generic fetch helper
  const fetchData = async (url, setter, errorMsg = "โหลดข้อมูลล้มเหลว") => {
    try {
      const { data } = await apiAdmin.get(url);
      setter(data);
    } catch (error) {
      console.error(error);
      toast.error(errorMsg);
    }
  };

  // Generic update helper
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

  // ------------------ Handlers ------------------ //
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
    const msg =
      method === "approve"
        ? `อนุมัติรายการขายฝาก ID ${pledgeId} เเล้ว!`
        : `ไม่อนุมัติรายการขายฝาก ID ${pledgeId} เเล้ว!`;
    updateStatus("/consignment/update/status", payload, msg, () =>
      fetchData("/consignment/status/all", setPledgeData)
    );
  };

  const handleInterestUpdate = (
    interestId,
    transactionId,
    pledgeId,
    dueDate,
    interestAmount,
    loanAmount,
    intRate,
    method
  ) => {
    const formattedDate = new Date(dueDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const payload = {
      interestId,
      transactionId,
      pledgeId,
      dueDate: formattedDate,
      interestAmount,
      loanAmount,
      intRate,
      method,
    };
    const msg =
      method === "approve"
        ? `อนุมัติรายการต่อดอก ID ${interestId} เเล้ว!`
        : `ไม่อนุมัติรายการต่อดอก ID ${interestId} เเล้ว!`;
    updateStatus("/interest/update/status", payload, msg, () =>
      fetchData("/interest/status/all", setInterestData)
    );
  };

  const handleRedeemUpdate = (
    transId,
    pledgeId,
    goldType,
    weight,
    custId,
    method
  ) => {
    const payload = { transId, pledgeId, goldType, weight, custId, method };
    const msg = method === "approve" ? "อนุมัติเรียบร้อย" : "ปฏิเสธเรียบร้อย";
    updateStatus("/redeem/update/status", payload, msg, () =>
      fetchData("/redeem/status/all", setRedeemData)
    );
  };

  // ------------------ Fetch on mount / refetch ------------------ //
  useEffect(() => {
    if (refetchKey) {
      fetchData("/consignment/status/all", setPledgeData);
      fetchData("/interest/status/all", setInterestData);
      fetchData("/redeem/status/all", setRedeemData);
    }
  }, [refetchKey]);
  
  return (
    <>
      <div>
        {/* ------------------------- Consignment Ticket Section ------------------------- */}
        <TicketConsignment pledgeData={pledgeData} handleConsignmentUpdate={handleConsignmentUpdate}/>

        {/* ------------------------- Interest Ticket Section ------------------------- */}
        <TicketInterest interestData={interestData} handleInterestUpdate={handleInterestUpdate}/>

        {/* ------------------------- Redeem Ticket Section ------------------------- */}
        <TicketRedeem redeemData={redeemData} handleRedeemUpdate={handleRedeemUpdate}/>
      </div>
    </>
  );
}
