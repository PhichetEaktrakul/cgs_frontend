import headerLogo from "../assets/logo.png";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { TradingViewWidget } from "../components/TradingViewWidget";
import { useState, useEffect } from "react";
/* import axios from "axios"; */

export default function BoardcastPrice() {
  const [prices, setPrices] = useState({
    gold99_buy: 0,
    gold99_sell: 0,
    old_gold99_buy: 0,
    old_gold99_sell: 0,
    gold96_buy: 0,
    gold96_sell: 0,
    old_gold96_buy: 0,
    old_gold96_sell: 0,
  });

  const renderPriceCard = (label, current, previous, highOrLow, type) => {
    const isUp = current >= previous;
    const diff = Math.abs(current - previous);

    return (
      <div className="card grid h-20 grow place-items-center">
        <div className="text-md">{label}</div>
        <div
          className={`flex w-[100%] text-center justify-center items-center ${
            isUp ? "text-green-600" : "text-red-600"
          }`}>
          <span className="w-[10%] text-lg">
            {isUp ? <FaSortUp /> : <FaSortDown />}
          </span>
          <span className="w-[55%] text-2xl font-bold">
            {current.toLocaleString()}
          </span>
          <span className="w-[10%] text-lg">
            {isUp ? "+" : "-"}
            {diff}
          </span>
        </div>
        <div>
          {type} : <b>{highOrLow}</b>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const waitForJQuery = setInterval(() => {
      if (window.$ && window.$.connection?.priceHub) {
        clearInterval(waitForJQuery); // jQuery and priceHub are ready

        const priceHub = window.$.connection.priceHub;
        const parsePrice = (val) => parseFloat(val?.replace(/,/g, "")) || 0;

        // Register handler for receiving data
        priceHub.client.sendGoldPrice = function (
          gold99_buy,
          gold99_sell,
          old_gold99_buy,
          old_gold99_sell,
          gold96_buy,
          gold96_sell,
          old_gold96_buy,
          old_gold96_sell
        ) {
          setPrices({
            gold99_buy: parsePrice(gold99_buy),
            gold99_sell: parsePrice(gold99_sell),
            old_gold99_buy: parsePrice(old_gold99_buy),
            old_gold99_sell: parsePrice(old_gold99_sell),
            gold96_buy: parsePrice(gold96_buy),
            gold96_sell: parsePrice(gold96_sell),
            old_gold96_buy: parsePrice(old_gold96_buy),
            old_gold96_sell: parsePrice(old_gold96_sell),
          });
        };

        // Set connection URL
        window.$.connection.hub.url = "https://g266.gcaponline.com/signalr";

        // Start connection
        window.$.connection.hub
          .start()
          .done(() => {
            console.log("Connected to SignalR:", window.$.connection.hub.id);
          })
          .fail(() => {
            console.error("Failed to connect to SignalR");
          });

        // Handle disconnection and reconnect
        window.$.connection.hub.disconnected(() => {
          console.warn("SignalR disconnected. Reconnecting in 2s...");
          setTimeout(() => {
            window.$.connection.hub
              .start()
              .done(() => {
                console.log(
                  "Reconnected to SignalR:",
                  window.$.connection.hub.id
                );
              })
              .fail(() => {
                console.error("Reconnection attempt failed.");
              });
          }, 2000);
        });
      }
    }, 500);

    return () => clearInterval(waitForJQuery); // Clean up polling
  }, []);

  /*   const [gcommision, setGcommision] = useState(); */
  /*   useEffect(() => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://apgweb.gcaponline.com/Project/AjaxPostCall",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setGcommision(response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); */

  return (
    <div className="h-[100vh] bg-linear-150 from-[#0e2353fc] to-[#234085fc]">
      <div className="sm:max-w-lg md:max-w-[1024px] h-[100vh] m-auto p-5">
        <div className="flex w-full justify-center mb-7">
          <img
            className="max-w-[110px] md:max-w-[150px]"
            src={headerLogo}
            alt="headerlogo"
          />
        </div>

        <div className="text-center mb-4">
          <p className="text-2xl text-[#dabe96]">ราคาทองจีเเคป โกลด์</p>
          <p className="text-md text-white">
            ประจำวันที่ 06 Aug 2025 Updated:13:08 (ครั้งที่ 4)
            {/* {gcommision && gcommision.goldpricedatetime} */}
          </p>
        </div>

        <div className="grid sm:grid-row-4 sm:grid-cols-1 md:grid-rows-3 md:grid-cols-2 gap-4">
          {/* Gold 99.99% */}
          <div className="bg-white rounded-xl p-2">
            <div className="text-center text-xl font-bold text-[#0e2353fc] p-1">
              ทองคำ 99.99%
            </div>
            <div className="flex w-full">
              {renderPriceCard(
                "เสนอซื้อ",
                prices.gold99_buy,
                prices.old_gold99_buy,
                "57,000",
                "High"
              )}
              <div className="divider divider-horizontal"></div>
              {renderPriceCard(
                "เสนอขาย",
                prices.gold99_sell,
                prices.old_gold99_sell,
                "55,800",
                "Low"
              )}
            </div>
          </div>

          {/* Gold 96.5% */}
          <div className="bg-white rounded-xl p-2">
            <div className="text-center text-lg font-bold text-[#0e2353fc] p-2">
              ทองคำ 96.50%
            </div>
            <div className="flex w-full">
              {renderPriceCard(
                "เสนอซื้อ",
                prices.gold96_buy,
                prices.old_gold96_buy,
                "55,250",
                "High"
              )}
              <div className="divider divider-horizontal"></div>
              {renderPriceCard(
                "เสนอขาย",
                prices.gold96_sell,
                prices.old_gold96_sell,
                "54,020",
                "Low"
              )}
            </div>
          </div>

          {/* สมาคม */}
          <div className="bg-white rounded-xl p-2">
            <div className="text-center text-lg font-bold text-[#0e2353fc] p-2">
              ทองคำราคาสมาคม
            </div>
            <div className="flex w-full">
              <div className="card grid grow place-items-center">
                <div className="text-md">เสนอซื้อ</div>
                <div className="flex w-[100%] text-center justify-center items-center">
                  <span className="text-2xl font-bold">51,600</span>
                </div>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="card grid grow place-items-center">
                <div className="text-md">เสนอขาย</div>
                <div className="flex w-[100%] text-center justify-center items-center">
                  <span className="text-2xl font-bold">
                    51,700
                    {/* {gcommision ? gcommision.goldpricesell : 0} */}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trading View */}
          <div className="wrapper flex">
            <div className="ads pr-[5px]">
              <TradingViewWidget id="widget-xauusd" symbol="OANDA:XAUUSD" />
            </div>
            <div className="ads pl-[5px]">
              <TradingViewWidget id="widget-usdthb" symbol="OANDA:USDTHB" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
