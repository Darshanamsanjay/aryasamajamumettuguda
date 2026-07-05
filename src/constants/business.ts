/**
 * Centralized business configuration.
 *
 * Update phone numbers via environment variables:
 *   NEXT_PUBLIC_WHATSAPP_NUMBER  — digits only, include country code (e.g. 918099333754)
 *   NEXT_PUBLIC_CALL_NUMBER      — full international format (e.g. +918099333754)
 *
 * Branch names and hours live here so a single edit propagates everywhere.
 */

/** WhatsApp number — digits only, with country code */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "918099333754";

/** Callable phone number — international format */
export const CALL_NUMBER =
  process.env.NEXT_PUBLIC_CALL_NUMBER ?? "+918099333754";

/** Branch / location options */
export const BRANCHES = [
  {
    label: "Arya Samaj Mettuguda",
    value: "Mettuguda",
    address: "12-8-390/A & B, Near Pillar No.1122, Mettuguda, Secunderabad",
    mapUrl: "https://maps.app.goo.gl/sTVVuqM5NwoxnUs8A?g_st=iw",
  },
  {
    label: "Arya Samaj Nagaram",
    value: "Nagaram",
    address:
      "H.No. 4-13/6/A/1, Road No. 5/4, West Gandhi Nagar, Nagaram, Keesara",
    mapUrl: "https://maps.app.goo.gl/TngfU1aPXELkbGMp6",
  },
] as const;

/** Default branch selection */
export const DEFAULT_BRANCH = BRANCHES[0].value;

/** Office hours (display string) */
export const BUSINESS_HOURS = "10:00 AM – 5:00 PM (All Days)";

/** Marriage types offered */
export const MARRIAGE_TYPES = [
  "Arya Samaj Marriage",
  "Love Marriage",
  "Inter Caste Marriage",
  "Inter Religion Marriage",
  "Same Day Marriage",
] as const;

/** Default marriage type */
export const DEFAULT_MARRIAGE_TYPE = MARRIAGE_TYPES[0];
