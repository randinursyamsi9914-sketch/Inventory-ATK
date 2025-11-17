import * as XLSX from 'xlsx';

/**
 * Exports an array of data to an Excel file.
 * @param data The array of objects to export. Each object's keys will be column headers.
 * @param fileName The desired name for the Excel file (without extension).
 * @param sheetName The name of the sheet within the Excel file.
 */
export const exportToExcel = (data: any[], fileName: string, sheetName: string): void => {
  if (!data || data.length === 0) {
    console.warn('No data to export.');
    return;
  }

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
