import XlsxPopulate from 'xlsx-populate';
import { convertNumber } from './helperFunctions';

export function generateExcelMatrix(data: any) {
    const { sites, uniqueGroups, usersByGroup, lists } = data;
    const permissions: any = [].concat(...data.permissions);
    XlsxPopulate.fromBlankAsync()
        .then((workbook: any) => {
            const permissionMatrix = workbook.sheet(0).name('Permission Matrix');
            const usersSheet = workbook.addSheet('Users');
            const restrictedLists = workbook.addSheet('Restricted Lists');
            // generate headers

            // permissions 
            let counterColumnsHeader = 1;
            for (let site of sites) {
                permissionMatrix.cell(convertNumber(counterColumnsHeader).toString() + 1).
                    value(site.title).style('fill', 'ffed00');
                counterColumnsHeader++;
            }

            let counterRows = 2;
            for (let group of uniqueGroups) {
                permissionMatrix.cell(convertNumber(0).toString() + counterRows).value(group.Title);
                let counterColumns = 1;
                for (let site of sites) {
                    for (let item of permissions) {
                        if (item.title === site.title && item.name === group.Title) {
                            let fill = 'ffffff';
                            if (item.permissions.includes('Read')) {
                                fill = '64ff00';
                            }
                            if (item.permissions.includes('Limited Access')) {
                                fill = 'd9d9d9';
                            }
                            if (item.permissions.includes('Full Control')) {
                                fill = '666666';
                            }
                            if (item.permissions.includes('Contribute')) {
                                fill = '00c9ff';
                            }
                            permissionMatrix.cell(convertNumber(counterColumns).toString() + counterRows)
                                .value(item.permissions).style('fill', fill);
                        }
                    }
                    counterColumns++;
                }
                counterRows++;
            }

            // users
            counterColumnsHeader = 0;
            for (let group of uniqueGroups) {
                usersSheet.cell(convertNumber(counterColumnsHeader).toString() + 1).value(group.Title)
                    .style('fill', 'ffed00');
                counterColumnsHeader++;
            }

            counterColumnsHeader = 0;
            counterRows = 2;
            for (let users of usersByGroup) {
                for (let entry of users) {
                    usersSheet.cell(convertNumber(counterColumnsHeader).toString() + counterRows).value(entry);
                    counterRows++;
                }
                counterRows = 2;
                counterColumnsHeader++;
            }

            // restricted lists

            restrictedLists.cell(convertNumber(0).toString() + 1).value('List Name');
            restrictedLists.cell(convertNumber(1).toString() + 1).value('Url');
            counterRows = 2;
            for (let list of lists) {
                restrictedLists.cell(convertNumber(0).toString() + counterRows).value(list.Title);
                restrictedLists.cell(convertNumber(1).toString() + counterRows).
                    value(list.RootFolder.ServerRelativeUrl);
                counterRows++;
            }
            // Write to file.
            return workbook.outputAsync();
        }).then(function (blob: any) {

            let nameOfFile = `${sites[0].title}-Permission Matrix`;
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