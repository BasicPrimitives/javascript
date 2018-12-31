<?php 
	// Connect to your Database 
	mysql_connect("localhost", "username", "password") or die(mysql_error()); 
	mysql_select_db("test") or die(mysql_error()); 
 
	// Select accounts
	$response = mysql_query("SELECT id as record_id, parentid, title, description, phone, email, photo, itemtype FROM accounts") or die(mysql_error()); 
   
	// create some class for your records
	class Account
	{
		public $id = 0;
		public $parent = null;
		public $itemType = 0;
		public $title = '';
		public $description = '';
		public $phone = '';
		public $email = '';
		public $photo = '';
		
		public function load($record) {
			$this->id = $record['record_id'];
			$this->parent = $record['parentid'];
			$this->itemType = intval($record['itemtype']);
			$this->title = $record['title'];
			$this->description = $record['description'];
			$this->phone = $record['phone'];
			$this->email = $record['email'];
			$this->image = "../images/photos/" . $record['photo'];
			$this->href = "showdetails.php?recordid=" . $this->id;
		} 
	}
	
	// create hash and group all children by parentid
	$items = Array();
	while($record = mysql_fetch_array( $response )) 
	{ 
		$account = new Account();
		$account->load($record);
		
		array_push($items, $account);
	} 

	function encodeURIComponent($str) {
        $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
        return strtr(rawurlencode($str), $revert);
    }
	
	// serialize $rootAccount object including all its children into JSON string  
	$jsonstring = encodeURIComponent(json_encode($items));

	echo $jsonstring;
?>