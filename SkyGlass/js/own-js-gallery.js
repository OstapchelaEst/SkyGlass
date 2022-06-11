const iconMenu = document.querySelector('.menu__icon');
const main = document.querySelector('.main');
const logo = document.querySelector('.menu__logo');
const header = document.querySelector('.header');
const menuBody = document.querySelector('.menu__body');

if (iconMenu) {
   iconMenu.addEventListener("click", function (e) {
      document.documentElement.classList.toggle('menu-open');
      document.documentElement.classList.toggle('_lock');
      main.classList.toggle('blur')
      logo.classList.toggle('blur')
   });
}

window.addEventListener('resize', () => {
   if (document.documentElement.clientWidth > 768 && document.documentElement.classList.contains('menu-open')) {
      document.documentElement.classList.remove('menu-open');
      document.documentElement.classList.remove('_lock');
      main.classList.remove('blur')
      logo.classList.remove('blur')
   }
})
//==========================HEADER-SELECT===================================
const menuSelect = document.querySelector('.menu-select');
const menuSelectList = document.querySelector('.menu-select__list');
let result = '';
result = getHeightSelect();
window.addEventListener('resize', getHeightSelect)
menuSelect.addEventListener("click", showMenuSelect);

function getHeightSelect() {
   menuSelectList.style.height = `auto`
   result = menuSelectList.clientHeight + 'px';
   menuSelectList.style.height = `0px`;
   menuSelect.classList.remove('_active')
   return result
}
function showMenuSelect(e) {
   if (e.target.classList.contains('other-links')) e.preventDefault();
   menuSelect.classList.toggle('_active')
   if (!menuSelect.classList.contains('_active')) {
      return menuSelectList.style.height = `0px`
   }
   menuSelectList.style.height = result;

}
