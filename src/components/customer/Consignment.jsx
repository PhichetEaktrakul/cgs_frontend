import { useEffect, useState } from "react";
import { AiOutlineGold } from "react-icons/ai";
import { useUser } from "../../context/UserContext";
import Header from "./Header";
import HistoryTable from "../HistoryTable";
import axios from "axios";
import toast from "react-hot-toast";

export default function Consignment() {
  const { user } = useUser();
  const apiUrl = import.meta.env.VITE_API_URL;

  const randomPledgeId = Math.floor(Math.random() * 1000); // 0 to 999
  const [isLoading, setIsLoading] = useState(0);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState("1");
  const [history, setHistory] = useState([]);

  //----------------------------------------------------------------------------------------
  const [tempValue, setTempValue] = useState({
    pledgeId: randomPledgeId,
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
  // Set Initial
  const fetchInitial = async (custid) => {
    if (!custid) return;

    const today = new Date();
    const twoMonthsLater = new Date(today);
    twoMonthsLater.setMonth(today.getMonth() + 2);

    try {
      const [metaRes, goldRes] = await Promise.all([
        axios.get(`${apiUrl}/customer/meta/${custid}`),
        axios.get(`${apiUrl}/customer/outer/${custid}/gold`),
      ]);

      const setting = metaRes.data;
      const gold = goldRes.data;

      setTempValue((prev) => ({
        ...prev,
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
    } catch (err) {
      console.error("Failed to fetch initial data:", err);
    }
  };

  // useEffect just calls it
  useEffect(() => {
    fetchInitial(user?.custid);
  }, [user?.custid]);

  /*   useEffect(() => {
    const today = new Date();
    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(today.getMonth() + 2);

    // Fetch both requests in parallel
    Promise.all([
      axios.get(`${apiUrl}/customer/meta/${user.custid}`),
      axios.get(`${apiUrl}/customer/outer/${user.custid}/gold`),
    ])
      .then(([metaResponse, goldResponse]) => {
        const setting = metaResponse.data;
        const gold = goldResponse.data;
        setTempValue((prev) => ({
          ...prev,
          customerId: user.custid,
          refPrice1: 51395, // or gold.ref_price1 if available
          refPrice2: 53255, // or gold.ref_price2 if available
          loanPercent: setting.loan_percent,
          interestRate: setting.interest_rate,
          startDate: today.toISOString(),
          endDate: twoMonthsLater.toISOString(),
          goldBalance96: Number(gold.balance96) || 0,
          goldBalance99: Number(gold.balance99) || 0,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]); */

  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Format date safely
  const formatDisplay = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date)) return "-";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const yearBE = (date.getFullYear() + 543).toString().slice(-2); // last 2 digits of Buddhist year

    return `${day}-${month}-${yearBE}`;
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Create new consignment
  const postConsignment = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsLoading(1);

    // Build transaction from tempValue (temp)
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

    axios
      .post(`${apiUrl}/consignment/create`, transaction)
      .then((res) => {
        toast.success("ทำรายการสำเร็จ!");
        document.getElementById("submit_modal").close();
        setIsLoading(0);
        fetchInitial(user?.custid);
        fetchHistory();
      })
      .catch((err) => {
        toast.error("ทำรายการล้มเหลว!");

        console.error("Error:", err);
        setIsLoading(0);
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
  // Calculate interest Payable
  useEffect(() => {
    setTempValue((prev) => ({
      ...prev,
      interestPay: (prev.interestRate * prev.loanAmount) / 100,
    }));
  }, [selected, tempValue.loanAmount]);
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Define fetch function
  const fetchHistory = () => {
    axios
      .get(`${apiUrl}/consignment/status/${user.custid}`)
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Call it once on mount
  useEffect(() => {
    fetchHistory();
  }, []);
  //----------------------------------------------------------------------------------------

  return (
    <Header
      top={
        <div className="grid grid-cols-2 grid-rows-1">
          <div className="p-3">
            <p className="text-[#dabe96] text-lg mb-1">ยอดทองคงเหลือ (96.5%)</p>
            <div className="flex text-2xl items-center">
              <AiOutlineGold className="text-white mr-2" />
              <span className="text-white">
                {tempValue.goldBalance96}{" "}
                <span className="text-lg ml-1">บาท</span>
              </span>
            </div>
          </div>{" "}
          <div className="p-3">
            <p className="text-[#dabe96] text-lg mb-1">
              ยอดทองคงเหลือ (99.99%)
            </p>
            <div className="flex text-2xl items-center">
              <AiOutlineGold className="text-white mr-2" />
              <span className="text-white">
                {tempValue.goldBalance99}{" "}
                <span className="text-lg ml-1">กิโล</span>
              </span>
            </div>
          </div>
        </div>
      }
      bottom={
        <>
          <p className="text-center text-2xl">ขายฝาก</p>

          {/* 2×2 Date Grid */}
          <div className="grid grid-cols-2 gap-4 text-center mb-3">
            <div>
              <p>เลขที่สัญญา</p>
              <p>{tempValue.pledgeId}</p>
            </div>
            <div>
              <p>ราคาทองปัจจุบัน {selected == "1" ? "96.5" : "99.9"}</p>
              <p>
                {selected == "1"
                  ? tempValue.refPrice1.toLocaleString()
                  : tempValue.refPrice2.toLocaleString()}
              </p>
            </div>
          </div>

          {/* 2×2 Date Grid */}
          <div className="grid grid-cols-2 gap-4 text-center mb-3">
            <div>
              <p>วันที่เริ่มต้นสัญญา</p>
              <p>{formatDisplay(tempValue.startDate)}</p>
            </div>
            <div>
              <p>วันที่สิ้นสุดสัญญา</p>
              <p>{formatDisplay(tempValue.endDate)}</p>
            </div>
          </div>

          {/* 2×2 Date Grid */}
          <div className="grid grid-cols-2 gap-4 text-center mb-3">
            <div>
              <p>อัตราดอกเบี้ย</p>
              <p>{tempValue.interestRate} %</p>
            </div>
            <div>
              <p>วงเงิน</p>
              <p>{tempValue.loanPercent * 100} %</p>
            </div>
          </div>

          <div className="text-center my-4">
            <p className="text-lg">ประเภททองที่ต้องการขายฝาก</p>
            <div className="grid grid-cols-2 grid-rows-1">
              <div className="justify-end">
                <input
                  type="radio"
                  name="gold_percent"
                  value="1"
                  checked={selected === "1"}
                  onChange={(e) => setSelected(e.target.value)}
                />{" "}
                ทอง 96.5%
              </div>
              <div>
                <input
                  type="radio"
                  name="gold_percent"
                  value="2"
                  checked={selected === "2"}
                  onChange={(e) => setSelected(e.target.value)}
                />{" "}
                ทอง 99.99%
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault(); // prevent page reload
              setError(false);
              if (
                (selected == "1" &&
                  tempValue.weight > tempValue.goldBalance96) ||
                (selected == "2" &&
                  tempValue.weight > tempValue.goldBalance99) ||
                tempValue.weight <= 0
              )
                return setError(true);
              document.getElementById("submit_modal").showModal();
            }}>
            <div className="mt-2">
              <p>
                จำนวนที่ต้องการขายฝาก <span className="text-red-600">*</span>
              </p>
              <label
                className={`input w-90 mt-2 h-[35px] ${
                  error ? "border-red-600 border-1" : ""
                }`}>
                <input
                  type="number"
                  placeholder="0"
                  value={tempValue.weight || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^0+/, ""); // remove leading zeros
                    setTempValue((prev) => ({
                      ...prev,
                      weight: value === "" ? "" : Number(value),
                    }));
                  }}
                />
                <span className="label">
                  {selected == "1" ? "บาท" : "กิโล"}
                </span>
              </label>
              {error == true ? (
                <p className="text-red-600">กรุณากรอกจำนวนให้ถูกต้อง</p>
              ) : (
                <></>
              )}
            </div>

            <div className="mt-2">
              <p>คงเหลือ</p>
              <label className="input w-90 mt-2 h-[35px] bg-yellow-50">
                <input
                  type="number"
                  placeholder="0"
                  value={
                    selected == "1"
                      ? Number(tempValue.goldBalance96) -
                        Number(tempValue.weight)
                      : Number(tempValue.goldBalance99) -
                        Number(tempValue.weight)
                  }
                  readOnly
                />
                <span className="label">
                  {selected == "1" ? "บาท" : "กิโล"}
                </span>
              </label>
            </div>

            <div className="mt-2">
              <p>วงเงินที่ได้รับ</p>
              <label className="input w-90 mt-2 h-[35px] bg-yellow-50">
                <input
                  type="text"
                  value={tempValue.loanAmount.toLocaleString()}
                  readOnly
                />
                <span className="label">บาท</span>
              </label>
            </div>

            <div className="mt-2">
              <p>ดอกเบี้ยที่ต้องชำระ</p>
              <label className="input w-90 mt-2 h-[35px] bg-yellow-50">
                <input
                  type="text"
                  value={tempValue.interestPay.toFixed(2).toLocaleString()}
                  readOnly
                />
                <span className="label">บาท</span>
              </label>
            </div>

            <div className="p-3">
              <button
                type="submit"
                className="cursor-pointer mt-1 p-1 text-[#081f55fc] bg-[#dabe96] w-full rounded-md">
                ยืนยัน
              </button>
            </div>
          </form>

          <hr className="text-gray-400 my-3" />

          <p>ตรวจสอบสถานะรายการขายฝาก</p>

          <HistoryTable data={history} />

          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="submit_modal" className="modal">
            <div className="modal-box">
              <>
                <p className="font-bold text-lg">ยืนยันการทำรายการ</p>
                <p className="py-4">
                  เลขที่สัญญา:{" "}
                  <span className="bg-amber-100 mx-3 px-2 py-1 rounded">
                    {tempValue.pledgeId}
                  </span>
                </p>
                <p className="py-4">
                  ขายฝากจำนวน:{" "}
                  <span className="bg-amber-100 mx-3 px-2 py-1 rounded">
                    {tempValue?.weight || 0}
                  </span>
                  {selected == 1 ? "บาท" : "กิโล"}
                </p>
                <p className="py-4">
                  วงเงินที่ได้:{" "}
                  <span className="bg-amber-100 mx-3 px-2 py-1 rounded">
                    {Number(tempValue.loanAmount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>{" "}
                  บาท
                </p>
                <p className="py-4">
                  ดอกเบี้ยที่ต้องชำระ:{" "}
                  <span className="bg-amber-100 mx-3 px-2 py-1 rounded">
                    {Number(tempValue.interestPay).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>{" "}
                  บาท
                </p>
                <p className="py-4">
                  วันที่สิ้นสุดสัญญา:{" "}
                  <span className="bg-amber-100 mx-3 px-2 py-1 rounded">
                    {formatDisplay(tempValue.endDate)}
                  </span>
                </p>
              </>
              <div className="modal-action">
                <div>
                  <button
                    className="btn mr-2 bg-transparent border-[#2a53b3fc] text-[#2a53b3fc]"
                    onClick={() =>
                      document.getElementById("submit_modal").close()
                    }>
                    ไม่ยอมรับ
                  </button>
                  <button
                    type="button"
                    onClick={postConsignment}
                    className="btn ml-2 bg-[#2a53b3fc] text-white"
                    disabled={isLoading === 1}>
                    ยอมรับ
                  </button>
                </div>
              </div>
            </div>
          </dialog>
        </>
      }
    />
  );
}
