import{S as w,a as u,i as S}from"./assets/vendor-bad0427b.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function l(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=l(e);fetch(e.href,s)}})();function c(t){S.show({close:!1,closeOnClick:!0,message:t,messageColor:"white",timeout:3e3,transitionIn:"flipInX",transitionOut:"flipOutX",position:"topRight",backgroundColor:"red",progressBar:!1})}const d=document.querySelector(".loader"),q=document.querySelector(".search-input"),I=document.querySelector(".form"),a=document.querySelector("#loadBtn"),m=document.querySelector("#gallery");let P=new w(".gallery a",{showCounter:!1});const A="41936359-935dea1b7e7e76694a23c8d00",f="https://pixabay.com/api/";u.defaults.baseURL=f;let g=innerHeight,n=1;const h=40;let y;window.scrollBy(0,g);I.addEventListener("submit",O);a.addEventListener("click",M);async function O(t){t.preventDefault(),$(),y=q.value,await v()}async function v(){try{const i=(await u.get(f,{params:C()})).data;if(i.hits.length===0)return c("Sorry, no images match your search query. Please try again!");B(i.hits),E(i.totalHits)}catch(t){console.error("API request error:",t),R()}finally{d.classList.add("is-hidden")}}function B(t){n+=1;const i=t.reduce((l,{largeImageURL:o,webformatURL:e,tags:s,likes:r,views:p,comments:L,downloads:b})=>l+`<li class="gallery-item">
              <a href="${o}">
              <img src="${e}" alt="${s}" />
              </a>
              <div class="image-desc">
              <div class="image-desc-item">
              <div class="image-desc-label">Likes</div>
              <div>${r}</div>
              </div>
              <div class="image-desc-item">
              <div class="image-desc-label">Views</div>
              <div>${p}</div>
              </div>
              <div class="image-desc-item">
              <div class="image-desc-label">Comments</div>
              <div>${L}</div>
              </div>
              <div class="image-desc-item">
              <div class="image-desc-label">Downloads</div>
              <div>${b}</div>
              </div>
              </div>
              </li>`,"");m.insertAdjacentHTML("beforeend",i),g=document.querySelector(".gallery-item:last-child").getBoundingClientRect().height,P.refresh()}async function M(){a.classList.add("is-hidden"),d.classList.remove("is-hidden"),await v()}function $(){a.classList.add("is-hidden"),d.classList.remove("is-hidden"),n=1,m.innerHTML=""}function C(){return{key:A,q:y,orientation:"horizontal",image_type:"photo",safesearch:!0,page:n,per_page:h}}function E(t){const i=Math.ceil(t/h);n>i?c("We're sorry, but you've reached the end of search results."):a.classList.remove("is-hidden")}function R(t){console.error("API request error:",t),c("Oops... Something went wrong. Please try again later.")}
//# sourceMappingURL=commonHelpers.js.map
