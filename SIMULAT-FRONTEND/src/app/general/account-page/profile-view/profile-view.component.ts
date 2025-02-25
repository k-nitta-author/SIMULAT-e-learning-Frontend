import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Student from '../../interfaces/student';


@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {

  constructor(private http: HttpClient) {
    this.loadProfile();
  }

  username: string = '';
  givenName: string = '';
  middleName: string = '';
  surname: string = '';
  Gender: string = '';
  email: string = '';


  loadProfile() {
    const url = 'https://simulat-e-learning-backend.onrender.com/user/' + localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    this.http.get<Student>(url, { headers: { 'Authorization': 'Bearer ' + token } }).subscribe(
      res => {
        console.log('Profile loaded', res);

        this.username = res.username;
        this.givenName = res.name_given;
        this.middleName = '';
        this.Gender = res.gender;
        this.email = res.email;
        this.surname = res.name_last

      },
      err => console.error('Profile load error', err)
    );
  }
}
