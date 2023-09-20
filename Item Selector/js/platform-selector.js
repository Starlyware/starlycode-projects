document.getElementById('category').addEventListener('change', function () {
    //Gets the selected category
    var selectedCategory = this.value;
  
    //Gets the item drop-down menu
    var itemDropdown = document.getElementById('item');
  
    //Hides all options in the item drop-down menu
    for (var i = 0; i < itemDropdown.options.length; i++) {
      itemDropdown.options[i].style.display = 'none';
    }
  
    //Show only the right items for the selected category
    var items = document.querySelector('option[value="' + selectedCategory + '"]').getAttribute('data-items').split(',');
    for (var j = 0; j < items.length; j++) {
      var itemOption = document.querySelector('option[value="' + items[j].trim() + '"]');
      if (itemOption) {
        itemOption.style.display = 'block';
      }
    }
  
    //Resets the item drop-down menu to the first visible option
    for (var k = 0; k < itemDropdown.options.length; k++) {
      if (itemDropdown.options[k].style.display !== 'none') {
        itemDropdown.value = itemDropdown.options[k].value;
        break;
      }
    }
  });