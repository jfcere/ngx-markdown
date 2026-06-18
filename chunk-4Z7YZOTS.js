import {W as R,a0 as qn$1,X as X$1,a1 as Q,a2 as xt,a3 as ge,a4 as y,a5 as wa,y as Zb,a as Bc,a6 as _t,a7 as Me$1,a8 as Lr,a9 as Ke$1,aa as te,ab as hn$1,ac as Z,ad as ue,ae as Ur,af as ie,ag as MS,ah as be$1,ai as pe,h,aj as fm,ak as Mb,al as O,n as F,am as j,L as Le,an as Br,ao as ct,ap as He,aq as we$1,ar as ze,as as Nb,at as Lh,au as Ph,av as Yt$1,aw as F8,ax as L8,ay as h9,az as O$1,aA as mo,aB as wp,aC as Vo,aD as Wo,aE as B,aF as tw,aG as fe,aH as Fe$1,aI as vi$1,aJ as B8,aK as IM,I as Ib,D as Dc,aL as Pr,F as Fh,f as fn$1,aM as jr,aN as Ob,aO as eT,aP as kb,aQ as $c,aR as G9,aS as Ki$1,aT as Et,aU as $s,aV as Ue$1,aW as Qt$1,aX as A,aY as im,aZ as $,a_ as Xx,a$ as hZ,b0 as Vn$1,b1 as pn$1,b2 as Ee$1,b3 as x,b4 as w,Q as YS,j as jc,S as Sb,x as tT,b5 as v,b6 as mx,B as Bh,V as Vc,b7 as Or,b8 as ae$1,U as FT}from'./main-I5D7B7TH.js';var Wt=(()=>{class i{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,n){this._renderer=e,this._elementRef=n;}setProperty(e,n){this._renderer.setProperty(this._elementRef.nativeElement,e,n);}registerOnTouched(e){this.onTouched=e;}registerOnChange(e){this.onChange=e;}setDisabledState(e){this.setProperty("disabled",e);}static \u0275fac=function(n){return new(n||i)(R(qn$1),R(X$1))};static \u0275dir=Q({type:i})}return i})(),Oi=(()=>{class i extends Wt{static \u0275fac=(()=>{let e;return function(r){return (e||(e=xt(i)))(r||i)}})();static \u0275dir=Q({type:i,features:[ge]})}return i})(),$t=new y("");var Ti={provide:$t,useExisting:wa(()=>Zt),multi:true};function Pi(){let i=pn$1()?pn$1().getUserAgent():"";return /android (\d+)/.test(i.toLowerCase())}var ki=new y(""),Zt=(()=>{class i extends Wt{_compositionMode;_composing=false;constructor(e,n,r){super(e,n),this._compositionMode=r,this._compositionMode==null&&(this._compositionMode=!Pi());}writeValue(e){let n=e??"";this.setProperty("value",n);}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e);}_compositionStart(){this._composing=true;}_compositionEnd(e){this._composing=false,this._compositionMode&&this.onChange(e);}static \u0275fac=function(n){return new(n||i)(R(qn$1),R(X$1),R(ki,8))};static \u0275dir=Q({type:i,selectors:[["input","formControlName","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControlName","",3,"ngNoCva",""],["input","formControl","",3,"type","checkbox",3,"ngNoCva",""],["textarea","formControl","",3,"ngNoCva",""],["input","ngModel","",3,"type","checkbox",3,"ngNoCva",""],["textarea","ngModel","",3,"ngNoCva",""],["","ngDefaultControl",""]],hostBindings:function(n,r){n&1&&Bc("input",function(a){return r._handleInput(a.target.value)})("blur",function(){return r.onTouched()})("compositionstart",function(){return r._compositionStart()})("compositionend",function(a){return r._compositionEnd(a.target.value)});},standalone:false,features:[Zb([Ti]),ge]})}return i})();function $e(i){return i==null||Ze(i)===0}function Ze(i){return i==null?null:Array.isArray(i)||typeof i=="string"?i.length:i instanceof Set?i.size:null}var Ee=new y(""),Qe=new y(""),Li=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,ce=class{static min(t){return Bi(t)}static max(t){return Hi(t)}static required(t){return Qt(t)}static requiredTrue(t){return zi(t)}static email(t){return ji(t)}static minLength(t){return Gi(t)}static maxLength(t){return Ui(t)}static pattern(t){return qi(t)}static nullValidator(t){return ye()}static compose(t){return ti(t)}static composeAsync(t){return ii(t)}};function Bi(i){return t=>{if(t.value==null||i==null)return null;let e=parseFloat(t.value);return !isNaN(e)&&e<i?{min:{min:i,actual:t.value}}:null}}function Hi(i){return t=>{if(t.value==null||i==null)return null;let e=parseFloat(t.value);return !isNaN(e)&&e>i?{max:{max:i,actual:t.value}}:null}}function Qt(i){return $e(i.value)?{required:true}:null}function zi(i){return i.value===true?null:{required:true}}function ji(i){return $e(i.value)||Li.test(i.value)?null:{email:true}}function Gi(i){return t=>{let e=t.value?.length??Ze(t.value);return e===null||e===0?null:e<i?{minlength:{requiredLength:i,actualLength:e}}:null}}function Ui(i){return t=>{let e=t.value?.length??Ze(t.value);return e!==null&&e>i?{maxlength:{requiredLength:i,actualLength:e}}:null}}function qi(i){if(!i)return ye;let t,e;return typeof i=="string"?(e="",i.charAt(0)!=="^"&&(e+="^"),e+=i,i.charAt(i.length-1)!=="$"&&(e+="$"),t=new RegExp(e)):(e=i.toString(),t=i),n=>{if($e(n.value))return null;let r=n.value;return t.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function ye(i){return null}function Yt(i){return i!=null}function Xt(i){return Or(i)?ae$1(i):i}function Kt(i){let t={};return i.forEach(e=>{t=e!=null?w(w({},t),e):t;}),Object.keys(t).length===0?null:t}function Jt(i,t){return t.map(e=>e(i))}function Wi(i){return !i.validate}function ei(i){return i.map(t=>Wi(t)?t:e=>t.validate(e))}function ti(i){if(!i)return null;let t=i.filter(Yt);return t.length==0?null:function(e){return Kt(Jt(e,t))}}function Ye(i){return i!=null?ti(ei(i)):null}function ii(i){if(!i)return null;let t=i.filter(Yt);return t.length==0?null:function(e){let n=Jt(e,t).map(Xt);return mx(n).pipe(B(Kt))}}function Xe(i){return i!=null?ii(ei(i)):null}function Lt(i,t){return i===null?[t]:Array.isArray(i)?[...i,t]:[i,t]}function ni(i){return i._rawValidators}function ri(i){return i._rawAsyncValidators}function Ue(i){return i?Array.isArray(i)?i:[i]:[]}function xe(i,t){return Array.isArray(i)?i.includes(t):i===t}function Bt(i,t){let e=Ue(t);return Ue(i).forEach(r=>{xe(e,r)||e.push(r);}),e}function Ht(i,t){return Ue(t).filter(e=>!xe(i,e))}var Ce=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=Ye(this._rawValidators);}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=Xe(this._rawAsyncValidators);}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t);}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[];}reset(t=void 0){this.control?.reset(t);}hasError(t,e){return this.control?this.control.hasError(t,e):false}getError(t,e){return this.control?this.control.getError(t,e):null}},U=class extends Ce{name;get formDirective(){return null}get path(){return null}};var oe="VALID",be="INVALID",Y="PENDING",ae="DISABLED",k=class{},Fe=class extends k{value;source;constructor(t,e){super(),this.value=t,this.source=e;}},le=class extends k{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e;}},de=class extends k{touched;source;constructor(t,e){super(),this.touched=t,this.source=e;}},X=class extends k{status;source;constructor(t,e){super(),this.status=t,this.source=e;}},De=class extends k{source;constructor(t){super(),this.source=t;}},K=class extends k{source;constructor(t){super(),this.source=t;}};function oi(i){return (Se(i)?i.validators:i)||null}function $i(i){return Array.isArray(i)?Ye(i):i||null}function ai(i,t){return (Se(t)?t.asyncValidators:i)||null}function Zi(i){return Array.isArray(i)?Xe(i):i||null}function Se(i){return i!=null&&!Array.isArray(i)&&typeof i=="object"}function Qi(i,t,e){let n=i.controls;if(!(Object.keys(n)).length)throw new v(1e3,"");if(!n[e])throw new v(1001,"")}function Yi(i,t,e){i._forEachChild((n,r)=>{if(e[r]===void 0)throw new v(-1002,"")});}var Me=class{_pendingDirty=false;_hasOwnPendingAsyncValidator=null;_pendingTouched=false;_onCollectionChange=()=>{};_updateOn;_hasRequired=Z(false);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e);}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t,this._updateHasRequiredValidator();}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t;}get parent(){return this._parent}get status(){return te(this.statusReactive)}set status(t){te(()=>this.statusReactive.set(t));}_status=hn$1(()=>this.statusReactive());statusReactive=Z(void 0);get valid(){return this.status===oe}get invalid(){return this.status===be}get pending(){return this.status===Y}get disabled(){return this.status===ae}get enabled(){return this.status!==ae}errors;get pristine(){return te(this.pristineReactive)}set pristine(t){te(()=>this.pristineReactive.set(t));}_pristine=hn$1(()=>this.pristineReactive());pristineReactive=Z(true);get dirty(){return !this.pristine}get touched(){return te(this.touchedReactive)}set touched(t){te(()=>this.touchedReactive.set(t));}_touched=hn$1(()=>this.touchedReactive());touchedReactive=Z(false);get untouched(){return !this.touched}_events=new O$1;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._assignValidators(t);}setAsyncValidators(t){this._assignAsyncValidators(t);}addValidators(t){this.setValidators(Bt(t,this._rawValidators));}addAsyncValidators(t){this.setAsyncValidators(Bt(t,this._rawAsyncValidators));}removeValidators(t){this.setValidators(Ht(t,this._rawValidators));}removeAsyncValidators(t){this.setAsyncValidators(Ht(t,this._rawAsyncValidators));}hasValidator(t){return xe(this._rawValidators,t)}hasAsyncValidator(t){return xe(this._rawAsyncValidators,t)}clearValidators(){this.validator=null;}clearAsyncValidators(){this.asyncValidator=null;}markAsTouched(t={}){let e=this.touched===false;this.touched=true;let n=t.sourceControl??this;t.onlySelf||this._parent?.markAsTouched(x(w({},t),{sourceControl:n})),e&&t.emitEvent!==false&&this._events.next(new de(true,n));}markAllAsDirty(t={}){this.markAsDirty({onlySelf:true,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(t));}markAllAsTouched(t={}){this.markAsTouched({onlySelf:true,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t));}markAsUntouched(t={}){let e=this.touched===true;this.touched=false,this._pendingTouched=false;let n=t.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:true,emitEvent:t.emitEvent,sourceControl:n});}),t.onlySelf||this._parent?._updateTouched(t,n),e&&t.emitEvent!==false&&this._events.next(new de(false,n));}markAsDirty(t={}){let e=this.pristine===true;this.pristine=false;let n=t.sourceControl??this;t.onlySelf||this._parent?.markAsDirty(x(w({},t),{sourceControl:n})),e&&t.emitEvent!==false&&this._events.next(new le(false,n));}markAsPristine(t={}){let e=this.pristine===false;this.pristine=true,this._pendingDirty=false;let n=t.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:true,emitEvent:t.emitEvent});}),t.onlySelf||this._parent?._updatePristine(t,n),e&&t.emitEvent!==false&&this._events.next(new le(true,n));}markAsPending(t={}){this.status=Y;let e=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new X(this.status,e)),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.markAsPending(x(w({},t),{sourceControl:e}));}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=ae,this.errors=null,this._forEachChild(r=>{r.disable(x(w({},t),{onlySelf:true}));}),this._updateValue();let n=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new Fe(this.value,n)),this._events.next(new X(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(x(w({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(true));}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=oe,this._forEachChild(n=>{n.enable(x(w({},t),{onlySelf:true}));}),this.updateValueAndValidity({onlySelf:true,emitEvent:t.emitEvent}),this._updateAncestors(x(w({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(n=>n(false));}_updateAncestors(t,e){t.onlySelf||(this._parent?.updateValueAndValidity(t),t.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e));}setParent(t){this._parent=t;}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let n=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===oe||this.status===Y)&&this._runAsyncValidator(n,t.emitEvent);}let e=t.sourceControl??this;t.emitEvent!==false&&(this._events.next(new Fe(this.value,e)),this._events.next(new X(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.updateValueAndValidity(x(w({},t),{sourceControl:e}));}_updateTreeValidity(t={emitEvent:true}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:true,emitEvent:t.emitEvent});}_setInitialStatus(){this.status=this._allControlsDisabled()?ae:oe;}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=Y,this._hasOwnPendingAsyncValidator={emitEvent:e!==false,shouldHaveEmitted:t!==false};let n=Xt(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:t});});}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??false;return this._hasOwnPendingAsyncValidator=null,t}return  false}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==false,this,e.shouldHaveEmitted);}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(".")),e.length===0)?null:e.reduce((n,r)=>n&&n._find(r),this)}getError(t,e){let n=e?this.get(e):this;return n?.errors?n.errors[t]:null}hasError(t,e){return !!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,n){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||n)&&this._events.next(new X(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,n);}_initObservables(){this.valueChanges=new ue,this.statusChanges=new ue;}_calculateStatus(){return this._allControlsDisabled()?ae:this.errors?be:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Y)?Y:this._anyControlsHaveStatus(be)?be:oe}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let n=!this._anyControlsDirty(),r=this.pristine!==n;this.pristine=n,t.onlySelf||this._parent?._updatePristine(t,e),r&&this._events.next(new le(this.pristine,e));}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new de(this.touched,e)),t.onlySelf||this._parent?._updateTouched(t,e);}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t;}_setUpdateStrategy(t){Se(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn);}_parentMarkedDirty(t){return !t&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=$i(this._rawValidators),this._updateHasRequiredValidator();}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=Zi(this._rawAsyncValidators);}_updateHasRequiredValidator(){te(()=>this._hasRequired.set(this.hasValidator(ce.required)));}};function Xi(i){return i.tagName==="INPUT"||i.tagName==="SELECT"||i.tagName==="TEXTAREA"}function Ki(i,t,e,n){switch(e){case "name":i.setAttribute(t,e,n);break;case "disabled":case "readonly":case "required":n?i.setAttribute(t,e,""):i.removeAttribute(t,e);break;case "max":case "min":case "minLength":case "maxLength":n!==void 0?i.setAttribute(t,e,n.toString()):i.removeAttribute(t,e);break}}var qe=class{kind;context;control;message;constructor({kind:t,context:e,control:n}){this.kind=t,this.context=e,this.control=n;}};var Ji=(()=>{class i{_validator=ye;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let n=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(n),this._validator=this._enabled?this.createValidator(n):ye,this._onChange?.();}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e;}enabled(e){return e!=null}static \u0275fac=function(n){return new(n||i)};static \u0275dir=Q({type:i,features:[_t]})}return i})();var en={provide:Ee,useExisting:wa(()=>si),multi:true};var si=(()=>{class i extends Ji{required;inputName="required";normalizeInput=Me$1;createValidator=e=>Qt;enabled(e){return e}static \u0275fac=(()=>{let e;return function(r){return (e||(e=xt(i)))(r||i)}})();static \u0275dir=Q({type:i,selectors:[["","required","","formControlName","",3,"type","checkbox"],["","required","","formControl","",3,"type","checkbox"],["","required","","ngModel","",3,"type","checkbox"]],hostVars:1,hostBindings:function(n,r){n&2&&Lr("required",r._enabled?"":null);},inputs:{required:"required"},standalone:false,features:[Zb([en]),ge]})}return i})();var tn=new y(""),Ie=new y("",{factory:()=>Ke}),Ke="always";function nn(i,t){return [...t.path,i]}function zt(i,t,e=Ke){Je(i,t),t.valueAccessor.writeValue(i.value),(i.disabled||e==="always")&&t.valueAccessor.setDisabledState?.(i.disabled),on(i,t),sn(i,t),an(i,t),rn(i,t);}function jt(i,t,e=true){let n=()=>{};t?.valueAccessor?.registerOnChange(n),t?.valueAccessor?.registerOnTouched(n),we(i,t),i&&(t._invokeOnDestroyCallbacks(),i._registerOnCollectionChange(()=>{}));}function Ve(i,t){i.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t);});}function rn(i,t){if(t.valueAccessor.setDisabledState){let e=n=>{t.valueAccessor.setDisabledState(n);};i.registerOnDisabledChange(e),t._registerOnDestroy(()=>{i._unregisterOnDisabledChange(e);});}}function Je(i,t){let e=ni(i);t.validator!==null?i.setValidators(Lt(e,t.validator)):typeof e=="function"&&i.setValidators([e]);let n=ri(i);t.asyncValidator!==null?i.setAsyncValidators(Lt(n,t.asyncValidator)):typeof n=="function"&&i.setAsyncValidators([n]);let r=()=>i.updateValueAndValidity();Ve(t._rawValidators,r),Ve(t._rawAsyncValidators,r);}function we(i,t){let e=false;if(i!==null){if(t.validator!==null){let r=ni(i);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==t.validator);o.length!==r.length&&(e=true,i.setValidators(o));}}if(t.asyncValidator!==null){let r=ri(i);if(Array.isArray(r)&&r.length>0){let o=r.filter(a=>a!==t.asyncValidator);o.length!==r.length&&(e=true,i.setAsyncValidators(o));}}}let n=()=>{};return Ve(t._rawValidators,n),Ve(t._rawAsyncValidators,n),e}function on(i,t){t.valueAccessor.registerOnChange(e=>{i._pendingValue=e,i._pendingChange=true,i._pendingDirty=true,i.updateOn==="change"&&li(i,t);});}function an(i,t){t.valueAccessor.registerOnTouched(()=>{i._pendingTouched=true,i.updateOn==="blur"&&i._pendingChange&&li(i,t),i.updateOn!=="submit"&&i.markAsTouched();});}function li(i,t){i._pendingDirty&&i.markAsDirty(),i.setValue(i._pendingValue,{emitModelToViewChange:false}),t.viewToModelUpdate(i._pendingValue),i._pendingChange=false;}function sn(i,t){let e=(n,r)=>{t.valueAccessor.writeValue(n),r&&t.viewToModelUpdate(n);};i.registerOnChange(e),t._registerOnDestroy(()=>{i._unregisterOnChange(e);});}function di(i,t){Je(i,t);}function ln(i,t){return we(i,t)}function dn(i,t){if(!i.hasOwnProperty("model"))return  false;let e=i.model;return e.isFirstChange()?true:!Object.is(t,e.currentValue)}function cn(i){return Object.getPrototypeOf(i.constructor)===Oi}function ci(i,t){i._syncPendingControls(),t.forEach(e=>{let n=e.control;n.updateOn==="submit"&&n._pendingChange&&(e.viewToModelUpdate(n._pendingValue),n._pendingChange=false);});}function un(i,t){if(!t)return null;let e,n,r;return t.forEach(o=>{o.constructor===Zt?e=o:cn(o)?n=o:r=o;}),r||n||e||null}function fn(i,t){let e=i.indexOf(t);e>-1&&i.splice(e,1);}var mn={provide:tn,useFactory:()=>{let i=h(L,{self:true});return {setParseErrors:t=>{i.setParseErrorSource(t);},set onReset(t){i.onReset=t;}}}},L=class extends Ce{_parent=null;name=null;valueAccessor=null;isCustomControlBased=false;userOnReset;resetSubscription;set onReset(t){this.userOnReset=t,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof K&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription?.add(this.resetSubscription));}isNativeFormElement=false;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=un(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(t,e,n){super(),this.injector=t,this.renderer=e,this.rawValueAccessors=n,this.injector?.get(Ee$1)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe();});}setupCustomControl(){this.subscription?.unsubscribe();let t=this.injector?.get(Ur);if(!this.control||!t)return;let e=t.markForCheck.bind(t);this.subscription=new j,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(n=>{n instanceof K&&this.control&&this.userOnReset?.(this.control.value);}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator);}ngControlCreate(t){!t.nativeElement.hasAttribute?.("ngNoCva")&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!t.customControl||(this.isCustomControlBased=true,t.listenToCustomControlModel(r=>{this.control?.setValue(r,{emitModelToViewChange:false}),this.control?.markAsDirty(),this.viewToModelUpdate(r);}),t.listenToCustomControlOutput("touch",()=>{this.control?.markAsTouched();}),this.customControlBindings={},this.isNativeFormElement=Xi(t.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(r=>r instanceof si));}ngControlUpdate(t,e){if(!this.isCustomControlBased)return;let n=this.control,r=this.customControlBindings;Object.is(r.value,n.value)||(r.value=n.value,t.setCustomControlModelInput(n.value)),this.bindControlProperty(t,r,"touched",n.touched),this.bindControlProperty(t,r,"dirty",n.dirty),this.bindControlProperty(t,r,"valid",n.valid),this.bindControlProperty(t,r,"invalid",n.invalid),this.bindControlProperty(t,r,"pending",n.pending),this.bindControlProperty(t,r,"disabled",n.disabled),this.shouldBindRequired&&this.bindControlProperty(t,r,"required",this.isRequired);let o=n.errors;if(r.errors!==o){r.errors=o;let a=this._convertErrors(o);t.setInputOnDirectives("errors",a);}}get isRequired(){return (this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??false}get shouldBindRequired(){return  true}bindControlProperty(t,e,n,r){if(e[n]===r)return;e[n]=r;let o=t.setInputOnDirectives(n,r);this.isNativeFormElement&&!o&&(n==="disabled"||n==="required")&&this.renderer&&Ki(this.renderer,t.nativeElement,n,r);}_convertErrors(t){if(t===null)return [];let e=this.control;return Object.entries(t).map(([n,r])=>new qe({context:r,kind:n,control:e}))}setParseErrorSource(t){if(t===void 0)return;let e=null,n=hn$1(()=>{let r=t();return r.length===0?null:r.reduce((o,a)=>(o[a.kind]=a,o),{})});this.parseErrorsValidator=(()=>e).bind(this),Vo(()=>{e=n(),this.control?.updateValueAndValidity({emitEvent:false});},{injector:this.injector});}removeParseErrorsValidator(t){this.parseErrorsValidator&&(t?.removeValidators(this.parseErrorsValidator),t?.updateValueAndValidity({emitEvent:false}));}},We=class{_cd;constructor(t){this._cd=t;}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return !!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return !!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return !!this._cd?.control?.invalid}get isPending(){return !!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var vr=(()=>{class i extends We{constructor(e){super(e);}static \u0275fac=function(n){return new(n||i)(R(L,2))};static \u0275dir=Q({type:i,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(n,r){n&2&&Ke$1("ng-untouched",r.isUntouched)("ng-touched",r.isTouched)("ng-pristine",r.isPristine)("ng-dirty",r.isDirty)("ng-valid",r.isValid)("ng-invalid",r.isInvalid)("ng-pending",r.isPending);},standalone:false,features:[ge]})}return i})();var Ae=class extends Me{constructor(t,e,n){super(oi(e),ai(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator});}controls;registerControl(t,e){return this.controls[t]?this.controls[t]:(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,n={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange();}removeControl(t,e={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange();}setControl(t,e,n={}){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange();}contains(t){return this.controls.hasOwnProperty(t)&&this.controls[t].enabled}setValue(t,e={}){te(()=>{Yi(this,true,t),Object.keys(t).forEach(n=>{Qi(this,true,n),this.controls[n].setValue(t[n],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e);});}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(n=>{let r=this.controls[n];r&&r.patchValue(t[n],{onlySelf:true,emitEvent:e.emitEvent});}),this.updateValueAndValidity(e));}reset(t={},e={}){this._forEachChild((n,r)=>{n.reset(t?t[r]:null,x(w({},e),{onlySelf:true}));}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==false&&this._events.next(new K(this));}getRawValue(){return this._reduceChildren({},(t,e,n)=>(t[n]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(false,(e,n)=>n._syncPendingControls()?true:e);return t&&this.updateValueAndValidity({onlySelf:true}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let n=this.controls[e];n&&t(n,e);});}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange);});}_updateValue(){this.value=this._reduceValue();}_anyControls(t){for(let[e,n]of Object.entries(this.controls))if(this.contains(e)&&t(n))return  true;return  false}_reduceValue(){let t={};return this._reduceChildren(t,(e,n,r)=>((n.enabled||this.disabled)&&(e[r]=n.value),e))}_reduceChildren(t,e){let n=t;return this._forEachChild((r,o)=>{n=e(n,r,o);}),n}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return  false;return Object.keys(this.controls).length>0||this.disabled}_find(t){return this.controls.hasOwnProperty(t)?this.controls[t]:null}};var hn={provide:U,useExisting:wa(()=>et)},se=Promise.resolve(),et=(()=>{class i extends U{callSetDisabledState;get submitted(){return te(this.submittedReactive)}_submitted=hn$1(()=>this.submittedReactive());submittedReactive=Z(false);_directives=new Set;form;ngSubmit=new ue;options;constructor(e,n,r){super(),this.callSetDisabledState=r,this.form=new Ae({},Ye(e),Xe(n));}ngAfterViewInit(){this._setUpdateStrategy();}get formDirective(){return this}get control(){return this.form}get path(){return []}get controls(){return this.form.controls}addControl(e){se.then(()=>{let n=this._findContainer(e.path);e.control=n.registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:false}),this._directives.add(e);});}getControl(e){return this.form.get(e.path)}removeControl(e){se.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e);});}addFormGroup(e){se.then(()=>{let n=this._findContainer(e.path),r=new Ae({});di(r,e),n.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:false});});}removeFormGroup(e){se.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name);});}getFormGroup(e){return this.form.get(e.path)}updateModel(e,n){se.then(()=>{this.form.get(e.path).setValue(n);});}setValue(e){this.control.setValue(e);}onSubmit(e){return this.submittedReactive.set(true),ci(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new De(this.control)),e?.target?.method==="dialog"}onReset(){this.resetForm();}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(false);}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn);}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static \u0275fac=function(n){return new(n||i)(R(Ee,10),R(Qe,10),R(Ie,8))};static \u0275dir=Q({type:i,selectors:[["form",3,"ngNoForm","",3,"formGroup","",3,"formArray",""],["ng-form"],["","ngForm",""]],hostBindings:function(n,r){n&1&&Bc("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()});},inputs:{options:[0,"ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[Zb([hn]),ge]})}return i})();function Gt(i,t){let e=i.indexOf(t);e>-1&&i.splice(e,1);}function Ut(i){return typeof i=="object"&&i!==null&&Object.keys(i).length===2&&"value"in i&&"disabled"in i}var ui=class extends Me{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=false;constructor(t=null,e,n){super(oi(e),ai(n,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:true,emitEvent:!!this.asyncValidator}),Se(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Ut(t)?this.defaultValue=t.value:this.defaultValue=t);}setValue(t,e={}){te(()=>{this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==false&&this._onChange.forEach(n=>n(this.value,e.emitViewToModelChange!==false)),this.updateValueAndValidity(e);});}patchValue(t,e={}){this.setValue(t,e);}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=false,e?.emitEvent!==false&&this._events.next(new K(this));}_updateValue(){}_anyControls(t){return  false}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t);}_unregisterOnChange(t){Gt(this._onChange,t);}registerOnDisabledChange(t){this._onDisabledChange.push(t);}_unregisterOnDisabledChange(t){Gt(this._onDisabledChange,t);}_forEachChild(t){}_syncPendingControls(){return this.updateOn==="submit"&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:true,emitModelToViewChange:false}),true):false}_applyFormState(t){Ut(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:true,emitEvent:false}):this.enable({onlySelf:true,emitEvent:false})):this.value=this._pendingValue=t;}};var pn=i=>i instanceof ui;var gn={provide:L,useExisting:wa(()=>_n)},qt=Promise.resolve(),_n=(()=>{class i extends L{_changeDetectorRef;callSetDisabledState;control=new ui;static ngAcceptInputType_isDisabled;_registered=false;viewModel;name="";isDisabled;model;options;update=new ue;constructor(e,n,r,o,a,u,B,T){super(B,T,o),this._changeDetectorRef=a,this.callSetDisabledState=u,this._parent=e,this._setValidators(n),this._setAsyncValidators(r);}ngOnChanges(e){if(this._checkForErrors(),!this._registered||"name"in e){if(this._registered&&(this._checkName(),this.formDirective)){let n=e.name.previousValue;this.formDirective.removeControl({name:n,path:this._getPath(n)});}this._setUpControl();}"isDisabled"in e&&this._updateDisabled(e),dn(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model);}ngOnDestroy(){this.formDirective?.removeControl(this);}\u0275ngControlCreate(e){super.ngControlCreate(e);}\u0275ngControlUpdate(e){super.ngControlUpdate(e,false);}get shouldBindRequired(){return  false}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e);}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=true;}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn);}_isStandalone(){return !this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,zt(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:false});}_setupWithForm(e){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,zt(this.control,this,e));}_checkForErrors(){this._checkName();}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name;}_updateValue(e){qt.then(()=>{this.control.setValue(e,{emitViewToModelChange:false}),this._changeDetectorRef?.markForCheck();});}_updateDisabled(e){let n=e.isDisabled.currentValue,r=n!==0&&Me$1(n);qt.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck();});}_getPath(e){return this._parent?nn(e,this._parent):[e]}static \u0275fac=function(n){return new(n||i)(R(U,9),R(Ee,10),R(Qe,10),R($t,10),R(Ur,8),R(Ie,8),R(ie,8),R(qn$1,8))};static \u0275dir=Q({type:i,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:[0,"disabled","isDisabled"],model:[0,"ngModel","model"],options:[0,"ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],standalone:false,features:[Zb([gn,mn]),ge,_t,MS(null)]})}return i})();var vn=(()=>{class i extends U{callSetDisabledState;get submitted(){return te(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e);}_submitted=hn$1(()=>this._submittedReactive());_submittedReactive=Z(false);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,n,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(n);}ngOnChanges(e){this.onChanges(e);}ngOnDestroy(){this.onDestroy();}onChanges(e){this._checkFormPresent(),e.hasOwnProperty("form")&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form);}onDestroy(){this.form&&(we(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}));}get formDirective(){return this}get path(){return []}addControl(e){let n=this.form.get(e.path);return e._setupWithForm(n,this.callSetDisabledState),n.updateValueAndValidity({emitEvent:false}),this.directives.push(e),n}getControl(e){return this.form.get(e.path)}removeControl(e){jt(e.control||null,e,false),fn(this.directives,e);}addFormGroup(e){this._setUpFormContainer(e);}removeFormGroup(e){this._cleanUpFormContainer(e);}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e);}removeFormArray(e){this._cleanUpFormContainer(e);}updateModel(e,n){this.form.get(e.path).setValue(n);}onReset(){this.resetForm();}resetForm(e=void 0,n={}){this.form.reset(e,n),this._submittedReactive.set(false);}onSubmit(e){return this.submitted=true,ci(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new De(this.control)),e?.target?.method==="dialog"}_updateDomValue(){this.directives.forEach(e=>{let n=e.control,r=this.form.get(e.path);n!==r&&(jt(n||null,e),pn(r)&&e._setupWithForm(r,this.callSetDisabledState));}),this.form._updateTreeValidity({emitEvent:false});}_setUpFormContainer(e){let n=this.form.get(e.path);di(n,e),n.updateValueAndValidity({emitEvent:false});}_cleanUpFormContainer(e){let n=this.form?.get(e.path);n&&ln(n,e)&&n.updateValueAndValidity({emitEvent:false});}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{});}_updateValidators(){Je(this.form,this),this._oldForm&&we(this._oldForm,this);}_checkFormPresent(){this.form;}static \u0275fac=function(n){return new(n||i)(R(Ee,10),R(Qe,10),R(Ie,8))};static \u0275dir=Q({type:i,features:[ge,_t]})}return i})();var bn={provide:U,useExisting:wa(()=>tt)},tt=(()=>{class i extends vn{form=null;ngSubmit=new ue;get control(){return this.form}static \u0275fac=(()=>{let e;return function(r){return (e||(e=xt(i)))(r||i)}})();static \u0275dir=Q({type:i,selectors:[["","formGroup",""]],hostBindings:function(n,r){n&1&&Bc("submit",function(a){return r.onSubmit(a)})("reset",function(){return r.onReset()});},inputs:{form:[0,"formGroup","form"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],standalone:false,features:[Zb([bn]),ge]})}return i})();var yn=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=be$1({type:i});static \u0275inj=pe({})}return i})();var yr=(()=>{class i{static withConfig(e){return {ngModule:i,providers:[{provide:Ie,useValue:e.callSetDisabledState??Ke}]}}static \u0275fac=function(n){return new(n||i)};static \u0275mod=be$1({type:i});static \u0275inj=pe({imports:[yn]})}return i})();var xn=["notch"],Cn=["*"],fi=["iconPrefixContainer"],mi=["textPrefixContainer"],hi=["iconSuffixContainer"],pi=["textSuffixContainer"],Fn=["textField"],Dn=["*",[["mat-label"]],[["","matPrefix",""],["","matIconPrefix",""]],[["","matTextPrefix",""]],[["","matTextSuffix",""]],[["","matSuffix",""],["","matIconSuffix",""]],[["mat-error"],["","matError",""]],[["mat-hint",3,"align","end"]],[["mat-hint","align","end"]]],Mn=["*","mat-label","[matPrefix], [matIconPrefix]","[matTextPrefix]","[matTextSuffix]","[matSuffix], [matIconSuffix]","mat-error, [matError]","mat-hint:not([align='end'])","mat-hint[align='end']"];function Vn(i,t){i&1&&jc(0,"span",21);}function wn(i,t){if(i&1&&(Dc(0,"label",20),we$1(1,1),Pr(2,Vn,1,0,"span",21),Fh()),i&2){let e=YS(2);Sb("floating",e._shouldLabelFloat())("monitorResize",e._hasOutline())("id",e._labelId),Lr("for",e._control.disableAutomaticLabeling?null:e._control.id),fn$1(2),jr(!e.hideRequiredMarker&&e._control.required?2:-1);}}function An(i,t){if(i&1&&Pr(0,wn,3,5,"label",20),i&2){let e=YS();jr(e._hasFloatingLabel()?0:-1);}}function En(i,t){i&1&&jc(0,"div",7);}function Sn(i,t){}function In(i,t){if(i&1&&Ib(0,Sn,0,0,"ng-template",13),i&2){YS(2);let e=tT(1);Sb("ngTemplateOutlet",e);}}function Rn(i,t){if(i&1&&(Dc(0,"div",9),Pr(1,In,1,1,null,13),Fh()),i&2){let e=YS();Sb("matFormFieldNotchedOutlineOpen",e._shouldLabelFloat()),fn$1(),jr(e._forceDisplayInfixLabel()?-1:1);}}function Nn(i,t){i&1&&(Dc(0,"div",10,2),we$1(2,2),Fh());}function On(i,t){i&1&&(Dc(0,"div",11,3),we$1(2,3),Fh());}function Tn(i,t){}function Pn(i,t){if(i&1&&Ib(0,Tn,0,0,"ng-template",13),i&2){YS();let e=tT(1);Sb("ngTemplateOutlet",e);}}function kn(i,t){i&1&&(Dc(0,"div",14,4),we$1(2,4),Fh());}function Ln(i,t){i&1&&(Dc(0,"div",15,5),we$1(2,5),Fh());}function Bn(i,t){i&1&&jc(0,"div",16);}function Hn(i,t){i&1&&(Dc(0,"div",18),we$1(1,6),Fh());}function zn(i,t){if(i&1&&(Dc(0,"mat-hint",22),Bh(1),Fh()),i&2){let e=YS(2);Sb("id",e._hintLabelId),fn$1(),Vc(e.hintLabel);}}function jn(i,t){if(i&1&&(Dc(0,"div",19),Pr(1,zn,2,2,"mat-hint",22),we$1(2,7),jc(3,"div",23),we$1(4,8),Fh()),i&2){let e=YS();fn$1(),jr(e.hintLabel?1:-1);}}var it=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275dir=Q({type:i,selectors:[["mat-label"]]})}return i})(),Gn=new y("MatError");var nt=(()=>{class i{align="start";id=h(fm).getId("mat-mdc-hint-");static \u0275fac=function(n){return new(n||i)};static \u0275dir=Q({type:i,selectors:[["mat-hint"]],hostAttrs:[1,"mat-mdc-form-field-hint","mat-mdc-form-field-bottom-align"],hostVars:4,hostBindings:function(n,r){n&2&&(Mb("id",r.id),Lr("align",null),Ke$1("mat-mdc-form-field-hint-end",r.align==="end"));},inputs:{align:"align",id:"id"}})}return i})(),Un=new y("MatPrefix");var qn=new y("MatSuffix");var Ci=new y("FloatingLabelParent"),gi=(()=>{class i{_elementRef=h(X$1);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize();}_floating=false;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe();}_monitorResize=false;_resizeObserver=h(O);_ngZone=h(F);_parent=h(Ci);_resizeSubscription=new j;ngOnDestroy(){this._resizeSubscription.unsubscribe();}getWidth(){return Wn(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized());}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:"border-box"}).subscribe(()=>this._handleResize());});}static \u0275fac=function(n){return new(n||i)};static \u0275dir=Q({type:i,selectors:[["label","matFormFieldFloatingLabel",""]],hostAttrs:[1,"mdc-floating-label","mat-mdc-floating-label"],hostVars:2,hostBindings:function(n,r){n&2&&Ke$1("mdc-floating-label--float-above",r.floating);},inputs:{floating:"floating",monitorResize:"monitorResize"}})}return i})();function Wn(i){let t=i;if(t.offsetParent!==null)return t.scrollWidth;let e=t.cloneNode(true);e.style.setProperty("position","absolute"),e.style.setProperty("transform","translate(-9999px, -9999px)"),document.documentElement.appendChild(e);let n=e.scrollWidth;return e.remove(),n}var _i="mdc-line-ripple--active",Re="mdc-line-ripple--deactivating",vi=(()=>{class i{_elementRef=h(X$1);_cleanupTransitionEnd;constructor(){let e=h(F),n=h(qn$1);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=n.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionEnd);});}activate(){let e=this._elementRef.nativeElement.classList;e.remove(Re),e.add(_i);}deactivate(){this._elementRef.nativeElement.classList.add(Re);}_handleTransitionEnd=e=>{let n=this._elementRef.nativeElement.classList,r=n.contains(Re);e.propertyName==="opacity"&&r&&n.remove(_i,Re);};ngOnDestroy(){this._cleanupTransitionEnd();}static \u0275fac=function(n){return new(n||i)};static \u0275dir=Q({type:i,selectors:[["div","matFormFieldLineRipple",""]],hostAttrs:[1,"mdc-line-ripple"]})}return i})(),bi=(()=>{class i{_elementRef=h(X$1);_ngZone=h(F);open=false;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,n=e.querySelector(".mdc-floating-label");n?(e.classList.add("mdc-notched-outline--upgraded"),typeof requestAnimationFrame=="function"&&(n.style.transitionDuration="0s",this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>n.style.transitionDuration="");}))):e.classList.add("mdc-notched-outline--no-label");}_setNotchWidth(e){let n=this._notch.nativeElement;!this.open||!e?n.style.width="":n.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`;}_setMaxWidth(e){this._notch.nativeElement.style.setProperty("--mat-form-field-notch-max-width",`calc(100% - ${e}px)`);}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=Le({type:i,selectors:[["div","matFormFieldNotchedOutline",""]],viewQuery:function(n,r){if(n&1&&Nb(xn,5),n&2){let o;Lh(o=Ph())&&(r._notch=o.first);}},hostAttrs:[1,"mdc-notched-outline"],hostVars:2,hostBindings:function(n,r){n&2&&Ke$1("mdc-notched-outline--notched",r.open);},inputs:{open:[0,"matFormFieldNotchedOutlineOpen","open"]},ngContentSelectors:Cn,decls:5,vars:0,consts:[["notch",""],[1,"mat-mdc-notch-piece","mdc-notched-outline__leading"],[1,"mat-mdc-notch-piece","mdc-notched-outline__notch"],[1,"mat-mdc-notch-piece","mdc-notched-outline__trailing"]],template:function(n,r){n&1&&(Br(),ct(0,"div",1),He(1,"div",2,0),we$1(3),ze(),ct(4,"div",3));},encapsulation:2})}return i})(),rt=(()=>{class i{value=null;stateChanges;id;placeholder;ngControl=null;focused=false;empty=false;shouldLabelFloat=false;required=false;disabled=false;errorState=false;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;static \u0275fac=function(n){return new(n||i)};static \u0275dir=Q({type:i})}return i})();var ot=new y("MatFormField"),$n=new y("MAT_FORM_FIELD_DEFAULT_OPTIONS"),yi="fill",Zn="auto",xi="fixed",Qn="translateY(-50%)",Fi=(()=>{class i{_elementRef=h(X$1);_changeDetectorRef=h(Ur);_platform=h(Yt$1);_idGenerator=h(fm);_ngZone=h(F);_defaults=h($n,{optional:true});_currentDirection;_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=F8("iconPrefixContainer");_textPrefixContainerSignal=F8("textPrefixContainer");_iconSuffixContainerSignal=F8("iconSuffixContainer");_textSuffixContainerSignal=F8("textSuffixContainer");_prefixSuffixContainers=hn$1(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=L8(it);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=h9(e);}_hideRequiredMarker=false;color="primary";get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||Zn}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck());}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let n=e||this._defaults?.appearance||yi;this._appearanceSignal.set(n);}_appearanceSignal=Z(yi);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||xi}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||xi;}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints();}_hintLabel="";_hasIconPrefix=false;_hasTextPrefix=false;_hasIconSuffix=false;_hasTextSuffix=false;_labelId=this._idGenerator.getId("mat-mdc-form-field-label-");_hintLabelId=this._idGenerator.getId("mat-mdc-hint-");_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e;}_destroyed=new O$1;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=mo();constructor(){let e=this._defaults,n=h(wp);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),Vo(()=>this._currentDirection=n.valueSignal()),this._syncOutlineLabelOffset();}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-form-field-animations-enabled");},300);}),this._changeDetectorRef.detectChanges();}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix();}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=this._control.ngControl.control.validator),this._previousControl=this._control),this._control.ngControl&&this._control.ngControl.control&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck();}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete();}getLabelId=hn$1(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel="always");}_initializeControl(e){let n=this._control,r="mat-mdc-form-field-type-";e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),n.controlType&&this._elementRef.nativeElement.classList.add(r+n.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=n.stateChanges.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck();}),this._describedByChanges?.unsubscribe(),this._describedByChanges=n.stateChanges.pipe(Wo([void 0,void 0]),B(()=>[n.errorState,n.userAriaDescribedBy]),tw(),fe(([[o,a],[u,B]])=>o!==u||a!==B)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),n.ngControl&&n.ngControl.valueChanges&&(this._valueChanges=n.ngControl.valueChanges.pipe(Fe$1(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()));}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText);}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),vi$1(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck();});}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck();}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck();}),this._validateHints(),this._syncDescribedByIds();}_assertFormFieldControl(){this._control;}_updateFocusState(){let e=this._control.focused;e&&!this._isFocused?(this._isFocused=true,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=false,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle("mat-focused",e),this._textField?.nativeElement.classList.toggle("mdc-text-field--focused",e);}_syncOutlineLabelOffset(){B8({earlyRead:()=>{if(this._appearanceSignal()!=="outline")return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset());});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:"border-box"});}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())});}_shouldAlwaysFloat(){return this.floatLabel==="always"}_hasOutline(){return this.appearance==="outline"}_forceDisplayInfixLabel(){return !this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=hn$1(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._control.shouldLabelFloat||this._shouldAlwaysFloat():false}_shouldForward(e){let n=this._control?this._control.ngControl:null;return n&&n[e]}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._control.errorState?"error":"hint"}_handleLabelResized(){this._refreshOutlineNotchWidth();}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth());}_processHints(){this._validateHints(),this._syncDescribedByIds();}_validateHints(){this._hintChildren;}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy=="string"&&e.push(...this._control.userAriaDescribedBy.split(" ")),this._getSubscriptMessageType()==="hint"){let o=this._hintChildren?this._hintChildren.find(u=>u.align==="start"):null,a=this._hintChildren?this._hintChildren.find(u=>u.align==="end"):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),a&&e.push(a.id);}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let n=this._control.describedByIds,r;if(n){let o=this._describedByIds||e;r=e.concat(n.filter(a=>a&&!o.includes(a)));}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e;}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return ["",null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,n=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,a=e?.getBoundingClientRect().width??0,u=n?.getBoundingClientRect().width??0,B=r?.getBoundingClientRect().width??0,T=o?.getBoundingClientRect().width??0,Ei=this._currentDirection==="rtl"?"-1":"1",Si=`${a+u}px`,Ii=`calc(${Ei} * (${Si} + var(--mat-mdc-form-field-label-offset-x, 0px)))`,Ri=`var(--mat-mdc-form-field-label-transform, ${Qn} translateX(${Ii}))`,Ni=a+u+B+T;return [Ri,Ni]}_writeOutlinedLabelStyles(e){if(e!==null){let[n,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=n),r!==null&&this._notchedOutline?._setMaxWidth(r);}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let n=e.getRootNode();return n&&n!==e}return document.documentElement.contains(e)}static \u0275fac=function(n){return new(n||i)};static \u0275cmp=Le({type:i,selectors:[["mat-form-field"]],contentQueries:function(n,r,o){if(n&1&&(kb(o,r._labelChild,it,5),$c(o,rt,5)(o,Un,5)(o,qn,5)(o,Gn,5)(o,nt,5)),n&2){eT();let a;Lh(a=Ph())&&(r._formFieldControl=a.first),Lh(a=Ph())&&(r._prefixChildren=a),Lh(a=Ph())&&(r._suffixChildren=a),Lh(a=Ph())&&(r._errorChildren=a),Lh(a=Ph())&&(r._hintChildren=a);}},viewQuery:function(n,r){if(n&1&&(Ob(r._iconPrefixContainerSignal,fi,5)(r._textPrefixContainerSignal,mi,5)(r._iconSuffixContainerSignal,hi,5)(r._textSuffixContainerSignal,pi,5),Nb(Fn,5)(fi,5)(mi,5)(hi,5)(pi,5)(gi,5)(bi,5)(vi,5)),n&2){eT(4);let o;Lh(o=Ph())&&(r._textField=o.first),Lh(o=Ph())&&(r._iconPrefixContainer=o.first),Lh(o=Ph())&&(r._textPrefixContainer=o.first),Lh(o=Ph())&&(r._iconSuffixContainer=o.first),Lh(o=Ph())&&(r._textSuffixContainer=o.first),Lh(o=Ph())&&(r._floatingLabel=o.first),Lh(o=Ph())&&(r._notchedOutline=o.first),Lh(o=Ph())&&(r._lineRipple=o.first);}},hostAttrs:[1,"mat-mdc-form-field"],hostVars:38,hostBindings:function(n,r){n&2&&Ke$1("mat-mdc-form-field-label-always-float",r._shouldAlwaysFloat())("mat-mdc-form-field-has-icon-prefix",r._hasIconPrefix)("mat-mdc-form-field-has-icon-suffix",r._hasIconSuffix)("mat-form-field-invalid",r._control.errorState)("mat-form-field-disabled",r._control.disabled)("mat-form-field-autofilled",r._control.autofilled)("mat-form-field-appearance-fill",r.appearance=="fill")("mat-form-field-appearance-outline",r.appearance=="outline")("mat-form-field-hide-placeholder",r._hasFloatingLabel()&&!r._shouldLabelFloat())("mat-primary",r.color!=="accent"&&r.color!=="warn")("mat-accent",r.color==="accent")("mat-warn",r.color==="warn")("ng-untouched",r._shouldForward("untouched"))("ng-touched",r._shouldForward("touched"))("ng-pristine",r._shouldForward("pristine"))("ng-dirty",r._shouldForward("dirty"))("ng-valid",r._shouldForward("valid"))("ng-invalid",r._shouldForward("invalid"))("ng-pending",r._shouldForward("pending"));},inputs:{hideRequiredMarker:"hideRequiredMarker",color:"color",floatLabel:"floatLabel",appearance:"appearance",subscriptSizing:"subscriptSizing",hintLabel:"hintLabel"},exportAs:["matFormField"],features:[Zb([{provide:ot,useExisting:i},{provide:Ci,useExisting:i}])],ngContentSelectors:Mn,decls:18,vars:21,consts:[["labelTemplate",""],["textField",""],["iconPrefixContainer",""],["textPrefixContainer",""],["textSuffixContainer",""],["iconSuffixContainer",""],[1,"mat-mdc-text-field-wrapper","mdc-text-field",3,"click"],[1,"mat-mdc-form-field-focus-overlay"],[1,"mat-mdc-form-field-flex"],["matFormFieldNotchedOutline","",3,"matFormFieldNotchedOutlineOpen"],[1,"mat-mdc-form-field-icon-prefix"],[1,"mat-mdc-form-field-text-prefix"],[1,"mat-mdc-form-field-infix"],[3,"ngTemplateOutlet"],[1,"mat-mdc-form-field-text-suffix"],[1,"mat-mdc-form-field-icon-suffix"],["matFormFieldLineRipple",""],["aria-atomic","true","aria-live","polite",1,"mat-mdc-form-field-subscript-wrapper","mat-mdc-form-field-bottom-align"],[1,"mat-mdc-form-field-error-wrapper"],[1,"mat-mdc-form-field-hint-wrapper"],["matFormFieldFloatingLabel","",3,"floating","monitorResize","id"],["aria-hidden","true",1,"mat-mdc-form-field-required-marker","mdc-floating-label--required"],[3,"id"],[1,"mat-mdc-form-field-hint-spacer"]],template:function(n,r){if(n&1&&(Br(Dn),Ib(0,An,1,1,"ng-template",null,0,FT),Dc(2,"div",6,1),Bc("click",function(a){return r._control.onContainerClick(a)}),Pr(4,En,1,0,"div",7),Dc(5,"div",8),Pr(6,Rn,2,2,"div",9),Pr(7,Nn,3,0,"div",10),Pr(8,On,3,0,"div",11),Dc(9,"div",12),Pr(10,Pn,1,1,null,13),we$1(11),Fh(),Pr(12,kn,3,0,"div",14),Pr(13,Ln,3,0,"div",15),Fh(),Pr(14,Bn,1,0,"div",16),Fh(),Dc(15,"div",17),Pr(16,Hn,2,0,"div",18)(17,jn,5,1,"div",19),Fh()),n&2){let o;fn$1(2),Ke$1("mdc-text-field--filled",!r._hasOutline())("mdc-text-field--outlined",r._hasOutline())("mdc-text-field--no-label",!r._hasFloatingLabel())("mdc-text-field--disabled",r._control.disabled)("mdc-text-field--invalid",r._control.errorState),fn$1(2),jr(!r._hasOutline()&&!r._control.disabled?4:-1),fn$1(2),jr(r._hasOutline()?6:-1),fn$1(),jr(r._hasIconPrefix?7:-1),fn$1(),jr(r._hasTextPrefix?8:-1),fn$1(2),jr(!r._hasOutline()||r._forceDisplayInfixLabel()?10:-1),fn$1(2),jr(r._hasTextSuffix?12:-1),fn$1(),jr(r._hasIconSuffix?13:-1),fn$1(),jr(r._hasOutline()?-1:14),fn$1(),Ke$1("mat-mdc-form-field-subscript-dynamic-size",r.subscriptSizing==="dynamic");let a=r._getSubscriptMessageType();fn$1(),jr((o=a)==="error"?16:o==="hint"?17:-1);}},dependencies:[gi,bi,IM,vi,nt],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-filled-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-filled-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-filled-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--mat-form-field-outlined-input-text-color, var(--mat-sys-on-surface));
  caret-color: var(--mat-form-field-outlined-caret-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-outlined-input-text-placeholder-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-filled-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--mat-form-field-outlined-error-caret-color, var(--mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
  border-top-right-radius: var(--mat-form-field-filled-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) {
  background-color: var(--mat-form-field-filled-container-color, var(--mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-filled-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-hover-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-filled-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-filled-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-filled-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--mat-form-field-filled-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-filled-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-filled-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-filled-label-text-tracking, var(--mat-sys-body-large-tracking));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--mat-form-field-outlined-label-text-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-focus-label-text-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-hover-label-text-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-focus-label-text-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--mat-form-field-outlined-error-hover-label-text-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--mat-form-field-outlined-label-text-font, var(--mat-sys-body-large-font));
  font-size: var(--mat-form-field-outlined-label-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-form-field-outlined-label-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-form-field-outlined-label-text-tracking, var(--mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-outline-color, var(--mat-sys-outline));
  border-width: var(--mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-hover-outline-color, var(--mat-sys-on-surface));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-focus-outline-color, var(--mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-hover-outline-color, var(--mat-sys-on-error-container));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--mat-form-field-outlined-error-focus-outline-color, var(--mat-sys-error));
}
.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--mat-form-field-outlined-container-shape, var(--mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-active-indicator-color, var(--mat-sys-on-surface-variant));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-hover-active-indicator-color, var(--mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-active-indicator-color, var(--mat-sys-error));
}
.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--mat-form-field-filled-error-hover-active-indicator-color, var(--mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-focus-active-indicator-color, var(--mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--mat-form-field-filled-error-focus-active-indicator-color, var(--mat-sys-error));
}

.mdc-line-ripple--active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--mat-form-field-container-height, 56px);
  padding-top: var(--mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--mat-form-field-error-text-color, var(--mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-subscript-text-font, var(--mat-sys-body-small-font));
  line-height: var(--mat-form-field-subscript-text-line-height, var(--mat-sys-body-small-line-height));
  font-size: var(--mat-form-field-subscript-text-size, var(--mat-sys-body-small-size));
  letter-spacing: var(--mat-form-field-subscript-text-tracking, var(--mat-sys-body-small-tracking));
  font-weight: var(--mat-form-field-subscript-text-weight, var(--mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-form-field-state-layer-color, var(--mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--mat-form-field-select-option-text-color, var(--mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--mat-form-field-enabled-select-arrow-color, var(--mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-focus-select-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--mat-form-field-container-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-form-field-container-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-form-field-container-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-form-field-container-text-tracking, var(--mat-sys-body-large-tracking));
  font-weight: var(--mat-form-field-container-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--mat-form-field-outlined-label-text-populated-size) * var(--mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-leading-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-trailing-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-trailing-icon-color, var(--mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-hover-trailing-icon-color, var(--mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--mat-form-field-error-focus-trailing-icon-color, var(--mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2})}return i})();var at=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=be$1({type:i});static \u0275inj=pe({imports:[G9,Fi,Ki$1]})}return i})();var Di=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275cmp=Le({type:i,selectors:[["ng-component"]],hostAttrs:["cdk-text-field-style-loader",""],decls:0,vars:0,template:function(n,r){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2})}return i})(),Yn={passive:true},Mi=(()=>{class i{_platform=h(Yt$1);_ngZone=h(F);_renderer=h(Et).createRenderer(null,null);_styleLoader=h($s);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return Ue$1;this._styleLoader.load(Di);let n=Qt$1(e),r=this._monitoredElements.get(n);if(r)return r.subject;let o=new O$1,a="cdk-text-field-autofilled",u=T=>{T.animationName==="cdk-text-field-autofill-start"&&!n.classList.contains(a)?(n.classList.add(a),this._ngZone.run(()=>o.next({target:T.target,isAutofilled:true}))):T.animationName==="cdk-text-field-autofill-end"&&n.classList.contains(a)&&(n.classList.remove(a),this._ngZone.run(()=>o.next({target:T.target,isAutofilled:false})));},B=this._ngZone.runOutsideAngular(()=>(n.classList.add("cdk-text-field-autofill-monitored"),this._renderer.listen(n,"animationstart",u,Yn)));return this._monitoredElements.set(n,{subject:o,unlisten:B}),o}stopMonitoring(e){let n=Qt$1(e),r=this._monitoredElements.get(n);r&&(r.unlisten(),r.subject.complete(),n.classList.remove("cdk-text-field-autofill-monitored"),n.classList.remove("cdk-text-field-autofilled"),this._monitoredElements.delete(n));}ngOnDestroy(){this._monitoredElements.forEach((e,n)=>this.stopMonitoring(n));}static \u0275fac=function(n){return new(n||i)};static \u0275prov=A({token:i,factory:i.\u0275fac})}return i})();var so=(()=>{class i{_elementRef=h(X$1);_platform=h(Yt$1);_ngZone=h(F);_renderer=h(qn$1);_resizeEvents=new O$1;_previousValue;_initialHeight;_destroyed=new O$1;_listenerCleanups;_minRows;_maxRows;_enabled=true;_previousMinRows=-1;_textareaElement;get minRows(){return this._minRows}set minRows(e){this._minRows=im(e),this._setMinHeight();}get maxRows(){return this._maxRows}set maxRows(e){this._maxRows=im(e),this._setMaxHeight();}get enabled(){return this._enabled}set enabled(e){this._enabled!==e&&((this._enabled=e)?this.resizeToFitContent(true):this.reset());}get placeholder(){return this._textareaElement.placeholder}set placeholder(e){this._cachedPlaceholderHeight=void 0,e?this._textareaElement.setAttribute("placeholder",e):this._textareaElement.removeAttribute("placeholder"),this._cacheTextareaPlaceholderHeight();}_cachedLineHeight;_cachedPlaceholderHeight;_document=h($);_hasFocus=false;_isViewInited=false;constructor(){h($s).load(Di),this._textareaElement=this._elementRef.nativeElement;}_setMinHeight(){let e=this.minRows&&this._cachedLineHeight?`${this.minRows*this._cachedLineHeight}px`:null;e&&(this._textareaElement.style.minHeight=e);}_setMaxHeight(){let e=this.maxRows&&this._cachedLineHeight?`${this.maxRows*this._cachedLineHeight}px`:null;e&&(this._textareaElement.style.maxHeight=e);}ngAfterViewInit(){this._platform.isBrowser&&(this._initialHeight=this._textareaElement.style.height,this.resizeToFitContent(),this._ngZone.runOutsideAngular(()=>{this._listenerCleanups=[this._renderer.listen("window","resize",()=>this._resizeEvents.next()),this._renderer.listen(this._textareaElement,"focus",this._handleFocusEvent),this._renderer.listen(this._textareaElement,"blur",this._handleFocusEvent)],this._resizeEvents.pipe(Xx(16)).subscribe(()=>{this._cachedLineHeight=this._cachedPlaceholderHeight=void 0,this.resizeToFitContent(true);});}),this._isViewInited=true,this.resizeToFitContent(true));}ngOnDestroy(){this._listenerCleanups?.forEach(e=>e()),this._resizeEvents.complete(),this._destroyed.next(),this._destroyed.complete();}_cacheTextareaLineHeight(){if(this._cachedLineHeight)return;let e=this._textareaElement.cloneNode(false),n=e.style;e.rows=1,n.position="absolute",n.visibility="hidden",n.border="none",n.padding="0",n.height="",n.minHeight="",n.maxHeight="",n.top=n.bottom=n.left=n.right="auto",n.overflow="hidden",this._textareaElement.parentNode.appendChild(e),this._cachedLineHeight=e.clientHeight,e.remove(),this._setMinHeight(),this._setMaxHeight();}_measureScrollHeight(){let e=this._textareaElement,n=e.style.marginBottom||"",r=this._platform.FIREFOX,o=this._hasFocus,a=r?"cdk-textarea-autosize-measuring-firefox":"cdk-textarea-autosize-measuring";o&&(e.style.marginBottom=`${e.clientHeight}px`),e.classList.add(a);let u=e.scrollHeight-4;return e.classList.remove(a),o&&(e.style.marginBottom=n),u}_cacheTextareaPlaceholderHeight(){if(!this._isViewInited||this._cachedPlaceholderHeight!=null)return;if(!this.placeholder){this._cachedPlaceholderHeight=0;return}let e=this._textareaElement.value;this._textareaElement.value=this._textareaElement.placeholder,this._cachedPlaceholderHeight=this._measureScrollHeight(),this._textareaElement.value=e;}_handleFocusEvent=e=>{this._hasFocus=e.type==="focus";};ngDoCheck(){this._platform.isBrowser&&this.resizeToFitContent();}resizeToFitContent(e=false){if(!this._enabled||(this._cacheTextareaLineHeight(),this._cacheTextareaPlaceholderHeight(),!this._cachedLineHeight))return;let n=this._elementRef.nativeElement,r=n.value;if(!e&&this._minRows===this._previousMinRows&&r===this._previousValue)return;let o=this._measureScrollHeight(),a=Math.max(o,this._cachedPlaceholderHeight||0);n.style.height=`${a}px`,this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>this._scrollToCaretPosition(n)):setTimeout(()=>this._scrollToCaretPosition(n));}),this._previousValue=r,this._previousMinRows=this._minRows;}reset(){this._initialHeight!==void 0&&(this._textareaElement.style.height=this._initialHeight);}_noopInputHandler(){}_scrollToCaretPosition(e){let{selectionStart:n,selectionEnd:r}=e;!this._destroyed.isStopped&&this._hasFocus&&e.setSelectionRange(n,r);}static \u0275fac=function(n){return new(n||i)};static \u0275dir=Q({type:i,selectors:[["textarea","cdkTextareaAutosize",""]],hostAttrs:["rows","1",1,"cdk-textarea-autosize"],hostBindings:function(n,r){n&1&&Bc("input",function(){return r._noopInputHandler()});},inputs:{minRows:[0,"cdkAutosizeMinRows","minRows"],maxRows:[0,"cdkAutosizeMaxRows","maxRows"],enabled:[2,"cdkTextareaAutosize","enabled",Me$1],placeholder:"placeholder"},exportAs:["cdkTextareaAutosize"]})}return i})(),Vi=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=be$1({type:i});static \u0275inj=pe({})}return i})();var wi=new y("MAT_INPUT_VALUE_ACCESSOR");var Ai=(()=>{class i{isErrorState(e,n){return !!(e&&e.invalid&&(e.touched||n&&n.submitted))}static \u0275fac=function(n){return new(n||i)};static \u0275prov=A({token:i,factory:i.\u0275fac})}return i})();var Ne=class{_defaultMatcher;ngControl;_parentFormGroup;_parentForm;_stateChanges;errorState=false;matcher;constructor(t,e,n,r,o){this._defaultMatcher=t,this.ngControl=e,this._parentFormGroup=n,this._parentForm=r,this._stateChanges=o;}updateErrorState(){let t=this.errorState,e=this._parentFormGroup||this._parentForm,n=this.matcher||this._defaultMatcher,r=this.ngControl?this.ngControl.control:null,o=n?.isErrorState(r,e)??false;o!==t&&(this.errorState=o,this._stateChanges.next());}};var Xn=["button","checkbox","file","hidden","image","radio","range","reset","submit"],Kn=new y("MAT_INPUT_CONFIG"),So=(()=>{class i{_elementRef=h(X$1);_platform=h(Yt$1);ngControl=h(L,{optional:true,self:true});_autofillMonitor=h(Mi);_ngZone=h(F);_formField=h(ot,{optional:true});_renderer=h(qn$1);_uid=h(fm).getId("mat-input-");_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=h(Kn,{optional:true});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=false;_isNativeSelect=false;_isTextarea=false;_isInFormField=false;focused=false;stateChanges=new O$1;controlType="mat-input";autofilled=false;get disabled(){return this._disabled}set disabled(e){this._disabled=h9(e),this.focused&&(this.focused=false,this.stateChanges.next());}_disabled=false;get id(){return this._id}set id(e){this._id=e||this._uid;}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(ce.required)??false}set required(e){this._required=h9(e);}_required;get type(){return this._type}set type(e){this._type=e||"text",this._validateType(),!this._isTextarea&&hZ().has(this._type)&&(this._elementRef.nativeElement.type=this._type);}_type="text";get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e;}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next());}get readonly(){return this._readonly}set readonly(e){this._readonly=h9(e);}_readonly=false;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e;}_neverEmptyInputTypes=["date","datetime","datetime-local","month","time","week"].filter(e=>hZ().has(e));constructor(){let e=h(et,{optional:true}),n=h(tt,{optional:true}),r=h(Ai),o=h(wi,{optional:true,self:true}),a=this._elementRef.nativeElement,u=a.nodeName.toLowerCase();o?Vn$1(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=a,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(a,"keyup",this._iOSKeyupListener);}),this._errorStateTracker=new Ne(r,this.ngControl,n,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=u==="select",this._isTextarea=u==="textarea",this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||false,this._isNativeSelect&&(this.controlType=a.multiple?"mat-native-select-multiple":"mat-native-select"),this._signalBasedValueAccessor&&Vo(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next();});}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next();});}ngOnChanges(){this.stateChanges.next();}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.();}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder();}focus(e){this._elementRef.nativeElement.focus(e);}updateErrorState(){this._errorStateTracker.updateErrorState();}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let n=this._elementRef.nativeElement;n.type==="number"?(n.type="text",n.setSelectionRange(0,0),n.type="number"):n.setSelectionRange(0,0);}this.focused=e,this.stateChanges.next();}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next());}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let n=this._elementRef.nativeElement;this._previousPlaceholder=e,e?n.setAttribute("placeholder",e):n.removeAttribute("placeholder");}}_getPlaceholder(){return this.placeholder||null}_validateType(){Xn.indexOf(this._type)>-1;}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return !this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,n=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&n&&n.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let n=this._elementRef.nativeElement;e.length?n.setAttribute("aria-describedby",e.join(" ")):n.removeAttribute("aria-describedby");}onContainerClick(){this.focused||this.focus();}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let n=e.target;!n.value&&n.selectionStart===0&&n.selectionEnd===0&&(n.setSelectionRange(1,1),n.setSelectionRange(0,0));};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?"true":null}static \u0275fac=function(n){return new(n||i)};static \u0275dir=Q({type:i,selectors:[["input","matInput",""],["textarea","matInput",""],["select","matNativeControl",""],["input","matNativeControl",""],["textarea","matNativeControl",""]],hostAttrs:[1,"mat-mdc-input-element"],hostVars:21,hostBindings:function(n,r){n&1&&Bc("focus",function(){return r._focusChanged(true)})("blur",function(){return r._focusChanged(false)})("input",function(){return r._onInput()}),n&2&&(Mb("id",r.id)("disabled",r.disabled&&!r.disabledInteractive)("required",r.required),Lr("name",r.name||null)("readonly",r._getReadonlyAttribute())("aria-disabled",r.disabled&&r.disabledInteractive?"true":null)("aria-invalid",r.empty&&r.required?null:r.errorState)("aria-required",r.required)("id",r.id),Ke$1("mat-input-server",r._isServer)("mat-mdc-form-field-textarea-control",r._isInFormField&&r._isTextarea)("mat-mdc-form-field-input-control",r._isInFormField)("mat-mdc-input-disabled-interactive",r.disabledInteractive)("mdc-text-field__input",r._isInFormField)("mat-mdc-native-select-inline",r._isInlineSelect()));},inputs:{disabled:"disabled",id:"id",placeholder:"placeholder",name:"name",required:"required",type:"type",errorStateMatcher:"errorStateMatcher",userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],value:"value",readonly:"readonly",disabledInteractive:[2,"disabledInteractive","disabledInteractive",Me$1]},exportAs:["matInput"],features:[Zb([{provide:rt,useExisting:i}]),_t]})}return i})(),Io=(()=>{class i{static \u0275fac=function(n){return new(n||i)};static \u0275mod=be$1({type:i});static \u0275inj=pe({imports:[at,at,Vi,Ki$1]})}return i})();export{Fi as F,Io as I,So as S,Zt as Z,_n as _,at as a,it as i,so as s,vr as v,yr as y};