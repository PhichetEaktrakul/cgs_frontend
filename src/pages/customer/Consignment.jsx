import { useEffect, useState } from "react";
import { useCustomer } from "../../context/CustomerContext";
import { apiCust } from "../../api/axiosInstance";
import toast from "react-hot-toast";
import Header from "../../components/customer/Header";
import ConsignmentBalance from "../../components/customer/consignment/ConsignmentBalance";
import ConsignmentForm from "../../components/customer/consignment/ConsignmentForm";
import ConsignmentHistory from "../../components/customer/consignment/ConsignmentHistory";
import ModalConsignment from "../../components/customer/consignment/ModalConsignment";

export default function Consignment() {
  const { customer } = useCustomer();
  const randomPledgeId = Math.floor(Math.random() * 1000); // 0 to 999

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState("1");
  const [history, setHistory] = useState([]);
  const [tempValue, setTempValue] = useState({
    pledgeId: 0,
    customerId: 0,
    weight: 0,
    refPrice1: 0,
    refPrice2: 0,
    loanPercent: 0,
    loanAmount: 0,
    interestRate: 0,
    interestPay: 0,
    startDate: "",
    endDate: "",
    goldBalance96: 0,
    goldBalance99: 0,
  });

  //----------------------------------------------------------------------------------------
  // Set Customer Initial Data
  const fetchConsignmentData = async (custid) => {
    if (!custid) return;

    const today = new Date();
    const twoMonthsLater = new Date(today);
    twoMonthsLater.setMonth(today.getMonth() + 2);

    try {
      const [metaRes, goldRes, historyRes] = await Promise.all([
        apiCust.get(`/customer/meta/${custid}`),
        apiCust.get(`/customer/outer/${custid}/gold`),
        apiCust.get(`/consignment/status/${custid}`),
      ]);

      const setting = metaRes.data;
      const gold = goldRes.data;

      setTempValue((prev) => ({
        ...prev,
        pledgeId: randomPledgeId,
        customerId: custid,
        refPrice1: gold.ref_price1 ?? 51395,
        refPrice2: gold.ref_price2 ?? 53255,
        loanPercent: setting.loan_percent,
        interestRate: setting.interest_rate,
        startDate: today.toISOString(),
        endDate: twoMonthsLater.toISOString(),
        goldBalance96: Number(gold.balance96) || 0,
        goldBalance99: Number(gold.balance99) || 0,
      }));

      setHistory(historyRes.data);
    } catch (err) {
      console.error("Failed to fetch consignment data:", err);
    }
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Create new consignment
  const postConsignment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const transaction = {
      pledgeId: tempValue.pledgeId,
      customerId: tempValue.customerId,
      weight: tempValue.weight,
      goldType: selected == "1" ? 1 : 2,
      refPrice: selected == "1" ? tempValue.refPrice1 : tempValue.refPrice2,
      loanPercent: tempValue.loanPercent,
      loanAmount: tempValue.loanAmount,
      interestRate: tempValue.interestRate,
      startDate: tempValue.startDate,
      endDate: tempValue.endDate,
      transactionType: "ขายฝาก",
    };

    apiCust
      .post("/consignment/create", transaction)
      .then((res) => {
        toast.success("ทำรายการสำเร็จ!");
        setIsLoading(false);
        document.getElementById("submit_modal").close();
        fetchConsignmentData(customer?.custid);
      })
      .catch((err) => {
        toast.error("ทำรายการล้มเหลว!");
        console.error("Error:", err);
        setIsLoading(false);
      });
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Calculate loan amount dynamically
  useEffect(() => {
    if (selected == "1") {
      setTempValue((prev) => ({
        ...prev,
        loanAmount: prev.weight * prev.refPrice1 * prev.loanPercent,
      }));
    } else {
      setTempValue((prev) => ({
        ...prev,
        loanAmount: prev.weight * 65.6 * prev.refPrice2 * prev.loanPercent,
      }));
    }
  }, [tempValue.weight, tempValue.refPrice1, tempValue.loanPercent, selected]);
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Calculate Payable interest
  useEffect(() => {
    setTempValue((prev) => ({
      ...prev,
      interestPay: (prev.interestRate * prev.loanAmount) / 100,
    }));
  }, [tempValue.loanAmount, tempValue.interestRate]);
  //----------------------------------------------------------------------------------------

  useEffect(() => {
    fetchConsignmentData(customer?.custid);
  }, [customer?.custid]);

  return (
    <Header
      top={<ConsignmentBalance tempValue={tempValue} />}
      bottom={
        <>
          <p className="text-center text-2xl">ขายฝาก</p>
          {/*------------Consignment Form For Customer------------*/}
          <ConsignmentForm
            tempValue={tempValue}
            setTempValue={setTempValue}
            selected={selected}
            setSelected={setSelected}
            error={error}
            setError={setError}
          />

          <hr className="text-gray-400 my-3" />

          <p>ตรวจสอบสถานะรายการขายฝาก</p>
          {/*------------Display Consignment Transaction History------------*/}
          <ConsignmentHistory history={history} />

          {/*------------Open Transaction Consignment Modal------------*/}
          <ModalConsignment
            tempValue={tempValue}
            postConsignment={postConsignment}
            isLoading={isLoading}
            selected={selected}
          />
        </>
      }
    />
  );
}
