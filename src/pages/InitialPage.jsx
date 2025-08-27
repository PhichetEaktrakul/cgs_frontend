import { Link } from "react-router";

export default function InitialPage() {
  return (
    <>
      {/*-----สำหรับทดสอบเท่านั้น-----*/}
      <div className="flex justify-center items-center h-[100vh]">
        <div className="grid grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1 gap-5">
          {/*-----customer-----*/}
          <fieldset className="fieldset border border-sky-900 shadow-md p-3 rounded-md">
            <legend className="fieldset-legend text-2xl text-sky-900">
              ส่วนของ Customer
            </legend>
            <div className="grid grid-cols-2 grid-rows-1 mt-2 gap-2">
              <Link
                to={{
                  pathname: "/menu",
                  search:
                    "?token=93rxWSwad3ZxA9X2g89EOtEkA4l6CMTQZGgShNO6g03uBVq7q4NS1UdiyLlKBef1mplcMglktPHRSJWeUV0l9uCl3pof9HieEC34uOL6FZaR3y5YA8tzKhsOJgmSLEctwtdjt4Ni87ibFygQ%2BODrag%3D%3D",
                }}
                className="bg-linear-to-l from-sky-600 to-sky-700 text-white text-lg w-[120px] h-[40px] rounded text-center content-center shadow-md">
                ลูกค้า ID 1
              </Link>
              <Link
                to={{
                  pathname: "/menu",
                  search:
                    "?token=rZ8L6ZgzKpf8SZVIBGVk9Cijq3D2SEfy64z4Ht9yxPfFRtzJhO6fEkFf28JceoOrfPZqbs2H%2BJFiuajJGJ%2BkCyEvkk9B5Ps7D8yslQBn%2F7pP0jRm%2B2ZwYZA9ZGp3gjY%2FZLFkdX3dt1kWPDrgmLYEfw%3D%3D",
                }}
                className="bg-linear-to-l from-sky-600 to-sky-700 text-white text-lg w-[120px] h-[40px] rounded text-center content-center shadow-md">
                ลูกค้า ID 2
              </Link>
            </div>
          </fieldset>
          {/*-----backoffice-----*/}
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
