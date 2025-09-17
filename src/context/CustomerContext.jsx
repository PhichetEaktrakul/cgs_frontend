import { createContext, useContext, useState } from "react";

//----------------------------------------------------------------------------------------
// User Context For Customer
const CustomerContext = createContext();
export const useCustomer = () => useContext(CustomerContext);

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};
