/*!
 * TableExporter.js v0.0.1
 * Copyright 2016 Travis Clarke
 * Licensed under the MIT license
 *
 * Edited by SimonSch
 */

;(function (window, undefined) {

    /*--- GLOBALS ---*/
    var $ = window.jQuery;

    function createHeader(html, options){
        $.each(options, function(i, column){
            if ($.isPlainObject(column)){
                if (column.type === 'object') {
                    html = createHeader(html, column.options);
                } else {
                    html += '<th>' + (column.columnName ? column.columnName : column.fieldName) + '</th>';
                }
            }else{
                html += '<th>' + column + '</th>';
            }
        });
        return html;
    }

    function createTd(html,objSingle, options){
        for (var index = 0; index < options.length; ++index) {
            var column = options[index];
            if (!objSingle) {
                html += '<td></td>';
                continue;
            }

            if (column.type && column.type === 'object') {
                html = createTd(html, objSingle[column.fieldName], column.options);
            } else if(column.type && column.type === 'date'){
                if (objSingle.hasOwnProperty(column.fieldName)) {
                    var value = objSingle[column.fieldName];
                    if (value !== undefined && value !== null) {
                        html += '<td>' + new Date(value).toLocaleString('de') + '</td>';
                    } else {
                        html += '<td></td>';
                    }
                } else {
                    html += '<td></td>';
                }
            } else {
                var fieldName = column.fieldName ? column.fieldName : column;
                if (objSingle.hasOwnProperty(fieldName)) {
                    var value = objSingle[fieldName];
                    if (value !== undefined && value !== null) {
                        html += '<td>' + value + '</td>';
                    } else {
                        html += '<td></td>';
                    }
                } else {
                    html += '<td></td>';
                }
            }
        }
        return html;
    }

    function createWithOption(html,objArray, options) {

        if(options.length > 0) {

            html += '<tr>';
            html += createHeader(html, options);
            html += '</tr>';

            $.each(objArray, function (index, objSingle) {
                html += '<tr>';
                html = createTd(html, objSingle, options);
                html += '</tr>';
            });
        }

        return html;
    }


    $.fn.convertJsonToHtml = function (data, options) {

        var jsonObj = $.parseJSON(data);
        var html = '<table border="1">';

        if(options) {
            return createWithOption(html,jsonObj, options);
        }

        $.each(jsonObj, function(index, obje){
            html += '<tr>';
            $.each(obje, function(key, value){
                html += '<td>' + key + '</td>';
                html += '<td>' + value + '</td>';
            });
            html += '</tr>';
        });
        html += '</table>';

        return html;

    };

    $.fn.tableExport = function (options, isUpdate) {

        var $this = this,
            settings = isUpdate ? options : $.extend({}, $.fn.tableExport.defaults, options),
            rowD = $.fn.tableExport.rowDel,
            ignoreRows = settings.ignoreRows instanceof Array ? settings.ignoreRows : [settings.ignoreRows],
            ignoreCols = settings.ignoreCols instanceof Array ? settings.ignoreCols : [settings.ignoreCols],
            ignoreCSS = settings.ignoreCSS instanceof Array ? settings.ignoreCSS.join(", ") : settings.ignoreCSS,
            bootstrapClass, bootstrapTheme, bootstrapSpacing;

        if (settings.bootstrap) {
            bootstrapClass = $.fn.tableExport.bootstrap[0] + " ";
            bootstrapTheme = $.fn.tableExport.bootstrap[1] + " ";
            bootstrapSpacing = $.fn.tableExport.bootstrap[2] + " ";
        } else {
            bootstrapClass = $.fn.tableExport.defaultButton + " ";
            bootstrapTheme = bootstrapSpacing = "";
        }

        $this.each(function () {
            var $el = $(this);
            if (isUpdate) { $el.find('caption:not(.head)').remove();}
            var $rows = $el.find('tbody').find('tr'),
                $rows = settings.headings ? $rows.add($el.find('thead>tr')) : $rows,
                $rows = settings.footers ? $rows.add($el.find('tfoot>tr')) : $rows,
                thAdj = settings.headings ? $el.find('thead>tr').length : 0,
                fileName = settings.fileName === "id" ? ($el.attr('id') ? $el.attr('id') : $.fn.tableExport.defaultFileName) : settings.fileName,
                exporters = {
                    xlsx: function (rDel, name) {
                        var dataURL = $rows.map(function (i, val) {
                                if (!!~ignoreRows.indexOf(i-thAdj) || $(val).is(ignoreCSS)) { return;}
                                var $cols = $(val).find('th, td');
                                return [$cols.map(function (i, val) {
                                    if (!!~ignoreCols.indexOf(i) || $(val).is(ignoreCSS)) { return;}
                                    return $(val).text();
                                }).get()];
                            }).get(),
                            dataObject =
                                JSON.stringify({
                                    data: dataURL,
                                    fileName: name,
                                    mimeType: $.fn.tableExport.xlsx.mimeType,
                                    fileExtension: $.fn.tableExport.xlsx.fileExtension
                                });
                        downloadFile(dataObject);
                    },
                    xls: function (rdel, name) {
                        var colD = $.fn.tableExport.xls.separator,
                            dataURL = $rows.map(function (i, val) {
                                if (!!~ignoreRows.indexOf(i-thAdj) || $(val).is(ignoreCSS)) { return;}
                                var $cols = $(val).find('th, td');
                                return $cols.map(function (i, val) {
                                    if (!!~ignoreCols.indexOf(i) || $(val).is(ignoreCSS)) { return;}
                                    return $(val).text();
                                }).get().join(colD);
                            }).get().join(rdel),
                            dataObject =
                                JSON.stringify({
                                    data: dataURL,
                                    fileName: name,
                                    mimeType: $.fn.tableExport.xls.mimeType,
                                    fileExtension: $.fn.tableExport.xls.fileExtension
                                });
                        downloadFile(dataObject);
                    },
                    csv: function (rdel, name) {
                        var colD = $.fn.tableExport.csv.separator,
                            dataURL = $rows.map(function (i, val) {
                                if (!!~ignoreRows.indexOf(i-thAdj) || $(val).is(ignoreCSS)) { return;}
                                var $cols = $(val).find('th, td');
                                return $cols.map(function (i, val) {
                                    if (!!~ignoreCols.indexOf(i) || $(val).is(ignoreCSS)) { return;}
                                    return $(val).text();
                                }).get().join(colD);
                            }).get().join(rdel),
                            dataObject =
                                JSON.stringify({
                                    data: dataURL,
                                    fileName: name,
                                    mimeType: $.fn.tableExport.csv.mimeType,
                                    fileExtension: $.fn.tableExport.csv.fileExtension
                                });
                        downloadFile(dataObject);
                    },
                    txt: function (rdel, name) {
                        var colD = $.fn.tableExport.txt.separator,
                            dataURL = $rows.map(function (i, val) {
                                if (!!~ignoreRows.indexOf(i-thAdj) || $(val).is(ignoreCSS)) { return;}
                                var $cols = $(val).find('th, td');
                                return $cols.map(function (i, val) {
                                    if (!!~ignoreCols.indexOf(i) || $(val).is(ignoreCSS)) { return;}
                                    return $(val).text();
                                }).get().join(colD);
                            }).get().join(rdel),
                            dataObject =
                                JSON.stringify({
                                    data: dataURL,
                                    fileName: name,
                                    mimeType: $.fn.tableExport.txt.mimeType,
                                    fileExtension: $.fn.tableExport.txt.fileExtension
                                });
                        downloadFile(dataObject);
                    }
                };

            settings.formats.forEach(
                function (key) {
                    exporters[key](rowD, fileName);
                }
            );

            function downloadFile(dataObject){
                var object = JSON.parse(dataObject),
                    data = object.data,
                    fileName = object.fileName,
                    mimeType = object.mimeType,
                    fileExtension = object.fileExtension;
                export2file(data, mimeType, fileName, fileExtension);
            }
        });

        $.fn.tableExport.update = function (options) {
            $this.tableExport($.extend({}, settings, options), true)
        };

        $.fn.tableExport.reset = function (options) {
            $this.tableExport(settings, true)
        };

        $.fn.tableExport.remove = function (options) {
            $this.each(function () {
                $(this).find('caption:not(.head)').remove();
            });
        };

        return $this;
    };

    // Define the plugin default properties.
    $.fn.tableExport.defaults = {
        headings: true,                             // (Boolean), display table headings (th or td elements) in the <thead>, (default: true)
        footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
        formats: ["xls", "csv", "txt"],             // (String[]), filetype(s) for the export, (default: ["xls", "csv", "txt"])
        fileName: "id",                             // (id, String), filename for the downloaded file, (default: "id")
        bootstrap: true,                            // (Boolean), style buttons using bootstrap, (default: true)
        position: "bottom",                         // (top, bottom), position of the caption element relative to table, (default: "bottom")
        ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file (default: null)
        ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file (default: null)
        ignoreCSS: ".tableexport-ignore"            // (selector, selector[]), selector(s) to exclude from the exported file (default: ".tableexport-ignore")
    };

    $.fn.tableExport.charset = "charset=utf-8";

    $.fn.tableExport.xlsx = {
        defaultClass: "xlsx",
        buttonContent: "Export to xlsx",
        mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        fileExtension: ".xlsx"
    };

    $.fn.tableExport.xls = {
        defaultClass: "xls",
        buttonContent: "Export to xls",
        separator: "\t",
        mimeType: "application/vnd.ms-excel",
        fileExtension: ".xls"
    };

    $.fn.tableExport.csv = {
        defaultClass: "csv",
        buttonContent: "Export to csv",
        separator: ",",
        mimeType: "application/csv",
        fileExtension: ".csv"
    };

    $.fn.tableExport.txt = {
        defaultClass: "txt",
        buttonContent: "Export to txt",
        separator: "  ",
        mimeType: "text/plain",
        fileExtension: ".txt"
    };

    $.fn.tableExport.defaultFileName = "myDownload";

    $.fn.tableExport.defaultButton = "button-default";

    $.fn.tableExport.bootstrap = ["btn", "btn-default", "btn-toolbar"];

    $.fn.tableExport.rowDel = "\r\n";

    $.fn.tableExport.entityMap = {"&": "&#38;", "<": "&#60;", ">": "&#62;", "'": '&#39;', "/": '&#47'};

    function escapeHtml(string) {
        return String(string).replace(/[&<>'\/]/g, function (s) {
            return $.fn.tableExport.entityMap[s];
        });
    }

    function dateNum(v, date1904) {
        if (date1904) v += 1462;
        var epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    }

    function createSheet(data, opts) {
        var ws = {};
        var range = {s: {c: 10000000, r: 10000000}, e: {c: 0, r: 0}};
        for (var R = 0; R != data.length; ++R) {
            for (var C = 0; C != data[R].length; ++C) {
                if (range.s.r > R) range.s.r = R;
                if (range.s.c > C) range.s.c = C;
                if (range.e.r < R) range.e.r = R;
                if (range.e.c < C) range.e.c = C;
                var cell = {v: data[R][C]};
                if (cell.v == null) continue;
                var cell_ref = XLSX.utils.encode_cell({c: C, r: R});

                if (typeof cell.v === 'number') cell.t = 'n';
                else if (typeof cell.v === 'boolean') cell.t = 'b';
                else if (cell.v instanceof Date) {
                    cell.t = 'n';
                    cell.z = XLSX.SSF._table[14];
                    cell.v = dateNum(cell.v);
                }
                else cell.t = 's';

                ws[cell_ref] = cell;
            }
        }
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        return ws;
    }

    function Workbook() {
        if (!(this instanceof Workbook)) return new Workbook();
        this.SheetNames = [];
        this.Sheets = {};
    }

    function string2ArrayBuffer(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    function export2file(data, mime, name, extension) {
        if (extension === ".xlsx") {
            var wb = new Workbook(),
                ws = createSheet(data);

            wb.SheetNames.push(name);
            wb.Sheets[name] = ws;

            var wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'},
                wbout = XLSX.write(wb, wopts);

            data = string2ArrayBuffer(wbout);
        }
        saveAs(new Blob([data],
            {type: mime + ";" + $.fn.tableExport.charset}),
            name + extension);
    }

}(window));