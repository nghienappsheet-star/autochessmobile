import { Badge } from "@/components/ui/core"
import { Zap } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { HeroSkill } from "@/types/domain"

type HeroSkillBlockProps = {
  skill: HeroSkill
}

export function HeroSkillBlock({ skill }: HeroSkillBlockProps) {
  const { t } = useTranslation("pages")

  return (
    <section className="space-y-4">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
        <Zap className="w-4 h-4 fill-brand-gold" />
        {t("heroDetail.skillTitle")}
      </h3>
      <div className="bg-brand-bg p-6 rounded-xl border border-brand-border">
        <div className="flex gap-4">
          {skill.iconUrl && (
            <div className="w-14 h-14 rounded-xl border border-brand-border overflow-hidden shrink-0 bg-brand-card-2">
              <img src={skill.iconUrl} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="space-y-3 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg font-bold text-brand-text-main">{skill.name}</span>
              {skill.type && (
                <Badge
                  variant="outline"
                  className="border-brand-gold/30 text-brand-gold text-[10px] font-bold uppercase rounded-md"
                >
                  {skill.type}
                </Badge>
              )}
            </div>
            <p className="text-brand-text-sub text-sm leading-relaxed font-medium">{skill.desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
