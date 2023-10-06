import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomLayoutType, GridApi, ColDef, ICellRendererParams, GridReadyEvent, RowHeightParams } from 'ag-grid-community';
import { Linemen } from 'src/Models/linemen';
import { LinemanService } from 'src/Services/lineman.service';
import { AssignTasktoLinemanButtonComponent } from '../../button-components/assign-taskto-lineman-button/assign-taskto-lineman-button.component';

@Component({
  selector: 'app-view-area-lineman',
  templateUrl: './view-area-lineman.component.html',
  styleUrls: ['./view-area-lineman.component.css']
})
export class ViewAreaLinemanComponent implements OnInit {

  lineman_id!: string;
  rowData: Linemen[] = [];

  public domLayout: DomLayoutType = 'autoHeight';

  colDefs: ColDef[] = [
    { field: 'id' },
    { field: 'lineman_id', headerName: 'Region Code', },
    { field: 'name', headerName: 'Name', },
    { field: 'phone_no', headerName: 'Phone Number', },
    {
      headerName: 'AssignTask', cellRenderer: AssignTasktoLinemanButtonComponent,
      cellRendererParams: (params: ICellRendererParams) => ({
        linemanId: params.data.id,
      }),
    },
  ];

  defaultColDef: ColDef = {
    sortable: true, filter: true
  }
  gridApi!: GridApi;

  constructor(private route: ActivatedRoute, private router: Router, private lineman: LinemanService) {

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.lineman_id = String(routeParams.get('lineman_id'));
    this.lineman.find(this.lineman_id).subscribe({
      next: (res) => {
        this.rowData = res
      },
      error: (error) => {
      }
    }
    );
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
    }
    return 40;
  };
}
