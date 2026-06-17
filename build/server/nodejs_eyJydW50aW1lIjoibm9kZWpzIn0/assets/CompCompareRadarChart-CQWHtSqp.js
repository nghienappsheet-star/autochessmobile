import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from "recharts";
import { C as Card } from "./admin-ui-BjWfzkMI.js";
import "clsx";
import "react-router-dom";
import "lucide-react";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slot";
import "react-i18next";
import "tailwind-merge";
import "@radix-ui/react-select";
const RADAR_AXIS_KEYS = [
  "attack",
  "defense",
  "control",
  "difficulty",
  "economy",
  "lateGame"
];
const RADAR_LABEL_KEYS = {
  attack: "attack",
  defense: "defense",
  control: "control",
  difficulty: "difficulty",
  economy: "econ",
  lateGame: "lateGame"
};
function CompCompareRadarChart({ columns, title, t }) {
  const radarData = React.useMemo(() => {
    return RADAR_AXIS_KEYS.map((axisKey) => {
      const labelKey = RADAR_LABEL_KEYS[axisKey];
      const row = {
        subject: t(`pages:compDetail.radar.${labelKey}`)
      };
      columns.forEach(({ comp, radar }) => {
        row[comp.id] = radar[axisKey];
      });
      return row;
    });
  }, [columns, t]);
  return /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border p-4 md:p-6 rounded-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold text-brand-text-main", children: title }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: columns.map(({ comp, accent }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[11px] font-semibold text-brand-text-sub", children: [
        /* @__PURE__ */ jsx("span", { className: "w-2.5 h-2.5 rounded-full shrink-0", style: { backgroundColor: accent } }),
        /* @__PURE__ */ jsx("span", { className: "truncate max-w-[120px]", children: comp.name })
      ] }, comp.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "w-full min-h-[280px] md:min-h-[340px]", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(RadarChart, { cx: "50%", cy: "50%", outerRadius: "75%", data: radarData, children: [
      /* @__PURE__ */ jsx(PolarGrid, { stroke: "rgba(255,255,255,0.05)", strokeWidth: 1 }),
      /* @__PURE__ */ jsx(
        PolarAngleAxis,
        {
          dataKey: "subject",
          tick: { fill: "#8A8F98", fontSize: 10, fontWeight: 600 }
        }
      ),
      /* @__PURE__ */ jsx(PolarRadiusAxis, { angle: 30, domain: [0, 100], tick: false, axisLine: false }),
      columns.map(({ comp, accent }) => /* @__PURE__ */ jsx(
        Radar,
        {
          name: comp.name,
          dataKey: comp.id,
          stroke: accent,
          fill: accent,
          fillOpacity: 0.12,
          strokeWidth: 2
        },
        comp.id
      )),
      /* @__PURE__ */ jsx(Legend, { wrapperStyle: { display: "none" } })
    ] }) }) })
  ] });
}
export {
  CompCompareRadarChart
};
