import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { bz as computeCompRadarStats, C as Card } from "./admin-ui-DF1jhL5E.js";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { useTranslation } from "react-i18next";
import "clsx";
import "react-router-dom";
import "lucide-react";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slot";
import "tailwind-merge";
import "@radix-ui/react-select";
function CompRadarAnalysis({ comp, heroes }) {
  const { t } = useTranslation("pages");
  const stats = React.useMemo(
    () => computeCompRadarStats(comp, heroes),
    [comp, heroes]
  );
  const evaluationData = React.useMemo(
    () => [
      { subject: t("compDetail.radar.attack"), A: stats.attack, fullMark: 100 },
      { subject: t("compDetail.radar.defense"), A: stats.defense, fullMark: 100 },
      { subject: t("compDetail.radar.control"), A: stats.control, fullMark: 100 },
      { subject: t("compDetail.radar.difficulty"), A: stats.difficulty, fullMark: 100 },
      { subject: t("compDetail.radar.econ"), A: stats.economy, fullMark: 100 },
      { subject: t("compDetail.radar.lateGame"), A: stats.lateGame, fullMark: 100 }
    ],
    [stats, t]
  );
  return /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between border-b border-brand-border pb-4", children: /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold uppercase tracking-tight text-white", children: t("compDetail.multiAnalysis") }) }),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-6 md:p-10 flex flex-col relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none text-9xl font-bold", children: "ANALYTIC" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-full min-h-[320px] md:min-h-[400px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(RadarChart, { cx: "50%", cy: "50%", outerRadius: "80%", data: evaluationData, children: [
          /* @__PURE__ */ jsx(PolarGrid, { stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 }),
          /* @__PURE__ */ jsx(
            PolarAngleAxis,
            {
              dataKey: "subject",
              tick: { fill: "#8A8F98", fontSize: 11, fontWeight: 600 }
            }
          ),
          /* @__PURE__ */ jsx(PolarRadiusAxis, { angle: 30, domain: [0, 100], tick: false, axisLine: false }),
          /* @__PURE__ */ jsx(
            Radar,
            {
              name: t("compDetail.radar.stats"),
              dataKey: "A",
              stroke: "#F5B43C",
              fill: "#F5B43C",
              fillOpacity: 0.15,
              strokeWidth: 2,
              animationBegin: 300,
              animationDuration: 1e3
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full mt-8", children: evaluationData.map((item) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-brand-bg border border-brand-border p-4 md:p-5 rounded-xl text-center shadow-inner group hover:border-brand-gold/30 transition-all",
            children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-brand-text-sub mb-2 uppercase tracking-widest", children: item.subject }),
              /* @__PURE__ */ jsxs("div", { className: "text-2xl font-bold text-white group-hover:text-brand-gold transition-colors", children: [
                item.A,
                /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-brand-text-sub ml-1", children: "/100" })
              ] })
            ]
          },
          item.subject
        )) })
      ] })
    ] })
  ] });
}
export {
  CompRadarAnalysis
};
