<div class="oc_file_folder_wrapper">
    <?php
    echo "<div id='0'>";
    foreach ($items as $key => $item) {
        if ($item['data']['#default_value']['is_folder']) {
            echo theme("file_oc_file_folder", array('row' => $item));
        } else {
            $file = file_load($item['data']['#file']['fid']);
            //the data is sometimes diff...perhaps try to normalize.
            if (!empty($item['data']['#file']['description']) || !empty($item['data']['description']['#value'])) {
                $file->description = !empty($item['data']['#file']['description']) ? $item['data']['#file']['description'] : $item['data']['description']['#value'];
            }
            echo "<div id='file-".$item['data']['#file']['fid']."'>" . theme_file_link(array('file' => $file)) . "</div>";
            echo cbib_oc_file_folders_org_pdfpreview_render_help($item['data']['#file']['fid'],$pdf_previews);
        }
    }
    echo "</div>";
    foreach ($items as $key => $item) {
        echo oc_file_folders_render_children_frontend($item['children'], $item['data']['mlid']['#value'],$pdf_previews);
    }
    ?>
</div>