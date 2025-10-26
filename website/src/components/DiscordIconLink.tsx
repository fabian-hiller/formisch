import { component$ } from '@qwik.dev/core';
import { DiscordIcon } from '~/icons';
import { SystemIcon } from './SystemIcon';

/**
 * Discord icon pointing to our community server.
 */
export const DiscordIconLink = component$(() => (
  <SystemIcon
    label="Join our Discord server"
    type="link"
    href={import.meta.env.PUBLIC_DISCORD_URL}
    target="_blank"
  >
    <DiscordIcon class="h-full" />
  </SystemIcon>
));
