import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { apiCust } from "../../api/axiosInstance";
import toast from "react-hot-toast";
import Header from "../../components/customer/Header";
import InterestCard from "../../components/customer/interest/InterestCard";
import InterestHistory from "../../components/customer/interest/InterestHistory";
import ModalInterest from "../../components/customer/interest/ModalInterest";

export default function Interest() {
  const [intList, setIntList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isReduce, setIsReduce] = useState(false);
  const [tempValue, setTempValue] = useState({ pay_interest: 0, pay_loan: 0 });
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);

  const { user } = useUser();

  //----------------------------------------------------------------------------------------
  // Select Target Interest
  const handleSelectInt = (data) => {
    setSelectedData(data);
    setTempValue({
      pay_interest: (data.old_loan_amount * data.old_interest_rate) / 100,
      pay_loan: 0,
    });
    setIsReduce(false);
    document.getElementById("interest_modal").showModal();
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Submit Interest Transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (tempValue.pay_loan < 0 || selectedData.old_loan_amount - tempValue.pay_loan < 0)
      return setError("errNumber");
    if (selectedData.old_loan_amount - tempValue.pay_loan === 0)
      return setError("errRedeem");

    try {
      await apiCust.post("/interest/create", {
        interestId: selectedData.interest_id,
        pledgeId: selectedData.pledge_id,
        payInterest: tempValue.pay_interest,
        payLoan: tempValue.pay_loan,
      });
      toast.success("ทำรายการต่อดอกสำเร็จ!");
      document.getElementById("interest_modal").close();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Fetch Customer Gold and History
  const fetchData = async () => {
    try {
      const [intRes, historyRes] = await Promise.all([
        apiCust.get(`/interest/payable/${user.custid}`),
        apiCust.get(`/interest/status/${user.custid}`),
      ]);
      setIntList(intRes.data);
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
            <p className="text-center text-2xl">รายการต่อดอก</p>
            {/*------------Render Payable Interest List------------*/}
            <InterestCard intList={intList} handleSelectInt={handleSelectInt} />

            <hr className="text-gray-400 my-3" />

            <p>ตรวจสอบสถานะรายการต่อดอก</p>
            {/*------------Display Interest Transaction History------------*/}
            <InterestHistory data={history} />

            {/*------------Open Transaction Interest Modal------------*/}
            <ModalInterest
              selectedData={selectedData}
              isReduce={isReduce}
              setIsReduce={setIsReduce}
              tempValue={tempValue}
              setTempValue={setTempValue}
              handleSubmit={handleSubmit}
              error={error}
            />
          </>
        }
      />
    </>
  );
}
