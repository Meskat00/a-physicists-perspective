/* Optional student login (Firebase) — site works fully without it. Progress (lup_done) syncs to the student's own account. */
(function(){ "use strict";
if(!window.firebase) return;
try{
var CFG={apiKey:"AIzaSyAfD5wwaIhmtPbl50Z6d-Zlvzqk6Ob_FW8",authDomain:"physicists-perspective.firebaseapp.com",projectId:"physicists-perspective",storageBucket:"physicists-perspective.firebasestorage.app",messagingSenderId:"186707877920",appId:"1:186707877920:web:38f757b3016e1af3539c45"};
if(!firebase.apps.length) firebase.initializeApp(CFG);
var APP_CHECK_KEY="6LeG3PotAAAAADlJ4FodEFapAdlI14Hz2KDpPS8T"; /* filled after Firebase App Check registration; empty = off */
try{ if(APP_CHECK_KEY && firebase.appCheck) firebase.appCheck().activate(APP_CHECK_KEY, true); }catch(e){}
var auth=firebase.auth(), db=firebase.firestore();
try{ var PVK="pv_"+(location.pathname.split("/").pop()||"index.html"); if(!sessionStorage.getItem(PVK)){ sessionStorage.setItem(PVK,"1"); db.collection("pageviews").add({page:PVK.slice(3),ts:firebase.firestore.FieldValue.serverTimestamp()}).catch(function(){}); } }catch(e){}
var host=document.querySelector(".nav-links")||document.querySelector("nav.main");
if(!host) return;
var btn=document.createElement("button"); btn.type="button"; btn.className="lup-auth"; btn.textContent="Login";
host.appendChild(btn);
var tst=document.createElement("div"); tst.className="lup-toast"; document.body.appendChild(tst);
function toast(m){ tst.textContent=m; tst.classList.add("on"); setTimeout(function(){tst.classList.remove("on")},3600); }
function localDone(){ try{ return JSON.parse(localStorage.getItem("lup_done")||"[]"); }catch(e){ return []; } }
function localLec(){ try{ return JSON.parse(localStorage.getItem("lup_lec")||"[]"); }catch(e){ return []; } }
function snapOf(){ return (localStorage.getItem("lup_done")||"[]")+"|"+(localStorage.getItem("lup_lec")||"[]"); }
var user=null, lastSnap=snapOf(), resArr=null;
function fireUser(){
  try{ document.dispatchEvent(new CustomEvent("lupuser",{detail:{signed:!!user,name:user?(user.displayName||""):"",done:localDone(),lec:localLec(),res:resArr||[]}})); }catch(e){}
}
function pushCloud(){
  if(!user) return;
  lastSnap=snapOf();
  var ref=db.collection("users").doc(user.uid);
  var base={name:user.displayName||"",email:user.email||"",photo:user.photoURL||"",updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
  var full={done:localDone(),lec:localLec(),name:base.name,email:base.email,photo:base.photo,updatedAt:base.updatedAt};
  ref.set(full,{merge:true}).catch(function(){
    /* rules v5 publish হওয়ার আগে lec ফিল্ড reject হলে পুরনো field-set দিয়ে done sync চালু রাখো */
    var legacy={done:localDone(),name:base.name,email:base.email,photo:base.photo,updatedAt:base.updatedAt};
    ref.set(legacy,{merge:true}).catch(function(){});
  });
}
window.lupAddResult=function(entry){
  if(!user||!entry) return;
  resArr=(resArr||[]).concat([entry]).slice(-100);
  db.collection("users").doc(user.uid).set({res:resArr,updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true}).then(function(){ fireUser(); }).catch(function(){});
};
window.lupToggleLec=function(name){
  var a=localLec(), i=a.indexOf(name), on;
  if(i>=0){ a.splice(i,1); on=false; }else{ a.push(name); on=true; }
  try{ localStorage.setItem("lup_lec",JSON.stringify(a)); }catch(e){}
  if(user) pushCloud();
  fireUser();
  return on;
};
auth.getRedirectResult().catch(function(){});
auth.onAuthStateChanged(function(u){
  user=u;
  if(u){
    btn.className="lup-chip"; btn.title="Logout";
    btn.innerHTML=(u.photoURL?'<img src="'+u.photoURL+'" alt="" referrerpolicy="no-referrer">':"")+"<span>"+(u.displayName?u.displayName.split(" ")[0]:"Account")+"</span>";
    db.collection("users").doc(u.uid).get().then(function(snap){
      var data=snap.exists?snap.data():{};
      var cloud=(data&&data.done)?data.done:[];
      var local=localDone();
      var union=Array.from(new Set([].concat(cloud,local)));
      var changed=JSON.stringify(union.slice().sort())!==JSON.stringify(local.slice().sort());
      if(changed){ localStorage.setItem("lup_done",JSON.stringify(union)); }
      var cloudLec=(data&&data.lec)?data.lec:[];
      var localLecArr=localLec();
      var unionLec=Array.from(new Set([].concat(cloudLec,localLecArr)));
      var lecChanged=JSON.stringify(unionLec.slice().sort())!==JSON.stringify(localLecArr.slice().sort());
      if(lecChanged){ localStorage.setItem("lup_lec",JSON.stringify(unionLec)); }
      resArr=(data&&data.res)?data.res:[];
      pushCloud();
      fireUser();
      if(!sessionStorage.getItem("lup_welcomed")){ sessionStorage.setItem("lup_welcomed","1"); toast("স্বাগতম! তোমার record এখন সব device-এ sync হবে ✓"); }
      if((changed||lecChanged)&&!sessionStorage.getItem("lup_merged")){ sessionStorage.setItem("lup_merged","1"); location.reload(); }
    }).catch(function(){ fireUser(); });
  }else{
    btn.className="lup-auth"; btn.textContent="Login"; btn.title="Google দিয়ে login করলে তোমার record সব device-এ sync হবে";
    resArr=null;
    fireUser();
  }
});
btn.addEventListener("click",function(){
  if(user){ auth.signOut().then(function(){ toast("Logout হয়েছে — এই device-এর record রয়ে গেছে।"); }); return; }
  var prov=new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(prov).catch(function(e){
    if(e&&(e.code==="auth/popup-blocked"||e.code==="auth/operation-not-supported-in-this-environment"||e.code==="auth/cancelled-popup-request")){ auth.signInWithRedirect(prov); }
    else if(e&&e.code!=="auth/popup-closed-by-user"){ toast("Login হয়নি — আবার চেষ্টা করো।"); }
  });
});
setInterval(function(){ var now=snapOf(); if(user&&now!==lastSnap){ pushCloud(); } },4000);
}catch(e){}})();
