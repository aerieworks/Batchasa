<?
$results = array();

foreach ($_POST['photoIDs'] as $photoID) {
	$url = 'https://picasaweb.google.com/data/entry/api/user/default/albumid/'
		. urlencode($_POST['sourceAlbumID'])
		. '/photoid/'
		. urlencode($photoID);
	
	$postData = 
		'<entry xmlns="http://www.w3.org/2005/Atom" xmlns:gphoto="http://schemas.google.com/photos/2007">'
			. '<gphoto:albumid>' . htmlentities($_POST['targetAlbumID']) . '</gphoto:albumid>'
		. '</entry>';

	$request = new HttpRequest($url, HttpRequest::METH_POST);
	$request->addHeaders(array(
		'X-HTTP-Method-Override' => 'PATCH',
		'GData-Version' => '2',
		'If-Match' => '*')
	);
	$request->setContentType('application/xml');
	$request->addQueryData(array('oauth_token' => $_POST['authToken']));
	$request->setBody($postData);
	$request->send();

	$responseCode = $request->getResponseInfo('response_code');
	$results[] = array('photoID' => $photoID, 'responseCode' => $responseCode);

	// If the response indicated an authentication failure, stop processing and return to the client.
	//	The client will have to reauthenticate and resubmit the remaining photos.
	if ($responseCode == 401 || $responseCode == 403) {
		break;
	}
}

echo json_encode($results);
?>
