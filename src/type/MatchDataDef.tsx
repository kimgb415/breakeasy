export interface AreaScore {
    areaName: string;
    currentScore: number;
    maxScore: number;
}

export interface RoundReport {
    index: number;
    areas: AreaScore[];
}

export interface MatchData {
    matchName: string;
    leftTeam: string;
    rightTeam: string;
    rounds: RoundReport[];
    areas: string[];
}

