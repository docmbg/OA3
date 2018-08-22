import XlsxPopulate from 'xlsx-populate';
import { siteUrl } from '../consts';
import { convertNumber } from './helperFunctions';

export function generateExcelListsInformation(data: any) {
    let columns = ['Title', 'Type', 'Items Count', 'Versioning Enabled', 'Location', 'Column Types', 'Existing Workflows'];
    const siteName = siteUrl.split('/')[siteUrl.split('/').length - 1];
    XlsxPopulate.fromBlankAsync()
        .then((workbook: any) => {
            const sheet = workbook.sheet(0).name('Lists Information');
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
                    switch (key) {
                        case 'Title':
                            sheet.cell(cell).value(item[key]);
                            break;
                        case 'Type':
                            sheet.cell(cell).value(item[`BaseTemplate`] === 101 ? 'Library' : 'List');
                            break;
                        case 'Items Count':
                            sheet.cell(cell).value(item.ItemCount);
                            break;
                        case 'Versioning Enabled':
                            sheet.cell(cell).value(item.EnableVersioning);
                            break;
                        case 'Location':
                            sheet.cell(cell).value(item.RootFolder.ServerRelativeUrl);
                            break;
                        case 'Column Types':
                            var columnTypes = Array.from(
                                new Set(item.Fields.results.filter((e: any) => e.CanBeDeleted)
                                    .map((e: any) => e.TypeDisplayName))
                            ).join(', ');
                            sheet.cell(cell).value(columnTypes);
                            break;
                        case 'Existing Workflows':
                            sheet.cell(cell).value(item.WorkflowAssociations.results.length);
                            break;
                        default:
                            sheet.cell(cell).value(' ');
                    }
                    counterColumns++;
                }
                counterColumns = 0;
                counterItems++;
            }

            // Write to file.
            return workbook.outputAsync();
        }).then(function (blob: any) {

            let nameOfFile = `Lists Information -${siteName}`;
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