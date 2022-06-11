document.addEventListener('DOMContentLoaded', () => {

   const iconMenu = document.querySelector('.menu__icon');
   const main = document.querySelector('.main');
   const logo = document.querySelector('.menu__logo');
   const header = document.querySelector('.header');

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



   //=============anchors=====================

   const anchors = document.querySelectorAll('[data-anchor]');
   for (let anchor of anchors) {
      anchor.addEventListener('click', (e) => {
         let hasMenuOpen = document.documentElement.classList.contains('menu-open');
         e.preventDefault();
         if (hasMenuOpen) {
            document.documentElement.classList.remove('menu-open');
            document.documentElement.classList.remove('_lock');
            main.classList.remove('blur')
            logo.classList.remove('blur')
         }
         const blockID = anchor.dataset.anchor;
         let cordY = (document.querySelector('#' + blockID).offsetTop);
         if (document.documentElement.clientWidth <= 768) {
            cordY += 82;
         }
         window.scrollTo({
            top: cordY,
            behavior: 'smooth'
         })
      })
   }


   //==================FORM=========================================
   const wrapper = document.querySelector('.wrapper');
   const upForm = document.querySelector('.up-form');
   const buttonForm = document.getElementById('mail');
   const upFormCLose = document.querySelector('.up-form__close');

   buttonForm.addEventListener('click', (e) => {
      e.preventDefault()
      document.documentElement.classList.add('_lock');
      upForm.classList.add('_active-up');
      wrapper.classList.add('blur')
   })

   upFormCLose.addEventListener('click', () => {
      upForm.classList.remove('_active-up');
      document.documentElement.classList.remove('_lock');
      wrapper.classList.remove('blur')
   })

   //====================================================

   const form = document.querySelector('.form');

   form.addEventListener('submit', formSend)
   async function formSend(e) {
      e.preventDefault();
      let error = formValidate(form);
      let formData = new FormData(form);
      if (error == 0) {
         form.classList.add('_wait')
         let response = await fetch('mySendMail.php', {
            method: 'POST',
            body: formData,
         })
         if (response.ok) {
            let result = await response.json()
            alert(result.message);
            form.reset();
            form.classList.remove('_wait')
         }
         else {
            form.classList.remove('_wait')
            alert('Ошибка')

         }
      }
   }

   function formValidate(form) {
      let error = 0;
      const validInputs = document.querySelectorAll('._valid');
      for (let i = 0; i < validInputs.length; i++) {
         const element = validInputs[i];
         removeError(element)
         if (element.classList.contains('form__mail')) {
            if (!emailTest(element)) {
               addError(element)
               error++
            }
         }
         else {
            if (element.value === '') {
               addError(element)
               error++
            }
         }
      }
      return error
   }

   function addError(element) {
      element.classList.add('_error')
   }
   function removeError(element) {
      element.classList.remove('_error')
   }
   function emailTest(element) {
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(element.value)
   }




   //=============================SWIPER====================================================



   const swiper = new Swiper('.swiper', {
      slidesPerView: 1,
      autoHeight: false,
      spaceBetween: 20,
      breakpoints: {
         900: {
            slidesPerView: 3,
            spaceBetween: 10,
         },
         600: {
            slidesPerView: 2,
            spaceBetween: 10,
         },

      },
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },

   });
   //==========================================LIGHTBOX===================================
   const swiperBlock = document.querySelector('.swiper');
   swiperBlock.addEventListener('click', (e) => {
      if (e.target.classList.contains('slide-img')) {
         const lightBox = document.createElement('div');
         lightBox.classList.add('lightbox');
         lightBox.innerHTML = `
         <div class="lightbox__close">
         <span></span>
         <span></span>
      </div>
         `
         document.body.append(lightBox);

         const img = document.createElement('img');
         img.src = e.target.src;
         lightBox.append(img);
         document.documentElement.classList.add('_lock');
         main.classList.add('blur');
         header.classList.add('blur');
         lightBox.addEventListener('click', closeLightBox)
      }
   })
   function closeLightBox(e) {
      if (e.target.classList.contains('lightbox') || e.target.classList.contains('lightbox__close')) {
         removeValueLightBox()
      }
   }
   function removeValueLightBox() {
      main.classList.remove('blur');
      header.classList.remove('blur');
      document.documentElement.classList.remove('_lock');
      document.querySelector('.lightbox').remove();
   }
})


const testArry = [1, 7, 8, 12, 4, 32, 9, 0];

function bubleSort(arr) {
   for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i; j++) {
         if (arr[j] > arr[j + 1]) {
            const buff = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = buff;
         }
      }
   }
   return arr;
}
bubleSort(testArry)
console.log(testArry);
function binarFind(arr, elem) {
   const MID_VALUE = Math.floor(arr.length / 2);
   if (arr[MID_VALUE] === elem) return MID_VALUE;
   else if (arr[MID_VALUE] > elem && arr.length > 1) {
      console.log(arr.slice(0, MID_VALUE));
      return binarFind(arr.slice(0, MID_VALUE), elem);
   }
   else if (arr[MID_VALUE] < elem && arr.length > 1) {
      console.log(arr.slice(MID_VALUE));
      return binarFind(arr.slice(MID_VALUE), elem);
   }
   else {
      return -1;
   }
}
console.log(binarFind(testArry, 8));

let testStr = '({})(())()';
console.log(breckets(testStr));
function breckets(str) {
   const steck = []
   const trueBrecket = ['(', '{'];
   const lastBracket = {
      ')': '(',
      '}': '{',
   }
   for (let i = 0; i < str.length; i++) {
      if (trueBrecket.includes(str[i])) {
         steck.push(str[i])
      }
      else {
         if (lastBracket[str[i]] === steck[steck.length - 1]) {
            steck.pop();
         }
         else {
            return false;
         }
      }
   }
   console.log(steck);
   return steck.length > 0 ? false : true;
}

function testFastFind(arr) {
   if (arr.length === 0) return [];
   let left = [];
   let righr = [];
   let a = arr[0];
   for (let i = 1; i < arr.length; i++) {
      a > arr[i] ? left.push(arr[i]) : righr.push(arr[i]);
   }
   console.log(arr.length);
   return testFastFind(left).concat(a, testFastFind(righr))
}

let asdsa = [2, 7, 4, 33, 12, 54, 36, 43]
console.log(testFastFind(asdsa));