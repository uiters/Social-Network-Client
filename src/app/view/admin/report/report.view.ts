import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AppsAdminModalComponent } from 'src/app/component/admin/modal/modal.component';

@Component({
    selector: "apps-admin-report-view",
    templateUrl: './report.view.html',
	styleUrls: ['./report.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsAdminReportView {

    constructor(
    ) {
    }

}