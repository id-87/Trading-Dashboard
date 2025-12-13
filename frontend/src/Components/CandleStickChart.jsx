import { createChart, CandlestickSeries } from "lightweight-charts";
import { useEffect, useRef } from "react";
import axios from "axios";

export default function CandleStickChart() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = createChart(ref.current, {
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
    });

    // ✅ v4+ correct API
    const series = chart.addSeries(CandlestickSeries);

    axios
      .get("http://127.0.0.1:8000/ohlc")
      .then((res) => {
        console.log("DATA FROM API:", res.data);
        series.setData(res.data);
        chart.timeScale().fitContent();
      })
      .catch((err) => console.error(err));

    return () => chart.remove();
  }, []);

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
