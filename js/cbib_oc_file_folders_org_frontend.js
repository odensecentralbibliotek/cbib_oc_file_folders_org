(function ($) {
    
    $( document ).ready(function() {
         debugger;
        
        $('.oc-is-folder').click(function(e){
           
            var elem = $(e.currentTarget);
            var parent = elem.parent().attr('id');
            var target = elem.find('a').attr('id');
            update_menu(parent,target);
            switch_folder(parent,target);
            
        });
        
        function update_menu(current,target)
        {
            var old = $("div[id=" + current +"]");
            var new_folder = $("div[id=" + target +"]");
            
            old.find('.oc_file_folder_navigate').remove();
            if(target != 0)
            {
                var img_path = "/sites/all/modules/custom/cbib_oc_file_folders_org/images/back.png";
                var previous_folder_link = $('<div class="file oc_file_folder_navigate"><a id="oc_folder_to_previous"><img style="margin-right:3px" src="'+img_path+'">Tilbage..</a></div>');
                previous_folder_link.find('a').click(function(e){
                    var elem =  $(e.currentTarget);
                   
                    var current = elem.parent().parent().attr('id');
                    var target =  $("a[id=" + current +"]").parent().parent().attr('id');
                    update_menu(current,target);
                    switch_folder(current,target)
                    e.preventDefault();
                });
                var to_top_folder_link = $('<div class="file oc_file_folder_navigate"><a id="oc_folder_to_top" href="0">Til Rod</a></div>');
                to_top_folder_link.find('a').click(function(e){
                    var elem =  $(e.currentTarget);
                    var target = elem.attr('href');
                    var current = elem.parent().parent().attr('id');
                    update_menu(current,target);
                    switch_folder(current,target)
                    e.preventDefault();
                });
                new_folder.prepend(previous_folder_link);
                //new_folder.prepend(to_top_folder_link);
            }
        }
        function switch_folder(current,target)
        {
            $("div[id=" + current +"]").addClass('hide_folder');
            $("div[id=" + target +"]").removeClass('hide_folder');
        }
    })
})(jQuery)