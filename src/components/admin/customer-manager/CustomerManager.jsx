import { useState } from "react";
import CustomerSearch from "./CustomerSearch";
import CustomerList from "./CustomerList";
import CustomerProfile from "./CustomerProfile";

export default function CustomerManager({prices}) {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid grid-cols-[600px_1fr] grid-rows-[300px_300px] gap-4 max-w-[1300px]">
        <CustomerSearch setCustomers={setCustomers} />

        <CustomerList customers={customers} setSelected={setSelected} />

        <CustomerProfile selected={selected} prices={prices}/>
      </div>
    </>
  );
}
