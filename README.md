This is a forked project from https://www.clarketravis.com/tableexport/

## Getting Started

### Download and Setup

To use this plugin, include the [jQuery](https://jquery.com) library, [FileSaver.js](https://github.com/eligrey/FileSaver.js/) script, and [TableExporter.js] plugin before the closing `<body>` tag of your HTML document:

```html
<script src="jquery.js"></script>
<script src="filesaver.js"></script>
 ...
<script src="tableexporter.js"></script>
```

### Install with Bower

```shell
$ bower install tableexport.js
```

### Install with npm
```shell
$ npm install tableexport
```

### Dependencies

##### Required:

* [jQuery](https://jquery.com) (1.2.1 or higher)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js/)


##### Add-Ons:
In order to provide **Office Open XML SpreadsheetML Format ( .xlsx )** support, you must include the following third-party script to your project before [FileSaver.js](https://github.com/eligrey/FileSaver.js/) and [TableExport.js](http://www.clarketravis.com/tableexport).

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
$("table").tableExport({formats: ['<format: eg. xlsx>']});
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

A table of available properties and their usage can be found here:
##### [www.clarketravis.com/tableexport](http://www.clarketravis.com/tableexport/#properties)


### Methods

A table of available methods and their usage can be found here:
##### [www.clarketravis.com/tableexport](http://www.clarketravis.com/tableexport/#methods)

### Browser Support

|  | Chrome | Firefox | IE *  | Opera | Safari |
| :------: | :------: | :-------: | :---: | :-----: | :------: |
| __Android__ * |    &#10003;   |    &#10003;    | - |   &#10003;   |  -   |
| __iOS__ * |    &#10003;   |  -    | - |   -   |   &#10003;    |
| **Mac OSX**|    &#10003;   |    &#10003;    | - |   &#10003;  |   &#10003;    |
| **Windows** |    &#10003;   |    &#10003;    | &#10003; |   &#10003;   |   &#10003;    |

*requires third-party dependencies

### License
[TableExport.js](http://www.clarketravis.com/tableexport) is licensed under the terms of the [MIT](http://opensource.org/licenses/mit-license.php) License

### Credits

* [John Resig](https://github.com/jeresig) - jQuery
* [SheetJS](https://github.com/SheetJS) - js-xlsx 
* [Eli Grey](https://github.com/eligrey) - FileSaver.js & Blob.js
