import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { PostService } from 'src/app/service/post.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router'

@Component({
	selector: 'apps-post-dialog-component',
	templateUrl: './post-dialog.component.html',
	styleUrls: ['./post-dialog.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class AppsPostDialogComponent implements OnInit {

	form: FormGroup;
	typeBusiness: any[] = [
		{
			name: "Bán",
			value: 1
		},
		{
			name: "Mua",
			value: 2
		},
		{
			name: "Cho thuê",
			value: 3
		},
		{
			name: "Cần thuê",
			value: 4
		},
		{
			name: "Tìm bạn cùng phòng",
			value: 5
		}

	]
	typeProperty: any[] = [
		{
			name: "Nhà đất",
			value: 1
		},
		{
			name: "Chung cư",
			value: 2
		},
		{
			name: "Phòng trọ",
			value: 3
		}
	]
	district: string[] = [
		'Quận 1',
		'Quận 2',
		'Quận 3',
		'Quận 4',
		'Quận 5',
		'Quận 6',
		'Quận 7',
		'Quận 8',
		'Quận 9',
		'Quận 10',
		'Quận 11',
		'Quận 12',
		'Quận Bình Thạnh',
		'Quận Bình Tân',
		'Quận Bình Chánh',
		'Quận Tân Bình',
		'Quận Tân Phú',
		'Quận Phú Nhuận',
		'Quận Gò Vấp',
		'Quận Thủ Đức',
		'Huyện Cần Giờ',
		'Huyện Củ Chi',
		'Huyện Hóc Môn',
		'Huyện Nhà Bè',


	]
	isPrice: boolean = true;

	constructor(
		public dialogRef: MatDialogRef<AppsPostDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private formBuilder: FormBuilder,
		private postService: PostService,
		private snackBar: MatSnackBar,
		private router: Router
		) {}

	ngOnInit(): void {
		console.log(this.data);
		this.form = this.formBuilder.group({
			typeBusiness: ["", Validators.required],
			title: ["", Validators.required],
			typeProperty: ["", Validators.required],
			area: ["", Validators.required],
			price: [""],
			address: ["", Validators.required],
			district:["", Validators.required],
			description: [""],
			priceFrom: [""],
			priceTo: [""],
		})
	}
	onClose(): void {
		this.dialogRef.close();
	}

	submit(): void {
		let val: any = this.form.value;
		let body: any = {
			"typeBusiness": val.typeBusiness.value,
			"title": val.title,
			"typeProperty": val.typeProperty.value,
			"area": val.area,
			"price": val.price,
			"address": val.address,
			"district": val.district,
			"description": val.description,
			"priceFrom": val.priceFrom,
			"priceTo": val.priceTo,
			"username": "Huỳnh Phương Duy",
      		"userId": 1
		}
		if (!this.form.valid) {
			this.snackBar.open("Vui lòng nhập thông tin", null , {
				duration: 1000,
				panelClass: 'error'
			});
		}
		else {
			// this.renderer.setStyle(
				// this.snackBar._openedSnackBarRef.containerInstance._elementRef.nativeElement,
				//  'color', '#44d244');
			this.postService.post(body).subscribe(res => {
				this.dialogRef.close();
				this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
					this.router.navigate(['']);
				}); 
				this.snackBar.open("Đăng bài thành công",null, {
					duration: 2000,
					panelClass: 'success'
				});
			});
		}
	}
	onChangeTypeBusiness(): void {
		let val: number = this.form.value.typeBusiness.value;
		if (val === 2 || val === 4 || val === 5) {
			this.isPrice = false;
		}
		else {
			this.isPrice = true;
		}
	}
}