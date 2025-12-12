"use client";
import {Metric} from "@/types"

export default function MetricsBar({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="w-full bg-[#071029] rounded-2xl p-5 shadow-neon">
      <div className="flex gap-6 flex-wrap">
        {metrics.map((m, idx) => (
          <div key={idx} className="flex-1 min-w-[160px]">
            <div className="text-xs text-slate-300">{m.label}</div>
            <div className="mt-2 text-2xl font-semibold text-white flex items-center gap-3">
              <span>{m.value}</span>
              {m.sub && <span className="text-sm text-emerald-400">{m.sub}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
