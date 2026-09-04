"use client";

import { useMemo, useState } from "react";

type Calc = "dcf" | "cagr" | "contribution" | "var";

const currency = (value: number) =>
  Number.isFinite(value)
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)
    : "$0";

export default function FinanceLab() {
  const [tab, setTab] = useState<Calc>("dcf");

  const [dcf, setDcf] = useState({ fcf: 100000, growth: 8, rate: 10, terminal: 3, years: 5 });
  const [cagr, setCagr] = useState({ start: 10000, end: 18000, years: 5 });
  const [contrib, setContrib] = useState({ initial: 10000, monthly: 500, rate: 8, years: 10 });
  const [risk, setRisk] = useState({ value: 100000, vol: 18, z: 1.65, days: 1 });

  const dcfValue = useMemo(() => {
    const g = dcf.growth / 100, r = dcf.rate / 100, tg = dcf.terminal / 100;
    let pv = 0, cf = dcf.fcf;
    for (let t = 1; t <= Math.max(1, dcf.years); t++) {
      cf *= 1 + g;
      pv += cf / Math.pow(1 + r, t);
    }
    if (r > tg) pv += (cf * (1 + tg) / (r - tg)) / Math.pow(1 + r, dcf.years);
    return pv;
  }, [dcf]);

  const cagrValue = useMemo(() => {
    if (cagr.start <= 0 || cagr.end < 0 || cagr.years <= 0) return 0;
    return (Math.pow(cagr.end / cagr.start, 1 / cagr.years) - 1) * 100;
  }, [cagr]);

  const contributionValue = useMemo(() => {
    const n = Math.max(0, Math.round(contrib.years * 12));
    const monthlyRate = contrib.rate / 100 / 12;
    let fv = contrib.initial * Math.pow(1 + monthlyRate, n);
    fv += monthlyRate === 0
      ? contrib.monthly * n
      : contrib.monthly * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate);
    return fv;
  }, [contrib]);

  const varValue = useMemo(
    () => risk.value * (risk.vol / 100 / Math.sqrt(252)) * risk.z * Math.sqrt(Math.max(1, risk.days)),
    [risk]
  );

  return (
    <section id="finance-lab">
      <div className="wrap">
        <div className="section-head">
          <div className="index">08 / Finance Lab</div>
          <div>
            <h2>Interactive finance calculators.</h2>
            <div className="lead">Practical finance logic presented as usable analytical tools.</div>
          </div>
        </div>

        <div className="calc-shell">
          <div className="calc-tabs">
            {[
              ["dcf","DCF"],
              ["cagr","CAGR"],
              ["contribution","Contribution"],
              ["var","Portfolio VaR"],
            ].map(([key, label]) => (
              <button className={`calc-tab ${tab === key ? "active" : ""}`} onClick={() => setTab(key as Calc)} key={key}>
                {label}
              </button>
            ))}
          </div>

          <div className="calc-body">
            {tab === "dcf" && <>
              <div className="calc-inputs">
                <Field label="Current free cash flow ($)" value={dcf.fcf} onChange={(v) => setDcf({ ...dcf, fcf: v })}/>
                <Field label="FCF growth (%)" value={dcf.growth} onChange={(v) => setDcf({ ...dcf, growth: v })}/>
                <Field label="Discount rate (%)" value={dcf.rate} onChange={(v) => setDcf({ ...dcf, rate: v })}/>
                <Field label="Terminal growth (%)" value={dcf.terminal} onChange={(v) => setDcf({ ...dcf, terminal: v })}/>
                <Field label="Forecast years" value={dcf.years} onChange={(v) => setDcf({ ...dcf, years: Math.max(1, v) })}/>
              </div>
              <Output kicker="Estimated enterprise value" value={currency(dcfValue)} description="A simplified constant-growth DCF using projected free cash flow plus a Gordon-growth terminal value." note="Illustrative analytical tool; not investment advice."/>
            </>}

            {tab === "cagr" && <>
              <div className="calc-inputs">
                <Field label="Beginning value" value={cagr.start} onChange={(v) => setCagr({ ...cagr, start: v })}/>
                <Field label="Ending value" value={cagr.end} onChange={(v) => setCagr({ ...cagr, end: v })}/>
                <Field label="Years" value={cagr.years} onChange={(v) => setCagr({ ...cagr, years: v })}/>
              </div>
              <Output kicker="Compound annual growth rate" value={`${cagrValue.toFixed(2)}%`} description="Annualized growth rate required to move from the beginning value to the ending value over the selected period."/>
            </>}

            {tab === "contribution" && <>
              <div className="calc-inputs">
                <Field label="Initial investment ($)" value={contrib.initial} onChange={(v) => setContrib({ ...contrib, initial: v })}/>
                <Field label="Monthly contribution ($)" value={contrib.monthly} onChange={(v) => setContrib({ ...contrib, monthly: v })}/>
                <Field label="Annual return (%)" value={contrib.rate} onChange={(v) => setContrib({ ...contrib, rate: v })}/>
                <Field label="Years" value={contrib.years} onChange={(v) => setContrib({ ...contrib, years: v })}/>
              </div>
              <Output kicker="Projected portfolio value" value={currency(contributionValue)} description="Future value of an initial investment plus recurring monthly contributions under a constant assumed return." note="Illustrative analytical tool; actual investment returns vary."/>
            </>}

            {tab === "var" && <>
              <div className="calc-inputs">
                <Field label="Portfolio value ($)" value={risk.value} onChange={(v) => setRisk({ ...risk, value: v })}/>
                <Field label="Annual volatility (%)" value={risk.vol} onChange={(v) => setRisk({ ...risk, vol: v })}/>
                <Field label="Confidence z-score" value={risk.z} step={0.01} onChange={(v) => setRisk({ ...risk, z: v })}/>
                <Field label="Holding period (days)" value={risk.days} onChange={(v) => setRisk({ ...risk, days: Math.max(1, v) })}/>
              </div>
              <Output kicker="Parametric VaR" value={currency(varValue)} description="Simplified normal-distribution parametric VaR estimate." note="Portfolio calculator outputs are illustrative and should not be treated as investment advice."/>
            </>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, step }: { label: string; value: number; onChange: (value: number) => void; step?: number }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type="number" value={value} step={step} onChange={(e) => onChange(Number(e.target.value))}/>
    </label>
  );
}

function Output({ kicker, value, description, note }: { kicker: string; value: string; description: string; note?: string }) {
  return (
    <div className="calc-output">
      <div className="calc-kicker">{kicker}</div>
      <div className="calc-value">{value}</div>
      <div className="calc-desc">{description}</div>
      {note && <div className="calc-note">{note}</div>}
    </div>
  );
}
