import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { C as Card, c as cn, A as AdminDemoBadge } from "./admin-ui-DF1jhL5E.js";
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, PieChart, Pie, Cell, BarChart, Bar } from "recharts";
import "clsx";
import "react-router-dom";
import "lucide-react";
import "react";
import "@radix-ui/react-dialog";
import "@radix-ui/react-slot";
import "react-i18next";
import "tailwind-merge";
import "@radix-ui/react-select";
const TRAFFIC_DATA = [
  { day: "01", visits: 42e3 },
  { day: "05", visits: 58e3 },
  { day: "10", visits: 51e3 },
  { day: "15", visits: 72e3 },
  { day: "20", visits: 65e3 },
  { day: "25", visits: 88e3 },
  { day: "30", visits: 95e3 }
];
const SOURCE_DATA = [
  { name: "Trực tiếp", value: 50, color: "#F25C54" },
  { name: "Tìm kiếm", value: 30, color: "#F5B43C" },
  { name: "Mạng xã hội", value: 20, color: "#4D96F0" }
];
const TRENDING_COMPS = [
  { name: "9 Warrior", percent: 23.1, rank: 1 },
  { name: "6 Hunter", percent: 19.3, rank: 2 },
  { name: "6 Assassin", percent: 17.6, rank: 3 },
  { name: "9 Mage", percent: 16.8, rank: 4 }
];
const RANK_COLORS = ["#F25C54", "#F5A623", "#F5B43C", "#4D96F0"];
const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    background: "#15171D",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#F5F6F8"
  }
};
function AdminDashboardCharts({
  trafficPeriod,
  onTrafficPeriodChange
}) {
  const trafficScale = trafficPeriod === "90" ? 1.3 : 1;
  const chartData = TRAFFIC_DATA.map((d) => ({
    ...d,
    visits: Math.round(d.visits * trafficScale)
  }));
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-2 p-8 shadow-none rounded-xl bg-brand-card border-brand-border relative overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute top-6 right-6 flex gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onTrafficPeriodChange("30"),
              className: cn(
                "px-3 py-1 rounded text-[11px] font-bold h-auto border transition-all",
                trafficPeriod === "30" ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 text-brand-text-sub border-transparent"
              ),
              children: "30 NGÀY"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onTrafficPeriodChange("90"),
              className: cn(
                "px-3 py-1 rounded text-[11px] font-semibold h-auto border transition-all",
                trafficPeriod === "90" ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 text-brand-text-sub border-transparent"
              ),
              children: "90 NGÀY"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("h3", { className: "admin-card-title mb-6 flex items-center gap-2", children: [
          "Lưu lượng truy cập",
          /* @__PURE__ */ jsx(AdminDemoBadge, {})
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-[250px] w-full", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(AreaChart, { data: chartData, margin: { top: 5, right: 10, left: -10, bottom: 0 }, children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "goldArea", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#F5B43C", stopOpacity: 0.15 }),
            /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#F5B43C", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "rgba(255,255,255,0.05)", vertical: false }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "day", tick: { fill: "#8A8F98", fontSize: 11 }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsx(
            YAxis,
            {
              tick: { fill: "#8A8F98", fontSize: 11 },
              axisLine: false,
              tickLine: false,
              tickFormatter: (v) => `${v / 1e3}K`
            }
          ),
          /* @__PURE__ */ jsx(
            Tooltip,
            {
              ...CHART_TOOLTIP_STYLE,
              formatter: (value) => [`${Number(value).toLocaleString()}`, "Lượt truy cập"]
            }
          ),
          /* @__PURE__ */ jsx(
            Area,
            {
              type: "monotone",
              dataKey: "visits",
              stroke: "#F5B43C",
              strokeWidth: 2,
              fill: "url(#goldArea)",
              dot: { fill: "#F5B43C", stroke: "#15171D", strokeWidth: 2, r: 4 },
              activeDot: { fill: "#F5B43C", stroke: "#15171D", strokeWidth: 2, r: 6 }
            }
          )
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "lg:col-span-1 p-8 shadow-none rounded-xl bg-brand-card border-brand-border flex flex-col relative overflow-hidden", children: [
        /* @__PURE__ */ jsxs("h3", { className: "admin-card-title mb-6", children: [
          "Nguồn ",
          /* @__PURE__ */ jsx("span", { className: "text-brand-gold", children: "Source" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative w-44 h-44 mx-auto my-2 flex items-center justify-center", children: [
          /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsx(PieChart, { children: /* @__PURE__ */ jsx(
            Pie,
            {
              data: SOURCE_DATA,
              cx: "50%",
              cy: "50%",
              innerRadius: 55,
              outerRadius: 75,
              paddingAngle: 2,
              dataKey: "value",
              stroke: "none",
              children: SOURCE_DATA.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: entry.color }, `cell-${index}`))
            }
          ) }) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none", children: [
            /* @__PURE__ */ jsx("span", { className: "admin-stat-value leading-none", children: "100%" }),
            /* @__PURE__ */ jsx("span", { className: "admin-eyebrow mt-1", children: "Tổng cộng" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-full text-[13px] space-y-3 mt-auto border-t border-brand-border pt-6", children: SOURCE_DATA.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full mr-3", style: { background: item.color } }),
            item.name
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "font-semibold font-mono text-brand-text-main", children: [
            item.value,
            "%"
          ] })
        ] }, item.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: /* @__PURE__ */ jsxs(Card, { className: "p-6 shadow-none rounded-xl bg-brand-card border-brand-border", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "admin-card-title", children: "Đội hình thịnh hành" }),
        /* @__PURE__ */ jsx("button", { type: "button", className: "text-[12px] font-semibold text-brand-gold hover:underline", children: "Xem tất cả" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-[180px] mb-4", children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: TRENDING_COMPS, layout: "vertical", margin: { top: 0, right: 10, left: 0, bottom: 0 }, children: [
        /* @__PURE__ */ jsx(XAxis, { type: "number", hide: true }),
        /* @__PURE__ */ jsx(
          YAxis,
          {
            type: "category",
            dataKey: "name",
            tick: { fill: "#8A8F98", fontSize: 12 },
            axisLine: false,
            tickLine: false,
            width: 90
          }
        ),
        /* @__PURE__ */ jsx(Tooltip, { ...CHART_TOOLTIP_STYLE, formatter: (value) => [`${value}%`, "Tỷ lệ"] }),
        /* @__PURE__ */ jsx(Bar, { dataKey: "percent", radius: [0, 4, 4, 0], barSize: 16, children: TRENDING_COMPS.map((_, index) => /* @__PURE__ */ jsx(Cell, { fill: RANK_COLORS[index] }, `bar-${index}`)) })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: TRENDING_COMPS.map((item, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex justify-between items-center bg-brand-card-2/50 p-3 rounded-xl border border-brand-border group hover:border-brand-gold/20 transition-all cursor-pointer",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "w-6 h-6 rounded flex items-center justify-center font-bold text-[12px] text-brand-text-main shadow-md",
                  style: { background: RANK_COLORS[i] },
                  children: item.rank
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors text-[14px]", children: item.name })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-brand-text-sub font-mono font-semibold text-[12px]", children: [
              item.percent,
              "%"
            ] })
          ]
        },
        item.rank
      )) })
    ] }) })
  ] });
}
export {
  AdminDashboardCharts
};
