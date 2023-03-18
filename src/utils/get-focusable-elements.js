/**
 * Returns back a NodeList of focusable elements
 * that exist within the passed parnt HTMLElement
 *
 * @param {HTMLElement} parent HTML element
 * @returns {NodeList} The focusable elements that we can find
 * @author: Andy Bell
 * @see: https://piccalil.li/tutorial/build-a-fully-responsive-progressively-enhanced-burger-menu/
 */
export default (parent) => {
  if (!parent) {
    console.warn("You must pass a parent element!");
    return [];
  }

  return parent.querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)',
  );
};
