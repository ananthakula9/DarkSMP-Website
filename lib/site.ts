const server = {
  host: "DARK-BR-S5.aternos.me",
  port: 64666,
  mode: "Survival SMP",
  edition: "Java Edition only",
  compatibility:
    "ViaVersion and ViaBackwards are installed; specific supported versions are not listed.",
  hosting: "Aternos",
} as const;

const serverAddress = `${server.host}:${server.port}`;

export const siteConfig = {
  name: "DarkSMP",
  tagline: "A Java Survival SMP.",
  description: `DarkSMP is a Java Edition Survival SMP hosted on ${server.hosting}. Connect at ${serverAddress} or join the community on Discord.`,
  server: {
    ...server,
    address: serverAddress,
  },
  links: {
    discord: "https://discord.gg/YbGhE8wsxu",
  },
} as const;

export type ServerFact = {
  label: string;
  value: string;
  mono?: boolean;
};

export const serverFacts: readonly ServerFact[] = [
  {
    label: "Mode",
    value: siteConfig.server.mode,
  },
  {
    label: "Edition",
    value: siteConfig.server.edition,
  },
  {
    label: "Server address",
    value: siteConfig.server.address,
    mono: true,
  },
  {
    label: "Hosting",
    value: siteConfig.server.hosting,
  },
  {
    label: "Compatibility",
    value: siteConfig.server.compatibility,
  },
];
