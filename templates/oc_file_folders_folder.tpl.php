<?php

$class = 'oc-is-folder file';
$folder_name = !empty($row['data']['#file']['description']) ? $row['data']['#file']['description'] : $row['data']['name'];
$logo = "<img style='float:left;padding-top:3px;margin-right:3px' src='/".drupal_get_path('module', 'cbib_oc_file_folders_org') . "/images/folder.png"."'>";
$output .= "<div class='".$class."'><a class='' id='".$row['data']['mlid']['#value']."' >".$logo . $folder_name."</a></div>";
echo $output;