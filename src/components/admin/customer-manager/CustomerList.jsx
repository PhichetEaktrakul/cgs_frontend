export default function CustomerList({ customers, setSelected }) {
  const columns = ["รหัสลูกค้า", "ชื่อ", "นามสกุล", "เบอร์โทรศัพท์", " "];

  return (
    <>
      {/*------------ 📋 Customer List ------------*/}
      <fieldset className="fieldset bg-white shadow-md border border-sky-900 px-3 pt-3 pb-5 rounded-md h-[300px] overflow-auto">
        <legend className="fieldset-legend text-2xl text-sky-900">รายชื่อลูกค้า</legend>

        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead className="bg-sky-700 text-white">
              <tr>{columns.map((col) => (<th key={col}>{col}</th>))}</tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((item) => (
                  <tr key={item.customer_id} className="text-[14px]!">
                    <td>{item.customer_id}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.phone_number}</td>
                    <td>
                      <button
                        className="px-5 h-7 bg-sky-700 text-white rounded hover:bg-sky-800 cursor-pointer"
                        onClick={() => setSelected(item)}>
                        ดู
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-[16px]! py-4 text-gray-500">
                    ไม่มีรายการลูกค้า
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </fieldset>
    </>
  );
}
