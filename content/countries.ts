/**
 * Liste des pays pour le champ « Pays de résidence ».
 *
 * Les codes ISO 3166-1 alpha-2 sont stockés ici ; les libellés français sont
 * produits par `Intl.DisplayNames`, ce qui évite de figer 240 traductions et
 * garde l’orthographe officielle.
 */
const ISO_CODES =
  "AD AE AF AG AI AL AM AO AR AT AU AW AZ BA BB BD BE BF BG BH BI BJ BM BN BO BR BS BT BW BY BZ CA CD CF CG CH CI CL CM CN CO CR CU CV CY CZ DE DJ DK DM DO DZ EC EE EG ER ES ET FI FJ FM FR GA GB GD GE GH GM GN GQ GR GT GW GY HN HR HT HU ID IE IL IN IQ IR IS IT JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MG MH MK ML MM MN MR MT MU MV MW MX MY MZ NA NE NG NI NL NO NP NR NZ OM PA PE PG PH PK PL PT PW PY QA RO RS RU RW SA SB SC SD SE SG SI SK SL SM SN SO SR SS ST SV SY SZ TD TG TH TJ TL TM TN TO TR TT TV TW TZ UA UG US UY UZ VA VC VE VN VU WS YE ZA ZM ZW".split(
    " ",
  );

export type Country = { code: string; name: string };

const displayNames = new Intl.DisplayNames(["fr"], { type: "region" });

export const countries: Country[] = ISO_CODES.map((code) => ({
  code,
  name: displayNames.of(code) ?? code,
}))
  .sort((a, b) => a.name.localeCompare(b.name, "fr"))
  .concat({ code: "AUTRE", name: "Autre" });

const countryCodes = new Set(countries.map((country) => country.code));

export function isValidCountry(code: string): boolean {
  return countryCodes.has(code);
}
