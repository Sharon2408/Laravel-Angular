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
  constructor(private complaint: ComplaintService) {
  }
  // Form Controls
  complaintForm!: FormGroup;
  issue_details!: FormControl;
  landmark!: FormControl;
  
  user_id!: number;
  currentConsumerNo!: string;
 
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
    this.complaintForm = new FormGroup({
      issue_details: new FormControl('', [Validators.required]),
      landmark: new FormControl('', [Validators.required]),
    });
  }
  matcher = new MyErrorStateMatcher();
  onSubmit() {
     this.complaintForm.value.consumer_id = this.currentConsumerNo
     this.complaintForm.value.user_id = this.user_id
    return this.complaint.postComplaint(this.complaintForm.value);
  }
}
