import { useEffect, useState } from "react";

interface CurrencyData {
    [key: string]: number;  // type interfere
}

// custom hook 
export default function useCurrency(currency: string) {
    const [data, setData] = useState<CurrencyData>({});

    useEffect(() => {
        // api fetched you can change api as well (in case if it does work)
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
            .then((res) => res.json())  // converted to json
            .then((res) => setData(res[currency]))
    }, [currency]);

    return data;
}