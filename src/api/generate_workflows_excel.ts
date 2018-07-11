import XlsxPopulate from 'xlsx-populate';
import { siteUrl } from '../consts';
import { convertNumber } from './helperFunctions';

export function generateExcelWorkflows(data: any) {
    let columns = ['Name', 'Server Relatvive Url', 'Author'];
    const siteName = siteUrl.split('/')[siteUrl.split('/').length - 1];
    XlsxPopulate.fromBlankAsync()
        .then((workbook: any) => {
            const sheet = workbook.sheet(0).name('Workflows');
            // generate headers

            let counterColumns = 0;
            let counterItems = 2;
            for (let key of columns) {
                sheet.cell(convertNumber(counterColumns).toString() + 1).value(key);
                counterColumns++;
            }
            // fill content
            counterColumns = 0;
            for (let item of data) {
                for (let key of columns) {
                    let cell = convertNumber(counterColumns).toString() + counterItems;
                    sheet.cell(cell).value(item[key]);
                    counterColumns++;
                }
                counterColumns = 0;
                counterItems++;
            }

            // Write to file.
            return workbook.outputAsync();
        }).then(function (blob: any) {

            let nameOfFile = `Workflows -${siteName}`;
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blob, nameOfFile);
            } else {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                document.body.appendChild(a);
                a.href = url;
                a.download = nameOfFile;
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }
        });
}