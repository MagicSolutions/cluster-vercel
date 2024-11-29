import{_ as P,a as g}from"./BGyi-J8Y.js";import{_ as h}from"./Ds84sFcz.js";import{m as C,r as f,u as M,n as V,p as k,q as u,o as q,c as z,a as r,b as o,w as n,s as l,T as A,v as R,_ as $}from"./CGfBZQGx.js";import{K as c}from"./gGDGwSfp.js";import{_ as B}from"./DlAUqK2U.js";import"./CDI9_Ud4.js";const j={class:"tw-min-h-screen tw-flex tw-justify-center"},N={class:"tw-max-w-screen-xl tw-m-0 sm:tw-m-10 sm:tw-rounded-lg tw-flex tw-justify-center tw-flex-1"},S={class:"lg:tw-w-1/2 xl:tw-w-5/12 tw-p-6 sm:tw-p-12"},U={class:"tw-mt-12 tw-flex tw-flex-col tw-items-center"},W={class:"tw-w-full tw-flex-1"},Z={class:""},E=C({__name:"changePassword",setup(I){const p=f(null),a=f(!0),m=M();V();const s=k({password:"",newPassword:"",newPasswordConfirmation:""});u(()=>m.loading);const _=u(()=>s.password==""||s.newPassword==""||s.newPasswordConfirmation==""),v=u(()=>s.newPassword!=s.newPasswordConfirmation);async function x(){try{if(!await p.value.validate())return;m.changePassword(s)}catch(i){console.log(i)}}return(i,e)=>{const w=$,d=P,y=h,b=g;return q(),z("div",j,[r("div",N,[r("div",S,[r("div",U,[e[7]||(e[7]=r("h1",{class:"tw-text-[35px] xl:tw-text-[50px] tw-font-extralight tw-mb-4"}," Change Password ",-1)),r("div",W,[r("div",Z,[o(b,{onSubmit:R(x,["prevent","stop"]),ref_key:"refReset",ref:p},{default:n(()=>[o(d,{filled:"",dark:"",class:"tw-mb-2",modelValue:s.password,"onUpdate:modelValue":e[1]||(e[1]=t=>s.password=t),label:"Current password","lazy-rules":"",rules:[t=>!!t||"Password is required",t=>t.length>=8||"Password must be at least 8 characters long",t=>/[A-Z]/.test(t)||"Must contain at least one uppercase letter",t=>/[a-z]/.test(t)||"Must contain at least one lowercase letter",t=>/\d/.test(t)||"Must contain at least one number",t=>/[\W_]/.test(t)||"Must contain at least one special character"],type:a.value?"password":"text"},{prepend:n(()=>[o(l(c),{class:"!tw-text-primary"})]),append:n(()=>[o(w,{name:a.value?"visibility_off":"visibility",class:"cursor-pointer",onClick:e[0]||(e[0]=t=>a.value=!a.value)},null,8,["name"])]),_:1},8,["modelValue","rules","type"]),o(d,{filled:"",dark:"",class:"tw-mb-2",modelValue:s.newPassword,"onUpdate:modelValue":e[3]||(e[3]=t=>s.newPassword=t),label:"New password","lazy-rules":"",rules:[t=>!!t||"Password is required",t=>t.length>=8||"Password must be at least 8 characters long",t=>/[A-Z]/.test(t)||"Must contain at least one uppercase letter",t=>/[a-z]/.test(t)||"Must contain at least one lowercase letter",t=>/\d/.test(t)||"Must contain at least one number",t=>/[\W_]/.test(t)||"Must contain at least one special character"],type:a.value?"password":"text"},{prepend:n(()=>[o(l(c),{class:"!tw-text-primary"})]),append:n(()=>[o(w,{name:a.value?"visibility_off":"visibility",class:"cursor-pointer",onClick:e[2]||(e[2]=t=>a.value=!a.value)},null,8,["name"])]),_:1},8,["modelValue","rules","type"]),o(d,{filled:"",dark:"",class:"tw-mb-2",modelValue:s.newPasswordConfirmation,"onUpdate:modelValue":e[5]||(e[5]=t=>s.newPasswordConfirmation=t),label:"Confirm new password","lazy-rules":"",rules:[t=>!!t||"Password is required",t=>t.length>=8||"Password must be at least 8 characters long",t=>/[A-Z]/.test(t)||"Must contain at least one uppercase letter",t=>/[a-z]/.test(t)||"Must contain at least one lowercase letter",t=>/\d/.test(t)||"Must contain at least one number",t=>/[\W_]/.test(t)||"Must contain at least one special character",t=>t==s.newPassword||"Password does not match"],type:a.value?"password":"text"},{prepend:n(()=>[o(l(c),{class:"!tw-text-primary"})]),append:n(()=>[o(w,{name:a.value?"visibility_off":"visibility",class:"cursor-pointer",onClick:e[4]||(e[4]=t=>a.value=!a.value)},null,8,["name"])]),_:1},8,["modelValue","rules","type"]),o(A,{name:"hero"},{default:n(()=>[o(y,{disabled:l(_)||l(v),type:"submit",class:"hero tw-mt-5 tw-tracking-wide tw-font-semibold tw-bg-indigo-500 tw-text-gray-100 tw-w-full tw-py-4 tw-rounded-lg tw-hover:bg-indigo-700 tw-transition-all tw-duration-300 tw-ease-in-out tw-flex tw-items-center tw-justify-center"},{default:n(()=>e[6]||(e[6]=[r("span",{class:"tw-ml-3"},"Change password",-1)])),_:1},8,["disabled"])]),_:1})]),_:1},512)])])])])])])}}}),J=B(E,[["__scopeId","data-v-34046899"]]);export{J as default};
