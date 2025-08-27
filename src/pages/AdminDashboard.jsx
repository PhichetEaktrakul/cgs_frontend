import Dashboard from "../components/admin/Dashboard";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import Customer from "../components/admin/Customer";
import TicketManager from "../components/admin/TicketManager";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const {admin,logout} = useAuth();
    const navigate = useNavigate();

  const handleLogout = () => {
    logout();            // clear token and admin from context + localStorage
    toast.success("ออกจากระบบ!")
    navigate("/auth/login"); // redirect to login page
  };

  return (
    <>
      <div className="bg-sky-900 h-[40px] text-white text-3xl p-2 justify-between grid grid-rows-2 grid-cols-2">
        <div>
          <span className="text-yellow-400">GCAP</span> CONSIGNMENT BACKOFFICE
        </div>
        <div>
          <div className="text-sm mb-[5px] text-end">
            <span className="text-sky-200">Welcome,</span> {admin && admin }
            <button
              className="ml-4 bg-sky-700 px-2 rounded-md cursor-pointer"
              onClick={handleLogout} // 🔹 call logout function
            >
              Logout
            </button>
          </div>

          <div className="flex text-[19px] h-[30px] justify-end">
            <div className="bg-yellow-200 text-red-600 py-1 px-3 rounded-l-sm flex">
              51,550 <FaSortDown />
            </div>
            <div className="bg-yellow-200 text-red-600 py-1 px-3 flex">
              51,650 <FaSortDown />
            </div>
            <div className="bg-sky-200 text-red-600 py-1 px-3 flex">
              53,465 <FaSortDown />
            </div>
            <div className="bg-sky-200 text-red-600 py-1 px-3 rounded-r-sm flex">
              53,515 <FaSortDown />
            </div>
          </div>
        </div>
      </div>

      <div className="tabs tabs-lift bg-sky-900 h-[96vh] pt-2">
        <input
          type="radio"
          name="my_tabs_3"
          className="tab"
          aria-label="Dashboard"
        />
        <Dashboard />

        <input
          type="radio"
          name="my_tabs_3"
          className="tab"
          aria-label="Customers"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <Customer />
        </div>

        <input
          type="radio"
          name="my_tabs_3"
          className="tab "
          aria-label="Ticket Manager"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          <TicketManager/>
        </div>
      </div>
    </>
  );
}
