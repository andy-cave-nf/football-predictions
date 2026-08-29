import { z } from 'zod';

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

const Link = z.object({
  language: z.string().optional(),
  rel: z.array(z.string()),
  href: z.url(),
  text: z.string().optional(),
  shortText: z.string().optional(),
  isExternal: z.boolean().optional(),
  isPremium: z.boolean().optional(),
  isHidden: z.boolean().optional(),
});

const Logo = z.object({
  href: z.url(),
  width: z.number().optional(),
  height: z.number().optional(),
  alt: z.string().optional(),
  rel: z.array(z.string()),
  lastUpdated: z.string().optional(),
});

const Provider = z.object({
  id: z.string(),
  name: z.string(),
  priority: z.number(),
  displayName: z.string(),
  logos: z.array(z.object({ href: z.string().url(), rel: z.array(z.string()) })),
});

// ---------------------------------------------------------------------------
// League
// ---------------------------------------------------------------------------

const League = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  midsizeName: z.string(),
  slug: z.string(),
  season: z.object({
    year: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    displayName: z.string(),
    type: z.object({
      id: z.string(),
      type: z.number(),
      name: z.string(),
      abbreviation: z.string(),
    }),
  }),
  logos: z.array(Logo),
  calendarType: z.string(),
  calendarIsWhitelist: z.boolean(),
  calendarStartDate: z.string(),
  calendarEndDate: z.string(),
  calendar: z.array(z.string()),
});

// ---------------------------------------------------------------------------
// Status / Venue (reused across event + competition)
// ---------------------------------------------------------------------------

const StatusType = z.object({
  id: z.string(),
  name: z.string(),
  state: z.string(),
  completed: z.boolean(),
  description: z.string(),
  detail: z.string(),
  shortDetail: z.string(),
});

const Status = z.object({
  clock: z.number(),
  displayClock: z.string(),
  type: StatusType,
});

// ---------------------------------------------------------------------------
// Competitor / Team
// ---------------------------------------------------------------------------

const Team = z.object({
  id: z.string(),
  uid: z.string(),
  abbreviation: z.string(),
  displayName: z.string(),
  shortDisplayName: z.string(),
  name: z.string(),
  location: z.string(),
  color: z.string().optional(),
  alternateColor: z.string().optional(),
  isActive: z.boolean(),
  logo: z.url().optional(),
  links: z.array(Link),
  venue: z.object({ id: z.string() }).optional(),
});

const Record = z.object({
  name: z.string(),
  type: z.string(),
  summary: z.string(),
  abbreviation: z.string().optional(),
});

const Competitor = z.object({
  id: z.string(),
  uid: z.string(),
  type: z.string(),
  order: z.number(),
  homeAway: z.literal(['home', 'away']),
  winner: z.boolean().optional(),
  form: z.string().optional(),
  score: z.string(),
  records: z.array(Record).optional(),
  team: Team,
  statistics: z.array(z.unknown()),
});

// ---------------------------------------------------------------------------
// Odds
// ---------------------------------------------------------------------------

const OddsLink = Link.extend({
  tracking: z
    .object({
      campaign: z.string(),
      tags: z.object({
        league: z.string(),
        sport: z.string(),
        gameId: z.number(),
        betSide: z.string(),
        betType: z.string(),
        betDetails: z.string().optional(),
      }),
    })
    .optional(),
});

// open/close price point. `line` present for spread/total, absent for moneyline.
const PricePoint = z.object({
  line: z.string().optional(),
  odds: z.string(),
  link: OddsLink.optional(),
});

const OddsSide = z.object({
  open: PricePoint,
  close: PricePoint,
});

const Market = z.object({
  displayName: z.string(),
  shortDisplayName: z.string(),
});

const Odds = z.object({
  overUnder: z.number().optional(),
  link: Link.optional(),
  provider: Provider,
  drawOdds: z
    .object({
      moneyLine: z.number(),
      link: Link.optional(),
    })
    .optional(),
  total: Market.extend({
    over: OddsSide,
    under: OddsSide,
  }).optional(),
  pointSpread: Market.extend({
    home: OddsSide,
    away: OddsSide,
  }).optional(),
  moneyline: Market.extend({
    home: OddsSide,
    away: OddsSide,
    draw: OddsSide.optional(),
  }).optional(),
  details: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Broadcasts
// ---------------------------------------------------------------------------

const GeoBroadcast = z.object({
  type: z.object({ id: z.string(), shortName: z.string() }),
  market: z.object({ id: z.string(), type: z.string() }),
  media: z.object({ shortName: z.string() }),
  lang: z.string().optional(),
  region: z.string().optional(),
});

const Broadcast = z.object({
  market: z.string(),
  names: z.array(z.string()),
});

// ---------------------------------------------------------------------------
// Competition
// ---------------------------------------------------------------------------

const Ticket = z.object({
  summary: z.string(),
  numberAvailable: z.number(),
  links: z.array(z.object({ href: z.url() })),
});

const Competition = z.object({
  id: z.string(),
  uid: z.string(),
  date: z.string(),
  startDate: z.string().optional(),
  attendance: z.number(),
  timeValid: z.boolean(),
  recent: z.boolean(),
  status: Status,
  venue: z.object({
    id: z.string(),
    fullName: z.string(),
    address: z.object({
      city: z.string().optional(),
      country: z.string().optional(),
    }),
  }),
  tickets: z.array(Ticket).optional(),
  format: z.object({ regulation: z.object({ periods: z.number() }) }).optional(),
  altGameNote: z.string().optional(),
  notes: z.array(z.unknown()),
  geoBroadcasts: z.array(GeoBroadcast).optional(),
  broadcasts: z.array(Broadcast).optional(),
  broadcast: z.string().optional(),
  competitors: z.array(Competitor),
  details: z.array(z.unknown()),
  odds: z.array(Odds).optional(),
  wasSuspended: z.boolean().optional(),
  playByPlayAvailable: z.boolean().optional(),
  playByPlayAthletes: z.boolean().optional(),
});

// ---------------------------------------------------------------------------
// Event
// ---------------------------------------------------------------------------

const Event = z.object({
  id: z.string(),
  uid: z.string(),
  date: z.string(),
  name: z.string(),
  shortName: z.string(),
  season: z.object({
    year: z.number(),
    type: z.number(),
    slug: z.string(),
  }),
  competitions: z.array(Competition),
  status: Status,
  venue: z.object({ displayName: z.string() }).optional(),
  links: z.array(Link),
});

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------

export const EspnFixturesSchema = z.object({
  leagues: z.array(League),
  events: z.array(Event),
  provider: Provider.optional(),
});

export type EspnFixtures = z.infer<typeof EspnFixturesSchema>;
export type EspnEvent = z.infer<typeof Event>;
export type EspnCompetition = z.infer<typeof Competition>;
export type EspnOdds = z.infer<typeof Odds>;
export type EspnCompetitor = z.infer<typeof Competitor>;
