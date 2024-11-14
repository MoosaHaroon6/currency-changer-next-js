"use client";
import { useState } from "react";
import { InputBox } from "../components/exportFiles";
import useCurrencyInfo from "../hooks/useCurrency";

export default function Home() {
  // useable hooks 
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from) || {};

  const options = currencyInfo ? Object.keys(currencyInfo) : [];  // extracted keys 


  // swapping function you can also name it swap :]
  const toggle = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount * (currencyInfo[to] || 1));
  };


  // currency converter / result handler 
  const convert = () => {
    setConvertedAmount(amount * (currencyInfo[to] || 1));
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('https://ideogram.ai/assets/progressive-image/balanced/response/PWnkG22CQIChtzCWTkEG5A')",
        backgroundSize: 'cover', // optional to cover the entire element
        backgroundPosition: 'center', // optional for centering the image
        height: '100vh', // full viewport height
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency: string) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount: number) => setAmount(amount)} className={""} amountDisable={false} currencyDisable={false} />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={toggle}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency: string) => setTo(currency)}
                selectCurrency={to}
                amountDisable className={""} onAmountChange={function (amount: number): void {
                  throw new Error("Function not implemented.");
                }} currencyDisable={false} />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
