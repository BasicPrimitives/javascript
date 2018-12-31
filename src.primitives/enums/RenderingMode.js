/*
	Enum: primitives.common.RenderingMode
	This enumeration is used as option in arguments of rendering events.
	It helps to tell template initialization stage, 
	for example user can widgitize some parts of template on create
	and update and refresh them in template update stage.
	
	Create - Template is just created.
	Update - Template is reused and update needed.
*/
primitives.common.RenderingMode =
{
	Create: 0,
	Update: 1
};