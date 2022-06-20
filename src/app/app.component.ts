import {Component, OnInit,ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from "./services/api.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditDeleteComponent} from "./edit-delete/edit-delete.component";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'third-app';
  displayedColumns: string[] = ['name', 'phoneNumber', 'gender', 'religion', 'category', 'caste', 'state', 'pinCode', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog,private api : ApiService,private _snackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
       width:'50%',

    }).afterClosed().subscribe(val => {
      if(val ==='save'){
        this.getAllUsers();
      }
    })
  }
  getAllUsers(){
this.api.getUser()
  .subscribe({
    next:(res)=>{
     this.dataSource = new MatTableDataSource(res);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort
    },
    error:(err)=>{
    alert("Error while fetching the Records!!")
    }
  })
  }
  editUser(row : any){
  const dialogRef= this.dialog.open(EditDeleteComponent, {data: {name: 'Are you want to edit?'}})
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        const dialogRef=  this.dialog.open(DialogComponent,{
          width:'50%',
          data:row
        }).afterClosed().subscribe(val=>{
          if(val ==='update'){
            this.getAllUsers();
          }
        })

      }
    })
  }
  // editUser(row : any){
  //   const dialogRef= this.dialog.open(EditDeleteComponent,{
  //
  //     data:row
  //   }).afterClosed().subscribe(val=>{
  //     if(val ==='update'){
  //           this.getAllUsers();
  //         }
  //       })
  //     }



  deleteUser(id: number) {
   const dialogRef =  this.dialog.open(EditDeleteComponent, {data: {name: 'Are you want to delete?'}})

    dialogRef.afterClosed().subscribe(result => {
     if(result){
       this.api.deleteUser(id)
         .subscribe({
           next:(res)=>{
             this.getAllUsers();
           },
           error:()=>{
             alert("error while deleting the user!!")
           }

         })
     }
    });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
