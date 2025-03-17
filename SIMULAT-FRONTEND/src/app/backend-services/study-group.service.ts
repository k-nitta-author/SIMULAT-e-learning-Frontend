import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudyGroupMembership {
  student_id: number;
  study_group_id: number;
  join_date: Date;
  is_leader: boolean;

}

export interface StudyGroup {
  id: number;
  name: string;
  course_id: number;
  max_members: number;
  courses: [];
  memberships: StudyGroupMembership[];
}

export interface JoinGroupRequest {
  student_id: number;
  is_leader: boolean;
}

export interface JoinGroupResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudyGroupService {

  private apiUrl = 'https://simulat-e-learning-backend.onrender.com/studygroup';

  constructor(private http: HttpClient) { }

  getStudyGroups(): Observable<StudyGroup[]> {
    return this.http.get<StudyGroup[]>(this.apiUrl);
  }

  getStudyGroupById(id: number): Observable<StudyGroup> {
    return this.http.get<StudyGroup>(`${this.apiUrl}/${id}`);
  }

  createStudyGroup(data: StudyGroup): Observable<StudyGroup> {
    return this.http.post<StudyGroup>(this.apiUrl, data);
  }

  deleteStudyGroup(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateStudyGroup(id: number, data: StudyGroup): Observable<StudyGroup> {
    return this.http.put<StudyGroup>(`${this.apiUrl}/${id}`, data);
  }

  joinStudyGroup(id: number, data: JoinGroupRequest): Observable<JoinGroupResponse> {
    return this.http.post<JoinGroupResponse>(`${this.apiUrl}/${id}/join`, data);
  }

}

