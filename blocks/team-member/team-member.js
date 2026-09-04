/**
 * blocks/team-member/team-member.js
 * Copy this folder into your EDS project's /blocks/ directory.
 *
 * Authored in da.live as a two-row table:
 *   | Team Member |
 *   | jane-doe    |
 * The second cell's text becomes block.textContent below — that value
 * is the Content Fragment id an author pastes in when building the page.
 *
 * Topic 3 / Topic 4 Pattern A: fetches from App Builder client-side,
 * during EDS's Lazy loading phase.
 */
import { getContentFragment } from '../../scripts/api.js';

export default async function decorate(block) {
  const id = block.textContent.trim();
  block.innerHTML = '<p class="loading">Loading…</p>';

  try {
    const data = await getContentFragment(id);
    renderTeamMember(block, data);
  } catch (err) {
    block.innerHTML = '<p class="error">Unable to load profile</p>';
  }
}

function renderTeamMember(block, data) {
  block.innerHTML = `
    <div class="team-member-photo"><img src="${data.photo || ''}" alt="${data.name || ''}" loading="lazy" /></div>
    <div class="team-member-body">
      <h3>${data.name || ''}</h3>
      <p class="title">${data.title || ''}</p>
      <p class="bio">${data.bio || ''}</p>
    </div>
  `;
}
