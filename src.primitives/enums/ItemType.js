/*
	Enum: primitives.orgdiagram.ItemType
		Defines diagram item type.
	
	Regular - Regular item.
	Assistant - Child item which is placed at separate level above all other children, but below parent item. It has connection on its side.
	Adviser - Child item which is placed at the same level as parent item. It has connection on its side.
	SubAssistant - Child item which is placed at separate level above all other children, but below parent item.  It has connection on its top.
	SubAdviser - Child item placed at the same level as parent item. It has connection on its top.
	GeneralPartner - Child item placed at the same level as parent item and visually grouped with it together via sharing common parent and children.
	LimitedPartner - Child item placed at the same level as parent item and visually grouped with it via sharing common children.
	AdviserPartner - Child item placed at the same level as parent item. It has connection on its side. It is visually grouped with it via sharing common children.
*/
primitives.orgdiagram.ItemType =
{
	Regular: 0,

	Assistant: 1,
	SubAssistant: 4,
	SuperAssistant: 10,

	SuperAdviser: 9,
	SubAdviser: 5,
	Adviser: 2,

	Director: 11,

	GeneralPartner: 6,
	LimitedPartner: 7,
	AdviserPartner: 8
};