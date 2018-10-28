import { Component, OnInit ,ViewChild} from '@angular/core';
import { CommonService } from '../../../../services/common.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-deviceinventory',
  templateUrl: './patrolcarsinventory.component.html',
  styleUrls: ['./patrolcarsinventory.component.css']
})
export class PatrolCarsinventoryComponent implements OnInit {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  loadingVisible = false;
  orgs:any;
  dataSource: any;
  selahwalid: number = 1;

  constructor(private svc:CommonService) {
    this.showLoadPanel();
   }

   onShown() {
    setTimeout(() => {
        this.loadingVisible = false;
    }, 3000);
  }

  showLoadPanel() {
    this.loadingVisible = true;
  }


  ngOnInit() {

    this.LoadData();
  }

LoadData()
{
  this.svc.GetDevicesInventoryList().subscribe(resp =>
    {

       this.dataSource = JSON.parse(resp);
      console.log('resp' + resp);
      this.dataGrid.dataSource = this.dataSource;
      this.dataGrid.instance.refresh();

  },
    error => {

    });


}

onToolbarPreparing(e) {
  let AhwalLst :any=[];
  AhwalLst =JSON.parse(window.localStorage.getItem('Orgs'));

  e.toolbarOptions.items.unshift({
      location: 'before',
      template: 'الأحوال'
  }, {
          location: 'before',
          widget: 'dxSelectBox',
          options: {
              width: 200,
              items: AhwalLst,
              displayExpr: 'text',
              valueExpr: 'value',
              value:1,
              onValueChanged: this.groupChanged.bind(this)
          }
      }, {
          location: 'after',
          widget: 'dxButton',
          options: {
              icon: 'refresh',
              onClick: this.refreshDataGrid.bind(this)
          }
      });
}

groupChanged(e) {
  this.selahwalid = e.value;
 this.LoadData();
}



refreshDataGrid() {
  this.LoadData();
}

}
