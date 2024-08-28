var g=class{static getCaretCoordinates(e,t,i){var b,d;if(!W)throw new Error("textarea-caret-position#getCaretCoordinates should only be called in a browser");let n=(b=i==null?void 0:i.debug)!=null?b:!1;if(n){let p=document.querySelector("#input-textarea-caret-position-mirror-div");p&&((d=p.parentNode)==null||d.removeChild(p))}let r=document.createElement("div");r.id="input-textarea-caret-position-mirror-div",document.body.appendChild(r);let a=r.style,o=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,l=e.nodeName==="INPUT";a.whiteSpace="pre-wrap",l||(a.wordWrap="break-word"),a.position="absolute",n||(a.visibility="hidden"),_.forEach(p=>{if(l&&p==="lineHeight")if(o.boxSizing==="border-box"){let w=parseInt(o.height),B=parseInt(o.paddingTop)+parseInt(o.paddingBottom)+parseInt(o.borderTopWidth)+parseInt(o.borderBottomWidth),D=B+parseInt(o.lineHeight);w>D?a.lineHeight=`${w-B}px`:w===D?a.lineHeight=o.lineHeight:a.lineHeight="0"}else a.lineHeight=o.height;else a[p]=o[p]}),F?e.scrollHeight>parseInt(o.height)&&(a.overflowY="scroll"):a.overflow="hidden",r.textContent=e.value.substring(0,t),l&&(r.textContent=r.textContent.replace(/\s/g,"\xA0"));let u=document.createElement("span");u.textContent=e.value.substring(t)||".",r.appendChild(u);let c={top:u.offsetTop+parseInt(o.borderTopWidth),left:u.offsetLeft+parseInt(o.borderLeftWidth),height:parseInt(o.lineHeight)};return n?u.style.backgroundColor="#aaa":document.body.removeChild(r),c}},_=["direction","boxSizing","width","height","overflowX","overflowY","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderStyle","paddingTop","paddingRight","paddingBottom","paddingLeft","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","lineHeight","fontFamily","textAlign","textTransform","textIndent","textDecoration","letterSpacing","wordSpacing","tabSize","MozTabSize"],W=typeof window!="undefined",F=W&&window.mozInnerScreenX!=null;var f=class{static initializeBackgroundHandlers(){this.clipboardState===0&&(globalThis.addEventListener("paste",e=>{this.clipboardState===2&&this.resolveClipboard(e.clipboardData.getData("text"))}),this.clipboardState=1)}static async readClipboardText(){if(globalThis.navigator.clipboard.readText)return await globalThis.navigator.clipboard.readText();try{return await new Promise((e,t)=>{this.clipboardState=2,this.resolveClipboard=e,this.rejectClipboard=t})}finally{this.clipboardState=1,this.resolveClipboard=null,this.rejectClipboard=null}}static subscribeKeyEvents(e,t,i){let n=a=>{t(a.code,a.key,this.getModifiers(a))&&this.clipboardState!==2&&a.preventDefault()};e.addEventListener("keydown",n);let r=a=>{i(a.code,a.key,this.getModifiers(a))&&a.preventDefault(),this.rejectClipboard&&this.rejectClipboard()};return e.addEventListener("keyup",r),()=>{e.removeEventListener("keydown",n),e.removeEventListener("keyup",r)}}static subscribeTextEvents(e,t,i,n,r){let a=c=>{i(c)&&c.preventDefault()};e.addEventListener("compositionstart",a);let o=c=>{let b=c.getTargetRanges(),d=-1,p=-1;b.length>0&&(d=b[0].startOffset,p=b[0].endOffset),c.inputType==="insertCompositionText"&&(d=2,p=d+2),t(c,d,p)&&c.preventDefault()};e.addEventListener("beforeinput",o);let l=c=>{n(c)&&c.preventDefault()};e.addEventListener("compositionupdate",l);let u=c=>{r(c)&&c.preventDefault()};return e.addEventListener("compositionend",u),()=>{e.removeEventListener("compositionstart",a),e.removeEventListener("compositionupdate",l),e.removeEventListener("compositionend",u)}}static subscribePointerEvents(e,t,i,n,r,a){let o=d=>{t(d),d.preventDefault()},l=d=>{i(d),d.preventDefault()},u=d=>{n(d),d.preventDefault()},c=d=>{r(d),d.preventDefault()},b=d=>{a(d),d.preventDefault()};return e.addEventListener("pointermove",o),e.addEventListener("pointerdown",l),e.addEventListener("pointerup",u),e.addEventListener("wheel",b),e.addEventListener("pointercancel",c),()=>{e.removeEventListener("pointerover",o),e.removeEventListener("pointerdown",l),e.removeEventListener("pointerup",u),e.removeEventListener("pointercancel",c),e.removeEventListener("wheel",b)}}static subscribeInputEvents(e,t){let i=n=>{t(n.value)&&n.preventDefault()};return e.addEventListener("input",i),()=>{e.removeEventListener("input",i)}}static subscribeDropEvents(e,t){let i=n=>{t(n)&&n.preventDefault()};return e.addEventListener("dragover",i),e.addEventListener("dragenter",i),e.addEventListener("dragleave",i),e.addEventListener("drop",i),()=>{e.removeEventListener("dragover",i),e.removeEventListener("dragenter",i),e.removeEventListener("dragleave",i),e.removeEventListener("drop",i)}}static getCoalescedEvents(e){return e.getCoalescedEvents()}static subscribeKeyboardGeometryChange(e,t){"virtualKeyboard"in navigator&&navigator.virtualKeyboard.addEventListener("geometrychange",i=>{let n=e.getBoundingClientRect(),r=i.target.boundingRect;t({x:r.x-n.x,y:r.y-n.y,width:r.width,height:r.height})})}static subscribeVisibilityChange(e){return document.addEventListener("visibilitychange",()=>{e(document.visibilityState==="visible")}),document.visibilityState==="visible"}static clearInput(e){e.value=""}static focusElement(e){e.focus()}static setCursor(e,t){t==="default"?e.style.removeProperty("cursor"):e.style.cursor=t}static setBounds(e,t,i,n,r,a){e.style.left=t.toFixed(0)+"px",e.style.top=i.toFixed(0)+"px";let{left:o,top:l}=g.getCaretCoordinates(e,a);e.style.left=(t-o).toFixed(0)+"px",e.style.top=(i-l).toFixed(0)+"px"}static hide(e){e.style.display="none"}static show(e){e.style.display="block"}static setSurroundingText(e,t,i,n){!e||(e.value=t,e.setSelectionRange(i,n),e.style.width="20px",e.style.width=`${e.scrollWidth}px`)}static getModifiers(e){let t=0;return e.ctrlKey&&(t|=2),e.altKey&&(t|=1),e.shiftKey&&(t|=4),e.metaKey&&(t|=8),t.toString()}static setPointerCapture(e,t){e.setPointerCapture(t)}static releasePointerCapture(e,t){e.hasPointerCapture(t)&&e.releasePointerCapture(t)}};f.clipboardState=0;var m=class{static addClass(e,t){e.classList.add(t)}static observeDarkMode(e){if(globalThis.matchMedia===void 0)return!1;let t=globalThis.matchMedia("(prefers-color-scheme: dark)"),i=globalThis.matchMedia("(prefers-contrast: more)");return t.addEventListener("change",n=>{e(n.matches,i.matches)}),i.addEventListener("change",n=>{e(t.matches,n.matches)}),{isDarkMode:t.matches,isHighContrast:i.matches}}static getFirstElementByClassName(e,t){let i=(t!=null?t:globalThis.document).getElementsByClassName(e);return i?i[0]:null}static createAvaloniaCanvas(e){var n;let t=(n=e.getAttribute("data-containerId"))!=null?n:"0000",i=document.createElement("canvas");return i.id=`canvas${t}`,i.classList.add("avalonia-canvas"),i.style.width="100%",i.style.height="100%",i.style.position="absolute",i}static attachCanvas(e,t){e.prepend(t)}static detachCanvas(e,t){e.removeChild(t)}static createAvaloniaHost(e){let t=Math.random().toString(36).replace(/[^a-z]+/g,"").substr(2,10);e.classList.add("avalonia-container"),e.tabIndex=0,e.setAttribute("data-containerId",t),e.oncontextmenu=function(){return!1},e.style.overflow="hidden",e.style.touchAction="none";let i=document.createElement("div");i.id=`nativeHost${t}`,i.classList.add("avalonia-native-host"),i.style.left="0px",i.style.top="0px",i.style.width="100%",i.style.height="100%",i.style.position="absolute";let n=document.createElement("input");return n.id=`inputElement${t}`,n.classList.add("avalonia-input-element"),n.autocapitalize="none",n.type="text",n.spellcheck=!1,n.style.padding="0",n.style.margin="0",n.style.borderWidth="0",n.style.position="absolute",n.style.overflow="hidden",n.style.borderStyle="hidden",n.style.outline="none",n.style.background="transparent",n.style.color="transparent",n.style.display="none",n.style.height="20px",n.style.zIndex="-1",n.onpaste=function(){return!1},n.oncopy=function(){return!1},n.oncut=function(){return!1},e.prepend(n),e.prepend(i),{host:e,nativeHost:i,inputElement:n}}static isFullscreen(){return document.fullscreenElement!=null}static async setFullscreen(e){e?await document.documentElement.requestFullscreen():await document.exitFullscreen()}static initSafeAreaPadding(){document.documentElement.style.setProperty("--av-sat","env(safe-area-inset-top)"),document.documentElement.style.setProperty("--av-sar","env(safe-area-inset-right)"),document.documentElement.style.setProperty("--av-sab","env(safe-area-inset-bottom)"),document.documentElement.style.setProperty("--av-sal","env(safe-area-inset-left)")}static getSafeAreaPadding(){let e=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--av-sat")),t=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--av-sab")),i=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--av-sal")),n=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--av-sar"));return[i,e,t,n]}};var S=class{static hasNativeFilePicker(){return"showSaveFilePicker"in globalThis}static isMobile(){var r;let e=(r=globalThis.navigator)==null?void 0:r.userAgentData;if(e)return e.mobile;let t=navigator.userAgent,i=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,n=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i;return i.test(t)||n.test(t.substr(0,4))}static isTv(){return navigator.userAgent.includes("SmartTV")}};var I=typeof SharedArrayBuffer!="undefined";function T(s){return I&&s[Symbol.toStringTag]==="SharedArrayBuffer"}var L=class{static async seek(e,t){return await e.seek(t)}static async truncate(e,t){return await e.truncate(t)}static async close(e){return await e.close()}static async write(e,t,i,n){var o;let r=(o=globalThis.getDotnetRuntime(0))==null?void 0:o.localHeapViewU8(),a;if(t._pointer>0&&t._length>0&&r&&!T(r.buffer))a=new Uint8Array(r.buffer,t._pointer+i,n);else{let l=new Uint8Array(n);t.copyTo(l,i),a=t}return await e.write(a)}static byteLength(e){return e.size}static async sliceArrayBuffer(e,t,i){let n=await e.slice(t,t+i).arrayBuffer();return new Uint8Array(n)}static toMemoryView(e){return e}};var z=class{},H=class{static createDefaultChild(e){return document.createElement("div")}static createAttachment(){return new z}static initializeWithChildHandle(e,t){e._child=t,e._child.style.position="absolute"}static attachTo(e,t){e._host&&e._child&&e._host.removeChild(e._child),e._host=t,e._host&&e._child&&e._host.appendChild(e._child)}static showInBounds(e,t,i,n,r){e._child&&(e._child.style.top=`${i}px`,e._child.style.left=`${t}px`,e._child.style.width=`${n}px`,e._child.style.height=`${r}px`,e._child.style.display="block")}static hideWithSize(e,t,i){e._child&&(e._child.style.width=`${t}px`,e._child.style.height=`${i}px`,e._child.style.display="none")}static releaseChild(e){e._child&&(e._child=void 0)}};var k=class{static addBackHandler(e){history.pushState(null,"",window.location.href),window.onpopstate=()=>{e()?history.forward():history.back()}}};var P=class{static itemsArrayAt(e,t){let i=e[t];if(!i)return[];let n=[];for(let r=0;r<i.length;r++)n[r]=i[r];return n}static itemAt(e,t){return e[t]}static callMethod(e,t){let i=Array.prototype.slice.call(arguments,2);return e[t].apply(e,i)}};var A=class{static runAnimationFrames(e){function t(i){e(i)&&window.requestAnimationFrame(t)}window.requestAnimationFrame(t)}};var v=(i=>(i[i.Software2D=1]="Software2D",i[i.WebGL1=2]="WebGL1",i[i.WebGL2=3]="WebGL2",i))(v||{}),y=class{constructor(e,t){this.context=e;this.mode=t}};var C=class{static observeSize(e,t){return this.resizeObserver||(this.resizeObserver=new ResizeObserver(this.onResize),this.resizeObserver.callbacks=new Map),this.resizeObserver.callbacks.set(e,t),this.resizeObserver.observe(e,{box:"content-box"}),()=>{var i,n;(i=this.resizeObserver)==null||i.callbacks.delete(e),(n=this.resizeObserver)==null||n.unobserve(e)}}static onResize(e,t){for(let i of e){let n=t.callbacks.get(i.target);if(!n)continue;let r=window.devicePixelRatio,a,o,l=r;i.devicePixelContentBoxSize?(a=i.devicePixelContentBoxSize[0].inlineSize,o=i.devicePixelContentBoxSize[0].blockSize,l=1):i.contentBoxSize?i.contentBoxSize[0]?(a=i.contentBoxSize[0].inlineSize,o=i.contentBoxSize[0].blockSize):(a=i.contentBoxSize.inlineSize,o=i.contentBoxSize.blockSize):(a=i.contentRect.width,o=i.contentRect.height);let u=Math.round(a*l),c=Math.round(o*l);n(u,c,r)}}};var h=class extends y{constructor(t,i,n){super(i,n);this.canvas=t;this.context=i;this.mode=n;C.observeSize(t,(r,a,o)=>{this.sizeParams=[r,a,o],this.sizeChangedCallback&&this.sizeChangedCallback(r,a,o)})}destroy(){delete this.sizeChangedCallback}onSizeChanged(t){if(this.sizeChangedCallback)throw new Error("For simplicity, we don't support multiple size changed callbacks per surface, not needed yet.");this.sizeChangedCallback=t}ensureSize(){this.sizeParams&&(this.canvas.width=this.sizeParams[0],this.canvas.height=this.sizeParams[1],delete this.sizeParams)}};var E=class extends h{constructor(t){let i=t.getContext("2d",{alpha:!0});if(!i)throw new Error("HTMLCanvasElement.getContext(2d) returned null.");super(t,i,1);this.canvas=t;this.runtime=globalThis.getDotnetRuntime(0)}putPixelData(t,i,n){var l;this.ensureSize();let r=(l=this.runtime)==null?void 0:l.localHeapViewU8(),a;if(t._pointer>0&&t._length>0&&r&&!T(r.buffer))a=new Uint8ClampedArray(r.buffer,t._pointer,t._length);else{let u=new Uint8Array(t.byteLength);t.copyTo(u),a=new Uint8ClampedArray(u.buffer)}let o=new ImageData(a,i,n);this.context.putImageData(o,0,0)}};function N(){var t,i,n,r;let s=globalThis,e=(i=s.Module)!=null?i:(t=s.getDotnetRuntime(0))==null?void 0:t.Module;return(r=(n=e==null?void 0:e.GL)!=null?n:s.AvaloniaGL)!=null?r:s.SkiaSharpGL}var x=class extends h{constructor(t,i){var u,c;let n=N();if(!n)throw new Error("Module.GL object wasn't initialized, WebGL can't be used.");let r=i===2?"webgl":"webgl2",a={alpha:!0,depth:!0,stencil:!0,antialias:!1,premultipliedAlpha:!0,preserveDrawingBuffer:!1,failIfMajorPerformanceCaveat:!0,majorVersion:i===2?1:2,minorVersion:0,enableExtensionsByDefault:1,explicitSwapControl:0},o=t.getContext(r,a);if(!o)throw new Error(`HTMLCanvasElement.getContext(${r}) returned null.`);let l=n.registerContext(o,a);n.makeContextCurrent(l),o.gl_handle=l;super(t,o,1);this.canvas=t;this.contextHandle=l,this.fboId=(c=(u=o.getParameter(o.FRAMEBUFFER_BINDING))==null?void 0:u.id)!=null?c:0,this.stencil=o.getParameter(o.STENCIL_BITS),this.sample=o.getParameter(o.SAMPLES),this.depth=o.getParameter(o.DEPTH_BITS)}};var M=class{static create(e,t){if(!e)throw new Error("No html container was provided.");let i=m.createAvaloniaCanvas(e);m.attachCanvas(e,i);try{if(t===1)return new E(i);if(t===2||t===3)return new x(i,t);throw new Error(`Unsupported rendering mode: ${v[t]}`)}catch(n){throw m.detachCanvas(e,i),n}}static destroy(e){e.destroy()}static onSizeChanged(e,t){e.onSizeChanged(t)}static ensureSize(e){e.ensureSize()}static putPixelData(e,t,i,n){e.putPixelData(t,i,n)}};async function Le(s,e){"serviceWorker"in navigator&&await globalThis.navigator.serviceWorker.register(s,e?{scope:e}:void 0)}export{m as AvaloniaDOM,S as Caniuse,M as CanvasFactory,P as GeneralHelpers,f as InputHelper,H as NativeControlHost,k as NavigationHelper,L as StreamHelper,A as TimerHelper,Le as registerServiceWorker};
//# sourceMappingURL=avalonia.js.map