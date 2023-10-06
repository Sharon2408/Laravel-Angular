import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnInit } from '@angular/core';
import { CellClickedEvent, ColDef, DomLayoutType, GridApi, ICellRendererParams, RowHeightParams } from 'ag-grid-community';
import { Observable } from 'rxjs/internal/Observable';
import { Complaint } from 'src/Models/complaint';
import { AssignbuttonComponent } from '../../button-components/view-lineman-button/view-lineman-button.component';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-view-complaints',
  templateUrl: './admin-view-complaints.component.html',
  styleUrls: ['./admin-view-complaints.component.css']
})
export class AdminViewComplaintsComponent implements OnInit {
  constructor(private http: HttpClient,private datePipe:DatePipe) { }
  baseUrl = environment.baseUrl;
  rowData$!: Observable<Complaint[]>;
  public domLayout: DomLayoutType = 'autoHeight';
  private gridApi!: GridApi;

  colDefs: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'consumer_id', headerName: 'Consumer Id', },
    { field: 'issue_details', headerName: 'Issue Details', },
    { field: 'landmark', headerName: 'Land Mark', },
    {
      headerName: 'View Lineman', cellRenderer: AssignbuttonComponent,
      cellRendererParams: (params: ICellRendererParams) => ({
        consumerId: params.data.consumer_id,
        complaintId: params.data.id,
      }),
    },
    {
      field: 'complained_date', headerName: 'Complained Date', cellRenderer: (params: ICellRendererParams) => {
        return `<p>${this.datePipe.transform(params.value)}</p>`;
      },
    },
    { field: 'status', headerName: 'Status', },
    { field: 'solved_date', headerName: 'Solved Date', },
    { field: 'remark', headerName: 'Remark', },
    { field: 'solvedBy', headerName: 'Solved By', },

  ];

  defaultColDef: ColDef = {
    sortable: true, filter: true
  }



  ngOnInit(): void {
     this.rowData$ = this.http.get<Complaint[]>(`${this.baseUrl}/admincomplaints`)
  }

  

  setAutoHeight() {
    this.gridApi.setDomLayout('autoHeight');
    (document.querySelector<HTMLElement>('#myGrid')! as any).style.height = '';
  }
  public getRowHeight: (
    params: RowHeightParams
  ) => number | undefined | null = (params: RowHeightParams) => {
    if (params.node.level === 0) {
      return 60;
    }
    else if (params.node.level === 1) {
      return 60;
    } else
    return 40;
  };

}

