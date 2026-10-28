export const MIKE_TOURS = [
  "Catacombs",
  "Catacombs Express",
  "Catacombs PVT",
  "CatCOMBO (Divan/Mike Combo Tour)", 
  "Hidden Rome",
  "Hidden Rome PVT",
  "Bones Express",
  "Ostia Antica", 
  "Ostia PVT",
  "Must See Roman Landmarks",
  "Must See Roman Landmarks PVT",
  "Ghost Tour Pvt",
  "Eat Like the Romans Food Tour",
  "Eat Like the Romans Food Tour PVT"
] as const;

export type MikeTourName = typeof MIKE_TOURS[number];

export const PVT_TOURS_STANDARD = [
  "Ostia PVT",
  "Catacombs PVT",
  "Hidden Rome PVT",
  "Must See Roman Landmarks PVT",
  "Eat Like the Romans Food Tour PVT"
];

export interface MikeTourRow {
  id: string;
  guideId: string;
  month: string;
  date: string;
  tour: string;
  paired: 'Yes' | 'No' | '';
  pax: number;
  baseFee: number;
  perAddlPax: number;
  taxiFee: number;
  additionalExpenses: number;
  collected: number;
  feeToBePaid: number;
  notes?: string;
}

export interface MikeGuideAccount {
  id: string;
  username: string;
  displayName: string;
  role: 'admin' | 'guide';
}

export function isExpressTour(tour: string): boolean {
  return tour === "Bones Express" || tour === "Catacombs Express";
}

export function isHiddenRome(tour: string): boolean {
  return tour === "Hidden Rome" || tour === "Hidden Rome PVT";
}

export function calculateBaseFee(tour: string, paired: string): number {
  if (!tour) return 0;
  const t = tour.trim();
  const isPaired = String(paired).trim().toLowerCase() === "yes";

  if (t === "Catacombs" || t === "Hidden Rome") {
    return 45;
  }
  if (isExpressTour(t)) {
    return isPaired ? 0 : 35;
  }
  if (t === "Ostia Antica") {
    return 55;
  }
  if (PVT_TOURS_STANDARD.includes(t)) {
    return 125;
  }
  if (t === "Ghost Tour Pvt") {
    return 190;
  }
  if (t === "CatCOMBO (Divan/Mike Combo Tour)") {
    return 22.5;
  }
  if (t === "Must See Roman Landmarks" || t === "Eat Like the Romans Food Tour") {
    return 40;
  }
  return 0;
}

export function calculatePerAddlPax(tour: string): number {
  if (!tour) return 0;
  const t = tour.trim();

  if (
    t === "Catacombs" ||
    t === "Hidden Rome" ||
    t === "CatCOMBO (Divan/Mike Combo Tour)" ||
    t === "Must See Roman Landmarks" ||
    t === "Eat Like the Romans Food Tour"
  ) {
    return 10;
  }
  if (isExpressTour(t)) {
    return 5;
  }
  return 0;
}

export function getDefaultTaxiFee(tour: string): number {
  if (!tour) return 0;
  const t = tour.trim();
  if (isHiddenRome(t)) {
    return 3;
  }
  return 0;
}

export function calculateFeeToBePaid(params: {
  tour: string;
  pax?: number;
  paired?: string;
  taxiFee?: number;
  additionalExpenses?: number;
  collected?: number;
}): number {
  const { tour, pax = 0, paired = "No", taxiFee = 0, additionalExpenses = 0, collected = 0 } = params;
  if (!tour) return 0;
  const t = tour.trim();
  const numPax = Math.max(0, Number(pax) || 0);
  const isPaired = String(paired).trim().toLowerCase() === "yes";
  const numTaxi = Number(taxiFee) || 0;
  const numAddl = Number(additionalExpenses) || 0;
  const numCollected = Number(collected) || 0;

  let tourFee = 0;

  if (isExpressTour(t)) {
    if (isPaired) {
      tourFee = (numPax * 5) + numAddl + numTaxi;
    } else {
      tourFee = 35 + Math.max(0, numPax - 2) * 5 + numAddl + numTaxi;
    }
  } else if (t === "CatCOMBO (Divan/Mike Combo Tour)") {
    const base = 22.5;
    const perPax = 10;
    tourFee = base + (numPax * perPax) + numAddl + numTaxi;
  } else if (PVT_TOURS_STANDARD.includes(t)) {
    tourFee = 125 + numAddl + numTaxi;
  } else if (t === "Ghost Tour Pvt") {
    tourFee = 190 + numAddl + numTaxi;
  } else if (t === "Must See Roman Landmarks" || t === "Eat Like the Romans Food Tour") {
    tourFee = 40 + Math.max(0, numPax - 2) * 10 + numAddl + numTaxi;
  } else {
    // Default (e.g. Catacombs, Hidden Rome, Ostia Antica)
    const base = calculateBaseFee(t, paired);
    const per = calculatePerAddlPax(t);
    tourFee = base + Math.max(0, numPax - 2) * per + numAddl + numTaxi;
  }

  const feeToBePaid = tourFee - numCollected;
  return Number(feeToBePaid.toFixed(2));
}

export function processTourRow(row: Partial<MikeTourRow>): MikeTourRow {
  const tour = row.tour || "Catacombs";
  const paired = isExpressTour(tour) ? (row.paired || "No") : "";
  const baseFee = calculateBaseFee(tour, paired);
  const perAddlPax = calculatePerAddlPax(tour);
  
  let taxiFee = 0;
  if (isHiddenRome(tour)) {
    taxiFee = row.taxiFee !== undefined && row.taxiFee !== null ? Number(row.taxiFee) : 3;
  } else {
    taxiFee = 0;
  }

  const pax = Number(row.pax) || 0;
  const additionalExpenses = Number(row.additionalExpenses) || 0;
  const collected = Number(row.collected) || 0;

  const feeToBePaid = calculateFeeToBePaid({
    tour,
    pax,
    paired,
    taxiFee,
    additionalExpenses,
    collected
  });

  return {
    id: row.id || `tr-${Date.now()}-${Math.random()}`,
    guideId: row.guideId || "usr_alain_piredda",
    month: row.month || "2026-10",
    date: row.date || new Date().toISOString().slice(0, 10),
    tour,
    paired: paired as any,
    pax,
    baseFee,
    perAddlPax,
    taxiFee,
    additionalExpenses,
    collected,
    feeToBePaid,
    notes: row.notes || ""
  };
}

export const MIKE_GUIDES: MikeGuideAccount[] = [
  { id: "usr_mike", username: "Mighty Mike", displayName: "Mighty Mike (The Boss)", role: "admin" },
  { id: "usr_alain_piredda", username: "Alain Piredda", displayName: "Alain Piredda", role: "guide" },
  { id: "usr_amanda_karr", username: "Amanda Karr", displayName: "Amanda Karr", role: "guide" },
  { id: "usr_angela_militello", username: "Angela Militello", displayName: "Angela Militello", role: "guide" },
  { id: "usr_divan_hattingh", username: "Divan Hattingh", displayName: "Divan Hattingh", role: "guide" },
  { id: "usr_heather_newton", username: "Heather Newton", displayName: "Heather Newton", role: "guide" },
  { id: "usr_inti_d_ayala", username: "Inti D'ayala", displayName: "Inti D'ayala", role: "guide" },
  { id: "usr_janelle_jimenez", username: "Janelle Jimenez", displayName: "Janelle Jimenez", role: "guide" },
  { id: "usr_jon_balog", username: "Jon Balog", displayName: "Jon Balog", role: "guide" },
  { id: "usr_laura_tomei", username: "Laura Tomei", displayName: "Laura Tomei", role: "guide" },
  { id: "usr_mariii", username: "Mariii", displayName: "Mariii", role: "guide" },
  { id: "usr_peter_mulroy", username: "Peter Mulroy", displayName: "Peter Mulroy", role: "guide" },
  { id: "usr_alessandra_baldoni", username: "Alessandra Baldoni", displayName: "Alessandra Baldoni", role: "guide" }
];

export const INITIAL_CALCULATOR_ROWS: MikeTourRow[] = [
  processTourRow({
    id: "tr_1",
    guideId: "usr_alain_piredda",
    month: "2026-10",
    date: "2026-10-05",
    tour: "Catacombs",
    pax: 6,
    additionalExpenses: 0,
    collected: 0,
    notes: "Morning tour, fantastic group from California"
  }),
  processTourRow({
    id: "tr_2",
    guideId: "usr_alain_piredda",
    month: "2026-10",
    date: "2026-10-12",
    tour: "Eat Like the Romans Food Tour",
    pax: 4,
    additionalExpenses: 5,
    collected: 0,
    notes: "Extra tastings at Roscioli Bakery"
  }),
  processTourRow({
    id: "tr_3",
    guideId: "usr_alain_piredda",
    month: "2026-10",
    date: "2026-10-18",
    tour: "Bones Express",
    paired: "Yes",
    pax: 8,
    collected: 40,
    notes: "Paired with Catacombs Express, €40 cash deposit collected"
  }),
  processTourRow({
    id: "tr_4",
    guideId: "usr_alain_piredda",
    month: "2026-10",
    date: "2026-10-22",
    tour: "Hidden Rome",
    pax: 5,
    taxiFee: 3,
    additionalExpenses: 0,
    collected: 0,
    notes: "Taxi reimbursement included"
  }),
  processTourRow({
    id: "tr_5",
    guideId: "usr_alain_piredda",
    month: "2026-10",
    date: "2026-10-25",
    tour: "Ostia Antica",
    pax: 5,
    additionalExpenses: 15,
    collected: 10,
    notes: "Train tickets & refreshments"
  }),
  processTourRow({
    id: "tr_6",
    guideId: "usr_amanda_karr",
    month: "2026-10",
    date: "2026-10-08",
    tour: "Must See Roman Landmarks",
    pax: 7,
    additionalExpenses: 0,
    collected: 0,
    notes: "Sunset tour across Pantheon and Piazza Navona"
  }),
  processTourRow({
    id: "tr_7",
    guideId: "usr_amanda_karr",
    month: "2026-10",
    date: "2026-10-14",
    tour: "Catacombs PVT",
    pax: 2,
    additionalExpenses: 10,
    collected: 0,
    notes: "VIP Private Vatican/Catacombs transfer"
  }),
  processTourRow({
    id: "tr_8",
    guideId: "usr_divan_hattingh",
    month: "2026-10",
    date: "2026-10-09",
    tour: "CatCOMBO (Divan/Mike Combo Tour)",
    pax: 10,
    additionalExpenses: 0,
    collected: 0,
    notes: "Mega combo group tour"
  }),
  processTourRow({
    id: "tr_9",
    guideId: "usr_divan_hattingh",
    month: "2026-10",
    date: "2026-10-20",
    tour: "Ghost Tour Pvt",
    pax: 4,
    additionalExpenses: 0,
    collected: 0,
    notes: "Private evening folklore walk"
  })
];
