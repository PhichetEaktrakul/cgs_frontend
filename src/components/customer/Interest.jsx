import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./Header";
import InterestCard from "./InterestCard";
import InterestHistory from "./InterestHistory";

export default function Interest() {
  const [intList, setIntList] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isReduce, setIsReduce] = useState(false);
  const [tempValue, setTempValue] = useState({ pay_interest: 0, pay_loan: 0 });
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);

  const { user } = useUser();
  const apiUrl = import.meta.env.VITE_API_URL;
  const api = axios.create({ baseURL: apiUrl });

  //----------------------------------------------------------------------------------------
  // Set Initial
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

    if (
      tempValue.pay_loan < 0 ||
      selectedData.old_loan_amount - tempValue.pay_loan < 0
    )
      return setError("errNumber");
    if (selectedData.old_loan_amount - tempValue.pay_loan === 0)
      return setError("errRedeem");

    try {
      await api.post("/interest/create", {
        interestId: selectedData.interest_id,
        pledgeId: selectedData.pledge_id,
        payInterest: tempValue.pay_interest,
        payLoan: tempValue.pay_loan,
      });
      toast.success("ทำรายการสำเร็จ!");
      document.getElementById("interest_modal").close();
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Fetch Initial Data
  const fetchData = async () => {
    try {
      const [intRes, historyRes] = await Promise.all([
        api.get(`/interest/payable/${user.custid}`),
        api.get(`/interest/status/${user.custid}`),
      ]);
      setIntList(intRes.data);
      setHistory(historyRes.data);
    } catch (err) {
      console.error(err);
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
            <dialog id="interest_modal" className="modal">
              <div className="modal-box">
                <form onSubmit={handleSubmit}>
                  <p className="font-bold text-lg mb-2">
                    รายการต่อดอกเลขที่ {selectedData && selectedData.interestId}
                  </p>
                  <div>
                    <div className="flex justify-between">
                      <p>
                        เลขที่ขายฝาก :{selectedData && selectedData.pledgeId}
                      </p>
                      <p>
                        ต่อจาก:{" "}
                        {selectedData && selectedData.prev_interest_id
                          ? selectedData.prev_interest_id
                          : "-"}
                      </p>
                    </div>

                    <hr className="my-2.5" />
                    <p>น้ำหนัก :{selectedData && selectedData.weight} บาท</p>

                    <div className="my-2">
                      <input
                        type="checkbox"
                        className="mx-2"
                        checked={isReduce}
                        onChange={(e) => setIsReduce(e.target.checked)}
                      />
                      <span>ตัดต้น</span>
                    </div>

                    {isReduce ? (
                      <div className="bg-[#fff1dc] px-2 rounded-xl grid grid-cols-[40%_30%_30%] leading-9">
                        <p>วงเงินสัญญา : </p>
                        <p className="text-center">
                          {(
                            selectedData && selectedData.old_loan_amount
                          ).toLocaleString()}{" "}
                        </p>
                        <p>บาท</p>

                        <p>ตัดต้นจำนวน :</p>
                        <input
                          type="number"
                          placeholder="0"
                          className={`bg-white rounded w-[90%] text-end ${
                            error ? "border-red-600 border" : ""
                          }`}
                          onChange={(e) =>
                            setTempValue((prev) => ({
                              ...prev,
                              pay_loan: Number(e.target.value),
                            }))
                          }
                        />
                        <p>บาท</p>
                        {error === "errNumber" && (
                          <p className="text-red-600 col-span-3 text-center">
                            กรุณากรอกจำนวนให้ถูกต้อง
                          </p>
                        )}
                        {error === "errRedeem" && (
                          <p className="text-red-600 col-span-3 text-center">
                            ไม่สามารถตัดต้นจนหมดได้
                          </p>
                        )}

                        <p>วงเงินต้นคงเหลือ : </p>

                        <p className="text-center">
                          {(
                            selectedData.old_loan_amount - tempValue.pay_loan
                          ).toLocaleString()}
                        </p>
                        <p>บาท</p>
                      </div>
                    ) : (
                      <></>
                    )}

                    <p className="my-4">
                      ยอดชำระ :{" "}
                      <span className="bg-amber-100 mx-3 px-2 py-1 rounded">
                        {selectedData &&
                          (
                            (selectedData.old_loan_amount *
                              selectedData.old_interest_rate) /
                              100 +
                            tempValue.pay_loan
                          ).toLocaleString()}
                      </span>{" "}
                      บาท
                    </p>
                  </div>

                  <div className="modal-action">
                    <div>
                      <button
                        type="button"
                        className="btn mr-2 bg-transparent border-[#2a53b3fc] text-[#2a53b3fc]"
                        onClick={() =>
                          document.getElementById("interest_modal").close()
                        }>
                        ยกเลิก
                      </button>
                      <button
                        type="submit"
                        className="btn ml-2 bg-[#2a53b3fc] text-white">
                        ยืนยัน
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </dialog>
          </>
        }
      />
    </>
  );
}
