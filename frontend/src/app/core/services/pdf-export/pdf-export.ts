import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  

  exportTable(title: string, fileName: string, columns: string[], rows: any[][]) {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(title, 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

    autoTable(doc, {
      startY: 35,
      head: [columns],
      body: rows,
      headStyles: { fillColor: [63, 81, 181] }
    });

    doc.save(`${fileName}.pdf`);
  }
}
