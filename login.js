/* Optional student login (Firebase) — site works fully without it. Progress (lup_done) syncs to the student's own account. */
(function(){ "use strict";
if(!window.firebase) return;
try{
var CFG={apiKey:"AIzaSyAfD5wwaIhmtPbl50Z6d-Zlvzqk6Ob_FW8",authDomain:"physicists-perspective.firebaseapp.com",projectId:"physicists-perspective",storageBucket:"physicists-perspective.firebasestorage.app",messagingSenderId:"186707877920",appId:"1:186707877920:web:38f757b3016e1af3539c45"};
if(!firebase.apps.length) firebase.initializeApp(CFG);
var APP_CHECK_KEY="6LeG3PotAAAAADlJ4FodEFapAdlI14Hz2KDpPS8T"; /* filled after Firebase App Check registration; empty = off */
try{ if(APP_CHECK_KEY && firebase.appCheck) firebase.appCheck().activate(APP_CHECK_KEY, true); }catch(e){}
var auth=firebase.auth(), db=firebase.firestore();
var host=document.querySelector(".nav-links")||document.querySelector("nav.main");
if(!host) return;
var btn=document.createElement("button"); btn.type="button"; btn.className="lup-auth"; btn.textContent="Login";
host.appendChild(btn);
var tst=document.createElement("div"); tst.className="lup-toast"; document.body.appendChild(tst);
function toast(m){ tst.textContent=m; tst.classList.add("on"); setTimeout(function(){tst.classList.remove("on")},3600); }
function localDone(){ try{ return JSON.parse(localStorage.getItem("lup_done")||"[]"); }catch(e){ return []; } }
var user=null, lastSnap=localStorage.getItem("lup_done")||"[]";
function pushCloud(){
  if(!user) return;
  lastSnap=localStorage.getItem("lup_done")||"[]";
  db.collection("users").doc(user.uid).set({done:localDone(),name:user.displayName||"",email:user.email||"",photo:user.photoURL||"",updatedAt:firebase.firestore.FieldValue.serverTimestamp()},{merge:true}).catch(function(){});
}
auth.getRedirectResult().catch(function(){});
auth.onAuthStateChanged(function(u){
  user=u;
  if(u){
    btn.className="lup-chip"; btn.title="Logout";
    btn.innerHTML=(u.photoURL?'<img src="'+u.photoURL+'" alt="" referrerpolicy="no-referrer">':"")+"<span>"+(u.displayName?u.displayName.split(" ")[0]:"Account")+"</span>";
    db.collection("users").doc(u.uid).get().then(function(snap){
      var cloud=(snap.exists&&snap.data().done)?snap.data().done:[];
      var local=localDone();
      var union=Array.from(new Set([].concat(cloud,local)));
      var changed=JSON.stringify(union.slice().sort())!==JSON.stringify(local.slice().sort());
      if(changed){ localStorage.setItem("lup_done",JSON.stringify(union)); }
      pushCloud();
      if(!sessionStorage.getItem("lup_welcomed")){ sessionStorage.setItem("lup_welcomed","1"); toast("স্বাগতম! তোমার record এখন সব device-এ sync হবে ✓"); }
      if(changed&&!sessionStorage.getItem("lup_merged")){ sessionStorage.setItem("lup_merged","1"); location.reload(); }
    }).catch(function(){});
  }else{
    btn.className="lup-auth"; btn.textContent="Login"; btn.title="Google দিয়ে login করলে তোমার record সব device-এ sync হবে";
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
setInterval(function(){ var now=localStorage.getItem("lup_done")||"[]"; if(user&&now!==lastSnap){ pushCloud(); } },4000);
}catch(e){}})();
