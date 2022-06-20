import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";




@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient,private snackBar:MatSnackBar) { }
  postUser(data : any){
    this.snackBar.open('User Added Successfully','Ok',{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition:'top',

    });
    return this.http.post<any>("http://localhost:3000/userList/",data);
  }
  getUser(){

    return this.http.get<any>("http://localhost:3000/userList/");
  }
  putUser(data:any,id : number){
    this.snackBar.open('User updated Successfully','Ok',{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition:'top',

    });

    return this.http.put<any>("http://localhost:3000/userList/"+id ,data)
  }
  deleteUser(id:number){


    this.snackBar.open('User deleted Successfully','Ok',{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition:'top',

    });
      return this.http.delete<any>("http://localhost:3000/userList/" + id);

  }
}



