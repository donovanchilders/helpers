/**
 * CSV Export class
 * 
 * Can convert data into CSV and an optional file download.
 * 
 * Adapted from: https://www.geekality.net/2018/11/21/javascript-in-browser-export-to-csv/
 * 
 */

class CSVExport {
    /**
     * Export of data to CSV
     * 
     * @param {Array} data 
     * @param {Object} columns 
     * @param {String} columnSeparator 
     * @param {String} rowSeparator 
     * @param {String} unicodeBOM 
     */
    constructor(data, columns, columnSeparator = ',', rowSeparator = '\r\n', unicodeBOM = '\uFEFF') {
        this._data = data;
        this._columns = columns;
        this._columnSeparator = columnSeparator;
        this._rowSeparator = rowSeparator;
        this._unicodeBOM = unicodeBOM;
        this._rows = null;
    }

    /**
     * Wrap a value
     * 
     * @param {String} value The value to wrap
     */
    wrapValue(value) {
        return "\"" + value + "\"";
    }

    /**
     * Escape a value for CSV
     * 
     * @param {String} value The value to escape
     */
    escapeValue(value) {
        return (value || '').replace(/"/, '""');
    }

    /**
     * Create the header row
     * 
     * @param {Object} columns The columns list
     */
    toHeaderRow(columns) {
        return Object.keys(columns).map(this.escapeValue).map(this.wrapValue).join(this._columnSeparator);
    }

    /**
     * Create the CSV row
     * 
     * @param {Object} columns The Columns
     * @param {Object} item The Item
     */
    toRow(columns, item) {
        return Object.values(columns).map(function (field) {
            return typeof field === 'function' ? field(item) : item[field];
        }).map(String).map(this.escapeValue).map(this.wrapValue).join(this._columnSeparator);
    }

    /**
     * Get the computed rows, including the header
     */
    getRows() {
        return this._rows;
    }

    /**
     * Get the computed columns
     */
    getColumns() {
        return this._columns;
    }

    /**
     * Create the CSV data
     */
    createExport() {
        let rows = [],
            data = this._data,
            columns = this._columns;
        rows.push(this.toHeaderRow(columns));

        for (let _i = 0, data_1 = data; _i < data_1.length; _i++) {
            let item = data_1[_i];
            rows.push(this.toRow(columns, item));
        }
        this._rows = rows;
        return this;
    }

    /**
     * Create a CSV file to export
     * 
     * @param {string} fileName The file name
     */
    toFile(fileName) {
        let rows = this._rows;
        let csv = this._unicodeBOM + rows.join(this._rowSeparator);
        let uri = "data:text/csv;charset=utf-8;header=present," + encodeURIComponent(csv);
        let link = document.createElement('a');
        link.setAttribute('href', uri);
        link.setAttribute('download', fileName);
        link.addEventListener('click', function () {
            return link.parentNode.removeChild(link);
        });
        document.body.appendChild(link);
        link.click();
    }

}