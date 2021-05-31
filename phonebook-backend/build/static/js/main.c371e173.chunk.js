(this["webpackJsonpphonebook-frontend"]=this["webpackJsonpphonebook-frontend"]||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(15),r=n.n(a),c=n(6),o=n(3),i=n(2),u=n(0),s=function(e){var t=e.persons,n=e.handleDelete;return Object(u.jsx)("div",{children:t.map((function(e){return Object(u.jsxs)("p",{children:[e.name," ",e.number,Object(u.jsx)("button",{style:{marginLeft:10},onClick:function(){return n(e.id,e.name)},children:"delete"})]},e.id)}))})},l=function(e){var t=e.eventHandlers,n=t.handleSubmit,a=t.handleNameChange,r=t.handleNumberChange,c=e.value,o=c.newName,i=c.newNumber;return Object(u.jsxs)("form",{onSubmit:n,children:[Object(u.jsxs)("div",{style:{marginBottom:10},children:["Name: ",Object(u.jsx)("input",{value:o,onChange:a})]}),Object(u.jsxs)("div",{style:{marginBottom:10},children:["Number: ",Object(u.jsx)("input",{value:i,onChange:r})]}),Object(u.jsx)("div",{style:{marginBottom:10},children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},d=function(e){var t=e.filterText,n=e.handleFilterChange;return Object(u.jsx)("form",{children:Object(u.jsxs)("div",{children:["Search: ",Object(u.jsx)("input",{value:t,onChange:n})]})})},f=function(e){var t=e.notification,n=t.message,a=t.status;return null===n?null:Object(u.jsx)("div",{className:a,children:n})},m=n(4),b=n.n(m),h="/api/persons",j={getAll:function(){return b.a.get(h).then((function(e){return e.data}))},create:function(e){return b.a.post(h,e).then((function(e){return e.data}))},update:function(e,t){return b.a.put("".concat(h,"/").concat(e),t).then((function(e){return e.data}))},deleteData:function(e){return b.a.delete("".concat(h,"/").concat(e)).then((function(e){return e}))}},O=function(){var e=Object(i.useState)([]),t=Object(o.a)(e,2),n=t[0],a=t[1],r=Object(i.useState)([]),m=Object(o.a)(r,2),b=m[0],h=m[1],O=Object(i.useState)(""),v=Object(o.a)(O,2),g=v[0],p=v[1],x=Object(i.useState)(""),w=Object(o.a)(x,2),N=w[0],C=w[1],y=Object(i.useState)(""),S=Object(o.a)(y,2),k=S[0],D=S[1],B=Object(i.useState)({message:null,status:null}),A=Object(o.a)(B,2),L=A[0],T=A[1],E=function(e,t){T("added"===t?{message:"".concat(e," added"),status:"success"}:"modified"===t?{message:"".concat(e," modified"),status:"success"}:"validation error"===t?{message:e,status:"error"}:{message:"Information of ".concat(e," has already been removed from server."),status:"error"}),setTimeout((function(){T({message:null,status:null})}),5e3)};Object(i.useEffect)((function(){j.getAll().then((function(e){a(e)}))}),[]);var F=function(e,t){window.confirm("Delete ".concat(t,"?"))&&j.deleteData(e).then((function(t){204===t.status&&a(n.filter((function(t){return t.id!==e})))})).catch((function(t){alert("the person of ".concat(e," was already deleted from server.")),a(n.filter((function(t){return t.id!==e})))}))};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"Phonebook \ud83d\udcf1"}),Object(u.jsx)(f,{notification:L}),Object(u.jsx)(d,{filterText:k,handleFilterChange:function(e){if(D(e.target.value),""===e.target.value.toString().trim())h(n.splice());else{var t=n.filter((function(t){return!0===t.name.toLowerCase().includes(e.target.value.toLowerCase())}));h(t)}}}),Object(u.jsx)("h1",{children:"Add \ud83d\ude0e"}),Object(u.jsx)(l,{eventHandlers:{handleSubmit:function(e){if(e.preventDefault(),g.trim().length<1)alert("Name can not be empty");else if(N.trim().length<1)alert("Number can not be empty");else if(n.filter((function(e){return e.name===g})).length>0){if(window.confirm("".concat(g," already added to phonebook, replace the old number with a new one?"))){var t=n.find((function(e){return e.name===g})),r=Object(c.a)(Object(c.a)({},t),{},{number:N});j.update(t.id,r).then((function(e){a(n.map((function(t){return t.name!==g?t:e}))),E(e.name,"modified"),p(""),C("")})).catch((function(e){E(t.name,"not found")}))}}else{var o={name:g.trim(),number:N.trim()};j.create(o).then((function(e){a(n.concat(e)),E(e.name,"added"),p(""),C("")})).catch((function(e){E(e.response.data.error,"validation error")}))}},handleNameChange:function(e){return p(e.target.value)},handleNumberChange:function(e){return C(e.target.value)}},value:{newName:g,newNumber:N}}),Object(u.jsx)("h1",{children:"Numbers \ud83d\ude4e"}),""===k.trim()?Object(u.jsx)(s,{persons:n,handleDelete:function(e,t){return F(e,t)}}):Object(u.jsx)(s,{persons:b,handleDelete:function(e,t){return F(e,t)}})]})};n(39);r.a.render(Object(u.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.c371e173.chunk.js.map