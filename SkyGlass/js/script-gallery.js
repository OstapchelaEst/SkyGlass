document.addEventListener('DOMContentLoaded', () => {

   function include(url) {
      let script = document.createElement('script');
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
   }
   include('../js/own-js-gallery.js')
   //=======================GALLERY============================================
   const testGallry = {};
   const galleryBody = document.querySelector('.main-gallery__body');
   function getGalleryImg(product, count) {
      for (let i = 1; i <= count; i++) {
         testGallry[(`picture-${i}`)] = {
            url: `../assets/gallery/${product}/_${i}.jpg`,
            code: i
         };
      }
      for (let key in testGallry) {
         galleryBody.innerHTML += `
         <div data-src="${testGallry[key].url}"   class="main-gallery__item">
      
         <p>Article: ${testGallry[key].code}</p>
         <img class="main-gallery-picture" src="${testGallry[key].url}" alt="picture_${testGallry[key].code}">
         </div>`;
      }
   }
   
   getGalleryImg((document.body.dataset.product), (document.body.dataset.count))

//==========================================LIGHTBOX===================================
   galleryBody.addEventListener('click', (e) => {
      if (e.target.classList.contains('main-gallery__item')) {
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
         img.src = e.target.dataset.src;
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