(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[22],{1525:function(e,a,t){"use strict";var r=t(8),n=t(1),l=t(0),i=t(4),o=t(11),c=t(396),s=t(22),d=l.forwardRef((function(e,a){var t=e.children,o=e.classes,d=e.className,m=e.color,u=void 0===m?"default":m,p=e.component,b=void 0===p?"button":p,g=e.disabled,h=void 0!==g&&g,f=e.disableFocusRipple,v=void 0!==f&&f,E=e.focusVisibleClassName,y=e.size,x=void 0===y?"large":y,j=e.variant,N=void 0===j?"circular":j,O=Object(r.a)(e,["children","classes","className","color","component","disabled","disableFocusRipple","focusVisibleClassName","size","variant"]);return l.createElement(c.a,Object(n.a)({className:Object(i.default)(o.root,d,"large"!==x&&o["size".concat(Object(s.a)(x))],h&&o.disabled,"extended"===N&&o.extended,{primary:o.primary,secondary:o.secondary,inherit:o.colorInherit}[u]),component:b,disabled:h,focusRipple:!v,focusVisibleClassName:Object(i.default)(o.focusVisible,E),ref:a},O),l.createElement("span",{className:o.label},t))}));a.a=Object(o.a)((function(e){return{root:Object(n.a)({},e.typography.button,{boxSizing:"border-box",minHeight:36,transition:e.transitions.create(["background-color","box-shadow","border"],{duration:e.transitions.duration.short}),borderRadius:"50%",padding:0,minWidth:0,width:56,height:56,boxShadow:e.shadows[6],"&:active":{boxShadow:e.shadows[12]},color:e.palette.getContrastText(e.palette.grey[300]),backgroundColor:e.palette.grey[300],"&:hover":{backgroundColor:e.palette.grey.A100,"@media (hover: none)":{backgroundColor:e.palette.grey[300]},"&$disabled":{backgroundColor:e.palette.action.disabledBackground},textDecoration:"none"},"&$focusVisible":{boxShadow:e.shadows[6]},"&$disabled":{color:e.palette.action.disabled,boxShadow:e.shadows[0],backgroundColor:e.palette.action.disabledBackground}}),label:{width:"100%",display:"inherit",alignItems:"inherit",justifyContent:"inherit"},primary:{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.main,"&:hover":{backgroundColor:e.palette.primary.dark,"@media (hover: none)":{backgroundColor:e.palette.primary.main}}},secondary:{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.main,"&:hover":{backgroundColor:e.palette.secondary.dark,"@media (hover: none)":{backgroundColor:e.palette.secondary.main}}},extended:{borderRadius:24,padding:"0 16px",width:"auto",minHeight:"auto",minWidth:48,height:48,"&$sizeSmall":{width:"auto",padding:"0 8px",borderRadius:17,minWidth:34,height:34},"&$sizeMedium":{width:"auto",padding:"0 16px",borderRadius:20,minWidth:40,height:40}},focusVisible:{},disabled:{},colorInherit:{color:"inherit"},sizeSmall:{width:40,height:40},sizeMedium:{width:48,height:48}}}),{name:"MuiFab"})(d)},2081:function(e,a,t){"use strict";t.r(a);var r=t(3),n=t(9),l=t(387),i=t(5),o=t(0),c=t.n(o),s=t(25),d=t(1525),m=t(1431),u=t(1440),p=t(1439),b=t(1434),g=t(1436),h=t(4);a.default=function(){var e=Object(o.useState)([]),a=Object(i.a)(e,2),t=a[0],f=a[1],v=Object(o.useState)(0),E=Object(i.a)(v,2),y=E[0],x=E[1],j=Object(o.useState)(""),N=Object(i.a)(j,2),O=N[0],k=N[1],C=function(e){var a,t=e.target.files,r=[],n=Object(l.a)(t);try{for(n.s();!(a=n.n()).done;){var i=a.value;r.push({file:i,uploading:!1,error:!1,progress:0})}}catch(o){n.e(o)}finally{n.f()}f(r)},w=!t.length;return c.a.createElement("div",{className:"upload-form m-sm-30"},c.a.createElement("div",{className:"mb-sm-30"},c.a.createElement(s.a,{routeSegments:[{name:"Others",path:"/"},{name:"Upload"}]})),c.a.createElement(s.q,{title:"File Upload"},c.a.createElement("div",{className:"flex flex-wrap mb-6"},c.a.createElement("label",{htmlFor:"upload-single-file"},c.a.createElement(d.a,{className:"capitalize",color:"primary",component:"span",variant:"extended"},c.a.createElement("div",{className:"flex items-center"},c.a.createElement(m.a,{className:"pr-8"},"cloud_upload"),c.a.createElement("span",null,"Single File")))),c.a.createElement("input",{className:"hidden",onChange:C,id:"upload-single-file",type:"file"}),c.a.createElement("div",{className:"px-4"}),c.a.createElement("label",{htmlFor:"upload-multiple-file"},c.a.createElement(d.a,{className:"capitalize",color:"primary",component:"span",variant:"extended"},c.a.createElement("div",{className:"flex items-center"},c.a.createElement(m.a,{className:"pr-8"},"cloud_upload"),c.a.createElement("span",null,"Multiple File")))),c.a.createElement("input",{className:"hidden",onChange:C,id:"upload-multiple-file",type:"file",multiple:!0})),c.a.createElement("div",{className:Object(h.default)("h-200 w-full border-radius-4 bg-light-gray mb-6 flex justify-center items-center",O),onDragEnter:function(e){k("drag-shadow")},onDragOver:function(e){e.preventDefault(),k("drag-shadow")},onDrop:function(e){e.preventDefault(),e.persist();var a,t=e.dataTransfer.files,r=[],n=Object(l.a)(t);try{for(n.s();!(a=n.n()).done;){var i=a.value;r.push({file:i,uploading:!1,error:!1,progress:0})}}catch(o){n.e(o)}finally{n.f()}return k(""),f(r),!1}},w?c.a.createElement("span",null,"Drop your files here"):c.a.createElement("h5",{className:"m-0"},t.length," file",t.length>1?"s":""," ","selected...")),c.a.createElement(u.a,{className:"mb-6",elevation:2},c.a.createElement("div",{className:"p-4"},c.a.createElement(p.a,{container:!0,spacing:2,justify:"center",alignItems:"center",direction:"row"},c.a.createElement(p.a,{item:!0,lg:4,md:4},"Name"),c.a.createElement(p.a,{item:!0,lg:1,md:1},"Size"),c.a.createElement(p.a,{item:!0,lg:2,md:2},"Progress"),c.a.createElement(p.a,{item:!0,lg:1,md:1},"Status"),c.a.createElement(p.a,{item:!0,lg:4,md:4},"Actions"))),c.a.createElement(b.a,null),w&&c.a.createElement("p",{className:"px-4"},"Que is empty"),t.map((function(e,a){var l=e.file,i=e.uploading,o=e.error,d=e.progress;return c.a.createElement("div",{className:"px-4 py-4",key:l.name},c.a.createElement(p.a,{container:!0,spacing:2,justify:"center",alignItems:"center",direction:"row"},c.a.createElement(p.a,{item:!0,lg:4,md:4,sm:12,xs:12},l.name),c.a.createElement(p.a,{item:!0,lg:1,md:1,sm:12,xs:12},(l.size/1024/1024).toFixed(1)," ","MB"),c.a.createElement(p.a,{item:!0,lg:2,md:2,sm:12,xs:12},c.a.createElement(s.k,{value:d})),c.a.createElement(p.a,{item:!0,lg:1,md:1,sm:12,xs:12},o&&c.a.createElement(m.a,{color:"error"},"error")),c.a.createElement(p.a,{item:!0,lg:4,md:4,sm:12,xs:12},c.a.createElement("div",null,c.a.createElement(g.a,{size:"small",variant:"contained",color:"primary",disabled:i,onClick:function(){return function(e){var a=Object(n.a)(t),l=t[e];a[e]=Object(r.a)(Object(r.a)({},l),{},{uploading:!0,error:!1}),f(Object(n.a)(a))}(a)}},"Upload"),c.a.createElement(g.a,{className:"mx-2",size:"small",variant:"contained",disabled:!i,color:"secondary",onClick:function(){return function(e){var a=Object(n.a)(t),l=t[e];a[e]=Object(r.a)(Object(r.a)({},l),{},{uploading:!1,error:!0}),f(Object(n.a)(a))}(a)}},"Cancel"),c.a.createElement(g.a,{variant:"contained",size:"small",className:"bg-error",onClick:function(){return function(e){var a=Object(n.a)(t);a.splice(e,1),f(Object(n.a)(a))}(a)}},"Remove")))))}))),c.a.createElement("div",null,c.a.createElement("p",{className:"m-0"},"Queue progress:"),c.a.createElement("div",{className:"py-4"},c.a.createElement(s.k,{value:y})),c.a.createElement("div",{className:"flex"},c.a.createElement(g.a,{variant:"contained",color:"primary",disabled:w,onClick:function(){var e=[];t.map((function(a){return e.push(Object(r.a)(Object(r.a)({},a),{},{uploading:!0,error:!1})),a})),f([].concat(e)),x(35)}},"Upload All"),c.a.createElement(g.a,{className:"mx-2",variant:"contained",color:"secondary",disabled:w,onClick:function(){var e=[];t.map((function(a){return e.push(Object(r.a)(Object(r.a)({},a),{},{uploading:!1,error:!0})),a})),f([].concat(e)),x(0)}},"Cancel All"),!w&&c.a.createElement(g.a,{variant:"contained",className:"bg-error",onClick:function(){f([]),x(0)}},"Remove All")))))}}}]);
//# sourceMappingURL=22.78cd3f21.chunk.js.map