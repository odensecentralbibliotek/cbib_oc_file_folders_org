(function ($) {
    
    $( document ).ready(function() {
        /**
        * Mouseup event handler, bound to document.
        * Blur event handler, bound to drag handle for keyboard support.
        */
       
         /**
        * Mousemove event handler, bound to document.
        */
       Drupal.tableDrag.prototype._dragRow = Drupal.tableDrag.prototype.dragRow;
       Drupal.tableDrag.prototype.dragRow = function (event, self) {
           
                if (self.dragObject) {
                    self.currentMouseCoords = self.mouseCoords(event);

                    var y = self.currentMouseCoords.y - self.dragObject.initMouseOffset.y;
                    var x = self.currentMouseCoords.x - self.dragObject.initMouseOffset.x;

                    // Check for row swapping and vertical scrolling.
                    if (y != self.oldY) {
                      self.rowObject.direction = y > self.oldY ? 'down' : 'up';
                      self.oldY = y; // Update the old value.

                      // Check if the window should be scrolled (and how fast).
                      var scrollAmount = self.checkScroll(self.currentMouseCoords.y);
                      // Stop any current scrolling.
                      clearInterval(self.scrollInterval);
                      // Continue scrolling if the mouse has moved in the scroll direction.
                      if (scrollAmount > 0 && self.rowObject.direction == 'down' || scrollAmount < 0 && self.rowObject.direction == 'up') {
                        self.setScroll(scrollAmount);
                      }

                      // If we have a valid target, perform the swap and restripe the table.
                      var currentRow = self.findDropTargetRow(x, y);
                      if (currentRow) {
                          debugger;

                        if (self.rowObject.direction == 'down') {
                          self.rowObject.swap('after', currentRow, self);
                        }
                        else {
                          self.rowObject.swap('before', currentRow, self);
                        }
                        //update the indent to match the swapped element
                        // this also correctly updates our parentids
                          var preserve_swap_indent = $(currentRow).find('.indentation').length;
                          var elem_current_indent = $(self.rowObject.element).find('.indentation').length;
                          var indent_diff = preserve_swap_indent - elem_current_indent;
                          self.rowObject.indent(indent_diff);
                          self.restripeTable();
                      }
                    }

                    // Similar to row swapping, handle indentations.
                    if (self.indentEnabled) {

                      var xDiff = self.currentMouseCoords.x - self.dragObject.indentMousePos.x;
                      // Set the number of indentations the mouse has been moved left or right.
                      var indentDiff = Math.round(xDiff / self.indentAmount);
                      // Indent the row with our estimated diff, which may be further
                      // restricted according to the rows around this row.
                      if( self.rowObject != undefined)
                      {
                        if(is_valid_parent(self.rowObject,indentDiff))
                        {
                            var indentChange = self.rowObject.indent(indentDiff);
                            // Update table and mouse indentations.

                            self.dragObject.indentMousePos.x += self.indentAmount * indentChange * self.rtl;
                            self.indentCount = Math.max(self.indentCount, self.rowObject.indents);
                        }
                        
                      }
                    }

                    return false;
                  }
       };
       /**
        * Stub function. Allows a custom handler when a row is swapped.
        */
        Drupal.tableDrag.prototype.row.prototype.onSwap = function (swappedRow) {
          return null;
        };

        function is_valid_parent(elem,indentDiff)
        {
            var indent_count = $(elem.element).find('.indentation').length + indentDiff;
            if(indent_count <= 0 || indentDiff == 0)
            {
                return true;
            }
            var max_search_count = $(elem.element).parent().children().length;
            debugger;
            var prev_elem = $(elem.element).prev();
            var length = prev_elem.find('.indentation').length;
            var count = 0;
            while(length >= indent_count && max_search_count != count)
            {
               //we found the indent above our current one.
                prev_elem = $(prev_elem).prev(); // -> has potential for infinite loop.
                length =  $(prev_elem).find('.indentation').length;
                count++;
            }
            
            if(prev_elem.find('#is_folder').length == 0)
            {
                return false;
            }
            return true
        }
       
    });
})(jQuery)

