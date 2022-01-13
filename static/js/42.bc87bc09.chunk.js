(this["webpackJsonpmatx-react"]=this["webpackJsonpmatx-react"]||[]).push([[42],{2089:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),r=t(25),s=t(5),i=t(1399),l=t(1436),o=t(1401),m=t(1380),u=t(1488),d=t.n(u),g=Object(i.a)((function(e){return{close:{padding:e.spacing(.5)}}}));function E(){var e=g(),a=c.a.useState(!1),t=Object(s.a)(a,2),n=t[0],r=t[1];function i(e,a){"clickaway"!==a&&r(!1)}return c.a.createElement("div",null,c.a.createElement(l.a,{onClick:function(){r(!0)}},"Open simple snackbar"),c.a.createElement(o.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:n,autoHideDuration:6e3,onClose:i,ContentProps:{"aria-describedby":"message-id"},message:c.a.createElement("span",{id:"message-id"},"Note archived"),action:[c.a.createElement(l.a,{key:"undo",color:"secondary",size:"small",onClick:i},"UNDO"),c.a.createElement(m.a,{key:"close","aria-label":"Close",color:"inherit",className:e.close,onClick:i},c.a.createElement(d.a,null))]}))}var p=t(15),h=t(4),k=t(1869),v=t.n(k),b=t(1871),f=t.n(b),C=t(1872),y=t.n(C),O=t(302),j=t(2078),N=t(1400),w=t(1870),S=t.n(w),I=["className","message","onClose","variant"],T={success:v.a,warning:S.a,error:f.a,info:y.a},z=Object(i.a)((function(e){return{success:{backgroundColor:O.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:j.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}));function q(e){var a=z(),t=e.className,n=e.message,r=e.onClose,s=e.variant,i=Object(p.a)(e,I),l=T[s];return c.a.createElement(N.a,Object.assign({className:Object(h.default)(a[s],t),"aria-describedby":"client-snackbar",message:c.a.createElement("span",{id:"client-snackbar",className:a.message},c.a.createElement(l,{className:Object(h.default)(a.icon,a.iconVariant)}),n),action:[c.a.createElement(m.a,{key:"close","aria-label":"Close",color:"inherit",onClick:r},c.a.createElement(d.a,{className:a.icon}))]},i))}var x=Object(i.a)((function(e){return{margin:{margin:e.spacing(1)}}}));function D(){var e=x(),a=c.a.useState(!1),t=Object(s.a)(a,2),n=t[0],r=t[1];function i(e,a){"clickaway"!==a&&r(!1)}return c.a.createElement("div",null,c.a.createElement(l.a,{variant:"outlined",className:e.margin,onClick:function(){r(!0)}},"Open success snackbar"),c.a.createElement(o.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:n,autoHideDuration:6e3,onClose:i},c.a.createElement(q,{onClose:i,variant:"success",message:"This is a success message!"})),c.a.createElement(q,{variant:"error",className:e.margin,message:"This is an error message!"}),c.a.createElement(q,{variant:"warning",className:e.margin,message:"This is a warning message!"}),c.a.createElement(q,{variant:"info",className:e.margin,message:"This is an information message!"}),c.a.createElement(q,{variant:"success",className:e.margin,message:"This is a success message!"}))}var P=t(3);function B(){var e=c.a.useState({open:!1,vertical:"top",horizontal:"center"}),a=Object(s.a)(e,2),t=a[0],n=a[1],r=t.vertical,i=t.horizontal,m=t.open,u=function(e){return function(){n(Object(P.a)({open:!0},e))}};return c.a.createElement("div",null,c.a.createElement(l.a,{onClick:u({vertical:"top",horizontal:"center"})},"Top-Center"),c.a.createElement(l.a,{onClick:u({vertical:"top",horizontal:"right"})},"Top-Right"),c.a.createElement(l.a,{onClick:u({vertical:"bottom",horizontal:"right"})},"Bottom-Right"),c.a.createElement(l.a,{onClick:u({vertical:"bottom",horizontal:"center"})},"Bottom-Center"),c.a.createElement(l.a,{onClick:u({vertical:"bottom",horizontal:"left"})},"Bottom-Left"),c.a.createElement(l.a,{onClick:u({vertical:"top",horizontal:"left"})},"Top-Left"),c.a.createElement(o.a,{anchorOrigin:{vertical:r,horizontal:i},key:"".concat(r,",").concat(i),open:m,onClose:function(){n(Object(P.a)(Object(P.a)({},t),{},{open:!1}))},ContentProps:{"aria-describedby":"message-id"},message:c.a.createElement("span",{id:"message-id"},"I love snacks")}))}var A=c.a.createElement(l.a,{color:"secondary",size:"small"},"lorem ipsum dolorem"),R=Object(i.a)((function(e){return{root:{maxWidth:600},snackbar:{margin:e.spacing(1)}}}));function H(){var e=R();return c.a.createElement("div",{className:e.root},c.a.createElement(N.a,{className:e.snackbar,message:"I love snacks.",action:A}),c.a.createElement(N.a,{className:e.snackbar,message:"I love candy. I love cookies. I love cupcakes.           I love cheesecake. I love chocolate."}),c.a.createElement(N.a,{className:e.snackbar,message:"I love candy. I love cookies. I love cupcakes.",action:A}),c.a.createElement(N.a,{className:e.snackbar,message:"I love candy. I love cookies. I love cupcakes.           I love cheesecake. I love chocolate.",action:A}))}var L=t(67),M=t(68),Q=t(74),U=t(73),F=t(11),J=function(e){Object(Q.a)(t,e);var a=Object(U.a)(t);function t(){var e;Object(L.a)(this,t);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=a.call.apply(a,[this].concat(c))).queue=[],e.state={open:!1},e.handleClick=function(a){return function(){e.queue.push({message:a,key:(new Date).getTime()}),e.state.open?e.setState({open:!1}):e.processQueue()}},e.processQueue=function(){e.queue.length>0&&e.setState({messageInfo:e.queue.shift(),open:!0})},e.handleClose=function(a,t){"clickaway"!==t&&e.setState({open:!1})},e.handleExited=function(){e.processQueue()},e}return Object(M.a)(t,[{key:"render",value:function(){var e=this.props.classes,a=this.state.messageInfo,t=void 0===a?{}:a;return c.a.createElement("div",null,c.a.createElement(l.a,{onClick:this.handleClick("Message A")},"Show message A"),c.a.createElement(l.a,{onClick:this.handleClick("Message B")},"Show message B"),c.a.createElement(o.a,{key:t.key,anchorOrigin:{vertical:"bottom",horizontal:"left"},open:this.state.open,autoHideDuration:6e3,onClose:this.handleClose,onExited:this.handleExited,ContentProps:{"aria-describedby":"message-id"},message:c.a.createElement("span",{id:"message-id"},t.message),action:[c.a.createElement(l.a,{key:"undo",color:"secondary",size:"small",onClick:this.handleClose},"UNDO"),c.a.createElement(m.a,{key:"close","aria-label":"Close",color:"inherit",className:e.close,onClick:this.handleClose},c.a.createElement(d.a,null))]}))}}]),t}(c.a.Component),V=Object(F.a)((function(e){return{close:{padding:e.spacing(.5)}}}))(J),G=t(1505);function W(e){return c.a.createElement(G.a,Object.assign({},e,{direction:"left"}))}function K(e){return c.a.createElement(G.a,Object.assign({},e,{direction:"up"}))}function X(e){return c.a.createElement(G.a,Object.assign({},e,{direction:"right"}))}function Y(e){return c.a.createElement(G.a,Object.assign({},e,{direction:"down"}))}var Z=function(e){Object(Q.a)(t,e);var a=Object(U.a)(t);function t(){var e;Object(L.a)(this,t);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=a.call.apply(a,[this].concat(c))).state={open:!1},e.handleClick=function(a){return function(){e.setState({open:!0,Transition:a})}},e.handleClose=function(){e.setState({open:!1})},e}return Object(M.a)(t,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement(l.a,{onClick:this.handleClick(W)},"Right"),c.a.createElement(l.a,{onClick:this.handleClick(K)},"Up"),c.a.createElement(l.a,{onClick:this.handleClick(X)},"Left"),c.a.createElement(l.a,{onClick:this.handleClick(Y)},"Down"),c.a.createElement(o.a,{open:this.state.open,onClose:this.handleClose,TransitionComponent:this.state.Transition,ContentProps:{"aria-describedby":"message-id"},message:c.a.createElement("span",{id:"message-id"},"I love snacks")}))}}]),t}(c.a.Component),$=t(1873);function _(){var e,a=Object($.useSnackbar)().enqueueSnackbar;return c.a.createElement(c.a.Fragment,null,c.a.createElement(l.a,{onClick:function(){a("I love snacks.")}},"Show snackbar"),c.a.createElement(l.a,{onClick:(e="warning",function(){a("This is a warning message!",{variant:e})})},"Show warning snackbar"))}function ee(){return c.a.createElement($.SnackbarProvider,{maxSnack:3},c.a.createElement(_,null))}var ae=t(641),te=t(1378);function ne(e){return c.a.createElement(G.a,Object.assign({},e,{direction:"up"}))}function ce(e){return c.a.createElement(te.a,e)}function re(){var e=c.a.useState({open:!1,Transition:ae.a}),a=Object(s.a)(e,2),t=a[0],n=a[1],r=function(e){return function(){n({open:!0,Transition:e})}};return c.a.createElement("div",null,c.a.createElement(l.a,{onClick:r(ce)},"Grow Transition"),c.a.createElement(l.a,{onClick:r(ae.a)},"Fade Transition"),c.a.createElement(l.a,{onClick:r(ne)},"Slide Transition"),c.a.createElement(o.a,{open:t.open,onClose:function(){n(Object(P.a)(Object(P.a)({},t),{},{open:!1}))},TransitionComponent:t.Transition,ContentProps:{"aria-describedby":"message-id"},message:c.a.createElement("span",{id:"message-id"},"I love snacks")}))}a.default=function(){return c.a.createElement("div",{className:"m-sm-30"},c.a.createElement("div",{className:"mb-sm-30"},c.a.createElement(r.a,{routeSegments:[{name:"Material",path:"/material"},{name:"Snackbar"}]})),c.a.createElement(r.q,{title:"simple snackbar"},c.a.createElement(E,null)),c.a.createElement("div",{className:"py-3"}),c.a.createElement(r.q,{title:"customized snackbar"},c.a.createElement(D,null)),c.a.createElement("div",{className:"py-3"}),c.a.createElement(r.q,{title:"positioned snackbar"},c.a.createElement(B,null)),c.a.createElement("div",{className:"py-3"}),c.a.createElement(r.q,{title:"message length"},c.a.createElement(H,null)),c.a.createElement("div",{className:"py-3"}),c.a.createElement(r.q,{title:"transition"},c.a.createElement(re,null)),c.a.createElement("div",{className:"py-3"}),c.a.createElement(r.q,{title:"consecutive snackbar"},c.a.createElement(V,null)),c.a.createElement("div",{className:"py-3"}),c.a.createElement(r.q,{title:"Control Slide direction"},c.a.createElement(Z,null)),c.a.createElement("div",{className:"py-3"}),c.a.createElement(r.q,{title:"complementary project"},c.a.createElement(ee,null)))}}}]);
//# sourceMappingURL=42.bc87bc09.chunk.js.map