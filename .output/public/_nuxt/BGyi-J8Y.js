import{q as w,a7 as Oe,r as L,z as ae,f as K,at as Te,l as W,ac as Fe,aK as Re,g as de,aq as je,az as Ve,a3 as ve,a8 as Y,h as qe,j as Ae,y as V,ai as ee,_ as pe,aL as ze,P as oe,T as De,O as Ee,aa as $e,aI as Le,af as Ne,av as ye,m as Ke,o as Ue,A as Ze,aM as He,w as te,I as ne,K as We,s as be,E as Qe}from"./CGfBZQGx.js";import{a as Ye}from"./CDI9_Ud4.js";import{_ as Ge}from"./DlAUqK2U.js";const Je={dark:{type:Boolean,default:null}};function Xe(e,t){return w(()=>e.dark===null?t.dark.isActive:e.dark)}let G=[],le=[];function Ie(e){le=le.filter(t=>t!==e)}function qt(e){Ie(e),le.push(e)}function At(e){Ie(e),le.length===0&&G.length!==0&&(G[G.length-1](),G=[])}function he(e){le.length===0?e():G.push(e)}function et(e){G=G.filter(t=>t!==e)}let ce,re=0;const N=new Array(256);for(let e=0;e<256;e++)N[e]=(e+256).toString(16).substring(1);const tt=(()=>{const e=typeof crypto<"u"?crypto:typeof window<"u"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{const n=new Uint8Array(t);return e.getRandomValues(n),n}}return t=>{const n=[];for(let l=t;l>0;l--)n.push(Math.floor(Math.random()*256));return n}})(),ke=4096;function me(){(ce===void 0||re+16>ke)&&(re=0,ce=tt(ke));const e=Array.prototype.slice.call(ce,re,re+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,N[e[0]]+N[e[1]]+N[e[2]]+N[e[3]]+"-"+N[e[4]]+N[e[5]]+"-"+N[e[6]]+N[e[7]]+"-"+N[e[8]]+N[e[9]]+"-"+N[e[10]]+N[e[11]]+N[e[12]]+N[e[13]]+N[e[14]]+N[e[15]]}function nt(e){return e??null}function xe(e,t){return e??(t===!0?`f_${me()}`:null)}function ot({getValue:e,required:t=!0}={}){if(Oe.value===!0){const n=e!==void 0?L(nt(e())):L(null);return t===!0&&n.value===null&&ae(()=>{n.value=`f_${me()}`}),e!==void 0&&K(e,l=>{n.value=xe(l,t)}),n}return e!==void 0?w(()=>xe(e(),t)):L(`f_${me()}`)}const lt={name:String};function at(e){return w(()=>e.name||e.for)}const Ce=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,Se=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,we=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,ie=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,ue=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,fe={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>Ce.test(e),hexaColor:e=>Se.test(e),hexOrHexaColor:e=>we.test(e),rgbColor:e=>ie.test(e),rgbaColor:e=>ue.test(e),rgbOrRgbaColor:e=>ie.test(e)||ue.test(e),hexOrRgbColor:e=>Ce.test(e)||ie.test(e),hexaOrRgbaColor:e=>Se.test(e)||ue.test(e),anyColor:e=>we.test(e)||ie.test(e)||ue.test(e)},Me=/^on[A-Z]/;function rt(){const{attrs:e,vnode:t}=W(),n={listeners:L({}),attributes:L({})};function l(){const d={},c={};for(const u in e)u!=="class"&&u!=="style"&&Me.test(u)===!1&&(d[u]=e[u]);for(const u in t.props)Me.test(u)===!0&&(c[u]=t.props[u]);n.attributes.value=d,n.listeners.value=c}return Te(l),l(),n}function it({validate:e,resetValidation:t,requiresQForm:n}){const l=Fe(Re,!1);if(l!==!1){const{props:d,proxy:c}=W();Object.assign(c,{validate:e,resetValidation:t}),K(()=>d.disable,u=>{u===!0?(typeof t=="function"&&t(),l.unbindComponent(c)):l.bindComponent(c)}),ae(()=>{d.disable!==!0&&l.bindComponent(c)}),de(()=>{d.disable!==!0&&l.unbindComponent(c)})}else n===!0&&console.error("Parent QForm not found on useFormChild()!")}const ut=[!0,!1,"ondemand"],st={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],default:!1,validator:e=>ut.includes(e)}};function dt(e,t){const{props:n,proxy:l}=W(),d=L(!1),c=L(null),u=L(!1);it({validate:$,resetValidation:q});let m=0,A;const S=w(()=>n.rules!==void 0&&n.rules!==null&&n.rules.length!==0),C=w(()=>n.disable!==!0&&S.value===!0&&t.value===!1),g=w(()=>n.error===!0||d.value===!0),Z=w(()=>typeof n.errorMessage=="string"&&n.errorMessage.length!==0?n.errorMessage:c.value);K(()=>n.modelValue,()=>{u.value=!0,C.value===!0&&n.lazyRules===!1&&T()});function f(){n.lazyRules!=="ondemand"&&C.value===!0&&u.value===!0&&T()}K(()=>n.reactiveRules,z=>{z===!0?A===void 0&&(A=K(()=>n.rules,f,{immediate:!0,deep:!0})):A!==void 0&&(A(),A=void 0)},{immediate:!0}),K(()=>n.lazyRules,f),K(e,z=>{z===!0?u.value=!0:C.value===!0&&n.lazyRules!=="ondemand"&&T()});function q(){m++,t.value=!1,u.value=!1,d.value=!1,c.value=null,T.cancel()}function $(z=n.modelValue){if(n.disable===!0||S.value===!1)return!0;const E=++m,h=t.value!==!0?()=>{u.value=!0}:()=>{},_=(x,B)=>{x===!0&&h(),d.value=x,c.value=B||null,t.value=!1},F=[];for(let x=0;x<n.rules.length;x++){const B=n.rules[x];let D;if(typeof B=="function"?D=B(z,fe):typeof B=="string"&&fe[B]!==void 0&&(D=fe[B](z)),D===!1||typeof D=="string")return _(!0,D),!1;D!==!0&&D!==void 0&&F.push(D)}return F.length===0?(_(!1),!0):(t.value=!0,Promise.all(F).then(x=>{if(x===void 0||Array.isArray(x)===!1||x.length===0)return E===m&&_(!1),!0;const B=x.find(D=>D===!1||typeof D=="string");return E===m&&_(B!==void 0,B),B===void 0},x=>(E===m&&(console.error(x),_(!0)),!1)))}const T=je($,0);return de(()=>{A!==void 0&&A(),T.cancel()}),Object.assign(l,{resetValidation:q,validate:$}),Ve(l,"hasError",()=>g.value),{isDirtyModel:u,hasRules:S,hasError:g,errorMessage:Z,validate:$,resetValidation:q}}function ge(e){return e!=null&&(""+e).length!==0}const ct={...Je,...st,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String},ft={...ct,maxlength:[Number,String]},vt=["update:modelValue","clear","focus","blur"];function mt({requiredForAttr:e=!0,tagProp:t,changeEvent:n=!1}={}){const{props:l,proxy:d}=W(),c=Xe(l,d.$q),u=ot({required:e,getValue:()=>l.for});return{requiredForAttr:e,changeEvent:n,tag:t===!0?w(()=>l.tag):{value:"label"},isDark:c,editable:w(()=>l.disable!==!0&&l.readonly!==!0),innerLoading:L(!1),focused:L(!1),hasPopupOpen:!1,splitAttrs:rt(),targetUid:u,rootRef:L(null),targetRef:L(null),controlRef:L(null)}}function gt(e){const{props:t,emit:n,slots:l,attrs:d,proxy:c}=W(),{$q:u}=c;let m=null;e.hasValue===void 0&&(e.hasValue=w(()=>ge(t.modelValue))),e.emitValue===void 0&&(e.emitValue=s=>{n("update:modelValue",s)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:r,onFocusout:a}),Object.assign(e,{clearValue:v,onControlFocusin:r,onControlFocusout:a,focus:B}),e.computedCounter===void 0&&(e.computedCounter=w(()=>{if(t.counter!==!1){const s=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,p=t.maxlength!==void 0?t.maxlength:t.maxValues;return s+(p!==void 0?" / "+p:"")}}));const{isDirtyModel:A,hasRules:S,hasError:C,errorMessage:g,resetValidation:Z}=dt(e.focused,e.innerLoading),f=e.floatingLabel!==void 0?w(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):w(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),q=w(()=>t.bottomSlots===!0||t.hint!==void 0||S.value===!0||t.counter===!0||t.error!==null),$=w(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),T=w(()=>`q-field row no-wrap items-start q-field--${$.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(f.value===!0?" q-field--float":"")+(E.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(C.value===!0?" q-field--error":"")+(C.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&q.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),z=w(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(C.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length!==0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),E=w(()=>t.labelSlot===!0||t.label!==void 0),h=w(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&C.value!==!0?` text-${t.labelColor}`:"")),_=w(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:f.value,modelValue:t.modelValue,emitValue:e.emitValue})),F=w(()=>{const s={};return e.targetUid.value&&(s.for=e.targetUid.value),t.disable===!0&&(s["aria-disabled"]="true"),s});function x(){const s=document.activeElement;let p=e.targetRef!==void 0&&e.targetRef.value;p&&(s===null||s.id!==e.targetUid.value)&&(p.hasAttribute("tabindex")===!0||(p=p.querySelector("[tabindex]")),p&&p!==s&&p.focus({preventScroll:!0}))}function B(){he(x)}function D(){et(x);const s=document.activeElement;s!==null&&e.rootRef.value.contains(s)&&s.blur()}function r(s){m!==null&&(clearTimeout(m),m=null),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,n("focus",s))}function a(s,p){m!==null&&clearTimeout(m),m=setTimeout(()=>{m=null,!(document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1))&&(e.focused.value===!0&&(e.focused.value=!1,n("blur",s)),p!==void 0&&p())})}function v(s){ve(s),u.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),n("update:modelValue",null),e.changeEvent===!0&&n("change",null),n("clear",t.modelValue),Y(()=>{const p=A.value;Z(),A.value=p})}function i(s){[13,32].includes(s.keyCode)&&v(s)}function k(){const s=[];return l.prepend!==void 0&&s.push(V("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:ee},l.prepend())),s.push(V("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},y())),C.value===!0&&t.noErrorIcon===!1&&s.push(b("error",[V(pe,{name:u.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?s.push(b("inner-loading-append",l.loading!==void 0?l.loading():[V(ze,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&s.push(b("inner-clearable-append",[V(pe,{class:"q-field__focusable-action",name:t.clearIcon||u.iconSet.field.clear,tabindex:0,role:"button","aria-hidden":"false","aria-label":u.lang.label.clear,onKeyup:i,onClick:v})])),l.append!==void 0&&s.push(V("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:ee},l.append())),e.getInnerAppend!==void 0&&s.push(b("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&s.push(e.getControlChild()),s}function y(){const s=[];return t.prefix!==void 0&&t.prefix!==null&&s.push(V("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&s.push(e.getShadowControl()),e.getControl!==void 0?s.push(e.getControl()):l.rawControl!==void 0?s.push(l.rawControl()):l.control!==void 0&&s.push(V("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},l.control(_.value))),E.value===!0&&s.push(V("div",{class:h.value},oe(l.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&s.push(V("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),s.concat(oe(l.default))}function I(){let s,p;C.value===!0?g.value!==null?(s=[V("div",{role:"alert"},g.value)],p=`q--slot-error-${g.value}`):(s=oe(l.error),p="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(s=[V("div",t.hint)],p=`q--slot-hint-${t.hint}`):(s=oe(l.hint),p="q--slot-hint"));const R=t.counter===!0||l.counter!==void 0;if(t.hideBottomSpace===!0&&R===!1&&s===void 0)return;const P=V("div",{key:p,class:"q-field__messages col"},s);return V("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale"),onClick:ee},[t.hideBottomSpace===!0?P:V(De,{name:"q-transition--field-message"},()=>P),R===!0?V("div",{class:"q-field__counter"},l.counter!==void 0?l.counter():e.computedCounter.value):null])}function b(s,p){return p===null?null:V("div",{key:s,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},p)}let M=!1;return qe(()=>{M=!0}),Ae(()=>{M===!0&&t.autofocus===!0&&c.focus()}),t.autofocus===!0&&ae(()=>{c.focus()}),de(()=>{m!==null&&clearTimeout(m)}),Object.assign(c,{focus:B,blur:D}),function(){const p=e.getControl===void 0&&l.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...F.value}:F.value;return V(e.tag.value,{ref:e.rootRef,class:[T.value,d.class],style:d.style,...p},[l.before!==void 0?V("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:ee},l.before()):null,V("div",{class:"q-field__inner relative-position col self-stretch"},[V("div",{ref:e.controlRef,class:z.value,tabindex:-1,...e.controlEvents},k()),q.value===!0?I():null]),l.after!==void 0?V("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:ee},l.after()):null])}}function ht(e,t){function n(){const l=e.modelValue;try{const d="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(l)===l&&("length"in l?Array.from(l):[l]).forEach(c=>{d.items.add(c)}),{files:d.files}}catch{return{files:void 0}}}return w(()=>{if(e.type==="file")return n()})}const Et=Ee({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(e,{slots:t,emit:n}){const l=W(),d=L(null);let c=0;const u=[];function m(f){const q=typeof f=="boolean"?f:e.noErrorFocus!==!0,$=++c,T=(h,_)=>{n(`validation${h===!0?"Success":"Error"}`,_)},z=h=>{const _=h.validate();return typeof _.then=="function"?_.then(F=>({valid:F,comp:h}),F=>({valid:!1,comp:h,err:F})):Promise.resolve({valid:_,comp:h})};return(e.greedy===!0?Promise.all(u.map(z)).then(h=>h.filter(_=>_.valid!==!0)):u.reduce((h,_)=>h.then(()=>z(_).then(F=>{if(F.valid===!1)return Promise.reject(F)})),Promise.resolve()).catch(h=>[h])).then(h=>{if(h===void 0||h.length===0)return $===c&&T(!0),!0;if($===c){const{comp:_,err:F}=h[0];if(F!==void 0&&console.error(F),T(!1,_),q===!0){const x=h.find(({comp:B})=>typeof B.focus=="function"&&Le(B.$)===!1);x!==void 0&&x.comp.focus()}}return!1})}function A(){c++,u.forEach(f=>{typeof f.resetValidation=="function"&&f.resetValidation()})}function S(f){f!==void 0&&ve(f);const q=c+1;m().then($=>{q===c&&$===!0&&(e.onSubmit!==void 0?n("submit",f):f!==void 0&&f.target!==void 0&&typeof f.target.submit=="function"&&f.target.submit())})}function C(f){f!==void 0&&ve(f),n("reset"),Y(()=>{A(),e.autofocus===!0&&e.noResetFocus!==!0&&g()})}function g(){he(()=>{if(d.value===null)return;const f=d.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||d.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||d.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(d.value.querySelectorAll("[tabindex]"),q=>q.tabIndex!==-1);f!=null&&f.focus({preventScroll:!0})})}$e(Re,{bindComponent(f){u.push(f)},unbindComponent(f){const q=u.indexOf(f);q!==-1&&u.splice(q,1)}});let Z=!1;return qe(()=>{Z=!0}),Ae(()=>{Z===!0&&e.autofocus===!0&&g()}),ae(()=>{e.autofocus===!0&&g()}),Object.assign(l.proxy,{validate:m,resetValidation:A,submit:S,reset:C,focus:g,getValidationComponents:()=>u}),()=>V("form",{class:"q-form",ref:d,onSubmit:S,onReset:C},oe(t.default))}}),Be={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},se={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},Pe=Object.keys(se);Pe.forEach(e=>{se[e].regex=new RegExp(se[e].pattern)});const pt=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+Pe.join("")+"])|(.)","g"),_e=/[.*+?^${}()|[\]\\]/g,j="",yt={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function bt(e,t,n,l){let d,c,u,m,A,S;const C=L(null),g=L(f());function Z(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}K(()=>e.type+e.autogrow,$),K(()=>e.mask,r=>{if(r!==void 0)T(g.value,!0);else{const a=B(g.value);$(),e.modelValue!==a&&t("update:modelValue",a)}}),K(()=>e.fillMask+e.reverseFillMask,()=>{C.value===!0&&T(g.value,!0)}),K(()=>e.unmaskedValue,()=>{C.value===!0&&T(g.value)});function f(){if($(),C.value===!0){const r=F(B(e.modelValue));return e.fillMask!==!1?D(r):r}return e.modelValue}function q(r){if(r<d.length)return d.slice(-r);let a="",v=d;const i=v.indexOf(j);if(i!==-1){for(let k=r-v.length;k>0;k--)a+=j;v=v.slice(0,i)+a+v.slice(i)}return v}function $(){if(C.value=e.mask!==void 0&&e.mask.length!==0&&Z(),C.value===!1){m=void 0,d="",c="";return}const r=Be[e.mask]===void 0?e.mask:Be[e.mask],a=typeof e.fillMask=="string"&&e.fillMask.length!==0?e.fillMask.slice(0,1):"_",v=a.replace(_e,"\\$&"),i=[],k=[],y=[];let I=e.reverseFillMask===!0,b="",M="";r.replace(pt,(P,o,O,Q,H)=>{if(Q!==void 0){const U=se[Q];y.push(U),M=U.negate,I===!0&&(k.push("(?:"+M+"+)?("+U.pattern+"+)?(?:"+M+"+)?("+U.pattern+"+)?"),I=!1),k.push("(?:"+M+"+)?("+U.pattern+")?")}else if(O!==void 0)b="\\"+(O==="\\"?"":O),y.push(O),i.push("([^"+b+"]+)?"+b+"?");else{const U=o!==void 0?o:H;b=U==="\\"?"\\\\\\\\":U.replace(_e,"\\\\$&"),y.push(U),i.push("([^"+b+"]+)?"+b+"?")}});const s=new RegExp("^"+i.join("")+"("+(b===""?".":"[^"+b+"]")+"+)?"+(b===""?"":"["+b+"]*")+"$"),p=k.length-1,R=k.map((P,o)=>o===0&&e.reverseFillMask===!0?new RegExp("^"+v+"*"+P):o===p?new RegExp("^"+P+"("+(M===""?".":M)+"+)?"+(e.reverseFillMask===!0?"$":v+"*")):new RegExp("^"+P));u=y,m=P=>{const o=s.exec(e.reverseFillMask===!0?P:P.slice(0,y.length+1));o!==null&&(P=o.slice(1).join(""));const O=[],Q=R.length;for(let H=0,U=P;H<Q;H++){const J=R[H].exec(U);if(J===null)break;U=U.slice(J.shift().length),O.push(...J)}return O.length!==0?O.join(""):P},d=y.map(P=>typeof P=="string"?P:j).join(""),c=d.split(j).join(a)}function T(r,a,v){const i=l.value,k=i.selectionEnd,y=i.value.length-k,I=B(r);a===!0&&$();const b=F(I),M=e.fillMask!==!1?D(b):b,s=g.value!==M;i.value!==M&&(i.value=M),s===!0&&(g.value=M),document.activeElement===i&&Y(()=>{if(M===c){const R=e.reverseFillMask===!0?c.length:0;i.setSelectionRange(R,R,"forward");return}if(v==="insertFromPaste"&&e.reverseFillMask!==!0){const R=i.selectionEnd;let P=k-1;for(let o=A;o<=P&&o<R;o++)d[o]!==j&&P++;E.right(i,P);return}if(["deleteContentBackward","deleteContentForward"].indexOf(v)!==-1){const R=e.reverseFillMask===!0?k===0?M.length>b.length?1:0:Math.max(0,M.length-(M===c?0:Math.min(b.length,y)+1))+1:k;i.setSelectionRange(R,R,"forward");return}if(e.reverseFillMask===!0)if(s===!0){const R=Math.max(0,M.length-(M===c?0:Math.min(b.length,y+1)));R===1&&k===1?i.setSelectionRange(R,R,"forward"):E.rightReverse(i,R)}else{const R=M.length-y;i.setSelectionRange(R,R,"backward")}else if(s===!0){const R=Math.max(0,d.indexOf(j),Math.min(b.length,k)-1);E.right(i,R)}else{const R=k-1;E.right(i,R)}});const p=e.unmaskedValue===!0?B(M):M;String(e.modelValue)!==p&&(e.modelValue!==null||p!=="")&&n(p,!0)}function z(r,a,v){const i=F(B(r.value));a=Math.max(0,d.indexOf(j),Math.min(i.length,a)),A=a,r.setSelectionRange(a,v,"forward")}const E={left(r,a){const v=d.slice(a-1).indexOf(j)===-1;let i=Math.max(0,a-1);for(;i>=0;i--)if(d[i]===j){a=i,v===!0&&a++;break}if(i<0&&d[a]!==void 0&&d[a]!==j)return E.right(r,0);a>=0&&r.setSelectionRange(a,a,"backward")},right(r,a){const v=r.value.length;let i=Math.min(v,a+1);for(;i<=v;i++)if(d[i]===j){a=i;break}else d[i-1]===j&&(a=i);if(i>v&&d[a-1]!==void 0&&d[a-1]!==j)return E.left(r,v);r.setSelectionRange(a,a,"forward")},leftReverse(r,a){const v=q(r.value.length);let i=Math.max(0,a-1);for(;i>=0;i--)if(v[i-1]===j){a=i;break}else if(v[i]===j&&(a=i,i===0))break;if(i<0&&v[a]!==void 0&&v[a]!==j)return E.rightReverse(r,0);a>=0&&r.setSelectionRange(a,a,"backward")},rightReverse(r,a){const v=r.value.length,i=q(v),k=i.slice(0,a+1).indexOf(j)===-1;let y=Math.min(v,a+1);for(;y<=v;y++)if(i[y-1]===j){a=y,a>0&&k===!0&&a--;break}if(y>v&&i[a-1]!==void 0&&i[a-1]!==j)return E.leftReverse(r,v);r.setSelectionRange(a,a,"forward")}};function h(r){t("click",r),S=void 0}function _(r){if(t("keydown",r),Ne(r)===!0||r.altKey===!0)return;const a=l.value,v=a.selectionStart,i=a.selectionEnd;if(r.shiftKey||(S=void 0),r.keyCode===37||r.keyCode===39){r.shiftKey&&S===void 0&&(S=a.selectionDirection==="forward"?v:i);const k=E[(r.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];if(r.preventDefault(),k(a,S===v?i:v),r.shiftKey){const y=a.selectionStart;a.setSelectionRange(Math.min(S,y),Math.max(S,y),"forward")}}else r.keyCode===8&&e.reverseFillMask!==!0&&v===i?(E.left(a,v),a.setSelectionRange(a.selectionStart,i,"backward")):r.keyCode===46&&e.reverseFillMask===!0&&v===i&&(E.rightReverse(a,i),a.setSelectionRange(v,a.selectionEnd,"forward"))}function F(r){if(r==null||r==="")return"";if(e.reverseFillMask===!0)return x(r);const a=u;let v=0,i="";for(let k=0;k<a.length;k++){const y=r[v],I=a[k];if(typeof I=="string")i+=I,y===I&&v++;else if(y!==void 0&&I.regex.test(y))i+=I.transform!==void 0?I.transform(y):y,v++;else return i}return i}function x(r){const a=u,v=d.indexOf(j);let i=r.length-1,k="";for(let y=a.length-1;y>=0&&i!==-1;y--){const I=a[y];let b=r[i];if(typeof I=="string")k=I+k,b===I&&i--;else if(b!==void 0&&I.regex.test(b))do k=(I.transform!==void 0?I.transform(b):b)+k,i--,b=r[i];while(v===y&&b!==void 0&&I.regex.test(b));else return k}return k}function B(r){return typeof r!="string"||m===void 0?typeof r=="number"?m(""+r):r:m(r)}function D(r){return c.length-r.length<=0?r:e.reverseFillMask===!0&&r.length!==0?c.slice(0,-r.length)+r:r+c.slice(r.length)}return{innerValue:g,hasMask:C,moveCursorForPaste:z,updateMaskValue:T,onMaskedKeydown:_,onMaskedClick:h}}function kt(e){return function(n){if(n.type==="compositionend"||n.type==="change"){if(n.target.qComposing!==!0)return;n.target.qComposing=!1,e(n)}else n.type==="compositionstart"&&(n.target.qComposing=!0)}}const xt=Ee({name:"QInput",inheritAttrs:!1,props:{...ft,...yt,...lt,modelValue:[String,Number,FileList],shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...vt,"paste","change","keydown","click","animationend"],setup(e,{emit:t,attrs:n}){const{proxy:l}=W(),{$q:d}=l,c={};let u=NaN,m,A,S=null,C;const g=L(null),Z=at(e),{innerValue:f,hasMask:q,moveCursorForPaste:$,updateMaskValue:T,onMaskedKeydown:z,onMaskedClick:E}=bt(e,t,b,g),h=ht(e),_=w(()=>ge(f.value)),F=kt(y),x=mt({changeEvent:!0}),B=w(()=>e.type==="textarea"||e.autogrow===!0),D=w(()=>B.value===!0||["text","search","url","tel","password"].includes(e.type)),r=w(()=>{const o={...x.splitAttrs.listeners.value,onInput:y,onPaste:k,onChange:s,onBlur:p,onFocus:ye};return o.onCompositionstart=o.onCompositionupdate=o.onCompositionend=F,q.value===!0&&(o.onKeydown=z,o.onClick=E),e.autogrow===!0&&(o.onAnimationend=I),o}),a=w(()=>{const o={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:Z.value,...x.splitAttrs.attributes.value,id:x.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return B.value===!1&&(o.type=e.type),e.autogrow===!0&&(o.rows=1),o});K(()=>e.type,()=>{g.value&&(g.value.value=e.modelValue)}),K(()=>e.modelValue,o=>{if(q.value===!0){if(A===!0&&(A=!1,String(o)===u))return;T(o)}else f.value!==o&&(f.value=o,e.type==="number"&&c.hasOwnProperty("value")===!0&&(m===!0?m=!1:delete c.value));e.autogrow===!0&&Y(M)}),K(()=>e.autogrow,o=>{o===!0?Y(M):g.value!==null&&n.rows>0&&(g.value.style.height="auto")}),K(()=>e.dense,()=>{e.autogrow===!0&&Y(M)});function v(){he(()=>{const o=document.activeElement;g.value!==null&&g.value!==o&&(o===null||o.id!==x.targetUid.value)&&g.value.focus({preventScroll:!0})})}function i(){g.value!==null&&g.value.select()}function k(o){if(q.value===!0&&e.reverseFillMask!==!0){const O=o.target;$(O,O.selectionStart,O.selectionEnd)}t("paste",o)}function y(o){if(!o||!o.target)return;if(e.type==="file"){t("update:modelValue",o.target.files);return}const O=o.target.value;if(o.target.qComposing===!0){c.value=O;return}if(q.value===!0)T(O,!1,o.inputType);else if(b(O),D.value===!0&&o.target===document.activeElement){const{selectionStart:Q,selectionEnd:H}=o.target;Q!==void 0&&H!==void 0&&Y(()=>{o.target===document.activeElement&&O.indexOf(o.target.value)===0&&o.target.setSelectionRange(Q,H)})}e.autogrow===!0&&M()}function I(o){t("animationend",o),M()}function b(o,O){C=()=>{S=null,e.type!=="number"&&c.hasOwnProperty("value")===!0&&delete c.value,e.modelValue!==o&&u!==o&&(u=o,O===!0&&(A=!0),t("update:modelValue",o),Y(()=>{u===o&&(u=NaN)})),C=void 0},e.type==="number"&&(m=!0,c.value=o),e.debounce!==void 0?(S!==null&&clearTimeout(S),c.value=o,S=setTimeout(C,e.debounce)):C()}function M(){requestAnimationFrame(()=>{const o=g.value;if(o!==null){const O=o.parentNode.style,{scrollTop:Q}=o,{overflowY:H,maxHeight:U}=d.platform.is.firefox===!0?{}:window.getComputedStyle(o),J=H!==void 0&&H!=="scroll";J===!0&&(o.style.overflowY="hidden"),O.marginBottom=o.scrollHeight-1+"px",o.style.height="1px",o.style.height=o.scrollHeight+"px",J===!0&&(o.style.overflowY=parseInt(U,10)<o.scrollHeight?"auto":"hidden"),O.marginBottom="",o.scrollTop=Q}})}function s(o){F(o),S!==null&&(clearTimeout(S),S=null),C!==void 0&&C(),t("change",o.target.value)}function p(o){o!==void 0&&ye(o),S!==null&&(clearTimeout(S),S=null),C!==void 0&&C(),m=!1,A=!1,delete c.value,e.type!=="file"&&setTimeout(()=>{g.value!==null&&(g.value.value=f.value!==void 0?f.value:"")})}function R(){return c.hasOwnProperty("value")===!0?c.value:f.value!==void 0?f.value:""}de(()=>{p()}),ae(()=>{e.autogrow===!0&&M()}),Object.assign(x,{innerValue:f,fieldClass:w(()=>`q-${B.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:w(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length!==0),inputRef:g,emitValue:b,hasValue:_,floatingLabel:w(()=>_.value===!0&&(e.type!=="number"||isNaN(f.value)===!1)||ge(e.displayValue)),getControl:()=>V(B.value===!0?"textarea":"input",{ref:g,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...a.value,...r.value,...e.type!=="file"?{value:R()}:h.value}),getShadowControl:()=>V("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(B.value===!0?"":" text-no-wrap")},[V("span",{class:"invisible"},R()),V("span",e.shadowText)])});const P=gt(x);return Object.assign(l,{focus:v,select:i,getNativeElement:()=>g.value}),Ve(l,"nativeEl",()=>g.value),P}}),X=new WeakMap,Ct=(e,t)=>{var n;const l=(n=W())==null?void 0:n.proxy;if(l==null)throw new Error("provideLocal must be called in setup");X.has(l)||X.set(l,Object.create(null));const d=X.get(l);d[e]=t,$e(e,t)},St=(...e)=>{var t;const n=e[0],l=(t=W())==null?void 0:t.proxy;if(l==null)throw new Error("injectLocal must be called in setup");return X.has(l)&&n in X.get(l)?X.get(l)[n]:Fe(...e)};function $t(e,t){const n=Symbol(e.name||"InjectionState"),l=void 0;return[(...u)=>{const m=e(...u);return Ct(n,m),m},()=>St(n,l)]}typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const wt=e=>typeof e<"u";function Mt(e){return JSON.parse(JSON.stringify(e))}function Bt(e,t,n,l={}){var d,c,u;const{clone:m=!1,passive:A=!1,eventName:S,deep:C=!1,defaultValue:g,shouldEmit:Z}=l,f=W(),q=n||(f==null?void 0:f.emit)||((d=f==null?void 0:f.$emit)==null?void 0:d.bind(f))||((u=(c=f==null?void 0:f.proxy)==null?void 0:c.$emit)==null?void 0:u.bind(f==null?void 0:f.proxy));let $=S;$=$||`update:${t.toString()}`;const T=h=>m?typeof m=="function"?m(h):Mt(h):h,z=()=>wt(e[t])?T(e[t]):g,E=h=>{Z?Z(h)&&q($,h):q($,h)};if(A){const h=z(),_=L(h);let F=!1;return K(()=>e[t],x=>{F||(F=!0,_.value=T(x),Y(()=>F=!1))}),K(_,x=>{!F&&(x!==e[t]||C)&&E(x)},{deep:C}),_}else return w({get(){return z()},set(h){E(h)}})}const _t=Ke({__name:"Input",props:{defaultValue:{},class:{},dark:{type:Boolean},size:{},name:{},mask:{},fillMask:{type:[Boolean,String]},reverseFillMask:{type:Boolean},unmaskedValue:{type:Boolean},modelValue:{},error:{type:[Boolean,null]},errorMessage:{},noErrorIcon:{type:Boolean},rules:{},reactiveRules:{type:Boolean},lazyRules:{type:[Boolean,String]},label:{},stackLabel:{type:Boolean},hint:{},hideHint:{type:Boolean},prefix:{},suffix:{},labelColor:{},color:{},bgColor:{},loading:{type:Boolean},clearable:{type:Boolean},clearIcon:{},filled:{type:Boolean},outlined:{type:Boolean},borderless:{type:Boolean},standout:{type:[Boolean,String]},labelSlot:{type:Boolean},bottomSlots:{type:Boolean},hideBottomSpace:{type:Boolean},counter:{type:Boolean},rounded:{type:Boolean},square:{type:Boolean},dense:{type:Boolean},itemAligned:{type:Boolean},disable:{type:Boolean},readonly:{type:Boolean},autofocus:{type:Boolean},for:{},shadowText:{},type:{},debounce:{},maxlength:{},autogrow:{type:Boolean},inputClass:{},inputStyle:{},"onUpdate:modelValue":{type:Function},onFocus:{type:Function},onBlur:{type:Function},onClear:{type:Function}},emits:["update:modelValue"],setup(e,{emit:t}){const n=e,l=t,d=Bt(n,"modelValue",l,{passive:!0,defaultValue:n.defaultValue}),c=u=>{u||(u=""),`${u}`.length>0&&/^-?[0-9.,]+$/.test(`${u}`)&&u!=="-"&&(u=parseFloat(`${u}`)),l("update:modelValue",u),d.value=u};return(u,m)=>{const A=xt;return Ue(),Ze(A,We(n,{modelValue:be(d),"onUpdate:modelValue":[m[0]||(m[0]=S=>Qe(d)?d.value=S:null),c],class:be(Ye)(n.class,n.dark?"input-dark":"",`input-${u.size}`)}),He({_:2},[u.$slots.before?{name:"before",fn:te(()=>[ne(u.$slots,"before",{},void 0,!0)]),key:"0"}:void 0,u.$slots.prepend?{name:"prepend",fn:te(()=>[ne(u.$slots,"prepend",{},void 0,!0)]),key:"1"}:void 0,u.$slots.append?{name:"append",fn:te(()=>[ne(u.$slots,"append",{},void 0,!0)]),key:"2"}:void 0,u.$slots.hint?{name:"hint",fn:te(()=>[ne(u.$slots,"hint",{},void 0,!0)]),key:"3"}:void 0,u.$slots.after?{name:"after",fn:te(()=>[ne(u.$slots,"after",{},void 0,!0)]),key:"4"}:void 0]),1040,["modelValue","class"])}}}),It=Ge(_t,[["__scopeId","data-v-8fb95f5f"]]);export{It as _,Et as a,Xe as b,$t as c,Bt as d,he as e,ft as f,vt as g,gt as h,mt as i,lt as j,at as k,ge as l,kt as m,qt as n,At as r,Je as u};