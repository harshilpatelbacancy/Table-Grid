import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ExportService {

  constructor() { }

  exportExcel(jsonData, fileName) {
    this.downloadFile(this.generateCSV(jsonData), this.createFilename(fileName));
  }

  downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  generateCSV(jsonData): any {
    const columns = ['Name', 'Designation', 'Number', 'Email'];
    const titles = ['Name', 'Designation', 'Number', 'Email'];
    let csv = this.toCSV(jsonData, columns, titles);
    return csv;
  }

  createFilename(productionDate): string {
    let filename = productionDate;
    filename += '.csv';

    return filename;
  }

  toCSV(items, columns, header = null) {
    const replacer = (key, value) => value === null || value == undefined ? '' : value;

    if (!columns) {
      columns = Object.keys(items[0]);
    }

    let csv = items.map(
      row => columns.map(
        fieldName => JSON.stringify(row[fieldName], replacer),
      ).join(','));

    if (!header) {
      header = columns;
    }

    csv.unshift(header.join(','));
    csv = csv.join('\r\n');

    return csv;
  }
}