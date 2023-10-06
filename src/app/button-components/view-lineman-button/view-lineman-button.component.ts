import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Router } from '@angular/router';
import { LinemanService } from 'src/Services/lineman.service';

@Component({
  selector: 'app-assignbutton',
  template: `<button type="button" class="btn btn-primary" (click)="onClick($event)">View Lineman</button>`,
})
export class AssignbuttonComponent implements OnInit, ICellRendererAngularComp {

consumer_id!:string;
complaint_id!:number;

constructor(private router:Router,private lineman:LinemanService){

}

  ngOnInit(): void {

  }

  agInit(params:ICellRendererParams):void {
   this.consumer_id =  params.data.consumer_id;
   this.complaint_id = params.data.id;
  }

  refresh(params:ICellRendererParams):boolean {
    return false
  }


  onClick(event:Event){
   // alert(this.complaint_id)
   this.lineman.complaint_id.next(this.complaint_id)
   this.router.navigate(['/area-lineman',this.consumer_id])  
  }

}
