import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useCustomer } from "../../context/CustomerContext";
import { apiCust } from "../../api/axiosInstance";
import { AiOutlineGold } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import Header from "../../components/customer/Header";
import ModalTOS from "../../components/customer/ModalTOS";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const { customer, setCustomer } = useCustomer();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //----------------------------------------------------------------------------------------
  // Handle TOS agreement
  const handleAgreement = () => {
    apiCust
      .post("/customer/tos/add", {
        custId: customer.custid,
        firstname: customer.firstname,
        lastname: customer.lastname,
        phonenumber: customer.phone,
        idcard: customer.idcard,
        address: customer.address,
      })
      .then(() => {
        setError("");
        document.getElementById("tos_modal").close();
      })
      .catch(console.error);
  };
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Menucard Component
  const MenuButton = ({ label, remark, route }) => (
    <>
      <button
        className="w-full px-2 py-3 grid grid-rows-2 grid-flow-col gap-1 cursor-pointer"
        onClick={() => navigate(route)}>
        <div className="row-span-2 content-center">
          <AiOutlineGold className="text-6xl" />
        </div>
        <div className="col-span-2 row-span-1 text-lg text-start content-center">
          {label}
        </div>
        <div className="col-span-2 row-span-1 text-lg text-start">{remark}</div>
        <div className="row-span-2 content-center text-2xl">
          <IoIosArrowForward />
        </div>
      </button>
      <span className="flex justify-end text-gray-200">
        <hr className="w-85" />
      </span>
    </>
  );
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Fetch customer data from token in URL
  useEffect(() => {
    if (!token) {
      setError("No token found in the URL.");
      return;
    }
    setLoading(true);
    apiCust
      .get("/token/decode", { params: { token } })
      .then((res) => setCustomer(res.data))
      .catch((err) => {
        console.error(err);
        setError(err.response?.data || "Failed to fetch customer data.");
      })
      .finally(() => setLoading(false));
  }, [token, setCustomer]);
  //----------------------------------------------------------------------------------------

  //----------------------------------------------------------------------------------------
  // Check if customer already accepted the TOS
  useEffect(() => {
    if (!customer?.custid || loading) return;
    apiCust
      .get(`/customer/tos/${customer.custid}`)
      .then((res) => {
        if (res.data === false) {
          setError("TOS not accept yet");
          document.getElementById("tos_modal")?.showModal();
        } else {
          console.log("Customer already registered.");
        }
      })
      .catch((err) => console.error("Error checking TOS status:", err));
  }, [customer?.custid, loading]);

  return (
    <>
      <Header
        bottom={
          <>
            {loading && <p className="text-gray-400 text-center text-lg">Loading...</p>}
            {error && <p className="text-gray-400 text-center text-lg">{error}</p>}
            {error == "" && customer && (
              <>
                <div className="menuselect">
                  <MenuButton
                    label="ทำรายการขายฝาก"
                    remark="หมายเหตุ"
                    route="/consignment"
                  />
                  <MenuButton
                    label="ทำรายการต่อดอก"
                    remark="หมายเหตุ"
                    route="/interest"
                  />
                  <MenuButton
                    label="ทำรายการไถ่ถอน"
                    remark="หมายเหตุ"
                    route="/redeem"
                  />
                </div>
              </>
            )}
            <ModalTOS handleAgreement={handleAgreement} />
          </>
        }
      />
    </>
  );
}
