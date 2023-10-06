import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Task } from 'src/Models/linemen';
import { LinemanService } from 'src/Services/lineman.service';

@Component({
  selector: 'app-assign-taskto-lineman-button',
  template: `<button mat-raised-button color="primary" (click)="onClick($event)">Assign</button>`,
 
})
export class AssignTasktoLinemanButtonComponent implements OnInit, ICellRendererAngularComp {


  lineman_id!: number;
  complaint_id!: number;

  constructor(private router: Router, private lineman: LinemanService) {

  }

  ngOnInit(): void {

  }

  agInit(params: ICellRendererParams): void {
    this.lineman_id = params.data.id;
  }

  refresh(params: ICellRendererParams): boolean {
    return false
  }


  onClick(event: Event) {
    this.lineman.currentComplaintId.subscribe((res) => {
      this.complaint_id = res;
    })
    const task:Task = {
      complaint_id: this.complaint_id,
       lineman_id:this.lineman_id ,
    };
   this.lineman.assignTasktoLineman(task)
   this.router.navigate(['/'])
  }
}
