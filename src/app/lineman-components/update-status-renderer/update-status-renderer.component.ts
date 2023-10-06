import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Updatestatus, status } from 'src/Models/linemen';
import { LinemanService } from 'src/Services/lineman.service';

@Component({
  selector: 'app-update-status-renderer',
  templateUrl: './update-status-renderer.component.html',
  styleUrls: ['./update-status-renderer.component.css']
})
export class UpdateStatusRendererComponent implements OnInit, ICellRendererAngularComp {
  task_id!: number;
  complaint_id!: number;
  constructor(private lineman: LinemanService) { }

  status: status[] = [];
  statusName!: string;
  hide: boolean = true;
  disable: boolean = false;
  ngOnInit(): void {
    this.lineman.getStatus().subscribe((res) => {
      this.status = res

    })
  }
  agInit(params: ICellRendererParams): void {
    this.task_id = params.data.id;
    this.complaint_id = params.data.complaint_id;
    this.statusName = params.data.status;
    //console.log(params.data.complaint_id, params.data.lineman_id)
  }

  refresh(params: ICellRendererParams): boolean {
    return false
  }

  onClick(id: number) {
    const status: Updatestatus = {
      complaint_id: this.complaint_id,
      task_id: this.task_id,
      status_id: id,
    };
    this.lineman.updateStatus(status)
    if (id == 3) {
      this.lineman.updateSolvedDate(status)
    }
  }
}
