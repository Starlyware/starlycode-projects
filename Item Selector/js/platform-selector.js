/*
  Project: Item Selector
  Author: Gianluca Grasso (https://github.com/gian-grasso)
  License: http://www.apache.org/licenses/LICENSE-2.0
*/
   
const category = document.getElementById('category');
const item = document.getElementById('item');

category.addEventListener('change', () => {
  const selectedCategory = category.value;

  //Hide all items
  Array.from(item.options).forEach(opt => opt.style.display = 'none');

  //Show relevant items
  const items = category.selectedOptions[0].dataset.items.split(',');
  items.forEach(val => {
    const option = item.querySelector(`option[value="${val.trim()}"]`);
    if(option) option.style.display = 'block';
  });

  //Reset item select to first visible
  const firstVisible = Array.from(item.options).find(opt => opt.style.display !== 'none');
  if(firstVisible) item.value = firstVisible.value;
});