import { FormatNumber } from "../../../utility/function";

export default function MonitorSummary({ title, data }) {
  return (
    <>
      <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md">
        <legend className="fieldset-legend text-2xl text-sky-900">
          {title}
        </legend>
        <div className="grid grid-cols-7 grid-rows-3 gap-2 text-[16px]">
          <div className="col-span-2" />
          <div className="col-span-2 text-center">99.9%</div>
          <div className="col-span-2 text-center">96.5%</div>
          <div />

          <div className="col-span-2">ปริมาณ</div>
          <div className="col-span-2 text-center bg-sky-100">
            {data.vol99 * 66.67}
          </div>
          <div className="col-span-2 text-center bg-amber-100">
            {data.vol96}
          </div>
          <div>BATH</div>

          <div className="col-span-2">ราคาเฉลี่ย</div>
          <div className="col-span-2 text-center bg-sky-100">
            {FormatNumber(data.mean99)}
          </div>
          <div className="col-span-2 text-center bg-amber-100">
            {FormatNumber(data.mean96)}
          </div>
          <div>บาท</div>
        </div>
      </fieldset>
    </>
  );
}
