/*
	Enum: primitives.common.PageFitMode
		Defines diagram auto fit mode.
	
	None - All diagram items are shown in normal template mode.
	PageWidth - Diagram tries to layout and auto size items in order to fit diagram into available page width.
	PageHeight - Diagram tries to layout and auto size items in order to fit diagram into available page height.
	FitToPage - Diagram tries to layout and auto size items in order to fit diagram into available page size.
	AutoSize - Chart sets its placeholder div size to fit its contents without minimizing items.
*/
primitives.common.PageFitMode =
{
	None: 0,
	PageWidth: 1,
	PageHeight: 2,
	FitToPage: 3,
	AutoSize: 5,
	SelectionOnly: 6
};

primitives.orgdiagram.PageFitMode = primitives.common.PageFitMode;