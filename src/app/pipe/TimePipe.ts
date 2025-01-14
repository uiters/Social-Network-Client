import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'timeAgo'
})

export class TimePipeComponent implements PipeTransform {
    transform(value: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 30) {
                return 'Vừa xong';
            }
            const intervals = {
                'năm': 31536000,
                'tháng': 2592000,
                'tuần': 604800,
                'ngày': 86400,
                'giờ': 3600,
                'phút': 60,
                'giây': 1
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0) {
                    return counter + ' ' + i + ' trước';
                }
            }
        }
        return value;
    }
}