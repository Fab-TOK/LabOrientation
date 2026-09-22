import { Audience } from "@/components/ui/Bits";
import { offerName, recap, type Offer } from "@/content/formulas";

const COLUMNS = "nav:grid nav:grid-cols-[1.6fr_1.1fr_0.9fr] nav:items-center nav:gap-6";

/**
 * Tableau récapitulatif de la gamme, section 03.
 *
 * Desktop : trois colonnes, parcours sur fond crème et modules sur fond sable.
 * Mobile : une colonne, les deux familles reprises par un intertitre.
 */
export function RecapTable() {
  return (
    <>
      <div className="mt-5 overflow-hidden rounded-[14px] border border-slate/16 nav:mt-6 nav:rounded-[16px]">
        <div
          className={`hidden bg-slate px-[30px] py-[18px] text-[11px]/none font-bold tracking-[0.12em] text-cream/70 uppercase ${COLUMNS}`}
        >
          <div>{recap.columns.offer}</div>
          <div>{recap.columns.audience}</div>
          <div className="text-right">{recap.columns.duration}</div>
        </div>

        {recap.groups.map((group, index) => (
          <div key={group.title} className={index === 0 ? "bg-offwhite" : "bg-sand nav:border-t nav:border-slate/16"}>
            <h3 className="border-t border-slate/10 bg-slate px-[18px] py-[10px] text-[11px]/none font-bold tracking-[0.12em] text-cream/70 uppercase nav:hidden">
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
      className={`border-t border-slate/10 px-[18px] py-4 nav:border-t-0 nav:border-b nav:px-[30px] nav:py-5 nav:last:border-b-0 ${COLUMNS}`}
    >
      <div className="font-serif text-[19px]/[1.25] nav:text-[21px]">{offerName(offer)}</div>
      <div className="mt-2 flex items-center justify-between gap-4 nav:mt-0 nav:block">
        <span className="badge-level">
          <Audience label={offer.audience} />
        </span>
        <span className="text-[15px]/none font-semibold text-slate nav:hidden">
          {offer.recapDuration}
        </span>
      </div>
      <div className="hidden text-right text-[16px]/none font-semibold text-slate nav:block">
        {offer.recapDuration}
      </div>
    </div>
  );
}
