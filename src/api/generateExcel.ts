import XlsxPopulate from 'xlsx-populate';

export function generateExcelFile(data: any) {
    let columns = Object.keys(data[0]);
    XlsxPopulate.fromBlankAsync()
        .then((workbook: any) => {
            const sheet = workbook.sheet(0).name('Empty Folders');
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

            let nameOfFile = `Empty Folders.xlsx`;
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

function convertNumber(n: number) {
    let ordA = 'A'.charCodeAt(0);
    let ordZ = 'Z'.charCodeAt(0);
    let len = ordZ - ordA + 1;
    let s = '';
    while (n >= 0) {
        s = String.fromCharCode(n % len + ordA) + s;
        n = Math.floor(n / len) - 1;
    }
    return s;
}