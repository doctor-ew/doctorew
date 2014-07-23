<?php

class Hexy {

	public function strToHex($string) {
		$hex='';
		for ($i=0; $i < strlen($string); $i++) {
			$hex .= dechex(ord($string[$i]));
		}
		echo $hex;
		return $hex;
	}
}
	$hexy = new Hexy();
	$arg = (string)$_POST['arg'];
	$hexy->strToHex( $arg );

?>