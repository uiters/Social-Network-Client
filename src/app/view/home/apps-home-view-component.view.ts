import { Component, OnInit, HostListener, ViewEncapsulation, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostService } from '../../service/post.service';
import { Router } from '@angular/router';
import { ReloadService } from 'src/app/service/reload.service';
import { EventEmitter } from 'protractor';
import { SearchService } from 'src/app/service/search.service';
import { WebSocketService } from 'src/app/service/websocket.service';
@Component({
	selector: 'apps-home-view-component',
	templateUrl: './apps-home-view-component.view.html',
	styleUrls: ['./apps-home-view-component.view.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsHomeViewComponent implements OnInit {
	@ViewChild('notFound') notFound: ElementRef;
	@HostListener("window:scroll", [])
		onWindowScroll() {
			let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
			let max = document.documentElement.scrollHeight;
			if(pos == max) {
				if (this.hasNext) {
					const nextLink = '/social' + this.nextLink;
					if (this.nextLink) {
						this.postService.list(nextLink).subscribe(res => {
						this.postData = [...this.postData, ...res.items];
						this.nextLink = res.nextLink;
						this.hasNext = res.hasNext;
						});
					}
				}
			}
		}

	nextLink: string;
	hasNext: boolean = true;
	postData: any;
	constructor(
		private router: Router,
		private postService: PostService,
		public dialog: MatDialog,
		private ngRenderer: Renderer2,
		private reloadService: ReloadService,
		private searchService:  SearchService,
		private webSocketService: WebSocketService
	) { }

	
	ngOnInit() {
		let stompClient = this.webSocketService.connect();
        stompClient.connect({}, frame => {

			// Subscribe to notification topic
            stompClient.subscribe('user/queue/notification', notifications => {

				// Update notifications attribute with the recent messsage sent from the server
                console.log(notifications);
            })
        });
		this.postService.list().subscribe((res) => {
			this.postData = res.items;
			this.hasNext = res.hasNext;
			this.nextLink = res.nextLink;
		},
		(err) => {
			console.log(err);
		});
		this.reloadService.onReloadPost().subscribe(isReload => {
			this.reload();
		})
	}

	onUpdatePostData() {
		this.postService.list().subscribe(res => {
			this.postData = res.items;
			this.hasNext = res.hasNext;
			this.nextLink = res.nextLink;
		});
	}

	reload() {
		this.postData = null;
		this.hasNext = true;
		this.postService.list().subscribe(res => {
			this.postData = res.items;
			this.hasNext = res.hasNext;
			this.nextLink = res.nextLink;
		});
	}

	searchPost(params: any): void {
		this.postData = null;
		this.searchService.list(this.searchService.url, params).subscribe(res => {
			this.postData = res.items;
			this.hasNext = res.hasNext;
			this.nextLink = res.nextLink;
			console.log(this.postData);
			if (res.items.length === 0) {
				this.notFound.nativeElement.innerHTML = "Không tìm thấy bài viết";
			}
		})
	
	}
}
