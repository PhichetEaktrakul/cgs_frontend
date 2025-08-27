import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useUser } from "../context/UserContext";
import { AiOutlineGold } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import Header from "../components/customer/Header";
import ModalTOS from "../components/ModalTOS";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  const { user, setUser } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  /*------------Handle TOS agreement*/
  const handleAgreement = () => {
    axios
      .post(`${apiUrl}/customer/tos/add`, {
        custId: user.custid,
        firstname: user.firstname,
        lastname: user.lastname,
        phonenumber: user.phone,
        idcard: user.idcard,
        address: user.address,
      })
      .then(() => document.getElementById("tos_modal").close())
      .catch(console.error);
  };

  /*------------Menucard Component*/
  const MenuButton = ({ label, remark, route }) => (
    <>
      <button
        className="w-full px-2 py-3 grid grid-rows-2 grid-flow-col gap-1 cursor-pointer"
        onClick={() => navigate(`${route}?token=${token}`)}>
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

  /*------------Fetch user data from token in URL*/
  useEffect(() => {
    if (!token) {
      setError("No token found in the URL.");
      return;
    }
    setLoading(true);
    axios
      .get(`${apiUrl}/json/decode`, { params: { token } })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        setError(err.response?.data || "Failed to fetch user data.");
      })
      .finally(() => setLoading(false));
  }, [token, apiUrl, setUser]);

  /*------------Check if customer already accepted the TOS*/
  useEffect(() => {
    if (!user?.custid || loading) return;
    axios
      .get(`${apiUrl}/customer/tos/${user.custid}`)
      .then((res) => {
        if (res.data === false) {
          document.getElementById("tos_modal")?.showModal();
        } else {
          console.log("Customer already registered.");
        }
      })
      .catch((err) => console.error("Error checking TOS status:", err));
  }, [user?.custid, apiUrl, loading]);

  return (
    <>
      <Header
        bottom={
          <>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {user && (
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
                    label="ทำรายการไถ่คืน"
                    remark="หมายเหตุ"
                    route="/redeem"
                  />
                </div>
                {/*-----For Decode Debug-----*/}
                <div className="mt-5 space-y-2 text-gray-100">
                  <p>
                    <strong>ID:</strong> {user.custid}
                  </p>
                  <p>
                    <strong>Firstname:</strong> {user.firstname}
                  </p>
                  <p>
                    <strong>Lastname:</strong> {user.lastname}
                  </p>
                  <p>
                    <strong>Idcard:</strong> {user.idcard}
                  </p>
                  <p>
                    <strong>Address:</strong> {user.address}
                  </p>
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
