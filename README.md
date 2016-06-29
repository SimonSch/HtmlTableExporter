## Getting Started

### Download and Setup

To use this plugin, include the [jQuery](https://jquery.com) library, [FileSaver.js](https://github.com/eligrey/FileSaver.js/) script, and [TableExporter.js] plugin before the closing `<body>` tag of your HTML document:

```html
<script src="jquery.js"></script>
<script src="filesaver.js"></script>
<script src="tableexporter.js"></script>
...
```

### Install with Bower

```shell
$ bower install table-exporter
```

### Dependencies

##### Required:

* [jQuery](https://jquery.com) (1.2.1 or higher)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js/)


##### Add-Ons:
In order to provide **Office Open XML SpreadsheetML Format ( .xlsx )** support, you must include the following third-party script to your project before [FileSaver.js](https://github.com/eligrey/FileSaver.js/) and [TableExporter](https://github.com/SimonSch/HtmlTableExporter).

* SheetJS -> [xlsx-core.js](https://github.com/SheetJS/js-xlsx)

```html
<script src="xlsx-core.js"></script>
<script src="filesaver.js"></script>
 ...
<script src="tableexporter.js"></script>
```

## Usage

### JavaScript

To use the export plugin, just call:

```js
$("table").tableExport({formats: ['< >']}); //Format of file eg. txt, csv, xls, xlsx

var html = ($().convertJsonToHtml(<JsonObj>);
$(html).tableExport({formats:['< >']});
```

Options 

simple option
```js
var options = ['<fieldName>']; //name of field fron json object
```

advanced options
```js
var options = [{fieldName: '<fieldName>', columnName: '<columnName>', type: '<type>'}]; //name of field from json object, column name alias (optional), object type (optional)
```

object type options: string, number, date; 

advanced advanced options
```
var options = [{ fieldName: '<fieldName>', type: '<type>', options:[{fieldName: '<fieldName>', columnName: '<columnName>'}]; // this if for json objects with nested arrays
```

| Property | Description | Values | Optional |
| :------: | :------: | :-------: | :---: | :-----: | :------: |
|  fieldName  |  Json object field name     | string |  yes|
|  columnName  |  Column alias name     | string | yes |
|  type  |  data type     | string, number, date | yes |
|  options  |  wololo     | object | yes |

Example

```js
var options = ['<fieldName>']; //name of field fron json object
var data = JSON.stringify(<data>);

var html = $().convertJsonToHtml(data,options);

$(html).tableExport({formats: ['xlsx']});
```


Additional properties can be passed in to customize the look and feel of your tables, buttons, and exported data.

> **Note:**  to use the xlsx filetype, you must include the third-party scripts listed in the Dependencies section.

TableExport supports additional methods (**update**, **reset** and **remove**) to control it after creation.

```js
/* Run plugin and save it to a variable */
var tables = $("table").tableExport();
```

```js
/* update */
tables.tableExport.update({
    filename: "newFile"         // pass in a new set of properties
});

/* reset */
tables.tableExport.reset();     // useful for a dynamically altered table

/* remove */
tables.tableExport.remove();     // removes caption and buttons
```

### Properties

| Property | Description | Values | Default |
| :------: | :------: | :-------: | :---: | :-----: | :------: |
|  formats  |  wololo     | wololo | wololo  |
|  filename  |  wololo     | wololo | wololo  |
|  wololo  |  wololo     | wololo | wololo  |
|  wololo  |  wololo     | wololo | wololo  |

### Methods



### Browser Support

|  | Chrome | Firefox | IE *  | Opera | Safari |
| :------: | :------: | :-------: | :---: | :-----: | :------: |
| __Android__ * |    &#10003;   |    &#10003;    | - |   &#10003;   |  -   |
| __iOS__ * |    &#10003;   |  -    | - |   -   |   &#10003;    |
| **Mac OSX**|    &#10003;   |    &#10003;    | - |   &#10003;  |   &#10003;    |
| **Windows** |    &#10003;   |    &#10003;    | &#10003; |   &#10003;   |   &#10003;    |

*requires third-party dependencies


### Credits

* [Clarke Travis] (https://www.clarketravis.com/tableexport/) - tableexport
* [John Resig](https://github.com/jeresig) - jQuery
* [SheetJS](https://github.com/SheetJS) - js-xlsx 
* [Eli Grey](https://github.com/eligrey) - FileSaver.js & Blob.js

This is a cloned project from https://www.clarketravis.com/tableexport/
