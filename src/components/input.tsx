import { useId } from "react";

interface InputBoxIn {
    label: string;
    className: string;
    amount: number;
    onAmountChange: (amount: number) => void;
    onCurrencyChange: (curreny: string) => void;
    currencyOptions: string[];
    selectCurrency: string;
    amountDisable: boolean;
    currencyDisable: boolean;
}

export default function InputBox({
    className = "",
    label, amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
}: InputBoxIn) {

    const reactId = useId();

    const onAmountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onAmountChange(Number(e.target.value))
    }
    const onCurrencyChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onCurrencyChange(e.target.value);
    }

    return (
        <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">

                <label
                    htmlFor={reactId}
                    className="text-black/40 mb-2 inline-block">
                    {label}
                </label>

                <input
                    id={reactId}
                    className="outline-none w-full bg-transparent py-1.5"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={onAmountChangeHandler}
                />
            </div>

            <div className="w-1/2 flex flex-wrap justify-end text-right">

                <p className="text-black/40 mb-2 w-full">Currency Type</p>

                <select
                    className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
                    value={selectCurrency}
                    onChange={onCurrencyChangeHandler}
                    disabled={currencyDisable}
                >

                    {currencyOptions.map((currency) => (
                        <option
                            key={currency}
                            value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

