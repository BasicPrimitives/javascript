/**
 * @typedef {number} ItemType
 **/

/**
 * This enumeration defines child node placement relative to its parent node. By default all children that belong 
 * to a parent node are of the same rank and status between each other and due to that, are always aligned below
 * the parent and are organized in the same way. However for special cases were the end user wishes to have a child
 * that is seperate from the rest of it's siblings, we provide custom child types that the end user can use to
 * place diffrent ranking nodes anywhere around the parent node. These placement options give a lot of space for
 * the creation of roles such as an Assistant, Adviser, various Partners and co-heads that may be in the organization.
 * Additionally, by default a node's regular children are always placed in a horizontal line below the parent node. See children
 * placement type options for regular children layout.
 *  
 * @enum {ItemType}
 */
primitives.orgdiagram.ItemType = {
  /**
   * Regular node is a default placement of child nodes in form of horizontal row.
   */
  Regular: 0,
  /**
   * Adviser is drawn at the same row as parent node on the left or right side and connected horizontally to it. 
   */
  Adviser: 2,
  /**
   * Assitant node is drawn at row in between parent and child rows and connected horizontally
   * to connection line going from parent to the regualr children
   */
  Assistant: 1,
  /**
   * Sub assitant is variation of assitant node type.
   * It has the same placement but it is connected by the top side of the node to the connector line going to the parent node.
   */
  SubAssistant: 4,
  /**
   * Sub adviser is variation of adviser node type.
   * It has the same placement but it is connected by the top side of the node to the connector line going to the parent node.
   */
  SubAdviser: 5,
  /**
   * General partner is immitation of multiple inheritance in the oraganizational chart hierarchy.
   * General partner node is drawn side by side with its parent and remaining regular children
   * are visually connected to both of them like they are their parents.
   * Another layout feature of the general partner is that it is connected to parents of its immediate logical parent as well,
   * so visually it becomes a child of its grand parent.
   */
  GeneralPartner: 6,
  /**
   * Limited partner is variation of general partner. The only difference is that is is not conencte to its logical grand parent.
   */
  LimitedPartner: 7,
  /**
   * Adviser partner is a variation of limited partner. The only difference is that it has an extra connection line to its parent.
   */
  AdviserPartner: 8
};