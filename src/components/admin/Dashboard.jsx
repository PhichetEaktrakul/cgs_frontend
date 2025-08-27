import { RiExchangeBoxFill } from "react-icons/ri";

export default function Dashboard() {
  return (
    <>
      <div className="tab-content bg-base-100 border-base-300 p-6">
        <>
          <div className="grid grid-cols-3 grid-rows-1 gap-4 max-w-4xl">
            <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md">
              <legend className="fieldset-legend text-2xl text-sky-900">
                Total
              </legend>
              <div className="grid grid-cols-7 grid-rows-3 gap-1 text-[15px]">
                <div className="row-span-1 col-span-2 "></div>
                <div className="row-span-1 col-span-2 text-center">99.9%</div>
                <div className="row-span-1 col-span-2 text-center">96.5%</div>
                <div className="row-span-1 col-span-1 "></div>

                <div className="row-span-1 col-span-2 ">ปริมาณ</div>
                <div className="row-span-1 col-span-2 text-center bg-amber-100">
                  20
                </div>
                <div className="row-span-1 col-span-2 text-center bg-amber-100">
                  50
                </div>
                <div className="row-span-1 col-span-1 ">BATH</div>

                <div className="row-span-1 col-span-2">ราคาเฉลี่ย</div>
                <div className="row-span-1 col-span-2 text-center bg-sky-100">
                  40,000
                </div>
                <div className="row-span-1 col-span-2 text-center bg-sky-100">
                  50,000
                </div>
                <div className="row-span-1 col-span-1">บาท</div>
              </div>
            </fieldset>

            <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md">
              <legend className="fieldset-legend text-2xl text-sky-900">
                Long
              </legend>
              <div className="grid grid-cols-7 grid-rows-3 gap-1 text-[15px]">
                <div className="row-span-1 col-span-2 "></div>
                <div className="row-span-1 col-span-2 text-center">99.9%</div>
                <div className="row-span-1 col-span-2 text-center">96.5%</div>
                <div className="row-span-1 col-span-1 "></div>

                <div className="row-span-1 col-span-2 ">ปริมาณ</div>
                <div className="row-span-1 col-span-2 text-center bg-amber-100">
                  20
                </div>
                <div className="row-span-1 col-span-2 text-center bg-amber-100">
                  50
                </div>
                <div className="row-span-1 col-span-1 ">BATH</div>

                <div className="row-span-1 col-span-2">ราคาเฉลี่ย</div>
                <div className="row-span-1 col-span-2 text-center bg-sky-100">
                  40,000
                </div>
                <div className="row-span-1 col-span-2 text-center bg-sky-100">
                  50,000
                </div>
                <div className="row-span-1 col-span-1">บาท</div>
              </div>
            </fieldset>

            <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md">
              <legend className="fieldset-legend text-2xl text-sky-900">
                Shot
              </legend>
              <div className="grid grid-cols-7 grid-rows-3 gap-1 text-[15px]">
                <div className="row-span-1 col-span-2 "></div>
                <div className="row-span-1 col-span-2 text-center">99.9%</div>
                <div className="row-span-1 col-span-2 text-center">96.5%</div>
                <div className="row-span-1 col-span-1 "></div>

                <div className="row-span-1 col-span-2 ">ปริมาณ</div>
                <div className="row-span-1 col-span-2 text-center bg-amber-100">
                  20
                </div>
                <div className="row-span-1 col-span-2 text-center bg-amber-100">
                  50
                </div>
                <div className="row-span-1 col-span-1 ">BATH</div>

                <div className="row-span-1 col-span-2">ราคาเฉลี่ย</div>
                <div className="row-span-1 col-span-2 text-center bg-sky-100">
                  40,000
                </div>
                <div className="row-span-1 col-span-2 text-center bg-sky-100">
                  50,000
                </div>
                <div className="row-span-1 col-span-1">บาท</div>
              </div>
            </fieldset>
          </div>

          <fieldset className="fieldset bg-white shadow-md border border-sky-900 p-3 rounded-md mt-6 max-w-[1200px]">
            <legend className="fieldset-legend text-2xl text-sky-900">
              Focus Ticket
            </legend>
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead className="bg-sky-700 text-white">
                  <tr>
                    <th className="text-center">#</th>
                    <th>Ticket Ref</th>
                    <th>Due Date</th>
                    <th>Exp.</th>
                    <th>Status</th>
                    <th>Asset</th>
                    <th>Lone+Int Login</th>
                    <th>QTY.</th>
                    <th>Gain/Loss</th>
                    <th>Remark</th>
                    <th>Tools</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-yellow-100 text-[13px]!">
                    <th className="text-center">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th>TK-0003</th>
                    <td>31/07/2025</td>
                    <td>-4 วัน</td>
                    <td>
                      <div className="badge bg-red-500 text-white border-0">
                        Shot
                      </div>
                    </td>
                    <td>96.5</td>
                    <td>47,970</td>
                    <td>5</td>
                    <td>2,030</td>
                    <td>#</td>
                    <td className="text-xl text-sky-600">
                      <RiExchangeBoxFill />
                    </td>
                  </tr>
                  <tr className="bg-sky-100 text-[13px]!">
                    <th className="text-center">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th>TK-0004</th>
                    <td>18/07/2025</td>
                    <td>-17 วัน</td>
                    <td>
                      <div className="badge bg-red-500 text-white border-0">
                        Shot
                      </div>
                    </td>
                    <td>99.9</td>
                    <td>51,609</td>
                    <td>5</td>
                    <td>-1,609</td>
                    <td>#</td>
                    <td className="text-xl text-sky-600">
                      <RiExchangeBoxFill />
                    </td>
                  </tr>
                  <tr className="bg-yellow-100 text-[13px]!">
                    <th className="text-center">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th>TK-0002</th>
                    <td>22/08/2025</td>
                    <td>18 วัน</td>
                    <td>
                      <div className="badge bg-green-500 text-white border-0">
                        Long
                      </div>
                    </td>
                    <td>96.5</td>
                    <td>46,586</td>
                    <td>10</td>
                    <td>3,414</td>
                    <td>#</td>
                    <td className="text-xl text-sky-600">
                      <RiExchangeBoxFill />
                    </td>
                  </tr>
                  <tr className="bg-yellow-100 text-[13px]!">
                    <th className="text-center">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th>TK-0001</th>
                    <td>22/08/2025</td>
                    <td>18 วัน</td>
                    <td>
                      <div className="badge bg-green-500 text-white border-0">
                        Long
                      </div>
                    </td>
                    <td>96.5</td>
                    <td>46,586</td>
                    <td>8</td>
                    <td>4,557</td>
                    <td>#</td>
                    <td className="text-xl text-sky-600">
                      <RiExchangeBoxFill />
                    </td>
                  </tr>
                  <tr className="bg-sky-100 text-[13px]!">
                    <th className="text-center">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th>TK-0001</th>
                    <td>30/08/2025</td>
                    <td>26 วัน</td>
                    <td>
                      <div className="badge bg-green-500 text-white border-0">
                        Long
                      </div>
                    </td>
                    <td>99.9</td>
                    <td>49,661</td>
                    <td>5</td>
                    <td>339</td>
                    <td>#</td>
                    <td className="text-xl text-sky-600">
                      <RiExchangeBoxFill />
                    </td>
                  </tr>
                </tbody>
                <tfoot className="bg-sky-700 text-white">
                  <tr>
                    <th></th>
                    <th>Ticket Ref</th>
                    <th>Due Date</th>
                    <th>Exp.</th>
                    <th>Status</th>
                    <th>Asset</th>
                    <th>Lone+Int Login</th>
                    <th>QTY.</th>
                    <th>Gain/Loss</th>
                    <th>Remark</th>
                    <th>Tools</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </fieldset>

          <div className="text-center my-2 max-w-[1200px]">
            <div className="join shadow-md ">
              <button className="join-item btn btn-sm bg-white">1</button>
              <button className="join-item btn btn-sm bg-white">2</button>
              <button className="join-item btn btn-sm btn-disabled bg-white">
                ...
              </button>
              <button className="join-item btn btn-sm bg-white">99</button>
              <button className="join-item btn btn-sm bg-white">100</button>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
