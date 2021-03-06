/**
 * CSV Export class
 * 
 * Can convert data into CSV and an optional file download.
 * 
 * Adapted from: https://www.geekality.net/2018/11/21/javascript-in-browser-export-to-csv/
 * 
 */
var CSVExport =
    /*#__PURE__*/
    function () {
        "use strict";

        /**
         * Export of data to CSV
         * 
         * @param {Array} data 
         * @param {Object} columns 
         * @param {String} columnSeparator 
         * @param {String} rowSeparator 
         * @param {String} unicodeBOM 
         */
        function CSVExport(data, columns, columnSeparator, rowSeparator, unicodeBOM) {
            if (columnSeparator === void 0) {
                columnSeparator = ',';
            }

            if (rowSeparator === void 0) {
                rowSeparator = '\r\n';
            }

            if (unicodeBOM === void 0) {
                unicodeBOM = "\uFEFF";
            }

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


        var _proto = CSVExport.prototype;

        _proto.wrapValue = function wrapValue(value) {
            return "\"" + value + "\"";
        }
            /**
             * Escape a value for CSV
             * 
             * @param {String} value The value to escape
             */
            ;

        _proto.escapeValue = function escapeValue(value) {
            return (value || '').replace(/"/, '""');
        }
            /**
             * Create the header row
             * 
             * @param {Object} columns The columns list
             */
            ;

        _proto.toHeaderRow = function toHeaderRow(columns) {
            return Object.keys(columns).map(this.escapeValue).map(this.wrapValue).join(this._columnSeparator);
        }
            /**
             * Create the CSV row
             * 
             * @param {Object} columns The Columns
             * @param {Object} item The Item
             */
            ;

        _proto.toRow = function toRow(columns, item) {
            return Object.values(columns).map(function (field) {
                return typeof field === 'function' ? field(item) : item[field];
            }).map(String).map(this.escapeValue).map(this.wrapValue).join(this._columnSeparator);
        }
            /**
             * Get the computed rows, including the header
             */
            ;

        _proto.getRows = function getRows() {
            return this._rows;
        }
            /**
             * Get the computed columns
             */
            ;

        _proto.getColumns = function getColumns() {
            return this._columns;
        }
            /**
             * Create the CSV data
             */
            ;

        _proto.createExport = function createExport() {
            var rows = [],
                data = this._data,
                columns = this._columns;
            rows.push(this.toHeaderRow(columns));

            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
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
            ;

        _proto.toFile = function toFile(fileName) {
            var rows = this._rows;
            var csv = this._unicodeBOM + rows.join(this._rowSeparator);
            var uri = "data:text/csv;charset=utf-8;header=present," + encodeURIComponent(csv);
            var link = document.createElement('a');
            link.setAttribute('href', uri);
            link.setAttribute('download', fileName);
            link.addEventListener('click', function () {
                return link.parentNode.removeChild(link);
            });
            document.body.appendChild(link);
            link.click();
        };

        return CSVExport;
    }();