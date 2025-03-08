export interface Course {
  course_code: string;
  course_name: string;
  created_at: string;
  description: string;
  id: number;
  instructor: string;
  instructor_id: number;
  is_published: boolean;
  term: number;
  updated_at: string;
  content_list: { id: number; title: string; url: string }[];
  enrollments: { course_id: number; enroll_date: string; user_id: number }[];
  study_groups: any[];
}

