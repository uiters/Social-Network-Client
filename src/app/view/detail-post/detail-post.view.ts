import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { ActivatedRoute } from '@angular/router';
import { ReloadService } from 'src/app/service/reload.service';
@Component({
	selector: 'apps-detail-post-view',
	templateUrl: './detail-post.view.html',
	styleUrls: ['./detail-post.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsDetailPostView implements OnInit {

	detailPost: any;
	constructor(
		private activatedRoute: ActivatedRoute,
		private reloadService: ReloadService,
		private postService: PostService,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.load();
		this.reloadService.onReloadPost().subscribe(isReload => {
			this.load();
		})
	}

	load(): void {
		this.activatedRoute.paramMap.subscribe(params => {
			this.postService.get(parseInt(params.get('id'))).subscribe(res => {
				this.detailPost = res;
			})
		});
	}
}
