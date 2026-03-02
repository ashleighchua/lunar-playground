/**
 * Human Design Calculator
 * Uses real ephemeris data via astronomy-engine to calculate accurate
 * planetary positions and map them to Human Design gates.
 */

import * as Astronomy from 'astronomy-engine';

export interface HumanDesignCenter {
  name: string;
  defined: boolean;
  color: string; // color when defined
}

export interface HumanDesignProfile {
  type: 'Manifestor' | 'Generator' | 'Manifesting Generator' | 'Projector' | 'Reflector';
  strategy: string;
  authority: string;
  profile: string; // e.g., "1/3", "4/6"
  profileName: string; // e.g., "Investigator/Martyr"
  definedCenters: string[];
  undefinedCenters: string[];
  centers: HumanDesignCenter[];
  designGates: number[]; // gates from design calculation (88° Sun before birth)
  personalityGates: number[]; // gates from birth moment
  channels: string[]; // connected channels e.g., "20-34"
  incarnationCross: string;
}

// --- Constants ---

const ALL_CENTERS = [
  'Head',
  'Ajna',
  'Throat',
  'G',
  'Heart',
  'Sacral',
  'Solar Plexus',
  'Spleen',
  'Root',
];

const CENTER_COLORS: Record<string, string> = {
  Head: '#F5C542',
  Ajna: '#F5C542',
  Throat: '#C4365A',
  G: '#F5C542',
  Heart: '#E74C3C',
  Sacral: '#E74C3C',
  'Solar Plexus': '#C4365A',
  Spleen: '#C4365A',
  Root: '#E74C3C',
};

// All 36 channel definitions: [gateA, gateB, centerA, centerB, channelName]
const CHANNEL_DEFINITIONS: [number, number, string, string, string][] = [
  [20, 34, 'Throat', 'Sacral', 'Charisma'],
  [34, 57, 'Sacral', 'Spleen', 'Power'],
  [20, 57, 'Throat', 'Spleen', 'Penetrating Awareness'],
  [1, 8, 'G', 'Throat', 'Inspiration'],
  [13, 33, 'G', 'Throat', 'The Prodigal'],
  [7, 31, 'G', 'Throat', 'The Alpha'],
  [10, 20, 'G', 'Throat', 'Awakening'],
  [25, 51, 'G', 'Heart', 'Initiation'],
  [21, 45, 'Heart', 'Throat', 'Money Line'],
  [26, 44, 'Heart', 'Spleen', 'Surrender'],
  [50, 27, 'Spleen', 'Sacral', 'Preservation'],
  [59, 6, 'Sacral', 'Solar Plexus', 'Intimacy'],
  [42, 53, 'Sacral', 'Root', 'Maturation'],
  [3, 60, 'Sacral', 'Root', 'Mutation'],
  [9, 52, 'Sacral', 'Root', 'Concentration'],
  [54, 32, 'Root', 'Spleen', 'Transformation'],
  [19, 49, 'Root', 'Solar Plexus', 'Synthesis'],
  [39, 55, 'Root', 'Solar Plexus', 'Emoting'],
  [36, 35, 'Solar Plexus', 'Throat', 'Transitoriness'],
  [64, 47, 'Head', 'Ajna', 'Abstraction'],
  [61, 24, 'Head', 'Ajna', 'Awareness'],
  [63, 4, 'Head', 'Ajna', 'Logic'],
  [17, 62, 'Ajna', 'Throat', 'Acceptance'],
  [43, 23, 'Ajna', 'Throat', 'Structuring'],
  [11, 56, 'Ajna', 'Throat', 'Curiosity'],
  [48, 16, 'Spleen', 'Throat', 'The Wavelength'],
  [28, 38, 'Spleen', 'Root', 'Struggle'],
  [18, 58, 'Spleen', 'Root', 'Judgment'],
  [2, 14, 'G', 'Sacral', 'The Beat'],
  [5, 15, 'G', 'Sacral', 'Fixed Rhythms'],
  [10, 34, 'G', 'Sacral', 'Exploration'],
  [10, 57, 'G', 'Spleen', 'Perfected Form'],
  [12, 22, 'Throat', 'Solar Plexus', 'Openness'],
  [29, 46, 'Sacral', 'G', 'Discovery'],
  [30, 41, 'Solar Plexus', 'Root', 'Recognition'],
  [37, 40, 'Solar Plexus', 'Heart', 'Community'],
];

const MOTOR_CENTERS = ['Heart', 'Sacral', 'Solar Plexus', 'Root'];

const PROFILE_LINE_NAMES: Record<number, string> = {
  1: 'Investigator',
  2: 'Hermit',
  3: 'Martyr',
  4: 'Opportunist',
  5: 'Heretic',
  6: 'Role Model',
};

// --- Rave Mandala Wheel: gate order with ecliptic longitude start positions ---
// Each gate spans 5.625° (360° / 64 gates). Sorted by start degree.
const GATE_WHEEL: [number, number][] = [
  [17, 3.875], [21, 9.5], [51, 15.125], [42, 20.75], [3, 26.375],
  [27, 32.0], [24, 37.625], [2, 43.25], [23, 48.875], [8, 54.5],
  [20, 60.125], [16, 65.75], [35, 71.375], [45, 77.0], [12, 82.625],
  [15, 88.25], [52, 93.875], [39, 99.5], [53, 105.125], [62, 110.75],
  [56, 116.375], [31, 122.0], [33, 127.625], [7, 133.25], [4, 138.875],
  [29, 144.5], [59, 150.125], [40, 155.75], [64, 161.375], [47, 167.0],
  [6, 172.625], [46, 178.25], [18, 183.875], [48, 189.5], [57, 195.125],
  [32, 200.75], [50, 206.375], [28, 212.0], [44, 217.625], [1, 223.25],
  [43, 228.875], [14, 234.5], [34, 240.125], [9, 245.75], [5, 251.375],
  [26, 257.0], [11, 262.625], [10, 268.25], [58, 273.875], [38, 279.5],
  [54, 285.125], [61, 290.75], [60, 296.375], [41, 302.0], [19, 307.625],
  [13, 313.25], [49, 318.875], [30, 324.5], [55, 330.125], [37, 335.75],
  [63, 341.375], [22, 347.0], [36, 352.625], [25, 358.25],
];

// Incarnation Cross names mapped by Personality Sun gate
const INCARNATION_CROSS_BY_GATE: Record<number, string> = {
  1: 'Right Angle Cross of the Sphinx',
  2: 'Right Angle Cross of the Sphinx',
  3: 'Right Angle Cross of Laws',
  4: 'Right Angle Cross of Explanation',
  5: 'Right Angle Cross of Consciousness',
  6: 'Right Angle Cross of Eden',
  7: 'Right Angle Cross of the Sphinx',
  8: 'Right Angle Cross of Contagion',
  9: 'Right Angle Cross of Planning',
  10: 'Right Angle Cross of the Vessel of Love',
  11: 'Right Angle Cross of Eden',
  12: 'Right Angle Cross of Eden',
  13: 'Right Angle Cross of the Sphinx',
  14: 'Right Angle Cross of Contagion',
  15: 'Right Angle Cross of the Vessel of Love',
  16: 'Right Angle Cross of Planning',
  17: 'Right Angle Cross of Service',
  18: 'Right Angle Cross of Service',
  19: 'Right Angle Cross of the Four Ways',
  20: 'Right Angle Cross of the Sleeping Phoenix',
  21: 'Right Angle Cross of Tension',
  22: 'Right Angle Cross of Rulership',
  23: 'Right Angle Cross of Explanation',
  24: 'Right Angle Cross of the Four Ways',
  25: 'Right Angle Cross of the Vessel of Love',
  26: 'Right Angle Cross of Rulership',
  27: 'Right Angle Cross of the Unexpected',
  28: 'Right Angle Cross of the Unexpected',
  29: 'Right Angle Cross of Contagion',
  30: 'Right Angle Cross of Contagion',
  31: 'Right Angle Cross of the Unexpected',
  32: 'Right Angle Cross of Maya',
  33: 'Right Angle Cross of the Four Ways',
  34: 'Right Angle Cross of the Sleeping Phoenix',
  35: 'Right Angle Cross of Consciousness',
  36: 'Right Angle Cross of Eden',
  37: 'Right Angle Cross of Planning',
  38: 'Right Angle Cross of Tension',
  39: 'Right Angle Cross of Tension',
  40: 'Right Angle Cross of Planning',
  41: 'Right Angle Cross of the Unexpected',
  42: 'Right Angle Cross of Maya',
  43: 'Right Angle Cross of Explanation',
  44: 'Right Angle Cross of the Four Ways',
  45: 'Right Angle Cross of Rulership',
  46: 'Right Angle Cross of the Vessel of Love',
  47: 'Right Angle Cross of Rulership',
  48: 'Right Angle Cross of Tension',
  49: 'Right Angle Cross of Explanation',
  50: 'Right Angle Cross of Laws',
  51: 'Right Angle Cross of Penetration',
  52: 'Right Angle Cross of Service',
  53: 'Right Angle Cross of Penetration',
  54: 'Right Angle Cross of Penetration',
  55: 'Right Angle Cross of the Sleeping Phoenix',
  56: 'Right Angle Cross of Laws',
  57: 'Right Angle Cross of Penetration',
  58: 'Right Angle Cross of Service',
  59: 'Right Angle Cross of the Sleeping Phoenix',
  60: 'Right Angle Cross of Laws',
  61: 'Right Angle Cross of Maya',
  62: 'Right Angle Cross of Maya',
  63: 'Right Angle Cross of Consciousness',
  64: 'Right Angle Cross of Consciousness',
};

// --- Ephemeris Functions ---

/**
 * Get geocentric ecliptic longitude for a planet.
 */
function getGeoEclipticLon(body: string, date: Date): number {
  const vec = Astronomy.GeoVector(body as Astronomy.Body, date, true);
  const ecl = Astronomy.Ecliptic(vec);
  return ecl.elon;
}

/**
 * Calculate the mean longitude of the Moon's ascending node (North Node).
 */
function getMeanNorthNodeLon(date: Date): number {
  const jd = 2440587.5 + date.getTime() / 86400000; // Convert JS Date to JD
  const T = (jd - 2451545.0) / 36525; // Julian centuries from J2000.0
  let omega = 125.04452 - 1934.136261 * T
    + 0.0020708 * T * T
    + T * T * T / 450000;
  omega = ((omega % 360) + 360) % 360;
  return omega;
}

/**
 * Convert an ecliptic longitude to a Human Design gate and line.
 */
function longitudeToGate(lon: number): { gate: number; line: number } {
  lon = ((lon % 360) + 360) % 360;

  // Find which gate this longitude falls in
  for (let i = GATE_WHEEL.length - 1; i >= 0; i--) {
    if (lon >= GATE_WHEEL[i][1]) {
      const offset = lon - GATE_WHEEL[i][1];
      const line = Math.min(Math.floor(offset / 0.9375) + 1, 6);
      return { gate: GATE_WHEEL[i][0], line };
    }
  }

  // lon < 3.875 — falls in gate 25 (starts at 358.25°, wraps past 360°)
  const offset = lon + 360 - 358.25;
  const line = Math.min(Math.floor(offset / 0.9375) + 1, 6);
  return { gate: 25, line };
}

interface GateActivation {
  gate: number;
  line: number;
  body: string;
  longitude: number;
}

/**
 * Calculate all 13 planetary gate activations for a given moment.
 */
function calculateActivations(date: Date): GateActivation[] {
  const sunLon = getGeoEclipticLon('Sun', date);
  const earthLon = (sunLon + 180) % 360;
  const moonLon = getGeoEclipticLon('Moon', date);
  const northNodeLon = getMeanNorthNodeLon(date);
  const southNodeLon = (northNodeLon + 180) % 360;
  const mercuryLon = getGeoEclipticLon('Mercury', date);
  const venusLon = getGeoEclipticLon('Venus', date);
  const marsLon = getGeoEclipticLon('Mars', date);
  const jupiterLon = getGeoEclipticLon('Jupiter', date);
  const saturnLon = getGeoEclipticLon('Saturn', date);
  const uranusLon = getGeoEclipticLon('Uranus', date);
  const neptuneLon = getGeoEclipticLon('Neptune', date);
  const plutoLon = getGeoEclipticLon('Pluto', date);

  const bodies: [string, number][] = [
    ['Sun', sunLon],
    ['Earth', earthLon],
    ['North Node', northNodeLon],
    ['South Node', southNodeLon],
    ['Moon', moonLon],
    ['Mercury', mercuryLon],
    ['Venus', venusLon],
    ['Mars', marsLon],
    ['Jupiter', jupiterLon],
    ['Saturn', saturnLon],
    ['Uranus', uranusLon],
    ['Neptune', neptuneLon],
    ['Pluto', plutoLon],
  ];

  return bodies.map(([body, lon]) => {
    const { gate, line } = longitudeToGate(lon);
    return { gate, line, body, longitude: lon };
  });
}

/**
 * Find the Design date: when the Sun was 88° before the birth Sun position.
 * Uses binary search for precision.
 */
function findDesignDate(birthDate: Date, birthSunLon: number): Date {
  const targetLon = ((birthSunLon - 88) % 360 + 360) % 360;

  // Start searching ~93 days before birth (Sun moves ~1°/day, 88° ≈ 88 days)
  let lowMs = birthDate.getTime() - 95 * 86400000;
  let highMs = birthDate.getTime() - 80 * 86400000;

  // Binary search to find when Sun longitude matches target
  for (let i = 0; i < 50; i++) {
    const midMs = (lowMs + highMs) / 2;
    const midDate = new Date(midMs);
    const midSunLon = getGeoEclipticLon('Sun', midDate);

    // Calculate angular difference (handling wraparound)
    let diff = midSunLon - targetLon;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    if (Math.abs(diff) < 0.001) {
      return midDate; // Close enough (~3.6 arcseconds)
    }

    // Sun moves forward in longitude over time, so if mid is past target, go earlier
    if (diff > 0) {
      highMs = midMs;
    } else {
      lowMs = midMs;
    }
  }

  return new Date((lowMs + highMs) / 2);
}

// --- Downstream Logic (unchanged) ---

function getDefinedCentersFromChannels(
  activeChannels: [number, number, string, string, string][]
): Set<string> {
  const defined = new Set<string>();
  for (const [, , centerA, centerB] of activeChannels) {
    defined.add(centerA);
    defined.add(centerB);
  }
  return defined;
}

function hasMotorToThroat(
  activeChannels: [number, number, string, string, string][],
  definedCenters: Set<string>
): boolean {
  const adj: Record<string, Set<string>> = {};
  for (const [, , centerA, centerB] of activeChannels) {
    if (!adj[centerA]) adj[centerA] = new Set();
    if (!adj[centerB]) adj[centerB] = new Set();
    adj[centerA].add(centerB);
    adj[centerB].add(centerA);
  }

  for (const motor of MOTOR_CENTERS) {
    if (!definedCenters.has(motor)) continue;
    const visited = new Set<string>();
    const queue = [motor];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (current === 'Throat') return true;
      if (visited.has(current)) continue;
      visited.add(current);
      const neighbors = adj[current];
      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
  }
  return false;
}

function determineType(
  definedCenters: Set<string>,
  activeChannels: [number, number, string, string, string][]
): HumanDesignProfile['type'] {
  if (definedCenters.size === 0) {
    return 'Reflector';
  }

  const sacralDefined = definedCenters.has('Sacral');
  const motorToThroat = hasMotorToThroat(activeChannels, definedCenters);

  if (sacralDefined && motorToThroat) {
    return 'Manifesting Generator';
  }
  if (sacralDefined) {
    return 'Generator';
  }
  if (motorToThroat) {
    return 'Manifestor';
  }
  return 'Projector';
}

function getStrategy(type: HumanDesignProfile['type']): string {
  switch (type) {
    case 'Manifestor':
      return 'To Inform';
    case 'Generator':
      return 'To Respond';
    case 'Manifesting Generator':
      return 'To Respond';
    case 'Projector':
      return 'Wait for the Invitation';
    case 'Reflector':
      return 'Wait a Lunar Cycle';
  }
}

function getAuthority(definedCenters: Set<string>): string {
  if (definedCenters.has('Solar Plexus')) return 'Emotional Authority';
  if (definedCenters.has('Sacral')) return 'Sacral Authority';
  if (definedCenters.has('Spleen')) return 'Splenic Authority';
  if (definedCenters.has('Heart')) return 'Ego Authority';
  if (definedCenters.has('G')) return 'Self-Projected Authority';
  return 'Mental/None Authority';
}

// --- Main Calculation ---

/**
 * Calculate a Human Design chart from birth data.
 * @param dateStr - Birth date in YYYY-MM-DD format
 * @param timeStr - Birth time in HH:MM format (local time)
 * @param lng - Birth location longitude (used to approximate UTC offset)
 */
export function calculateHumanDesign(
  dateStr: string,
  timeStr: string,
  lng?: number
): HumanDesignProfile {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);

  // Convert local birth time to approximate UTC using longitude
  // Each 15° of longitude ≈ 1 hour offset from UTC
  const tzOffsetHours = lng != null ? Math.round(lng / 15) : 0;
  const birthDate = new Date(Date.UTC(year, month - 1, day, hours - tzOffsetHours, minutes));

  // Calculate Personality activations (birth moment)
  const personalityActivations = calculateActivations(birthDate);
  const personalityGates = personalityActivations.map((a) => a.gate);

  // Calculate Design date (when Sun was 88° before birth Sun position)
  const birthSunLon = personalityActivations[0].longitude;
  const designDate = findDesignDate(birthDate, birthSunLon);

  // Calculate Design activations
  const designActivations = calculateActivations(designDate);
  const designGates = designActivations.map((a) => a.gate);

  // Combine all active gates
  const allGates = new Set([...personalityGates, ...designGates]);

  // Determine which channels are activated
  const activeChannels: [number, number, string, string, string][] = [];
  for (const channel of CHANNEL_DEFINITIONS) {
    const [gateA, gateB] = channel;
    if (allGates.has(gateA) && allGates.has(gateB)) {
      activeChannels.push(channel);
    }
  }

  // Determine defined centers from channels
  const definedCenters = getDefinedCentersFromChannels(activeChannels);

  // Build channel strings
  const channels = activeChannels.map(
    ([gateA, gateB, , , name]) => `${gateA}-${gateB} (${name})`
  );

  // Determine type
  const type = determineType(definedCenters, activeChannels);

  // Build centers array
  const centers: HumanDesignCenter[] = ALL_CENTERS.map((name) => ({
    name,
    defined: definedCenters.has(name),
    color: CENTER_COLORS[name],
  }));

  const definedList = ALL_CENTERS.filter((c) => definedCenters.has(c));
  const undefinedList = ALL_CENTERS.filter((c) => !definedCenters.has(c));

  // Calculate strategy and authority
  const strategy = getStrategy(type);
  const authority = getAuthority(definedCenters);

  // Profile: line of Personality Sun / line of Design Sun
  const personalitySunLine = personalityActivations[0].line;
  const designSunLine = designActivations[0].line;
  const profile = `${personalitySunLine}/${designSunLine}`;
  const profileName = `${PROFILE_LINE_NAMES[personalitySunLine] || personalitySunLine}/${PROFILE_LINE_NAMES[designSunLine] || designSunLine}`;

  // Incarnation Cross: based on Personality Sun gate
  const personalitySunGate = personalityActivations[0].gate;
  const personalityEarthGate = personalityActivations[1].gate;
  const designSunGate = designActivations[0].gate;
  const designEarthGate = designActivations[1].gate;

  const crossName = INCARNATION_CROSS_BY_GATE[personalitySunGate] || 'Right Angle Cross of the Sphinx';
  const incarnationCross = `${crossName} (${personalitySunGate}/${personalityEarthGate} | ${designSunGate}/${designEarthGate})`;

  return {
    type,
    strategy,
    authority,
    profile,
    profileName,
    definedCenters: definedList,
    undefinedCenters: undefinedList,
    centers,
    designGates,
    personalityGates,
    channels,
    incarnationCross,
  };
}
