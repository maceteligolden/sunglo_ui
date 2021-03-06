import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProjectResponse } from 'src/app/models/Projects/IProject';
import { api_home_url } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  api_url: string = `${api_home_url}/projects`

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getAllProject(): Observable<IProjectResponse> {
    return this.http.get<IProjectResponse>(`${this.api_url}`).pipe()
  }

  getProject(id: string): Observable<any> {
    return this.http.get<any>(`${this.api_url}/${id}`).pipe();
  }

  
}
