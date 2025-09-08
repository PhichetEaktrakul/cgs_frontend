import { useState } from "react";
import { CgNotes } from "react-icons/cg";

export default function CustomerManager() {
  const [tick, setTick] = useState("3");

  return (
    <>

                <p>222</p>
             
{/*       <div className="grid grid-cols-2 grid-rows-3 gap-4 max-w-[1300px]">
        <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md max-w-2xl row-span-1">
          <legend className="fieldset-legend text-2xl text-sky-900">
            Profile
          </legend>
          <p className="text-xl text-sky-900 font-bold">[00555] นาย A</p>
          <hr />
          <div className="grid grid-cols-12 grid-rows-5 gap-1 text-[15px]">
            <div className="col-span-2 text-end text-sky-900 font-bold">
              TradeType:
            </div>
            <div className="col-span-4 text-center">Call,online</div>
            <div className="col-span-2 text-end text-sky-900 font-bold">
              Trader:
            </div>
            <div className="col-span-4 text-center">SuperAdmin</div>

            <div className="col-span-2 text-end text-sky-900 font-bold">
              Code:
            </div>
            <div className="col-span-4 text-center">00555</div>
            <div className="col-span-2 text-end text-sky-900 font-bold">
              Code Old:
            </div>
            <div className="col-span-4 text-center">00555</div>

            <div className="col-span-2 text-end text-sky-900 font-bold">
              Name:
            </div>
            <div className="col-span-4 text-center">นาย A</div>
            <div className="col-span-2 text-end text-sky-900 font-bold">
              Type:
            </div>
            <div className="col-span-4 text-center">บุคคลธรรมดา</div>

            <div className="col-span-2 text-end text-sky-900 font-bold">
              Phone:
            </div>
            <div className="col-span-4 text-center">08000000</div>
            <div className="col-span-2 text-end text-sky-900 font-bold">
              Mobile:
            </div>
            <div className="col-span-4 text-center">08000000</div>

            <div className="col-span-2 text-end text-sky-900 font-bold">
              Remark
            </div>
            <div className="col-span-4 text-center">test note</div>
          </div>
        </fieldset>

        <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md max-w-xl row-span-3 max-h-[490px] flex justify-center">
          <legend className="fieldset-legend text-2xl text-sky-900">
            Ticket Info
          </legend>
          {tick == "1" ? (
            <div className="grid grid-cols-12 grid-rows-5 text-[17px]">
              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  Ticket Ref :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  TK-0001
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  วันที่รับฝาก :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  30/08/2025
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  วันที่ครบกำหนด :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  30/09/2025
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">Exp. :</span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  33 วัน
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">Asset :</span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  96.50
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  ราคาขายฝาก :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  52,021
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  วงเงินกู้ :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  95.00%
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  ระยะเวลา :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">60</span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  ดอกเบี้ย :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  1.25%
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">Qty :</span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">5</span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  วงเงินกู้/B :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  47,500
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">ดอก/M :</span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">594</span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  Lone+int/B :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  48,094
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  จุด Cut :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  1,906.25
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  ราคาคัท :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">---</span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  Status :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <div className="badge bg-red-500 text-white border-0 px-5">
                  Shot
                </div>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  Remark :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  test note
                </span>
              </div>
            </div>
          ) : tick == "2" ? (
            <div className="grid grid-cols-12 grid-rows-5 text-[17px]">
              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  Ticket Ref :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  TK-0002
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  วันที่รับฝาก :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  30/08/2025
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  วันที่ครบกำหนด :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  30/10/2025
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">Exp. :</span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  33 วัน
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">Asset :</span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  96.50
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  ราคาขายฝาก :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  49,661
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  วงเงินกู้ :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  95.00%
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  ระยะเวลา :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">60</span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  ดอกเบี้ย :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  1.25%
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">Qty :</span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">5</span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  วงเงินกู้/B :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  47,500
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">ดอก/M :</span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">594</span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  Lone+int/B :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  48,094
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  จุด Cut :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  1,906.25
                </span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  ราคาคัท :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">---</span>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  Status :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <div className="badge bg-green-500 text-white border-0 px-5">
                  Long
                </div>
              </div>

              <div className="col-span-3 content-center text-end my-2">
                <span className="text-sky-900 font-bold h-[35px]">
                  Remark :
                </span>
              </div>
              <div className="col-span-3 content-center text-center my-2">
                <span className="bg-yellow-100 py-1 px-3 rounded-md">
                  test note
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="flex h-full w-full text-xl justify-center items-center">
                <CgNotes />
                <span className="ml-2">Please Select the Ticket</span>
              </div>
            </>
          )}
        </fieldset>

        <div className="row-span-2">
          <fieldset className="fieldset bg-white shadow-md border border-sky-900 px-3 pt-3 pb-5 rounded-md  max-w-2xl">
            <legend className="fieldset-legend text-2xl text-sky-900">
              All Ticket
            </legend>
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead className="bg-sky-700 text-white">
                  <tr>
                    <th className="text-center">#</th>
                    <th>Ticket Ref</th>
                    <th>วันรับฝาก</th>
                    <th>วันครบกำหนด</th>
                    <th>ราคาฝาก</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-yellow-100 text-[13px]!">
                    <th className="text-center">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th>
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setTick("1")}>
                        TK-0001
                      </button>
                    </th>
                    <td>30/08/2025</td>
                    <td>30/09/2025</td>
                    <td>52,021</td>
                    <td>
                      <div className="badge bg-red-500 text-white border-0">
                        Shot
                      </div>
                    </td>
                  </tr>

                  <tr className="bg-sky-100 text-[13px]!">
                    <th className="text-center">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th>
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => setTick("2")}>
                        TK-0002
                      </button>
                    </th>
                    <td>30/08/2025</td>
                    <td>30/10/2025</td>
                    <td>49,661</td>
                    <td>
                      <div className="badge bg-green-500 text-white border-0">
                        Long
                      </div>
                    </td>
                  </tr>

                  <tr className="bg-yellow-100 text-[13px]!">
                    <th className="text-center">
                      <input type="checkbox" name="" id="" />
                    </th>
                    <th>TK-0003</th>
                    <td>30/08/2025</td>
                    <td>30/09/2025</td>
                    <td>50,200</td>
                    <td>
                      <div className="badge bg-green-500 text-white border-0">
                        Long
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot className="bg-sky-700 text-white">
                  <tr>
                    <th className="text-center">#</th>
                    <th>Ticket Ref</th>
                    <th>วันรับฝาก</th>
                    <th>วันครบกำหนด</th>
                    <th>ราคาฝาก</th>
                    <th>Status</th>
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
        </div>
      </div> */}
    </>
  );
}
