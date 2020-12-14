# [PDFKit Plugins](https://pdfkit.org/)
## <a name="OrgDiagramPdfkit" id="OrgDiagramPdfkit">OrgDiagramPdfkit</a>
Creates PDFKit Organizational Chart Plugin

 `OrgDiagramPdfkit` 

### Constructor

 `OrgDiagramPdfkit(options)` 

Creates PDFKit Organizational Chart Plugin

 Returns: `OrgDiagramPdfkit` - returns reference to organizational diagram pdfkit renderer instance.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `options` | OrgConfig | `` | Organizational Chart Configuration object | 

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


## <a name="FamDiagramPdfkit" id="FamDiagramPdfkit">FamDiagramPdfkit</a>
Creates PDFKit Family Diagram Plugin

 `FamDiagramPdfkit` 

### Constructor

 `FamDiagramPdfkit(options)` 

Creates PDFKit Family Diagram Plugin

 Returns: `FamDiagramPdfkit` - returns reference to family diagram pdfkit renderer instance.

| Param | Type | Default | Description | 
| --- | --- | --- | --- | 
 | `options` | FamConfig | `` | Organizational Chart Configuration object | 

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

