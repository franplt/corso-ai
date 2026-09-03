import { SITE_NAME, SITE_URL } from "@/lib/site";

const ORIGIN = SITE_URL; // No trailing slash (matches canonical + og:url + sitemap)

const organizationId = `${ORIGIN}/#organization`;
const courseId = `${ORIGIN}/#course`;

export const HOME_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url: ORIGIN,
    },
    {
      "@type": "Course",
      "@id": courseId,
      name: SITE_NAME,
      alternateName: "Corso intelligenza artificiale in 10 puntate",
      description:
        "Percorso in italiano per chi non è tecnico: dieci puntate brevi su dati, token, modelli, RAG, agenti e scelta del modello. Prima puntata gratis.",
      url: ORIGIN,
      inLanguage: "it",
      isAccessibleForFree: false,
      educationalLevel: "principianti",
      teaches: [
        "come funziona l'intelligenza artificiale",
        "token e modelli di linguaggio",
        "RAG",
        "agenti AI",
        "come scegliere un modello",
      ],
      provider: { "@id": organizationId },
      hasCourseInstance: {
        "@type": "CourseInstance",
        "@id": `${ORIGIN}/#instance`,
        courseMode: "online",
        inLanguage: "it",
      },
      offers: {
        "@type": "Offer",
        "@id": `${ORIGIN}/#offer`,
        name: `Accesso a vita al ${SITE_NAME}`,
        price: "9.90",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: `${ORIGIN}/payment/checkout`,
        category: "Paid",
      },
      hasPart: [
        {
          "@type": "LearningResource",
          name: "Puntata 1: Perché adesso?",
          url: `${ORIGIN}/chapters/puntata-1-perche-adesso`,
          isAccessibleForFree: true,
          inLanguage: "it",
          learningResourceType: "capitolo",
        },
      ],
    },
  ],
});

