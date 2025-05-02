export interface CourseScores {
  assignments: number;
  challenges: number;
  quizzes: number;
}

export interface CourseProgress {
  completion_percentage: number;
  course_code: string;
  course_id: number;
  course_name: string;
  max_possible: number;
  scores: CourseScores;
  total_score: number;
}
