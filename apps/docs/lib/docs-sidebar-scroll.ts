/**
 * Sidebar scroll restore (shadcn pattern).
 * Inline script in <head> restores scrollTop before paint when navigating docs.
 */
export const DOCS_SIDEBAR_SCROLL_STORAGE_KEY = "atroui.docs-sidebar-scroll"

export const DOCS_SIDEBAR_SCROLL_RESTORE_SCRIPT = `(function(){try{var k=${JSON.stringify(DOCS_SIDEBAR_SCROLL_STORAGE_KEY)};var raw=sessionStorage.getItem(k);if(!raw)return;var s=JSON.parse(raw);if(!s||s.pathname!==location.pathname)return;var el=document.querySelector('[data-slot="docs-sidebar"]');if(el)el.scrollTop=s.scrollTop||0}catch(e){}})();`
