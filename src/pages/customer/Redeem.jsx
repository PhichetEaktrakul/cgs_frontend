import { useEffect, useState } from "react";
import { apiCust } from "../../api/axiosInstance";
import toast from "react-hot-toast";
import Header from "../../components/customer/Header";
import RedeemCard from "../../components/customer/redeem/RedeemCard";
import ModalRedeem from "../../components/customer/redeem/ModalRedeem";

export default function Redeem() {
  const customerId = localStorage.getItem("customerId");
  const [redeemList, setRedeemList] = useState([]);
  const [selectedData, setSelectedData] = useState();

  //----------------------------------------------------------------------------------------
  // Select Target Redeem
  const handleSelectRed = (data) => {
    setSelectedData(data);
    console.log("Selected Redeem Data:", data);
    document.getElementById("redeem_modal").showModal();
  };
  //----------------------------------------------------------------------------------------

  const calculateInterestPay = (data) => {
    if (data.remain_num_pay === 0) return 0;
    return (data.remain_loan_amount * data.interest_rate) / 100;
  };

  //----------------------------------------------------------------------------------------
  // Submit Redeem Transaction
  const postRedeem = async () => {
    if (!selectedData) return;

    try {
      await apiCust.post("/redeem/create", {
        transactionId: selectedData.transaction_id,
        pledgeId: selectedData.pledge_id,
        principalPay: selectedData.remain_loan_amount,
        interestPay: calculateInterestPay(selectedData),
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
      const redeemRes = await apiCust.get(`/redeem/list/${customerId}`);
      setRedeemList(redeemRes.data);
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
            <RedeemCard redeemList={redeemList} handleSelectRed={handleSelectRed} />

            {/*------------Open Transaction Redeem Modal------------*/}
            <ModalRedeem selectedData={selectedData} postRedeem={postRedeem} />
          </>
        }
      />
    </>
  );
}
