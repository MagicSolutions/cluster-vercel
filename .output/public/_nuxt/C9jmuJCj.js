import{_ as v}from"./BhY88c3m.js";import{_ as k}from"./Da5A33h0.js";import{_ as z,a as N,b as S}from"./CqCTHZ6P.js";import{_ as V}from"./DbPFUWKD.js";import{u as B}from"./CCwINZmj.js";import{m as L,r as q,n as D,z as x,q as F,o as l,c as i,b as t,s,a as o,w as e,d as n,t as _,F as b,C as I}from"./B10uIJow.js";import{_ as P}from"./D69KGbtd.js";import{C as R,a as C}from"./Cut_bUgy.js";import{_ as T}from"./DlAUqK2U.js";import"./CLAjYude.js";import"./qq756hlT.js";import"./CQK9bF6W.js";const j={class:"tw-container tw-mt-5 tw-mb-16 tw-relative"},E={class:"tw-mr-3"},G={class:"tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-3"},H={class:"tw-flex tw-text-sm md:tw-text-base"},M=L({__name:"[id]",setup(A){q(1);const a=B(),m=D();x(()=>{a.requestParentsCategories()}),x(()=>{(!a.selected||`${a.selected.id}`!=`${m.params.id}`)&&a.viewDetails(parseInt(`${m.params.id}`))});const c=F(()=>a.selected);return(J,d)=>{const h=v,$=k,p=z,f=N,u=S,y=V;return l(),i(b,null,[t(P,{loading:s(a).loading},null,8,["loading"]),t(h,{class:"tw-mt-20"}),o("section",j,[t(u,{class:"tw-py-2 tw-mb-5"},{default:e(()=>[t(f,{class:"!tw-flex-row !tw-items-center"},{default:e(()=>[o("div",E,[t($,{to:"/categories"},{default:e(()=>[t(s(R),{size:30})]),_:1})]),t(p,{class:"!tw-font-medium"},{default:e(()=>d[0]||(d[0]=[n(" Volver a las categorías Generales ")])),_:1})]),_:1})]),_:1}),t(u,{class:"tw-py-3 tw-px-6"},{default:e(()=>[t(f,{class:"tw-border-b-2 tw-border-muted-light"},{default:e(()=>[t(p,{class:"tw-font-extrabold"},{default:e(()=>{var r;return[n(_((r=s(c))==null?void 0:r.title),1)]}),_:1})]),_:1}),t(y,{class:"tw-mt-16"},{default:e(()=>{var r,w;return[o("ul",G,[o("li",H,[o("span",null,[t(s(C),{class:"tw-text-sky-600",size:25})]),n(" "+_((r=s(c))==null?void 0:r.title),1)]),(l(!0),i(b,null,I((w=s(c))==null?void 0:w.children,g=>(l(),i("li",{key:`sub-sub-category-${g.id}`,class:"tw-flex tw-text-sm md:tw-text-base"},[o("span",null,[t(s(C),{class:"tw-text-sky-600",size:25})]),n(" "+_(g.title),1)]))),128))])]}),_:1})]),_:1})])],64)}}}),ot=T(M,[["__scopeId","data-v-7b9b8743"]]);export{ot as default};