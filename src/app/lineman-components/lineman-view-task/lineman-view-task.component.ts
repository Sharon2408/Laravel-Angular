import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomLayoutType, GridApi, ColDef, ICellRendererParams, RowHeightParams, CellEditorSelectorResult, ICellEditorParams, ISelectCellEditorParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { LinemanViewTask, } from 'src/Models/linemen';
import { environment } from 'src/environments/environment';
import { LinemanService } from 'src/Services/lineman.service';
import { UpdateStatusRendererComponent } from '../update-status-renderer/update-status-renderer.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lineman-view-task',
  templateUrl: './lineman-view-task.component.html',
  styleUrls: ['./lineman-view-task.component.css']
})
export class LinemanViewTaskComponent {
  constructor(private http: HttpClient, private lineman: LinemanService, private datePipe: DatePipe) { }
  lineman_id!: number;
  rowData$!: Observable<LinemanViewTask[]>;
  public domLayout: DomLayoutType = 'autoHeight';
  private gridApi!: GridApi;
  baseUrl = environment.baseUrl;
  status: number[] = [];

  colDefs: ColDef[] = [
    { field: 'id', hide: true },
    { field: 'consumer_id', headerName: 'Consumer Id', },
    { field: 'issue_details', headerName: 'Issue Details', },
    { field: 'landmark', headerName: 'Land Mark', },
    {
      field: 'complained_date', headerName: 'Complained Date', cellRenderer: (params: ICellRendererParams) => {
        return `<p>${this.datePipe.transform(params.value)}</p>`;
      },
    },
    {
      headerName: 'Status', cellRenderer: UpdateStatusRendererComponent,
      cellRendererParams: (params: ICellRendererParams) => ({
        statusName: params.data.status
      }),
    },
    { field: 'remark', headerName: 'Remark', editable: true, },

  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 250,
    resizable: true,
  }

  ngOnInit(): void {
    this.getTasksLineman();


    // this.lineman.getStatus().subscribe((res) => { 
    //   console.log(res)
    //   this.status = res })
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
    if (params.node.level === 1) {
      return 60;
    }
    return 40;
  };

  getTasksLineman() {
    const token = localStorage.getItem('token');
    if (token) {
      const decryptToken = token.split('.')[1];
      const decode = JSON.parse(atob(decryptToken));
      if (decode) {
        this.lineman_id = decode.sub;
      }
    }
    this.rowData$ =
      this.http.get<LinemanViewTask[]>(`${this.baseUrl}/view-lineman-tasks/` + this.lineman_id)

  }


}



