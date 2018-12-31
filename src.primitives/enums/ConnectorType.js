/*
	Enum: primitives.common.ConnectorType
		Defines diagram connectors style for dot and line elements.
	
	Squared - Connector lines use only right angles.
	Angular - Connector lines use angular lines comming from common vertex.
	Curved - Connector lines are splines comming from common vertex.
*/
primitives.common.ConnectorType =
{
	Squared: 0,
	Angular: 1,
	Curved: 2
};

primitives.orgdiagram.ConnectorType = primitives.common.ConnectorType;