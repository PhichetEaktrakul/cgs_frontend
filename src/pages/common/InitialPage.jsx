import { Link } from "react-router";

export default function InitialPage() {
  return (
    <>
      {/* ---------- สำหรับทดสอบเท่านั้น ---------- */}
      <div className="flex justify-center items-center h-[100vh]">
        <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-5">
          {/* ---------- customer ---------- */}
          <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md">
            <legend className="fieldset-legend text-2xl text-sky-900">
              ส่วนของ Customer
            </legend>
            <div className="grid grid-cols-2 grid-rows-1 mt-2 gap-2">
              <Link
                to={{
                  pathname: "/menu",
                  search:
                    "?token=AfsK1UKJsSTHLsRDG78ifi3ljOamuB%2BYr5b1KiLLQ1ODUSZSNK%2BsiK0iwMq8ccGF1dkrSy0ax%2FIBE8Nvfg2LkEtUIRryT0xDyHdYRrMn1TFISpU%2BVs458WaeEqLXeuZ1VITngbP%2F8i6LGj5qlPBs3C7HFWhyJVTPmrR4Ui%2BK7W8%3D",
                }}
                className="bg-linear-to-l from-sky-600 to-sky-700 text-white text-lg w-[120px] h-[40px] rounded text-center content-center shadow-md">
                ลูกค้า ID 1
              </Link>
              <Link
                to={{
                  pathname: "/menu",
                  search:
                    "?token=AfsK1UKJsSTHLsRDG78ifhmZx7BZqB4ye3Bf04Ah6B6jQDKZBQ%2FyWkEYlXqcEmoj8DzaTTM%2FG%2BAOsZK1XWwijJOlAhfU3Rj8FLq96LU5uap8rv2IAeNqeK49Zn4vtcjiWQcJNznGNA3WoeSHbiUNIih3Q4UtwUTj%2B0YktT05hKY%3D",
                }}
                className="bg-linear-to-l from-sky-600 to-sky-700 text-white text-lg w-[120px] h-[40px] rounded text-center content-center shadow-md">
                ลูกค้า ID 2
              </Link>
            </div>
          </fieldset>
          {/* ---------- backoffice ---------- */}
          <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md">
            <legend className="fieldset-legend text-2xl text-sky-900">
              ส่วนของ Backoffice
            </legend>
            <div className="grid grid-cols-1 grid-rows-1 mt-2 justify-items-center">
              <Link
                to="/admin/dashboard"
                className="bg-linear-to-l from-sky-600 to-sky-700 text-white text-lg w-[160px] h-[40px] rounded text-center content-center shadow-md">
                Dashboard แอดมิน
              </Link>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}
