export type ServerRule = {
  id: string;
  number: string;
  title: string;
  points: readonly string[];
};

export const serverRules: readonly ServerRule[] = [
  {
    id: "respect-everyone",
    number: "01",
    title: "Respect everyone",
    points: [
      "No bullying, harassment, hate speech, or threats.",
      "Do not spam or flood the chat.",
      "Respect other players and their builds.",
    ],
  },
  {
    id: "no-cheating",
    number: "02",
    title: "No cheating",
    points: [
      "No hacked clients, cheats, KillAura, X-ray, or unfair advantages.",
      "No exploiting bugs or abusing glitches.",
      "No duplication glitches or unfair item duplication.",
    ],
  },
  {
    id: "protect-other-players",
    number: "03",
    title: "Protect other players",
    points: [
      "Do not grief or destroy another player's builds.",
      "Do not steal items from other players.",
      "Do not enter private areas or bases to cause trouble.",
      "Ask permission before using or modifying someone else's property.",
    ],
  },
  {
    id: "pvp-and-combat",
    number: "04",
    title: "PvP and combat",
    points: [
      "Do not kill players repeatedly just to annoy them.",
      "Respect requests to stop unwanted PvP.",
      "Do not use combat exploits or cheats.",
    ],
  },
  {
    id: "keep-the-server-playable",
    number: "05",
    title: "Keep the server playable",
    points: [
      "Do not create lag machines or intentionally crash the server.",
      "Do not abuse server mechanics.",
      "Do not intentionally disrupt other players' gameplay.",
    ],
  },
  {
    id: "chat-and-advertising",
    number: "06",
    title: "Chat and advertising",
    points: [
      "Keep chat appropriate.",
      "No excessive spam or malicious links.",
      "Do not advertise other servers without permission.",
      "Do not impersonate staff or other players.",
    ],
  },
  {
    id: "staff-decisions",
    number: "07",
    title: "Staff decisions",
    points: [
      "Follow reasonable instructions from server staff.",
      "Do not fake evidence or make false reports.",
      "If you disagree with a punishment, appeal respectfully through Discord.",
    ],
  },
] as const;

export const punishmentLevels = [
  "Warning",
  "Temporary mute or restriction",
  "Temporary ban",
  "Permanent ban",
] as const;
