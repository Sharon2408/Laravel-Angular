import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from 'src/Services/complaint.service';
import { MyErrorStateMatcher } from 'src/shared/ErrorMatcher';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {
  consumerId!: string;
  user_id!: number;
  currentConsumerNo!: string;

  constructor(private complaint: ComplaintService) {

  }

  // Form Controls
  issueForm!: FormGroup;
  issue_details!: FormControl;
  landmark!: FormControl;
  consumerNumber!: FormControl;
  

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token) {
      const decryptToken = token.split('.')[1];
      const decode = JSON.parse(atob(decryptToken));
      if (decode) {
        this.user_id = parseInt(decode.sub);
        this.currentConsumerNo = decode.consumer_id; 
      }
    }

    this.issueForm = new FormGroup({
      issue_details: new FormControl('', [Validators.required]),
      landmark: new FormControl('', [Validators.required]),
      consumerNumber: new FormControl('', [Validators.required]),

    });

   
  

  }

  matcher = new MyErrorStateMatcher();
  onSubmit() {
    
     this.issueForm.value.consumer_id = this.consumerId
     this.issueForm.value.user_id = this.user_id
    return this.complaint.postComplaint(this.issueForm.value);
  }


  


}
