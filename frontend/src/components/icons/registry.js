/* Maps keys from the content data file to icon components.
   Kept separate from Icons.jsx so that file only exports components, which is
   what React Fast Refresh requires. */

import {
  IconAward,
  IconBriefcase,
  IconCode,
  IconGithub,
  IconGraduation,
  IconLinkedIn,
  IconMapPin,
  IconSpark,
  IconTrophy,
  IconX,
} from './Icons';

/** `achievements[].icon` -> component */
export const achievementIcons = {
  award: IconAward,
  trophy: IconTrophy,
  spark: IconSpark,
};

/** `socials` keys -> component */
export const socialIcons = {
  github: IconGithub,
  linkedin: IconLinkedIn,
  x: IconX,
};

/** `aboutFacts[].icon` -> component */
export const factIcons = {
  briefcase: IconBriefcase,
  code: IconCode,
  graduation: IconGraduation,
  mapPin: IconMapPin,
};