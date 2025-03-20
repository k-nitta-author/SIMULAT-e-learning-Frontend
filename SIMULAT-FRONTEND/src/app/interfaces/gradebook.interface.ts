export interface ScoreItem {
    score: number;
    submission_date: string;
    title: string;
}

export interface AssignmentScore extends ScoreItem {
    assignment_id: number;
}

export interface QuizScore extends ScoreItem {
    quiz_id: number;
}

export interface ChallengeScore extends ScoreItem {
    challenge_id: number;
}

export interface ScoresResponse {
    assignment_scores: AssignmentScore[];
    quiz_scores: QuizScore[];
    challenge_scores: ChallengeScore[];
}

export interface GradebookEntry {
    studentId: number;
    studentName: string;
    scores: {
        assignments: AssignmentScore[];
        quizzes: QuizScore[];
        challenges: ChallengeScore[];
    };
    totalScore: number;
    averageScore: number;
    progress_score: number;
}

