import * as React from "react"
import { useTranslation } from "react-i18next"
import { useParams, useNavigate } from "react-router-dom"
import { Card, Button, Badge, Separator } from "@/components/ui/core"
import { Globe, Zap, TrendingUp } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import { motion } from "@/components/motion/MotionProvider"
import { DetailBreadcrumb } from "@/components/layout/DetailBreadcrumb"
import { BackButton } from "@/components/ui/BackButton"

export function RelicDetailPage() {
  const { t } = useTranslation("pages")
  const { id } = useParams();
  const { relics } = useAppStore();
  const navigate = useNavigate();

  const relic = relics.find(r => r.id === id);

  if (!relic) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-bold mb-4">{t("relicDetail.notFound")}</h2>
        <Button onClick={() => navigate('/di-vat')}>{t("common:backToList")}</Button>
      </div>
    );
  }

  const relatedRelics = relics.filter(r => r.id !== id && r.type === relic.type).slice(0, 3);

  return (
    <div className="space-y-6 pb-10">
      <BackButton to="/di-vat" label={t("common:backToList")} />
      <DetailBreadcrumb
        items={[
          { label: t("relicDetail.breadcrumbLibrary", { defaultValue: "Dị vật" }), href: "/di-vat" },
          { label: relic.name },
        ]}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card className="bg-brand-card border-brand-border p-0 overflow-hidden relative shadow-2xl">
          <div className="h-48 w-full bg-gradient-to-br from-brand-card via-brand-bg to-brand-card relative flex items-center justify-center overflow-hidden border-b border-brand-border">
             <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/20 via-transparent to-transparent" />
             </div>
             <Globe className="w-24 h-24 text-brand-gold/10 animate-pulse" />
             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <Badge variant={relic.rating === 'S' ? 'danger-solid' : 'warning-solid'} className="px-4 py-1 text-sm font-bold rounded-xl shadow-lg ring-4 ring-black/50">
                  TIER {relic.rating}
                </Badge>
             </div>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tighter leading-none">
                {relic.name}
              </h1>
              <div className="flex items-center justify-center gap-4 text-[12px] font-bold text-brand-text-sub uppercase tracking-widest">
                 <span className="bg-brand-card-2 px-3 py-1 rounded-lg text-brand-gold">{relic.type}</span>
                 <span className="text-brand-text-sub">|</span>
                 <span>{t("relicDetail.priority", { tier: relic.tier })}</span>
              </div>
            </div>

            <Separator className="bg-brand-card-2" />

            <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10">
               <div className="space-y-8">
                  <section className="space-y-4">
                     <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                        <Zap className="w-4 h-4 fill-brand-gold" /> {t("relicDetail.specialEffect")}
                     </h3>
                     <div className="bg-brand-bg p-6 rounded-xl border border-brand-border relative group">
                        <div className="absolute -right-2 -top-2 w-12 h-12 bg-brand-gold/5 rounded-full blur-xl group-hover:bg-brand-gold/10 transition-all" />
                        <p className="text-xl text-white font-bold leading-relaxed">
                           "{relic.effect}"
                        </p>
                     </div>
                  </section>

                  <section className="space-y-4">
                     <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> {t("relicDetail.tacticalReview")}
                     </h3>
                     <div className="prose prose-invert max-w-none text-brand-text-sub text-sm leading-relaxed space-y-4 font-medium">
                        <p>
                           Dị vật <strong>{relic.name}</strong> là một trong những lựa chọn mạnh mẽ nhất trong giai đoạn hiện tại. Với khả năng {relic.effect.toLowerCase()}, nó giúp xoay chuyển cục diện trận đấu cực kỳ nhanh chóng.
                        </p>
                        <ul className="space-y-2 list-none p-0">
                           <li className="flex gap-2">
                              <span className="text-brand-gold font-bold">»</span>
                              <span>Ưu tiên lấy khi bạn có ít nhất 2 tướng nòng cốt thuộc hệ {relic.type}.</span>
                           </li>
                           <li className="flex gap-2">
                              <span className="text-brand-gold font-bold">»</span>
                              <span>Phát huy tối đa sức mạnh khi kết hợp với các đội hình có khả năng khống chế.</span>
                           </li>
                        </ul>
                     </div>
                  </section>
               </div>

               <div className="space-y-6">
                  <div className="bg-brand-bg p-6 rounded-xl border border-brand-border text-center space-y-4">
                     <div className="text-[10px] font-bold text-brand-text-sub uppercase tracking-widest">{t("relicDetail.stats.appearance")}</div>
                     <div className="text-4xl font-bold text-brand-gold">12%</div>
                     <Separator className="bg-brand-card-2" />
                     <div className="text-[10px] font-bold text-brand-text-sub uppercase tracking-widest">{t("relicDetail.stats.winRate")}</div>
                     <div className="text-3xl font-bold text-brand-green">24.5%</div>
                  </div>

                  <Button className="w-full bg-gold-gradient text-black h-14 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-brand-gold/5">
                     {t("relicDetail.addToBuilder")}
                  </Button>
               </div>
            </div>

            {relatedRelics.length > 0 && (
               <div className="pt-10 border-t border-brand-border space-y-6">
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-text-sub">{t("relicDetail.relatedRelics")}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                     {relatedRelics.map(r => (
                        <div 
                           key={r.id} 
                           onClick={() => navigate(`/di-vat/${r.id}`)}
                           className="bg-brand-bg border border-brand-border p-4 rounded-xl hover:border-brand-gold/30 transition-all cursor-pointer group"
                        >
                           <div className="text-xs font-bold text-white uppercase group-hover:text-brand-gold transition-colors mb-1">{r.name}</div>
                           <div className="text-[10px] font-bold text-brand-text-sub uppercase">TIER {r.rating}</div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
