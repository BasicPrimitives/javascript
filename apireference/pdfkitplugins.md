# [PDFKit Plugins](https://pdfkit.org/)
## <a name="primitives.pdf.orgdiagram.Plugin">Plugin</a>
Creates PDFKit Organizational Chart Plugin

 `primitives.pdf.orgdiagram.Plugin` 

### Constructor

 `Plugin(options)` 

Creates PDFKit Organizational Chart Plugin

 Returns: `orgdiagram` - returns reference to organizational chart pdfkit renderer instance.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `options` | Config | `` | Organizational Chart Configuration object | 

### Functions

 `draw(doc, positionX, positionY)` 

Calculates size of the diagram required to render all nodes without truncation.

 Returns: `Size` - returns size of the diagram

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `doc` | object | `` | PDFKit document | 
 | `positionX` | number | `` | Diagram placement X coordinate | 
 | `positionY` | number | `` | Diagram placement Y coordinate | 

 `getSize()` 

Calculates size of the diagram required to render all nodes without truncation.

 Returns: `Size` - returns size of the diagram


## <a name="primitives.pdf.famdiagram.Plugin">Plugin</a>
Creates PDFKit Family Diagram Plugin

 `primitives.pdf.famdiagram.Plugin` 

### Constructor

 `Plugin(options)` 

Creates PDFKit Family Diagram Plugin

 Returns: `orgdiagram` - returns reference to family chart pdfkit renderer instance.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `options` | Config | `` | Family Diagram Configuration object | 

### Functions

 `draw(doc, positionX, positionY)` 

Calculates size of the diagram required to render all nodes without truncation.

 Returns: `Size` - returns size of the diagram

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `doc` | object | `` | PDFKit document | 
 | `positionX` | number | `` | Diagram placement X coordinate | 
 | `positionY` | number | `` | Diagram placement Y coordinate | 

 `getSize()` 

Calculates size of the diagram required to render all nodes without truncation.

 Returns: `Size` - returns size of the diagram

