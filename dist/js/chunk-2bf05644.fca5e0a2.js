(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2bf05644"],{"206d":function(t,s,o){"use strict";o("4413")},4413:function(t,s,o){},a55b:function(t,s,o){"use strict";o.r(s);var a=function(){var t=this,s=t.$createElement,o=t._self._c||s;return o("b-container",{staticClass:"login-container d-flex justify-content-center py-5",attrs:{"align-self":"center"}},[t.show?o("b-form",{staticClass:"login-form"},[o("h2",{staticClass:"mb-4",staticStyle:{color:"#222"}},[t._v("ADMIN LOGIN")]),o("b-form-group",{staticClass:"label",attrs:{label:"USERNAME","label-for":"input-name"}},[o("b-form-input",{staticClass:"input",attrs:{id:"input-name",required:""},model:{value:t.form.username,callback:function(s){t.$set(t.form,"username",s)},expression:"form.username"}})],1),o("b-form-group",{staticClass:"label",attrs:{label:"PASSWORD","label-for":"input-password"}},[o("b-form-input",{staticClass:"input",attrs:{type:"password",id:"input-password",required:""},model:{value:t.form.password,callback:function(s){t.$set(t.form,"password",s)},expression:"form.password"}})],1),o("b-button",{staticClass:"mt-3 px-4",staticStyle:{background:"#b99362",border:"None","border-radius":"25px"},attrs:{type:"button"},on:{click:function(s){return t.login()}}},[t._v("登入")])],1):t._e()],1)},e=[],n={data:function(){return{form:{username:"",password:""},show:!0}},methods:{login:function(){var t=this;console.log("submit");var s={username:this.form.username,password:this.form.password};this.axios.post("".concat("http://localhost:3000","/login"),s).then((function(s){if(s.data.success){console.log("Login");var o=s.data.token;localStorage.setItem("access_token",o),t.$router.push({name:"Dashboard"}),t.form.email="",t.form.username=""}})).catch((function(t){console.log(t)}))}}},r=n,i=(o("206d"),o("2877")),l=Object(i["a"])(r,a,e,!1,null,null,null);s["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2bf05644.fca5e0a2.js.map