interface ActivityScore {
  score: number;
  submission_date: string;
}

interface AssignmentScore extends ActivityScore {
  assignment_id: number;
}

interface ChallengeScore extends ActivityScore {
  challenge_id: number;
}

interface QuizScore extends ActivityScore {
  quiz_id: number;
}

interface CourseScores {
  assignments: AssignmentScore[];
  challenges: ChallengeScore[];
  quizzes: QuizScore[];
}

export interface EnrolledCourse {
  completion_percentage: number;
  course_code: string;
  course_name: string;
  description: string;
  id: number;
  instructor_id: number;
  is_published: boolean;
  scores: CourseScores;
  term_id: number;
}
