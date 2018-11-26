<?php
$header = $variables['header'];
$rows = $variables['rows'];
$attributes = $variables['table_attributes'];
?>
<table <?php echo drupal_attributes($attributes) ?>>
    <thead>
        <tr>
            <?php
            $output = "";
            $ts = tablesort_init($header);
            foreach ($header as $cell) {
                $cell = tablesort_header($cell, $header, $ts);
                $output .= _theme_table_cell($cell, TRUE);
            }
            echo $output;
            ?>
        </tr>
    </thead>
    <tbody>
        <?php
        /*
         * Output the data rows
         */
        $output = "";
        $flip = array('even' => 'odd', 'odd' => 'even');
        $class = 'even';
        foreach ($rows as $number => $row) {
            // Check if we're dealing with a simple or complex row
            if (isset($row['data'])) {
                $cells = $row['data'];
                $no_striping = isset($row['no_striping']) ? $row['no_striping'] : FALSE;

                // Set the attributes array and exclude 'data' and 'no_striping'.
                $attributes = $row;
                unset($attributes['data']);
                unset($attributes['no_striping']);
                unset($attributes['widget']);
                unset($attributes['children']);
            } else {
                $cells = $row;
                $attributes = array();
                $no_striping = FALSE;
            }
            if (count($cells)) {
                // Add odd/even class
                if (!$no_striping) {
                    $class = $flip[$class];
                    $attributes['class'][] = $class;
                }

                // Build row
                echo ' <tr' . drupal_attributes($attributes) . '>';
                $i = 0;
                foreach ($cells as $cell) {
                    $cell = tablesort_cell($cell, $header, $ts, $i++);
                    echo _theme_table_cell($cell);
                }
                echo " </tr>\n";
            }
            if (sizeof($row['children']) > 0) {
                echo oc_file_folders_render_children($row['children'], $header, $ts, $class);
            }
        }
        //echo $output;
        ?>    
    </tbody>
</table>
