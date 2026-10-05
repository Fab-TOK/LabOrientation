import { Audience } from "@/components/ui/Bits";
import { offerName, recap, type Offer } from "@/content/formulas";
import { cn } from "@/lib/cn";

const COLUMNS = "nav:grid nav:grid-cols-[1.6fr_1.1fr_0.9fr] nav:items-center nav:gap-6";

/** Fonds alternés des groupes, comme sur la maquette : crème, sable, crème. */
const GROUP_BACKGROUND = ["bg-offwhite", "bg-sand", "bg-offwhite"];

/**
 * Tableau récapitulatif de la gamme, section 04.
 *
 * Desktop : trois colonnes, un fond par famille. Mobile : chaque famille sous
 * un intertitre ardoise ; le nom et la pastille de public à gauche, la durée
 * à droite.
 */
export function RecapTable() {
  return (
    <>
      <div className="mt-[18px] overflow-hidden rounded-[14px] border border-slate/16 nav:mt-6 nav:rounded-[16px]">
        <div
          className={`hidden bg-slate px-[30px] py-[18px] text-[11px]/none font-bold tracking-[0.12em] text-cream/70 uppercase ${COLUMNS}`}
        >
          <div>{recap.columns.offer}</div>
          <div>{recap.columns.audience}</div>
          <div className="text-right">{recap.columns.duration}</div>
        </div>

        {recap.groups.map((group, index) => (
          <div
            key={group.title}
            className={cn(GROUP_BACKGROUND[index], index > 0 && "nav:border-t nav:border-slate/16")}
          >
            <h3 className="bg-slate px-5 py-[14px] text-[10.5px]/none font-bold tracking-[0.12em] text-cream/70 uppercase nav:hidden">
              {group.title}
            </h3>
            {group.offers.map((offer) => (
              <Row key={offer.slug} offer={offer} />
            ))}
          </div>
        ))}
      </div>

      <p className="mt-3 text-[13.5px]/[1.6] text-slate/70 nav:mt-4 nav:text-[14px]">
        {recap.note}
      </p>
    </>
  );
}

function Row({ offer }: { offer: Offer }) {
  return (
    <div
      className={`flex items-center justify-between gap-[14px] border-b border-slate/10 px-5 py-4 last:border-b-0 nav:px-[30px] nav:py-5 ${COLUMNS}`}
    >
      <div>
        <div className="font-serif text-[19px]/[1.2] nav:text-[21px]/[1.25]">{offerName(offer)}</div>
        <div className="mt-[7px] nav:hidden">
          <AudiencePill offer={offer} />
        </div>
      </div>
      <div className="hidden nav:block">
        <AudiencePill offer={offer} />
      </div>
      <div className="flex-none text-[15px]/none font-semibold text-slate nav:text-right nav:text-[16px]">
        {offer.recapDuration}
      </div>
    </div>
  );
}

function AudiencePill({ offer }: { offer: Offer }) {
  return (
    <span className="badge-level px-[11px] py-[5px] text-[11.5px] nav:px-[13px] nav:py-[7px] nav:text-[12.5px]">
      <Audience label={offer.audience} />
    </span>
  );
}
