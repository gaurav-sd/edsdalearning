/**
 * Shared App Builder fetch utility for EDS blocks.
 * Copy this file into your EDS project's /scripts/ folder.
 *
 * The base URL is read from page/site metadata first (set it as a
 * metadata table in the da.live document, or as page properties), and
 * falls back to a placeholder — replace <namespace> with your Adobe I/O
 * Runtime namespace, or better, set app-builder-base-url in da.live so
 * dev/stage/prod can each point at a different namespace without a
 * code change.
 */
import { getMetadata } from './aem.js';

const BASE = getMetadata('app-builder-base-url')
  || 'https://1412628-487erincentipede-stage.adobeioruntime.net/api/v1/web/eds-integration';

export async function getContentFragment(id) {
  const res = await fetch(`${BASE}/get-content-fragment?id=${encodeURIComponent(id)}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    throw new Error(`CF fetch failed: ${res.status}`);
  }
  return res.json();
}
