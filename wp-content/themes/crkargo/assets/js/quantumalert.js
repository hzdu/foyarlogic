var scripttag=document.createElement("link");scripttag.rel="stylesheet";scripttag.href="https://cdn.jsdelivr.net/gh/cosmogicofficial/quantumalert@latest/minfile/quantumalert.css";document.head.appendChild(scripttag);var succ="https://cdn.jsdelivr.net/gh/cosmogicofficial/quantumalert/image/success.svg";(new Image).src=succ;var err="https://cdn.jsdelivr.net/gh/cosmogicofficial/quantumalert/image/error.svg";(new Image).src=err;var inf="https://cdn.jsdelivr.net/gh/cosmogicofficial/quantumalert/image/info.svg";
(new Image).src=inf;var war="https://cdn.jsdelivr.net/gh/cosmogicofficial/quantumalert/image/warning.svg";(new Image).src=war;var alertcontainer,popupdiv,popupcontent,errortext,pop_heading,no_btn_fun="write_function_name_here",yes_btn_fun="write_function_name_here",type_field,matches=document.getElementsByClassName("alertcontainer");function rmx(){document.body.removeChild(matches.item(0))}function close_qual(){setTimeout(function(){for(;0<matches.length;)rmx()},250)}
function checker(){alertcontainer=document.createElement("div");alertcontainer.className="alertcontainer";document.body.appendChild(alertcontainer);popupdiv=document.createElement("div");popupdiv.id="popupdiv";popupdiv.innerHTML='<span id="closepopup" onclick="close_qual();" ><svg viewbox="0 0 40 40"  id="close-x" fill="#000"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg></span>';alertcontainer.appendChild(popupdiv)}
function structure(){void 0!=alertcontainer&&0<matches.length&&rmx();checker()}function pop_simple_content(a){pop_simple_structure=document.createElement("p");pop_simple_structure.id="pop_simple_structure";pop_simple_structure.textContent=a;popupdiv.appendChild(pop_simple_structure)}function errorcontent(){errortext=document.createElement("div");errortext.id="errortext";errortext.innerHTML=' <img id="errorimage" src="'+err+'"  /><br>';popupdiv.appendChild(errortext)}
function write_function_name_here(){console.log("Define function name for buttons")}function alert_btn(a,b,c,d){if(void 0===c||void 0===d)c=d="write_function_name_here";alert_btn_struct=document.createElement("div");alert_btn_struct.id="alert_btn_struct";alert_btn_struct.innerHTML=' <span id="btn-no" onclick="'+d+'();">'+b+'  </span>&nbsp <span id="btn-yes" onclick="'+c+'();">'+a+"  </span>";popupdiv.appendChild(alert_btn_struct)}
function heading(a){pop_heading=document.createElement("p");pop_heading.id="pop_heading";pop_heading.textContent=a;popupdiv.appendChild(pop_heading)}function pop_content_head(a){pop_head_content=document.createElement("p");pop_head_content.id="pop_head_content";pop_head_content.textContent=a;popupdiv.appendChild(pop_head_content)}var input_element,inx,place_holder;
function input_field(a,b){void 0===b&&(b="Enter Text here");input_element=document.createElement("input");input_element.id="input_element";input_element.setAttribute("type",a);input_element.setAttribute("placeholder",b);popupdiv.appendChild(input_element);popupdiv.insertBefore(input_element,alert_btn_struct);inx=input_element.value;input_element.onchange=function(a){inx=a.target.value}}
function HeadingwithText(a,b){structure();heading(a);pop_heading.style.marginTop="50px";pop_heading.style.fontSize="1.8rem";pop_content_head(b)}function whitelayout(){pop_heading.style.color="#000";pop_head_content.style.color="#000"}function darkLayout(){popupdiv.style.background="#1c1c1c";popupdiv.style.color="#fff";document.getElementById("close-x").style.stroke="#fff";pop_heading.style.color="#fff";pop_head_content.style.color="#fff"}
function darkBlueLayout(){popupdiv.style.background="#001b33";popupdiv.style.color="#fff";document.getElementById("close-x").style.stroke="#ffffff";pop_heading.style.color="#fff";pop_head_content.style.color="#fff"}function alertWithIcons(a,b){structure();errorcontent();heading(a);pop_content_head(b)}
function confirmValidation(a,b,c,d,f,e,g){popupdiv.style.paddingBottom="0px";void 0===a&&(a=war);errortext.innerHTML=' <img id="errorimage" src="'+a+'"  /><br>';void 0===b&&(b="Ok");void 0===c&&(c="Cancel");alert_btn(b,c,d,f);void 0===e?console.log("Input field not used"):(input_field(e,g),input_element.style.color="#000")}var notify=function(){};notify.prototype.sw=function(a){structure();pop_simple_content(a);popupdiv.style.paddingBottom="0px";pop_simple_structure.style.color="#000"};
notify.prototype.sd=function(a){structure();pop_simple_content(a);pop_simple_structure.style.color="#fff";popupdiv.style.paddingBottom="0px";darkLayout()};notify.prototype.sdb=function(a){structure();pop_simple_content(a);popupdiv.style.paddingBottom="0px";pop_simple_structure.style.color="#fff";darkBlueLayout()};notify.prototype.swh=function(a,b){HeadingwithText(a,b);whitelayout()};notify.prototype.sdh=function(a,b){HeadingwithText(a,b);darkLayout()};
notify.prototype.sdbh=function(a,b){HeadingwithText(a,b);darkBlueLayout()};notify.prototype.error=function(a,b){alertWithIcons(a,b);whitelayout()};notify.prototype.errord=function(a,b){alertWithIcons(a,b);darkLayout()};notify.prototype.errordb=function(a,b){alertWithIcons(a,b);darkBlueLayout()};notify.prototype.success=function(a,b){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+succ+'" /><br>';whitelayout()};
notify.prototype.successd=function(a,b){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+succ+'" /><br>';darkLayout()};notify.prototype.successdb=function(a,b){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+succ+'" /><br>';darkBlueLayout()};notify.prototype.warning=function(a,b){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+war+'"  /><br>';whitelayout()};
notify.prototype.warningd=function(a,b){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+war+'"  /><br>';darkLayout()};notify.prototype.warningdb=function(a,b){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+war+'"  /><br>';darkBlueLayout()};notify.prototype.info=function(a,b){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+inf+'"  /><br>';whitelayout()};
notify.prototype.infod=function(a,b){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+inf+'"  /><br>';darkLayout()};notify.prototype.infodb=function(a,b){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+inf+'"  /><br>';darkBlueLayout()};notify.prototype.icon=function(a,b,c){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+c+'"  /><br>';whitelayout()};
notify.prototype.icond=function(a,b,c){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+c+'"  /><br>';darkLayout()};notify.prototype.icondb=function(a,b,c){alertWithIcons(a,b);errortext.innerHTML=' <img id="errorimage" src="'+c+'"  /><br>';darkBlueLayout()};notify.prototype.confirm=function(a,b,c,d,f,e,g,h,k){alertWithIcons(a,b);confirmValidation(c,d,f,e,g,h,k);whitelayout()};
notify.prototype.confirmd=function(a,b,c,d,f,e,g,h,k){alertWithIcons(a,b);confirmValidation(c,d,f,e,g,h,k);darkLayout();document.getElementById("btn-no").style.color="#fff"};notify.prototype.confirmdb=function(a,b,c,d,f,e,g,h,k){alertWithIcons(a,b);confirmValidation(c,d,f,e,g,h,k);darkBlueLayout();document.getElementById("btn-no").style.color="#fff"};var Qual=new notify;

