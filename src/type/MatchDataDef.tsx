export interface Score {
    currentScore: number;
    maxScore: number;
}

export interface AreaScore {
    [areaName: string] : Score
}

export interface RoundReport {
    index: number;
    areas: AreaScore;
}

export interface MatchData {
    matchName: string;
    leftTeam: string;
    rightTeam: string;
    rounds: RoundReport[];
    areas: string[];
}

