/**
 * Données structurées schema.org.
 *
 * `</script>` et `<!--` sont neutralisés : sans cela, une valeur contenant
 * l’un ou l’autre refermerait la balise et injecterait du balisage dans la page.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data)
    .replace(/</g, "\u003c")
    .replace(/>/g, "\u003e")
    .replace(/&/g, "\u0026");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
