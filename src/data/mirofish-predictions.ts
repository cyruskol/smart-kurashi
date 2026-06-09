export interface MirofishPrediction {
  match: number;
  date: string;
  teamA: string;
  teamB: string;
  score: string;
  result: string;
  confidence: number;
}

export const mirofishPredictions: MirofishPrediction[] = [
  // Group A
  { match: 1, date: "Jun 11", teamA: "Mexico", teamB: "South Africa", score: "2-0", result: "A Win", confidence: 70 },
  { match: 2, date: "Jun 11", teamA: "South Korea", teamB: "Czech Republic", score: "1-2", result: "B Win", confidence: 65 },
  { match: 25, date: "Jun 18", teamA: "Czech Republic", teamB: "South Africa", score: "2-0", result: "A Win", confidence: 60 },
  { match: 28, date: "Jun 18", teamA: "Mexico", teamB: "South Korea", score: "2-1", result: "A Win", confidence: 68 },
  { match: 53, date: "Jun 24", teamA: "Czech Republic", teamB: "Mexico", score: "1-1", result: "Draw", confidence: 55 },
  { match: 54, date: "Jun 24", teamA: "South Africa", teamB: "South Korea", score: "1-1", result: "Draw", confidence: 50 },

  // Group B
  { match: 3, date: "Jun 12", teamA: "Canada", teamB: "Bosnia and Herzegovina", score: "2-0", result: "A Win", confidence: 65 },
  { match: 8, date: "Jun 13", teamA: "Qatar", teamB: "Switzerland", score: "0-2", result: "B Win", confidence: 70 },
  { match: 26, date: "Jun 18", teamA: "Switzerland", teamB: "Bosnia and Herzegovina", score: "2-0", result: "A Win", confidence: 68 },
  { match: 27, date: "Jun 18", teamA: "Canada", teamB: "Qatar", score: "3-0", result: "A Win", confidence: 75 },
  { match: 51, date: "Jun 24", teamA: "Switzerland", teamB: "Canada", score: "1-1", result: "Draw", confidence: 55 },
  { match: 52, date: "Jun 24", teamA: "Bosnia and Herzegovina", teamB: "Qatar", score: "1-0", result: "A Win", confidence: 50 },

  // Group C
  { match: 5, date: "Jun 13", teamA: "Haiti", teamB: "Scotland", score: "0-2", result: "B Win", confidence: 68 },
  { match: 7, date: "Jun 13", teamA: "Brazil", teamB: "Morocco", score: "2-1", result: "A Win", confidence: 60 },
  { match: 29, date: "Jun 19", teamA: "Brazil", teamB: "Haiti", score: "4-0", result: "A Win", confidence: 82 },
  { match: 30, date: "Jun 19", teamA: "Scotland", teamB: "Morocco", score: "1-1", result: "Draw", confidence: 55 },
  { match: 49, date: "Jun 24", teamA: "Scotland", teamB: "Brazil", score: "0-3", result: "B Win", confidence: 78 },
  { match: 50, date: "Jun 24", teamA: "Morocco", teamB: "Haiti", score: "3-0", result: "A Win", confidence: 75 },

  // Group D
  { match: 4, date: "Jun 12", teamA: "United States", teamB: "Paraguay", score: "2-0", result: "A Win", confidence: 68 },
  { match: 6, date: "Jun 13", teamA: "Australia", teamB: "Turkey", score: "1-2", result: "B Win", confidence: 65 },
  { match: 31, date: "Jun 19", teamA: "Turkey", teamB: "Paraguay", score: "2-0", result: "A Win", confidence: 70 },
  { match: 32, date: "Jun 19", teamA: "United States", teamB: "Australia", score: "3-0", result: "A Win", confidence: 75 },
  { match: 59, date: "Jun 25", teamA: "Turkey", teamB: "United States", score: "1-2", result: "B Win", confidence: 55 },
  { match: 60, date: "Jun 25", teamA: "Paraguay", teamB: "Australia", score: "1-1", result: "Draw", confidence: 50 },

  // Group E
  { match: 9, date: "Jun 14", teamA: "Ivory Coast", teamB: "Ecuador", score: "2-1", result: "A Win", confidence: 60 },
  { match: 10, date: "Jun 14", teamA: "Germany", teamB: "Curaçao", score: "5-0", result: "A Win", confidence: 85 },
  { match: 33, date: "Jun 20", teamA: "Germany", teamB: "Ivory Coast", score: "3-1", result: "A Win", confidence: 72 },
  { match: 34, date: "Jun 20", teamA: "Ecuador", teamB: "Curaçao", score: "3-0", result: "A Win", confidence: 78 },
  { match: 55, date: "Jun 25", teamA: "Curaçao", teamB: "Ivory Coast", score: "0-3", result: "B Win", confidence: 80 },
  { match: 56, date: "Jun 25", teamA: "Ecuador", teamB: "Germany", score: "0-2", result: "B Win", confidence: 70 },

  // Group F
  { match: 11, date: "Jun 14", teamA: "Netherlands", teamB: "Japan", score: "2-0", result: "A Win", confidence: 68 },
  { match: 12, date: "Jun 14", teamA: "Sweden", teamB: "Tunisia", score: "1-0", result: "A Win", confidence: 55 },
  { match: 35, date: "Jun 20", teamA: "Netherlands", teamB: "Sweden", score: "2-1", result: "A Win", confidence: 65 },
  { match: 36, date: "Jun 20", teamA: "Tunisia", teamB: "Japan", score: "1-1", result: "Draw", confidence: 55 },
  { match: 57, date: "Jun 25", teamA: "Japan", teamB: "Sweden", score: "1-2", result: "B Win", confidence: 55 },
  { match: 58, date: "Jun 25", teamA: "Tunisia", teamB: "Netherlands", score: "0-2", result: "B Win", confidence: 72 },

  // Group G
  { match: 15, date: "Jun 15", teamA: "Iran", teamB: "New Zealand", score: "1-0", result: "A Win", confidence: 55 },
  { match: 16, date: "Jun 15", teamA: "Belgium", teamB: "Egypt", score: "2-0", result: "A Win", confidence: 70 },
  { match: 39, date: "Jun 21", teamA: "Belgium", teamB: "Iran", score: "3-0", result: "A Win", confidence: 75 },
  { match: 40, date: "Jun 21", teamA: "New Zealand", teamB: "Egypt", score: "0-2", result: "B Win", confidence: 68 },
  { match: 63, date: "Jun 26", teamA: "Egypt", teamB: "Iran", score: "1-0", result: "A Win", confidence: 55 },
  { match: 64, date: "Jun 26", teamA: "New Zealand", teamB: "Belgium", score: "0-4", result: "B Win", confidence: 82 },

  // Group H
  { match: 13, date: "Jun 15", teamA: "Saudi Arabia", teamB: "Uruguay", score: "0-2", result: "B Win", confidence: 72 },
  { match: 14, date: "Jun 15", teamA: "Spain", teamB: "Cape Verde", score: "3-0", result: "A Win", confidence: 78 },
  { match: 37, date: "Jun 21", teamA: "Uruguay", teamB: "Cape Verde", score: "3-0", result: "A Win", confidence: 80 },
  { match: 38, date: "Jun 21", teamA: "Spain", teamB: "Saudi Arabia", score: "3-0", result: "A Win", confidence: 75 },
  { match: 65, date: "Jun 26", teamA: "Cape Verde", teamB: "Saudi Arabia", score: "0-1", result: "B Win", confidence: 50 },
  { match: 66, date: "Jun 26", teamA: "Uruguay", teamB: "Spain", score: "1-1", result: "Draw", confidence: 55 },

  // Group I
  { match: 17, date: "Jun 16", teamA: "France", teamB: "Senegal", score: "2-1", result: "A Win", confidence: 60 },
  { match: 18, date: "Jun 16", teamA: "Iraq", teamB: "Norway", score: "0-2", result: "B Win", confidence: 70 },
  { match: 41, date: "Jun 22", teamA: "Norway", teamB: "Senegal", score: "1-1", result: "Draw", confidence: 55 },
  { match: 42, date: "Jun 22", teamA: "France", teamB: "Iraq", score: "3-0", result: "A Win", confidence: 78 },
  { match: 61, date: "Jun 26", teamA: "Norway", teamB: "France", score: "0-2", result: "B Win", confidence: 72 },
  { match: 62, date: "Jun 26", teamA: "Senegal", teamB: "Iraq", score: "2-0", result: "A Win", confidence: 68 },

  // Group J
  { match: 19, date: "Jun 16", teamA: "Argentina", teamB: "Algeria", score: "2-0", result: "A Win", confidence: 72 },
  { match: 20, date: "Jun 16", teamA: "Austria", teamB: "Jordan", score: "2-0", result: "A Win", confidence: 65 },
  { match: 43, date: "Jun 22", teamA: "Argentina", teamB: "Austria", score: "2-1", result: "A Win", confidence: 65 },
  { match: 44, date: "Jun 22", teamA: "Jordan", teamB: "Algeria", score: "0-2", result: "B Win", confidence: 68 },
  { match: 69, date: "Jun 27", teamA: "Algeria", teamB: "Austria", score: "1-1", result: "Draw", confidence: 55 },
  { match: 70, date: "Jun 27", teamA: "Jordan", teamB: "Argentina", score: "0-3", result: "B Win", confidence: 80 },

  // Group K
  { match: 23, date: "Jun 17", teamA: "Portugal", teamB: "DR Congo", score: "3-0", result: "A Win", confidence: 75 },
  { match: 24, date: "Jun 17", teamA: "Uzbekistan", teamB: "Colombia", score: "0-2", result: "B Win", confidence: 70 },
  { match: 47, date: "Jun 23", teamA: "Portugal", teamB: "Uzbekistan", score: "3-0", result: "A Win", confidence: 78 },
  { match: 48, date: "Jun 23", teamA: "Colombia", teamB: "DR Congo", score: "2-0", result: "A Win", confidence: 68 },
  { match: 71, date: "Jun 27", teamA: "Colombia", teamB: "Portugal", score: "1-2", result: "B Win", confidence: 55 },
  { match: 72, date: "Jun 27", teamA: "DR Congo", teamB: "Uzbekistan", score: "1-0", result: "A Win", confidence: 50 },

  // Group L
  { match: 21, date: "Jun 17", teamA: "Ghana", teamB: "Panama", score: "2-0", result: "A Win", confidence: 65 },
  { match: 22, date: "Jun 17", teamA: "England", teamB: "Croatia", score: "2-1", result: "A Win", confidence: 60 },
  { match: 45, date: "Jun 23", teamA: "England", teamB: "Ghana", score: "3-0", result: "A Win", confidence: 75 },
  { match: 46, date: "Jun 23", teamA: "Panama", teamB: "Croatia", score: "0-2", result: "B Win", confidence: 70 },
  { match: 67, date: "Jun 27", teamA: "Panama", teamB: "England", score: "0-4", result: "B Win", confidence: 82 },
  { match: 68, date: "Jun 27", teamA: "Croatia", teamB: "Ghana", score: "2-1", result: "A Win", confidence: 60 },
];
