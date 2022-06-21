import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ApiService} from "../services/api.service";
import {MatDialogRef , MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  registerForm !: FormGroup;
  actionBtn : string = "Save"
  constructor(private formBuilder : FormBuilder,
              private api : ApiService,
              @Inject(MAT_DIALOG_DATA) public editData : any,
              private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),

      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[5-9]+[0-9]*(\\.[0-9]+)?")]),
      gender: new FormControl('',Validators.required),
      religion: new FormControl('',Validators.required),
      category: new FormControl('',Validators.required),
      caste: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      pinCode: new FormControl('', [Validators.required, Validators.pattern("([1-9]{1}[0-9]{5}|[1-9]{1}[0-9]{3}\\\\s[0-9]{3})")])
    });
    if(this.editData){
      this.actionBtn = "Update";
      this.registerForm.controls['name'].setValue(this.editData.name);
      this.registerForm.controls['phoneNumber'].setValue(this.editData.phoneNumber);
      this.registerForm.controls['gender'].setValue(this.editData.gender);
      this.registerForm.controls['religion'].setValue(this.editData.religion);
      this.registerForm.controls['category'].setValue(this.editData.category);
      this.registerForm.controls['caste'].setValue(this.editData.caste);
      this.registerForm.controls['state'].setValue(this.editData.state);
      this.registerForm.controls['pinCode'].setValue(this.editData.pinCode);
    }
  }
  addUser(){
  if(!this.editData){
    if(this.registerForm.valid){
      this.api.postUser(this.registerForm.value)
        .subscribe({
          next:(res)=>{
            // alert("User added Successfully");
            this.registerForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("Error while adding the User")
          }
        })
    }
  }else{
    this.updateUser()
  }

  }
  updateUser(){
   this.api.putUser(this.registerForm.value,this.editData.id)
     .subscribe({
       next:(res)=>{
         // alert("User updated Successfully");
         this.registerForm.reset();
         this.dialogRef.close('update');
       },
       error:()=>{
         alert("Error while updating the record!!");

       }
     })
  }

}
