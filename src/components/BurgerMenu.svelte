<script>
  import getFocusableElements from "../utils/get-focusable-elements.js";
  import { onMount } from 'svelte';
  
  let menu;
  let focusableElements;

  export let maxWidth = 800;
  export let current;
  
  let status = 'closed';
  $: enabled = false;

  function toggleEnabled() {
    enabled = !enabled;
  }

  function toggleMenu() {
    status = (status === 'closed' ? 'open' : 'closed');

    if(enabled && status === 'open' && menu) {
      document.addEventListener('focusin', (event) => {
        if(!menu.contains(document.activeElement)) {
         toggleMenu();
        }
      });
    }
  }

  function manageFocus() {
    if (enabled) {
      focusableElements.forEach((element) =>
        element.removeAttribute("tabindex")
      );
      return;
    }

    switch (status) {
      case "open":
        focusableElements.forEach((element) =>
          element.removeAttribute("tabindex")
        );
        break;
      case "closed":
        [...focusableElements]
          .filter(
            (element) =>
              element.getAttribute("data-element") !== "burger-menu-trigger",
          )
          .forEach((element) => element.setAttribute("tabindex", "-1"));
        break;
    }
  }


  onMount(() => {
    const observer = new ResizeObserver((observedItems) => {
      const { contentRect } = observedItems[0];
      enabled = contentRect.width <= maxWidth;
    });

    observer.observe(menu);

    if(menu) {
     focusableElements = getFocusableElements(menu);
    }
  });
</script>

<div 
  class="burger-menu" 
  data-element="burger-root"
  bind:this={menu}
  {status}
  {enabled}>

  <button 
    class="burger-menu__trigger"
    data-element="burger-menu-trigger"
    type="button"
    aria-label={status === 'closed' ? "Open menu" : "Close menu"}
    aria-expanded={status === 'closed' ? "false" : "true"}
    on:click={toggleMenu}>

    <span 
      class="burger-menu__bar" 
      aria-hidden="true"
    ></span>
  </button>
  <div class="burger-menu__panel" data-element="burger-menu-panel">
    <!-- <nav aria-label="primary"> -->
    <!--     <ul role="list"> -->
    <!--       <li> -->
    <!--         <a href="/" class={current === '/' ? 'current' : ''}>Home</a> -->
    <!--       </li> -->
    <!--       <li> -->
    <!--         <a href="/blog" class={current === '/blog' ? 'current' : ''}>Blog</a> -->
    <!--       </li> -->
    <!--       <li> -->
    <!--         <a href="/projects" class={current === '/projects' ? 'current' : ''}>Projects</a> -->
    <!--       </li> -->
    <!--       <li> -->
    <!--         <a href="/resume" class={current === '/resume' ? 'current' : ''}>Resume</a> -->
    <!--       </li> -->
    <!--       <li> -->
    <!--         <a href="/about" class={current === '/about' ? 'current' : ''}>About</a> -->
    <!--       </li> -->
    <!--     </ul> -->
    <!--   </nav> -->
    <slot />
  </div>
</div>


<!-- <style> -->
<!-- .burger-menu__trigger { -->
<!--     display: none; -->
<!--   } -->
<!---->
<!--   .burger-menu__bar, -->
<!--   .burger-menu__bar::before, -->
<!--   .burger-menu__bar::after { -->
<!--     display: block; -->
<!--     width: 24px; -->
<!--     height: 3px; -->
<!--     background: var(--fg); -->
<!--     border: 1px solid var(--fg); -->
<!--     position: absolute; -->
<!--     border-radius: 3px; -->
<!--     left: 50%; -->
<!--     margin-left: -12px; -->
<!--     transition: transform 0.2s ease-in-out; -->
<!--   } -->
<!---->
<!--   .burger-menu__bar { -->
<!--     top: 50%; -->
<!--     transform: translateY(-50%); -->
<!--   } -->
<!---->
<!--   .burger-menu__bar::before, -->
<!--   .burger-menu__bar::after { -->
<!--     content: ''; -->
<!--   } -->
<!---->
<!--   .burger-menu__bar::before { -->
<!--     top: -8px; -->
<!--   } -->
<!---->
<!--   .burger-menu__bar::after { -->
<!--     bottom: -8px; -->
<!--   } -->
<!---->
<!--   .burger-menu[enabled='true'] .burger-menu__trigger { -->
<!--     display: block; -->
<!--     width: 2rem; -->
<!--     height: 2rem; -->
<!--     position: relative; -->
<!--     z-index: 2; -->
<!--     background: transparent; -->
<!--     border: none; -->
<!--     cursor: pointer; -->
<!--   } -->
<!---->
<!--   .burger-menu[enabled='true'] .burger-menu__panel { -->
<!--     position: absolute; -->
<!--     top: 0; -->
<!--     left: 0; -->
<!--     padding: 5rem 1.5rem 2rem 1.5rem; -->
<!--     width: 100%; -->
<!--     height: 100%; -->
<!--     visibility: hidden; -->
<!--     opacity: 0; -->
<!--     background: var(--bg-darker); -->
<!--     overflow-y: auto; -->
<!--     -webkit-overflow-scrolling: touch; -->
<!--     z-index: 1; -->
<!--   } -->
<!---->
<!--   .burger-menu[enabled='true'] :global(nav ul) { -->
<!--     display: block; -->
<!--   } -->
<!---->
<!--   .burger-menu[enabled='true'] :global(nav ul > * + *) { -->
<!--     margin-top: 2rem; -->
<!--   } -->
<!---->
<!--   .burger-menu[enabled='true'] :global(nav li) { -->
<!--     font-size: 1.5rem; -->
<!--   } -->
<!---->
<!--  .burger-menu[enabled='true'][status='open'] .burger-menu__panel { -->
<!--     visibility: visible; -->
<!--     opacity: 1; -->
<!--     transition: opacity 400ms ease; -->
<!--   } -->
<!---->
<!--  .burger-menu[enabled='true'][status='closed'] .burger-menu__panel > :global(*) { -->
<!--     opacity: 0; -->
<!--     transform: translateY(5rem); -->
<!--   } -->
<!---->
<!--  .burger-menu[enabled='true'][status='open'] .burger-menu__panel > :global(*) { -->
<!--     transform: translateY(0); -->
<!--     opacity: 1; -->
<!--     transition:  -->
<!--       transform 200ms cubic-bezier(0.17, 0.67, 0, 0.87) 200ms,  -->
<!--       opacity 200ms ease 200ms; -->
<!--   } -->
<!---->
<!--   .burger-menu[enabled='true'][status='open'] .burger-menu__bar::before { -->
<!--     top: 0; -->
<!--     transform: rotate(45deg); -->
<!--   } -->
<!---->
<!--  .burger-menu[enabled='true'][status='open'] .burger-menu__bar::after { -->
<!--     top: 0; -->
<!--     transform: rotate(-45deg); -->
<!--   } -->
<!---->
<!--  .burger-menu[enabled='true'][status='open'] .burger-menu__bar { -->
<!--     background: transparent; -->
<!--     border-color: transparent; -->
<!--     transform: rotate(180deg); -->
<!--   } -->
<!---->
<!-- </style> -->
