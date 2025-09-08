import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { apiCust } from "../../api/axiosInstance";
import toast from "react-hot-toast";
import Header from "../../components/customer/Header";
import RedeemCard from "../../components/customer/redeem/RedeemCard";
import RedeemHistory from "../../components/customer/redeem/RedeemHistory";
import ModalRedeem from "../../components/customer/redeem/ModalRedeem";

export default function Redeem() {
  const [redeemList, setRedeemList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [history, setHistory] = useState([]);

  const { user } = useUser();

  //----------------------------------------------------------------------------------------
  // Select Target Redeem
  const handleSelectRed = (data) => {
    setSelectedData(data);
    document.getElementById("redeem_modal").showModal();
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Submit Redeem Transaction
  const postRedeem = async () => {
    if (!selectedData) return;

    try {
      await apiCust.post("/redeem/create", {
        transactionId: selectedData.transaction_id,
        pledgeId: selectedData.pledge_id,
        principalPay: selectedData.remain_loan_amount,
        interestPay:
          (selectedData.remain_loan_amount * selectedData.interest_rate) / 100,
      });

      toast.success("ทำรายการไถ่ถอนสำเร็จ!");
      document.getElementById("redeem_modal").close();
      fetchData();
    } catch (error) {
      console.error("Redeem error:", error);
    }
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Fetch Redeemable List and History
  const fetchData = async () => {
    try {
      const [redeemRes, historyRes] = await Promise.all([
        apiCust.get(`/redeem/list/${user.custid}`),
        apiCust.get(`/redeem/status/${user.custid}`),
      ]);

      setRedeemList(redeemRes.data);
      setHistory(historyRes.data);
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------------------------------------------------------

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header
        bottom={
          <>
            <p className="text-center text-2xl">ไถ่ถอน</p>
            {/*------------Render Redeemable Consignment List------------*/}
            <RedeemCard
              redeemList={redeemList}
              handleSelectRed={handleSelectRed}
            />

            <hr className="text-gray-400 my-3" />

            <p>ตรวจสอบสถานะรายการไถ่ถอน</p>
            {/*------------Display Redeem Transaction History------------*/}
            <RedeemHistory data={history} />

            {/*------------Open Transaction Redeem Modal------------*/}
            <ModalRedeem selectedData={selectedData} postRedeem={postRedeem} />
          </>
        }
      />
    </>
  );
}
