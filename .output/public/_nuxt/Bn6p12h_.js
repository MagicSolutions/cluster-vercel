import{_ as xt,L as yt}from"./CqorkKL6.js";import{_ as G}from"./Cdxp6d-L.js";import{_ as gt,a as vt}from"./C3lFfd5m.js";import{b as kt,_ as ht,a as Vt}from"./CqCTHZ6P.js";import{_ as Bt}from"./DbPFUWKD.js";import{S as St,F as $t,a as Ft,T as qt,_ as Ct}from"./DjomQ0g6.js";import{u as Ht,b as Nt,d as Y,_ as wt,a as zt}from"./CLAjYude.js";import{_ as pt}from"./D88IRiFE.js";import{_ as ct}from"./WsX2EZOD.js";import{O as Z,q as z,y as tt,P as et,l as Et,Q as Ut,R as Dt,S as It,V as Pt,m as K,u as O,p as ot,o as x,A as Q,w as i,b as o,a as t,s as e,d as S,t as h,H as E,c as V,F as P,C as M,W as R,E as I,x as lt,f as Mt,z as ft,X as Lt,r as A,v as Tt,M as jt,B as j}from"./B10uIJow.js";import{P as bt,_ as _t}from"./Bg-aRJd5.js";import{g as At,c as Rt,_ as st}from"./P-vv5Z1u.js";import{_ as W}from"./DlAUqK2U.js";import{S as Gt}from"./HvuuCLXS.js";import{u as Kt}from"./CCwINZmj.js";import{X as Ot}from"./DbIrVSFa.js";import{c as Qt}from"./qq756hlT.js";import{P as Wt}from"./sJG-ObR6.js";import{M as Xt}from"./CJMsa_fW.js";import{M as Jt}from"./Ci4-Lj3C.js";import{G as Yt}from"./sENI4yQt.js";import"./DidU-aIs.js";const nt=Z({name:"QCard",props:{...Ht,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(d,{slots:u}){const{proxy:{$q:m}}=Et(),g=Nt(d,m),B=z(()=>"q-card"+(g.value===!0?" q-card--dark q-dark":"")+(d.bordered===!0?" q-card--bordered":"")+(d.square===!0?" q-card--square no-border-radius":"")+(d.flat===!0?" q-card--flat no-shadow":""));return()=>tt(d.tag,{class:B.value},et(u.default))}}),at=Z({name:"QCardActions",props:{...Ut,vertical:Boolean},setup(d,{slots:u}){const m=Dt(d),g=z(()=>`q-card__actions ${m.value} q-card__actions--${d.vertical===!0?"vert column":"horiz row"}`);return()=>tt("div",{class:g.value},et(u.default))}}),it=Z({name:"QCardSection",props:{tag:{type:String,default:"div"},horizontal:Boolean},setup(d,{slots:u}){const m=z(()=>`q-card__section q-card__section--${d.horizontal===!0?"horiz row no-wrap":"vert"}`);return()=>tt(d.tag,{class:m.value},et(u.default))}});function mt(d){if(d===!1)return 0;if(d===!0||d===void 0)return 1;const u=parseInt(d,10);return isNaN(u)?0:u}const rt=It({name:"close-popup",beforeMount(d,{value:u}){const m={depth:mt(u),handler(g){m.depth!==0&&setTimeout(()=>{const B=At(d);B!==void 0&&Rt(B,g,m.depth)})},handlerKey(g){Pt(g,13)===!0&&m.handler(g)}};d.__qclosepopup=m,d.addEventListener("click",m.handler),d.addEventListener("keyup",m.handlerKey)},updated(d,{value:u,oldValue:m}){u!==m&&(d.__qclosepopup.depth=mt(u))},beforeUnmount(d){const u=d.__qclosepopup;d.removeEventListener("click",u.handler),d.removeEventListener("keyup",u.handlerKey),delete d.__qclosepopup}});/**
 * @license lucide-vue-next v0.439.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=Qt("SquarePenIcon",[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]]),Zt={class:"tw-grid tw-grid-cols-2 tw-gap-4"},te={class:"tw-flex tw-justify-center tw-items-center"},ee={class:"tw-flex tw-flex-col tw-items-center tw-justify-center"},oe={class:"tw-text-base tw-mb-3"},le={key:0,class:"tw-text-xs tw-text-center"},se={key:1,class:"tw-text-xs tw-text-center"},ne=K({__name:"AddExperience",props:{transitionShow:{},transitionHide:{},transitionDuration:{},modelValue:{type:[Boolean,null]},persistent:{type:Boolean},noEscDismiss:{type:Boolean},noBackdropDismiss:{type:Boolean},noRouteDismiss:{type:Boolean},autoClose:{type:Boolean},seamless:{type:Boolean},backdropFilter:{},maximized:{type:Boolean},fullWidth:{type:Boolean},fullHeight:{type:Boolean},position:{},square:{type:Boolean},noRefocus:{type:Boolean},noFocus:{type:Boolean},noShake:{type:Boolean},allowFocusOutside:{type:Boolean},"onUpdate:modelValue":{type:Function},onShow:{type:Function},onBeforeShow:{type:Function},onHide:{type:Function},onBeforeHide:{type:Function},onShake:{type:Function},onEscapeKey:{type:Function}},emits:["update:modelValue"],setup(d,{emit:u}){const m=d,g=O(),B=u,y=Y(m,"modelValue",B,{passive:!0,defaultValue:m.modelValue}),w=ot({files:void 0,title:"",description:"",dateInit:"",dateEnd:void 0,place:""});async function v(){const s={title:w.title,description:w.description,place:w.place,dateInit:w.dateInit,dateEnd:w.dateEnd??void 0};w.files&&w.files.length>0&&(s.img=w.files[0]);try{await g.addExperience(s)}finally{B("update:modelValue",!1)}}return(s,a)=>{const p=it,n=wt,H=pt,F=ct,N=_t,_=lt,l=G,f=at,q=nt,k=st,$=rt;return x(),Q(k,{modelValue:e(y),"onUpdate:modelValue":a[6]||(a[6]=b=>I(y)?y.value=b:null),"transition-show":"fade","transition-hide":"fade"},{default:i(()=>[o(q,{class:"card-edit !tw-rounded-lg lg:tw-w-1/2",style:{"max-width":"80vw"}},{default:i(()=>[o(p,null,{default:i(()=>a[7]||(a[7]=[t("div",{class:"tw-text-lg tw-font-semibold tw-text-white"}," Nueva experiencia ",-1)])),_:1}),o(p,{class:"q-pt-none"},{default:i(()=>[a[11]||(a[11]=t("p",{class:"tw-text-sm tw-font-normal tw-text-white"}," You will have the ability to choose wich profile to display in your bids. ",-1)),a[12]||(a[12]=t("p",{class:"tw-text-sm tw-font-semibold tw-text-white tw-my-5"},"Titulo*",-1)),o(n,{outlined:"",dark:"",rounded:"",class:"input-custom-outline tw-mb-3 search-input-border",modelValue:e(w).title,"onUpdate:modelValue":a[0]||(a[0]=b=>e(w).title=b),label:"Titulo",required:""},{prepend:i(()=>a[8]||(a[8]=[S("F")])),_:1},8,["modelValue"]),a[13]||(a[13]=t("p",{class:"tw-text-sm tw-font-semibold tw-text-white tw-my-5"}," Descripción* ",-1)),o(H,{modelValue:e(w).description,"onUpdate:modelValue":a[1]||(a[1]=b=>e(w).description=b),class:"!tw-border-muted-custom tw-text-white"},null,8,["modelValue"]),a[14]||(a[14]=t("p",{class:"tw-text-sm tw-font-semibold tw-text-white tw-my-5"}," Locación* ",-1)),o(n,{outlined:"",dark:"",rounded:"",class:"input-custom-outline tw-mb-3 search-input-border",modelValue:e(w).place,"onUpdate:modelValue":a[2]||(a[2]=b=>e(w).place=b),label:"Lugar",required:""},null,8,["modelValue"]),t("div",Zt,[t("div",null,[a[9]||(a[9]=t("p",{class:"tw-text-sm tw-font-semibold tw-text-white tw-my-5"}," Fecha de inicio* ",-1)),o(n,{outlined:"",dark:"",rounded:"",class:"input-custom-outline tw-mb-3 search-input-border",modelValue:e(w).dateInit,"onUpdate:modelValue":a[3]||(a[3]=b=>e(w).dateInit=b),type:"date",required:""},null,8,["modelValue"]),a[10]||(a[10]=t("p",{class:"tw-text-sm tw-font-semibold tw-text-white tw-my-5"}," Fecha de fin ",-1)),o(n,{outlined:"",dark:"",rounded:"",class:"input-custom-outline tw-mb-3 search-input-border",modelValue:e(w).dateEnd,"onUpdate:modelValue":a[4]||(a[4]=b=>e(w).dateEnd=b),type:"date"},null,8,["modelValue"])]),t("div",te,[o(F,{class:"tw-text-white",modelValue:e(w).files,"onUpdate:modelValue":a[5]||(a[5]=b=>e(w).files=b)},{title:i(()=>[t("div",ee,[o(e(bt),{size:50,class:"tw-mb-3"}),t("p",oe,h(e(w).files?("Helper"in s?s.Helper:e(E)).tLang("projects.create.form.files.empty.title"):("Helper"in s?s.Helper:e(E)).tLang("projects.create.form.files.loadedMsg")),1)])]),subtitle:i(()=>[e(w).files?(x(),V("p",le,[(x(!0),V(P,null,M(e(w).files,(b,U)=>(x(),V("span",{class:"tw-mr-2",key:U},h(b.name),1))),128))])):(x(),V("p",se,h(("Helper"in s?s.Helper:e(E)).tLang("projects.create.form.files.empty.description")),1))]),_:1},8,["modelValue"])])])]),_:1}),o(N),o(f,{align:"right"},{default:i(()=>[R(o(_,{flat:"",label:"Cancelar",color:"primary",class:"!tw-text-primary"},null,512),[[$]]),o(l,{onClick:v,class:"tw-ml-5 tw-font-semibold"},{default:i(()=>a[15]||(a[15]=[S(" Guardar ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}}),ae=W(ne,[["__scopeId","data-v-f9d154d8"]]),ie={class:"tw-grid tw-grid-cols-2 tw-gap-2"},re={class:"input-container"},de={class:"input-container"},ue={class:"input-container"},me={class:"input-container"},we={class:"input-container"},pe={class:"input-container"},ce={class:"tw-mb-4"},fe={class:"tw-relative tw-border tw-border-muted-custom lg:tw-w-[34rem] tw-p-3 tw-rounded-md"},be={class:"tw-flex tw-flex-wrap"},_e={class:"tw-mb-0 tw-text-sm tw-text-white tw-leading-loose"},xe=["placeholder"],ye={class:"option-skill-list"},ge={class:""},ve={class:"input-container"},ke={class:"input-container"},he={class:"tw-grid tw-grid-cols-2 tw-gap-4"},Ve=K({__name:"ProfileEdit",props:{transitionShow:{},transitionHide:{},transitionDuration:{},modelValue:{type:[Boolean,null]},persistent:{type:Boolean},noEscDismiss:{type:Boolean},noBackdropDismiss:{type:Boolean},noRouteDismiss:{type:Boolean},autoClose:{type:Boolean},seamless:{type:Boolean},backdropFilter:{},maximized:{type:Boolean},fullWidth:{type:Boolean},fullHeight:{type:Boolean},position:{},square:{type:Boolean},noRefocus:{type:Boolean},noFocus:{type:Boolean},noShake:{type:Boolean},allowFocusOutside:{type:Boolean},"onUpdate:modelValue":{type:Function},onShow:{type:Function},onBeforeShow:{type:Function},onHide:{type:Function},onBeforeHide:{type:Function},onShake:{type:Function},onEscapeKey:{type:Function}},emits:["update:modelValue"],setup(d,{emit:u}){let m=null;const g=d,B=Kt(),y=O(),v=Y(g,"modelValue",u,{passive:!0,defaultValue:g.modelValue}),s=ot({companyName:"",firstName:"",lastName:"",description:"",skills:[],searchSkills:"",facebook:"",web:"",twitter:"",linkedin:"",place:"",phone:"",email:""}),a=z(()=>B.categories);Mt(()=>y.user,(_,l)=>{var q,k,$,b;const f=y.fullUser;f&&(s.firstName=f.firstName,s.lastName=f.lastName,s.companyName=((q=f.extraFields.companyName)==null?void 0:q.value)??"",s.place=((k=f.extraFields.place)==null?void 0:k.value)??"",s.phone=(($=f.extraFields.phone)==null?void 0:$.value)??"",s.description=((b=f.extraFields.description)==null?void 0:b.value)??"",s.skills=(f==null?void 0:f.skills)??[],s.facebook=f.socialMedia.facebook??"",s.web=f.socialMedia.web??"",s.twitter=f.socialMedia.twitter??"",s.linkedin=f.socialMedia.linkedin??"",s.email=f.email??"")}),ft(()=>{try{B.get(1,10)}catch(_){console.log(_)}});function p(){clearTimeout(m),m=setTimeout(()=>{n(s.searchSkills)},500)}function n(_){B.setFilters({search:_}),B.get(1)}function H(_){const[l]=s.skills.splice(_,1);y.removeSkill(l)}function F(_){var l;(l=y.user)!=null&&l.skills&&(y.user.skills.findIndex(f=>f.entityId===`${_.id}`)>=0||y.addSkill(_))}function N(){const _={facebook:s.facebook,twitter:s.twitter,linkedin:s.linkedin,web:s.web};y.editProfileInfo({"attributes[first_name]":s.firstName,"attributes[last_name]":s.lastName,"attributes[email]":s.email,"attributes[fields]":[{name:"description",value:s.description},{name:"socialNetworks",value:JSON.stringify(_)},{name:"place",value:s.place},{name:"phone",value:s.phone},{name:"companyName",value:s.companyName}]})}return(_,l)=>{const f=_t,q=it,k=wt,$=pt,b=G,U=lt,L=at,T=nt,c=st,C=rt;return x(),Q(c,{modelValue:e(v),"onUpdate:modelValue":l[12]||(l[12]=r=>I(v)?v.value=r:null)},{default:i(()=>[o(T,{class:"card-edit tw-relative !tw-rounded-lg",style:{"max-width":"80vw"}},{default:i(()=>[o(q,{class:"tw-sticky tw-z-40 tw-top-0"},{default:i(()=>[l[13]||(l[13]=t("div",{class:"tw-text-lg tw-font-semibold tw-text-white"}," Editar Perfil ",-1)),l[14]||(l[14]=t("p",{class:"tw-text-sm tw-font-normal tw-text-white"}," Información básica ",-1)),o(f)]),_:1}),o(q,{class:"q-pt-2"},{default:i(()=>[t("div",ie,[t("div",re,[l[15]||(l[15]=t("label",{class:"tw-text-sm tw-font-extralight tw-text-primary tw-block tw-mb-4"}," Nombre ",-1)),o(k,{outlined:"",dark:"",size:"sm",class:"input-custom-outline search-input-border",modelValue:e(s).firstName,"onUpdate:modelValue":l[0]||(l[0]=r=>e(s).firstName=r)},null,8,["modelValue"])]),t("div",de,[l[16]||(l[16]=t("label",{class:"tw-text-sm tw-font-extralight tw-text-primary tw-block tw-mb-4"}," Apellido ",-1)),o(k,{outlined:"",dark:"",size:"sm",class:"input-custom-outline search-input-border",modelValue:e(s).lastName,"onUpdate:modelValue":l[1]||(l[1]=r=>e(s).lastName=r)},null,8,["modelValue"])])]),t("div",ue,[l[17]||(l[17]=t("label",{class:"tw-text-sm tw-font-extralight tw-text-primary tw-block tw-mb-4"}," Nombre de la empresa ",-1)),o(k,{outlined:"",dark:"",size:"sm",class:"input-custom-outline search-input-border",modelValue:e(s).companyName,"onUpdate:modelValue":l[2]||(l[2]=r=>e(s).companyName=r)},null,8,["modelValue"])]),t("div",me,[l[18]||(l[18]=t("label",{class:"tw-text-sm tw-font-extralight tw-text-primary tw-block tw-mb-4"}," Description ",-1)),o($,{modelValue:e(s).description,"onUpdate:modelValue":l[3]||(l[3]=r=>e(s).description=r),class:"!tw-border-muted-custom tw-text-white tw-mb-4"},null,8,["modelValue"])]),t("div",we,[l[19]||(l[19]=t("label",{class:"tw-text-sm tw-font-extralight tw-text-primary tw-block tw-mb-4"}," Pagina Web ",-1)),o(k,{outlined:"",dark:"",size:"sm",type:"url",class:"input-custom-outline search-input-border",modelValue:e(s).web,"onUpdate:modelValue":l[4]||(l[4]=r=>e(s).web=r)},null,8,["modelValue"])]),t("div",pe,[l[20]||(l[20]=t("label",{class:"tw-text-sm tw-font-extralight tw-text-primary tw-block tw-mb-4"}," Ubicación ",-1)),o(k,{outlined:"",dark:"",size:"sm",class:"input-custom-outline search-input-border",modelValue:e(s).place,"onUpdate:modelValue":l[5]||(l[5]=r=>e(s).place=r)},null,8,["modelValue"])]),t("div",ce,[l[21]||(l[21]=t("label",{class:"tw-text-sm tw-font-extralight tw-text-primary tw-block tw-mb-4"}," Habilidades principales ",-1)),t("div",fe,[t("ul",be,[(x(!0),V(P,null,M(e(s).skills,(r,D)=>(x(),V("li",{key:`skill_${D}`,class:"tw-border tw-border-primary tw-rounded-md tw-flex tw-px-5 tw-py-1 tw-h-min tw-mr-2 tw-mb-1"},[t("p",_e,h(r.title),1),o(b,{size:"xs",type:"button",variant:"ghost",class:"hover:tw-bg-transparent !tw-pr-0"},{default:i(()=>[o(e(Ot),{onClick:X=>H(D),class:"tw-text-primary tw-text-xs",size:20},null,8,["onClick"])]),_:2},1024)]))),128))]),R(t("input",{onInput:p,class:"skills-input",placeholder:("Helper"in _?_.Helper:e(E)).tLang("projects.create.form.skills.placeholder"),"onUpdate:modelValue":l[6]||(l[6]=r=>e(s).searchSkills=r)},null,40,xe),[[Lt,e(s).searchSkills]]),t("div",ye,[t("ul",ge,[(x(!0),V(P,null,M(e(a),r=>(x(),V("li",{key:`category_${r.id}`},[o(b,{onClick:D=>F(r),variant:"ghost",type:"button",class:"hover:tw-bg-transparent tw-w-full !tw-justify-start"},{default:i(()=>[S(h(r.title),1)]),_:2},1032,["onClick"])]))),128))])])])]),t("div",ve,[l[22]||(l[22]=t("label",{class:"tw-text-sm tw-font-extralight tw-text-primary tw-block tw-mb-4"}," Email ",-1)),o(k,{outlined:"",dark:"",size:"sm",type:"url",class:"input-custom-outline search-input-border",modelValue:e(s).email,"onUpdate:modelValue":l[7]||(l[7]=r=>e(s).email=r),disable:""},null,8,["modelValue"])]),t("div",ke,[l[23]||(l[23]=t("label",{class:"tw-text-sm tw-font-extralight tw-text-primary tw-block tw-mb-4"}," Numero de teléfono ",-1)),o(k,{outlined:"",dark:"",size:"sm",class:"input-custom-outline search-input-border",modelValue:e(s).phone,"onUpdate:modelValue":l[8]||(l[8]=r=>e(s).phone=r),type:"tel"},null,8,["modelValue"])]),l[27]||(l[27]=t("label",{class:"tw-text-sm tw-font-extralight tw-text-primary tw-block tw-mb-4"}," Conexiones ",-1)),t("div",he,[o(k,{outlined:"",dark:"",class:"input-custom-outline tw-mb-3 search-input-border",modelValue:e(s).facebook,"onUpdate:modelValue":l[9]||(l[9]=r=>e(s).facebook=r),label:"Facebook"},{prepend:i(()=>l[24]||(l[24]=[S("F")])),_:1},8,["modelValue"]),o(k,{outlined:"",dark:"",class:"input-custom-outline tw-mb-3 search-input-border",modelValue:e(s).twitter,"onUpdate:modelValue":l[10]||(l[10]=r=>e(s).twitter=r),label:"Twitter"},{prepend:i(()=>l[25]||(l[25]=[S("X")])),_:1},8,["modelValue"]),o(k,{outlined:"",dark:"",class:"input-custom-outline tw-mb-3 search-input-border",modelValue:e(s).linkedin,"onUpdate:modelValue":l[11]||(l[11]=r=>e(s).linkedin=r),label:"Linkedin"},{prepend:i(()=>l[26]||(l[26]=[S("L")])),_:1},8,["modelValue"])])]),_:1}),o(f),o(L,{class:"tw-sticky tw-z-40 tw-bottom-0",align:"right"},{default:i(()=>[R(o(U,{flat:"",label:"Cancelar",color:"primary",class:"!tw-text-primary"},null,512),[[C]]),o(b,{onClick:N,class:"tw-ml-5 tw-font-semibold"},{default:i(()=>l[28]||(l[28]=[S(" Guardar ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}}),Be=W(Ve,[["__scopeId","data-v-9b4b50e8"]]),Se={class:"tw-flex tw-flex-col tw-items-center tw-justify-center"},$e={class:"tw-text-base tw-mb-3"},Fe={key:0,class:"tw-text-xs tw-text-center"},qe={key:1,class:"tw-text-xs tw-text-center"},Ce=K({__name:"ProfileChangeProfileImage",props:{transitionShow:{},transitionHide:{},transitionDuration:{},modelValue:{type:[Boolean,null]},persistent:{type:Boolean},noEscDismiss:{type:Boolean},noBackdropDismiss:{type:Boolean},noRouteDismiss:{type:Boolean},autoClose:{type:Boolean},seamless:{type:Boolean},backdropFilter:{},maximized:{type:Boolean},fullWidth:{type:Boolean},fullHeight:{type:Boolean},position:{},square:{type:Boolean},noRefocus:{type:Boolean},noFocus:{type:Boolean},noShake:{type:Boolean},allowFocusOutside:{type:Boolean},"onUpdate:modelValue":{type:Function},onShow:{type:Function},onBeforeShow:{type:Function},onHide:{type:Function},onBeforeHide:{type:Function},onShake:{type:Function},onEscapeKey:{type:Function}},emits:["update:modelValue"],setup(d,{emit:u}){const m=d,g=O(),B=A(),w=Y(m,"modelValue",u,{passive:!0,defaultValue:m.modelValue}),v=ot({files:void 0});async function s(){var a;try{if(!await B.value.validate())return;if(v.files&&((a=v.files)==null?void 0:a.length)>0){const n=v.files[0];await g.changeProfileImage(n)}}catch(p){console.log(p)}}return(a,p)=>{const n=it,H=ct,F=zt,N=lt,_=G,l=at,f=nt,q=st,k=rt;return x(),Q(q,{modelValue:e(w),"onUpdate:modelValue":p[1]||(p[1]=$=>I(w)?w.value=$:null),"transition-show":"fade","transition-hide":"fade"},{default:i(()=>[o(f,{class:"card-edit !tw-rounded-lg",style:{"max-width":"80vw"}},{default:i(()=>[o(n,null,{default:i(()=>p[2]||(p[2]=[t("div",{class:"tw-text-lg tw-font-semibold tw-text-white"}," Editar Perfil ",-1)])),_:1}),o(n,{class:"q-pt-none"},{default:i(()=>[o(F,{class:"tw-text-white lg:tw-min-w-[36rem]",onSubmit:Tt(s,["prevent","stop"]),ref_key:"refForm",ref:B},{default:i(()=>[p[3]||(p[3]=t("label",{class:"tw-font-semibold tw-text-[.95rem] tw-mb-3 tw-block tw-text-base tw-mt-10"}," selecciona la imagen del perfil ",-1)),o(H,{modelValue:e(v).files,"onUpdate:modelValue":p[0]||(p[0]=$=>e(v).files=$)},{title:i(()=>[t("div",Se,[o(e(bt),{size:50,class:"tw-mb-3"}),t("p",$e,h(e(v).files?("Helper"in a?a.Helper:e(E)).tLang("projects.create.form.files.empty.title"):("Helper"in a?a.Helper:e(E)).tLang("projects.create.form.files.loadedMsg")),1)])]),subtitle:i(()=>[e(v).files?(x(),V("p",Fe,[(x(!0),V(P,null,M(e(v).files,($,b)=>(x(),V("span",{class:"tw-mr-2",key:b},h($.name),1))),128))])):(x(),V("p",qe,h(("Helper"in a?a.Helper:e(E)).tLang("projects.create.form.files.empty.description")),1))]),_:1},8,["modelValue"])]),_:1},512)]),_:1}),o(l,{align:"right"},{default:i(()=>[R(o(N,{flat:"",label:"Cancelar",class:"!tw-text-primary"},null,512),[[k]]),o(_,{onClick:s,class:"tw-ml-5 tw-font-semibold"},{default:i(()=>p[4]||(p[4]=[S(" Guardar foto ")])),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])}}}),He=W(Ce,[["__scopeId","data-v-03c4d10d"]]),Ne={class:"tw-mt-20"},ze={class:"tw-container"},Ee={class:"tw-flex tw-mt-5"},Ue={class:"tw-basis-64 tw-relative"},De={class:"img-container"},Ie={class:"tw-mt-10 tw-flex tw-items-center tw-gap-4"},Pe={class:"tw-font-bold tw-text-4xl"},Me={class:"tw-text-muted-custom tw-text-3xl tw-font-light"},Le={class:"tw-flex tw-gap-8 tw-mt-10"},Te={class:"tw-basis-full lg:tw-flex-1 tw-overflow-hidden tw-pr-4"},je={class:"tw-text-xl"},Ae={class:"tw-text-xl tw-text-black tw-font-bold tw-mb-10"},Re={class:"tw-flex tw-mt-32 tw-mb-10"},Ge={class:"tw-basis-full lg:tw-flex-none tw-w-80 tw-pb-20"},Ke={class:"tw-flex tw-items-center tw-mb-4"},Oe={class:"tw-border-r-2 tw-border-muted-light tw-px-3 tw-py-5"},Qe={class:"tw-text-black tw-ml-3"},We={class:"tw-mb-0 tw-text-xs"},Xe={class:"tw-flex tw-items-center tw-mb-4"},Je={class:"tw-border-r-2 tw-border-muted-light tw-px-3 tw-py-5"},Ye={class:"tw-text-black tw-ml-3"},Ze={class:"tw-mb-0 tw-text-xs"},to={class:"tw-flex tw-items-center tw-mb-4"},eo={class:"tw-border-r-2 tw-border-muted-light tw-px-3 tw-py-5"},oo={class:"tw-text-black tw-ml-3"},lo={class:"tw-mb-0 tw-text-xs"},so={class:"tw-flex tw-items-center tw-mb-4"},no={class:"tw-border-r-2 tw-border-muted-light tw-px-3 tw-py-5"},ao={class:"tw-text-black tw-ml-3"},io={class:"tw-mb-0 tw-text-xs"},ro=["href"],uo=["href"],mo=["href"],wo=["href"],po=K({__name:"me",setup(d){const u=O(),m=z(()=>u.user),g=z(()=>{var p;return(p=u.fullUser)==null?void 0:p.extraFields}),B=z(()=>u.userDescription),y=z(()=>u.userSocialMedia),w=z(()=>{var p,n;return((n=(p=u.user)==null?void 0:p.information)==null?void 0:n.filter(H=>H.type==="experience"))??[]}),v=A(!1),s=A(!1),a=A(!1);return ft(()=>{u.requestFullUser()}),(p,n)=>{var U,L,T;const H=xt,F=G,N=gt,_=kt,l=Ct,f=ht,q=Vt,k=Bt,$=vt,b=ae;return x(),V(P,null,[t("div",Ne,[n[24]||(n[24]=t("div",{class:"tw-bg-gray-100 tw-h-64 img-profile"},null,-1)),t("div",ze,[t("div",Ee,[t("div",Ue,[t("div",De,[o(H,null,{default:i(()=>{var c,C;return[t("div",{class:"tw-h-full tw-w-full tw-bg-white tw-rounded-md",style:jt({backgroundImage:`url(${((c=e(m))==null?void 0:c.mediaFiles.profile.path)??((C=e(m))==null?void 0:C.mediumImage)})`})},null,4)]}),_:1}),o(F,{onClick:n[0]||(n[0]=c=>s.value=!0),type:"button",variant:"outline",class:"tw-border-none profile-btn !tw-p-3"},{default:i(()=>[o(e(J),{size:20})]),_:1})])]),n[6]||(n[6]=t("div",{class:"tw-grow tw-border-b tw-border-[hsla(0, 0%, 90%, 1)]"},[t("h2",{class:"tw-mb-0 tw-w-max tw-px-4 tw-py-3 tw-border-b-4 tw-text-xl tw-font-normal profile-title"}," Perfil del usuario ")],-1))]),t("div",Ie,[t("h3",Pe,h((U=e(m))==null?void 0:U.firstName)+" "+h((L=e(m))==null?void 0:L.lastName),1),t("p",Me,h((T=e(m))==null?void 0:T.email),1),n[9]||(n[9]=t("div",{class:"tw-grow"},null,-1)),o(F,{type:"button",variant:"outline",onClick:e(u).logout,class:"tw-border-none profile-btn"},{default:i(()=>n[7]||(n[7]=[S(" Log Out ")])),_:1},8,["onClick"]),o(F,{type:"button",variant:"outline",class:"tw-border-none profile-btn"},{default:i(()=>[o(e(St),{filled:"",class:"tw-text-xl"})]),_:1}),o(F,{onClick:n[1]||(n[1]=c=>v.value=!0),type:"button",variant:"outline",class:"tw-border-none profile-btn"},{default:i(()=>[o(e(J),{size:15,class:"tw-mr-2"}),n[8]||(n[8]=S(" Editar "))]),_:1})]),t("div",Le,[t("div",Te,[n[17]||(n[17]=t("h4",{class:"tw-text-xl tw-text-muted-custom tw-mb-5"},"Descripción",-1)),t("p",je,h(e(B)),1),t("h4",Ae,[o(e(Gt),{class:"tw-inline-block tw-text-black tw-mr-5"}),n[10]||(n[10]=S(" 0.0 - 0 Reviews "))]),t("div",null,[o(_,{class:"tw-max-w-72 tw-py-3 tw-px-6 tw-mb-2 xl:tw-translate-x-1/2"},{default:i(()=>[o(N,{starClass:"tw-text-lg tw-mr-1",rating:5}),n[11]||(n[11]=t("div",{class:"tw-mt-2 tw-flex tw-gap-3"},[t("div",{class:"tw-bg-muted-light tw-h-10 tw-w-10 tw-rounded"}),t("div",{class:"tw-flex-grow"},[t("div",{class:"tw-bg-muted-light tw-w-full tw-h-2 tw-rounded-md tw-mb-3"}),t("div",{class:"tw-bg-muted-light tw-w-1/2 tw-h-2 tw-rounded-md"})])],-1))]),_:1}),o(_,{class:"tw-max-w-72 tw-py-3 tw-px-6 tw-mb-2 xl:tw-transform translate-x-custom"},{default:i(()=>[o(N,{starClass:"tw-text-lg tw-mr-1",rating:5}),n[12]||(n[12]=t("div",{class:"tw-mt-2 tw-flex tw-gap-3"},[t("div",{class:"tw-bg-muted-light tw-h-10 tw-w-10 tw-rounded"}),t("div",{class:"tw-flex-grow"},[t("div",{class:"tw-bg-muted-light tw-w-full tw-h-2 tw-rounded-md tw-mb-3"}),t("div",{class:"tw-bg-muted-light tw-w-1/2 tw-h-2 tw-rounded-md"})])],-1))]),_:1}),o(_,{class:"tw-max-w-72 tw-py-3 tw-px-6 tw-mb-2"},{default:i(()=>[o(N,{starClass:"tw-text-lg tw-mr-1",rating:5}),n[13]||(n[13]=t("div",{class:"tw-mt-2 tw-flex tw-gap-3"},[t("div",{class:"tw-bg-muted-light tw-h-10 tw-w-10 tw-rounded"}),t("div",{class:"tw-flex-grow"},[t("div",{class:"tw-bg-muted-light tw-w-full tw-h-2 tw-rounded-md tw-mb-3"}),t("div",{class:"tw-bg-muted-light tw-w-1/2 tw-h-2 tw-rounded-md"})])],-1))]),_:1})]),n[18]||(n[18]=t("div",{class:"lg:tw-w-1/2"},[t("p",{class:"tw-text-xl tw-text-muted-custom tw-font-light tw-my-10 tw-text-center"}," Sin reviews ")],-1)),t("div",Re,[n[15]||(n[15]=t("h4",{class:"tw-font-bold tw-text-4xl"},"Experiencia",-1)),n[16]||(n[16]=t("div",{class:"tw-grow"},null,-1)),o(F,{onClick:n[2]||(n[2]=c=>a.value=!0),type:"button",variant:"outline",class:"tw-border-none profile-btn"},{default:i(()=>[o(e(J),{size:15,class:"tw-mr-2"}),n[14]||(n[14]=S(" Agregar experiencia "))]),_:1})]),t("div",null,[(x(!0),V(P,null,M(e(w),c=>{var C,r;return x(),Q(l,{class:"tw-mb-3",key:`experience_user${c.id}`,img:(r=(C=c.mediaFiles)==null?void 0:C.mainimage)==null?void 0:r.path,id:c.id,init:("Helper"in p?p.Helper:e(E)).parseStringToDate(c.options.dateInit),end:c.options.dateEnd?("Helper"in p?p.Helper:e(E)).parseStringToDate(c.options.dateEnd):void 0,place:c.options.place},{skill:i(()=>[S(h(c.options.skill),1)]),title:i(()=>[S(h(c.title),1)]),description:i(()=>[S(h(c.description),1)]),_:2},1032,["img","id","init","end","place"])}),128))])]),t("aside",Ge,[o(_,{class:"tw-py-3 tw-px-6 tw-sticky tw-top-28 tw-bottom-20"},{default:i(()=>[o(q,{class:"tw-h-full tw-justify-center tw-border-b-2 tw-border-muted-light !tw-p-2 !tw-pb-4 !tw-rounded-4xl"},{default:i(()=>[o(f,{class:"!tw-leading-normal tw-font-normal tw-text-base tw-text-muted-custom"},{default:i(()=>n[19]||(n[19]=[S(" Datos de contacto ")])),_:1})]),_:1}),o(k,{class:"!tw-py-5 !tw-px-0 tw-border-b-2 tw-border-muted-light"},{default:i(()=>{var c,C,r,D,X,dt,ut;return[t("div",Ke,[t("div",Oe,[o(e($t),{class:"tw-text-black",size:20})]),t("div",Qe,[n[20]||(n[20]=t("p",{class:"tw-mb-1 tw-text-sm tw-font-bold"}," Nombre de la empresa ",-1)),t("p",We,h((C=(c=e(g))==null?void 0:c.companyName)==null?void 0:C.value),1)])]),t("div",Xe,[t("div",Je,[o(e(Wt),{class:"tw-text-black",size:20})]),t("div",Ye,[n[21]||(n[21]=t("p",{class:"tw-mb-1 tw-text-sm tw-font-bold"},"Teléfono",-1)),t("p",Ze,h((D=(r=e(g))==null?void 0:r.phone)==null?void 0:D.value),1)])]),t("div",to,[t("div",eo,[o(e(Xt),{class:"tw-text-black",size:20})]),t("div",oo,[n[22]||(n[22]=t("p",{class:"tw-mb-1 tw-text-sm tw-font-bold"},"Email",-1)),t("p",lo,h((X=e(m))==null?void 0:X.email),1)])]),t("div",so,[t("div",no,[o(e(Jt),{class:"tw-text-black",size:20})]),t("div",ao,[n[23]||(n[23]=t("p",{class:"tw-mb-1 tw-text-sm tw-font-bold"},"Ubicación",-1)),t("p",io,h((ut=(dt=e(g))==null?void 0:dt.place)==null?void 0:ut.value),1)])])]}),_:1}),o($,{class:"tw-flex tw-gap-4 tw-justify-center !tw-p-0 !tw-pt-3"},{default:i(()=>[e(y).facebook?(x(),V("a",{key:0,href:e(y).facebook,class:"social-icon facebook"},[o(e(Ft),{class:"tw-text-white tw-text-3xl"})],8,ro)):j("",!0),e(y).twitter?(x(),V("a",{key:1,href:e(y).twitter,class:"social-icon !tw-bg-primary"},[o(e(qt),{filled:"",class:"tw-text-white tw-text-3xl"})],8,uo)):j("",!0),e(y).linkedin?(x(),V("a",{key:2,href:e(y).linkedin,class:"social-icon !tw-bg-primary"},[o(e(yt),{filled:"",class:"tw-text-white tw-text-2xl"})],8,mo)):j("",!0),e(y).web?(x(),V("a",{key:3,href:e(y).web,class:"social-icon !tw-bg-primary"},[o(e(Yt),{size:30,class:""})],8,wo)):j("",!0)]),_:1})]),_:1})])])])]),o(Be,{modelValue:e(v),"onUpdate:modelValue":n[3]||(n[3]=c=>I(v)?v.value=c:null)},null,8,["modelValue"]),o(He,{modelValue:e(s),"onUpdate:modelValue":n[4]||(n[4]=c=>I(s)?s.value=c:null)},null,8,["modelValue"]),o(b,{modelValue:e(a),"onUpdate:modelValue":n[5]||(n[5]=c=>I(a)?a.value=c:null)},null,8,["modelValue"])],64)}}}),Do=W(po,[["__scopeId","data-v-9100ae6f"]]);export{Do as default};