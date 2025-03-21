import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TopStudent {
  id: string;
  name_given: string;
  name_last: string;
  progress_score: number;
}

@Injectable({
  providedIn: 'root'
})
export class RankingsService {

  private apiUrl = 'https://simulat-e-learning-backend.onrender.com/user/top-students';

  constructor(private http: HttpClient) { }

  getTopStudents(): Observable<TopStudent[]> {
    return this.http.get<TopStudent[]>(this.apiUrl);
  }
}

