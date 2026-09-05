"use client";

import { useMemo, useState } from "react";

type ETF = {
  name: string;
  expense: number;
  aum: number;
  volume: number;
  volatility: number;
  yield: number;
  concentration: number;
};

const etfs: Record<string, ETF> = {
  SPY: { name: "SPDR S&P 500 ETF", expense: 0.0945, aum: 560, volume: 75, volatility: 18, yield: 1.25, concentration: 32 },
  VOO: { name: "Vanguard S&P 500 ETF", expense: 0.03, aum: 620, volume: 6, volatility: 18, yield: 1.28, concentration: 32 },
  QQQ: { name: "Invesco QQQ Trust", expense: 0.20, aum: 340, volume: 38, volatility: 24, yield: 0.55, concentration: 49 },
  VTI: { name: "Vanguard Total Stock Market ETF", expense: 0.03, aum: 520, volume: 4, volatility: 17, yield: 1.35, concentration: 28 },
  IWM: { name: "iShares Russell 2000 ETF", expense: 0.19, aum: 68, volume: 29, volatility: 26, yield: 1.15, concentration: 4 },
};

function bondStats(face: number, couponRate: number, yieldRate: number, years: number, frequency: number) {
  const n = Math.max(1, Math.round(years * frequency));
  const coupon = face * (couponRate / 100) / frequency;
  const periodicYield = (yieldRate / 100) / frequency;
  let price = 0;
  let weighted = 0;

  for (let t = 1; t <= n; t++) {
    const cashFlow = t === n ? coupon + face : coupon;
    const pv = cashFlow / Math.pow(1 + periodicYield, t);
    price += pv;
    weighted += (t / frequency) * pv;
  }

  const macaulay = price > 0 ? weighted / price : 0;
  const modified = macaulay / (1 + periodicYield);
  const currentYield = price > 0 ? (face * (couponRate / 100) / price) * 100 : 0;
  const dv01 = modified * price * 0.0001;
  return { price, macaulay, modified, currentYield, dv01 };
}

export default function FinanceLab() {
  const [etfA, setEtfA] = useState("SPY");
  const [etfB, setEtfB] = useState("VOO");
  const [face, setFace] = useState(1000);
  const [coupon, setCoupon] = useState(5);
  const [ytm, setYtm] = useState(6);
  const [years, setYears] = useState(5);
  const [frequency, setFrequency] = useState(2);

  const a = etfs[etfA];
  const b = etfs[etfB];
  const bond = useMemo(() => bondStats(face, coupon, ytm, years, frequency), [face, coupon, ytm, years, frequency]);

  const priceCurve = useMemo(() => {
    const yields: { y: number; price: number }[] = [];
    for (let y = Math.max(0.5, ytm - 4); y <= ytm + 4.001; y += 0.5) {
      yields.push({ y, price: bondStats(face, coupon, y, years, frequency).price });
    }
    return yields;
  }, [face, coupon, ytm, years, frequency]);

  const minPrice = Math.min(...priceCurve.map((p) => p.price));
  const maxPrice = Math.max(...priceCurve.map((p) => p.price));
  const chartPath = priceCurve.map((point, index) => {
    const x = 45 + index * (495 / Math.max(1, priceCurve.length - 1));
    const y = 190 - ((point.price - minPrice) / Math.max(1, maxPrice - minPrice)) * 155;
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const comparisonMetrics = [
    { label: "Cost advantage", a: Math.max(0, 100 - a.expense * 250), b: Math.max(0, 100 - b.expense * 250) },
    { label: "Liquidity", a: Math.min(100, (a.volume / 75) * 100), b: Math.min(100, (b.volume / 75) * 100) },
    { label: "Lower volatility", a: Math.max(0, 100 - a.volatility * 2.5), b: Math.max(0, 100 - b.volatility * 2.5) },
    { label: "Diversification", a: 100 - a.concentration, b: 100 - b.concentration },
  ];

  return (
    <section id="finance-lab">
      <style>{`
        .finance-tools-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}.finance-tool{border:1px solid #dfe5e8;border-radius:16px;background:#fff;padding:20px}.finance-tool-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#65747b;font-weight:700}.finance-tool h3{margin:5px 0}.finance-tool-sub{font-size:14px;color:#65747b;line-height:1.55;margin:0 0 16px}.etf-selects,.bond-inputs{display:grid;grid-template-columns:1fr 1fr;gap:12px}.bond-inputs{grid-template-columns:repeat(3,1fr)}.tool-field span{display:block;font-size:11px;color:#65747b;margin-bottom:5px}.tool-field select,.tool-field input{width:100%;border:1px solid #dfe5e8;border-radius:9px;padding:10px 11px;background:#fff;color:#172229;font:inherit}.etf-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}.etf-card{border:1px solid #e1e6e8;border-radius:12px;padding:14px;background:#fafbfb}.etf-symbol{font-size:12px;color:#65747b}.etf-name{font-size:13px;font-weight:700;margin:2px 0 10px}.etf-stats{display:grid;grid-template-columns:1fr 1fr;gap:7px 14px;font-size:11px}.etf-stats strong{font-size:11px}.compare-box{border:1px solid #e1e6e8;border-radius:12px;padding:14px;margin-top:14px}.compare-box h4{font-size:12px;margin:0 0 12px}.metric-row{margin-bottom:12px}.metric-label{font-size:10px;font-weight:700;margin-bottom:4px}.bar-line{display:grid;grid-template-columns:36px 1fr;gap:7px;align-items:center;margin-top:4px}.bar-line span{font-size:10px}.tool-bar{height:8px;border-radius:999px;background:#e5e8e9;overflow:hidden}.tool-bar i{display:block;height:100%;background:#4b8b68;border-radius:999px}.tool-bar.alt i{background:#caa64b}.tool-insight{font-size:11px;line-height:1.5;color:#65747b;margin-top:10px}.bond-metrics{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-top:14px}.bond-metric{border:1px solid #e1e6e8;border-radius:10px;padding:10px;background:#fafbfb}.bond-metric span{display:block;font-size:10px;color:#65747b}.bond-metric strong{display:block;font-size:14px;margin-top:2px}.bond-chart{width:100%;height:auto;margin-top:14px}.bond-line{fill:none;stroke:#46785f;stroke-width:3}.method-note{font-size:10px;color:#758389;line-height:1.5;margin-top:8px}@media(max-width:950px){.finance-tools-grid{grid-template-columns:1fr}.bond-inputs{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.etf-cards,.etf-selects,.bond-inputs{grid-template-columns:1fr}.bond-metrics{grid-template-columns:repeat(2,1fr)}}
      `}</style>
      <div className="wrap">
        <div className="section-head">
          <div className="index">08 / Finance &amp; Markets Lab</div>
          <div>
            <h2>Interactive Finance Tools</h2>
            <div className="lead">Focused analytical tools for market comparison and fixed-income decision support.</div>
          </div>
        </div>

        <div className="finance-tools-grid">
          <div className="finance-tool">
            <div className="finance-tool-kicker">Tool 01 · Markets</div>
            <h3>ETF Comparison</h3>
            <p className="finance-tool-sub">Compare cost, AUM, trading liquidity, volatility, yield, and concentration using a curated sample dataset.</p>

            <div className="etf-selects">
              <label className="tool-field"><span>ETF A</span><select value={etfA} onChange={(e) => setEtfA(e.target.value)}>{Object.keys(etfs).map((key) => <option key={key}>{key}</option>)}</select></label>
              <label className="tool-field"><span>ETF B</span><select value={etfB} onChange={(e) => setEtfB(e.target.value)}>{Object.keys(etfs).map((key) => <option key={key}>{key}</option>)}</select></label>
            </div>

            <div className="etf-cards">
              {[[etfA, a], [etfB, b]].map(([symbol, data]) => {
                const e = data as ETF;
                return (
                  <div className="etf-card" key={symbol as string}>
                    <div className="etf-symbol">{symbol as string}</div>
                    <div className="etf-name">{e.name}</div>
                    <div className="etf-stats">
                      <div>Expense <strong>{e.expense}%</strong></div><div>AUM <strong>${e.aum}B</strong></div>
                      <div>Avg volume <strong>{e.volume}M</strong></div><div>Volatility <strong>{e.volatility}%</strong></div>
                      <div>Yield <strong>{e.yield}%</strong></div><div>Top-10 conc. <strong>{e.concentration}%</strong></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="compare-box">
              <h4>Relative comparison</h4>
              {comparisonMetrics.map((metric) => (
                <div className="metric-row" key={metric.label}>
                  <div className="metric-label">{metric.label}</div>
                  <div className="bar-line"><span>{etfA}</span><div className="tool-bar"><i style={{ width: `${metric.a}%` }} /></div></div>
                  <div className="bar-line"><span>{etfB}</span><div className="tool-bar alt"><i style={{ width: `${metric.b}%` }} /></div></div>
                </div>
              ))}
              <div className="tool-insight">{a.expense < b.expense ? etfA : etfB} has the lower expense ratio, while {a.volume > b.volume ? etfA : etfB} has the stronger trading-liquidity profile in this curated comparison.</div>
            </div>
            <div className="method-note">Illustrative curated data for portfolio demonstration; not live market data or investment advice.</div>
          </div>

          <div className="finance-tool">
            <div className="finance-tool-kicker">Tool 02 · Fixed Income</div>
            <h3>Bond Yield &amp; Interest Rate Risk</h3>
            <p className="finance-tool-sub">Estimate bond price, current yield, Macaulay and modified duration, DV01, and the price–yield relationship.</p>

            <div className="bond-inputs">
              <label className="tool-field"><span>Face value ($)</span><input type="number" value={face} onChange={(e) => setFace(Number(e.target.value))} /></label>
              <label className="tool-field"><span>Coupon (%)</span><input type="number" step="0.1" value={coupon} onChange={(e) => setCoupon(Number(e.target.value))} /></label>
              <label className="tool-field"><span>Market yield (%)</span><input type="number" step="0.1" value={ytm} onChange={(e) => setYtm(Number(e.target.value))} /></label>
              <label className="tool-field"><span>Years to maturity</span><input type="number" min="1" value={years} onChange={(e) => setYears(Math.max(1, Number(e.target.value)))} /></label>
              <label className="tool-field"><span>Payments / year</span><select value={frequency} onChange={(e) => setFrequency(Number(e.target.value))}><option value={1}>1</option><option value={2}>2</option><option value={4}>4</option></select></label>
            </div>

            <div className="bond-metrics">
              <div className="bond-metric"><span>Bond price</span><strong>${bond.price.toFixed(2)}</strong></div>
              <div className="bond-metric"><span>Current yield</span><strong>{bond.currentYield.toFixed(2)}%</strong></div>
              <div className="bond-metric"><span>Macaulay duration</span><strong>{bond.macaulay.toFixed(2)} yrs</strong></div>
              <div className="bond-metric"><span>Modified duration</span><strong>{bond.modified.toFixed(2)}</strong></div>
              <div className="bond-metric"><span>DV01</span><strong>${bond.dv01.toFixed(2)}</strong></div>
            </div>

            <svg className="bond-chart" viewBox="0 0 560 220" aria-label="Bond price yield relationship">
              <line x1="45" y1="190" x2="540" y2="190" stroke="#dfe5e8" />
              <line x1="45" y1="20" x2="45" y2="190" stroke="#dfe5e8" />
              <path d={chartPath} className="bond-line" />
              <text x="45" y="210" fontSize="10" fill="#68777d">Lower yield</text>
              <text x="540" y="210" textAnchor="end" fontSize="10" fill="#68777d">Higher yield</text>
            </svg>
            <div className="method-note">Duration estimates price sensitivity to yield changes. DV01 estimates the approximate dollar price change for a 1-basis-point move in yield. Illustrative analytical tool; not investment advice.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
