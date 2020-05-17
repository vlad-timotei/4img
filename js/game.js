// Un joc creat de Vlad Timotei 2020
 // ver. 16052020
  var nivel, solutie, lungime_solutie, lungime_incercare, definitie, mode, nr_butoane;
  var joc="4imagini_ver17052020.5";
  var btns = []; //incepe cu 1
  var sound=1;
  var nrincercari;
  var btns_txt = []; //incepe cu 0!
  var indicii = [];  
  var scorect = document.getElementById("s_corect"); 
  var sincorect = document.getElementById("s_incorect"); 
  var sialitera = document.getElementById("s_ia_litera"); 
  var spunelitera = document.getElementById("s_pune_litera"); 
  var sninja = document.getElementById("s_ninja"); 
  var sswitch = document.getElementById("s_switch"); 
  var sindiciu = document.getElementById("s_indiciu"); 
  var niveluri = [
		"MOISE|2,4,6,8|personaj biblic",
		"IOSIF|1,3,5,7|personaj biblic",
		"AVRAAM|9,11,13,15|personaj biblic",
		"NOE|10,12,14,16|personaj biblic",
		"ESTERA|17,19,21,23|personaj biblic",
		"LUCA|18,20,22,24|personaj biblic",
		"ADAM|25,27,29,43|personaj biblic",
		"FARAON|44,11,17,5|personaj biblic",
		"IONA|8,45,46,47|personaj biblic",
		"DANIEL|7,50,51,24|personaj biblic",
		"AARON|58,56,55,57|personaj biblic",
		"IOAN|10,61,5,62|personaj biblic",
		"PETRU|72,74,73,63|personaj biblic",
		"LAZĂR|64,65,66,67|personaj biblic",
	    "IUDA|68,69,70,71|personaj biblic",
		"IOAN|79,80,81,20|personaj biblic",
		"ILIE|82,83,84,85|personaj biblic",
		"IOV|j_1,test,j_2,j_3|personaj biblic",
	    "LABAN|l_1,l_2,l_3,l_4|personaj biblic",
		"MATEI|m_1,bible,1st,24|personaj biblic",
		"SOLOMON|s_1,17,24,temple|personaj biblic",
		"NEEMIA|n_1,n_2,n_3,24|personaj biblic",
		"DULCE|75,76,77,78|adjectiv",
		"ROȘIE|35,8,59,60|substantiv-adjectiv",
		"PUSTIU|11,52,54,53|aubstantiv-adjectiv",
		"BOLNAV|35,36,37,38|substantiv-adjectiv",
		"MARE|8,46,48,49|substantiv-adjectiv",
		"PLÂNS|39,40,41,42|substantiv",
		"GRIJĂ|33,31,32,34|substantiv",
		"RUGĂCIUNE|j_3,34,eye,eye2|substantiv"
		];
 
  function start(fromhome)
  { 
   
  
  if(fromhome==1) { if(sound) sninja.play(); $("#startgame").hide(1000);  $("#game").show(500); joaca();}
  if(fromhome==0) { if(nivel>=niveluri.length) { $("#game").hide(500); $("#endgame").show(500);}
             else {  $("#game").hide(600);  setTimeout(joaca,400); $("#game").show(500);}
                  }   
  if(fromhome==-1){$("#endgame").hide(500);  setTimeout(joaca,400); $("#game").show(500);}
  }
 
  function joaca(){
  init(); 
  fill_incercare();
  fill_nivel(1);
  fill_img();
  fill_btns(mode);
  pune_definitie(0);  }
  
  function init()
  { 
  init_btns();
  var date = niveluri[nivel].split('|',3);
  definitie=date[2]; 
  indicii=date[1].split(',',4); 
  solutie=date[0]; 
  lungime_solutie=solutie.length; 
  lungime_incercare=0;
  nrincercari=0;
  incercare="";
  }
  
  function init_btns() {  var b;  for (var i = 1; i <= nr_butoane; i++) { btns[i] =0; b="#"+i;  $(b).attr( 'style',"" ); } }
  
  function fill_nivel(mode,txt,t){if(mode==1) {var niveltxt=parseInt(nivel)+1;   $("#nivel").html("Nivel <b>"+niveltxt+"</b>").fadeIn(500);} else $('#nivel').html(txt).fadeIn(t);}
  
  function hide_nivel(t){ $('#nivel').fadeOut(t);}
  
  function fill_incercare() {for(var i=1; i<=lungime_solutie; i++)  incercare=incercare+"_ ";   $("#incercare").html(incercare); }
  
  function fill_img(){ for(var i=1;i<=4;i++) document.getElementById("clue"+i).src="images/"+indicii[i-1]+".jpg"; }
  
  function ascunde_definitie(t){ $('#definitie').fadeOut(t); }
  
  function pune_definitie(t) { $('#definitie').html("Sunt un "+definitie+"! Găsește-mă!").fadeIn(t); }
  
  function fill_btns(mode)
  {
  var i;
  var solutie_encriptata=solutie+adaugalitere(nr_butoane-lungime_solutie);
  btns_txt=solutie_encriptata.split('');
  if(mode=="easy")
  btns_txt.sort(function (a, b) {return a.localeCompare(b);});
  else
  btns_txt=shuffle(btns_txt);
  for(i=1; i<=nr_butoane; i++)
  document.getElementById(i).innerHTML=btns_txt[i-1];
  }
  
  function adaugalitere(n)
  { 
  var text = "";
  var possible = "AĂÂBCDEFGHIÎLMNOPRSȘTȚUVXZ";
  for( var i=0; i <n; i++ )
  text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
  }


  function shuffle(array) 
  {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
  randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex -= 1;
  temporaryValue = array[currentIndex];
  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temporaryValue;
  }return array;
  }
  
  function touch(l){ if(btns[l]==1) getOutLetter(l); else if(lungime_incercare<lungime_solutie) putInLetter(l); }
  
  function putInLetter(litera)
  {
  if(sound) spunelitera.play();
  lungime_incercare++;  btns[litera]=1;
  document.getElementById("incercare").innerHTML=document.getElementById("incercare").innerHTML.replace('_', btns_txt[litera-1]);
  litera="#"+litera;   $(litera).attr( 'style',"background-color: #CCC !important;" );
  if(lungime_incercare==lungime_solutie) verificare();
  }
  
  function getOutLetter(litera)
  {
  if(sound) sialitera.play();
  lungime_incercare--;  btns[litera]=0;
  incercare=document.getElementById('incercare').innerHTML;
  var pos = incercare.lastIndexOf(btns_txt[litera-1]); 
  document.getElementById('incercare').innerHTML=incercare.substring(0,pos) + '_' + incercare.substring(pos+1);
  litera="#"+litera;  $(litera).attr( 'style',"" );
  }
  
  function verificare()
  {
    var sol = document.getElementById('incercare').innerHTML.replace(/\s/g,''); 
	if(sol==solutie)
	{
	if(sound) scorect.play();
	ascunde_definitie(100);
	setTimeout(pune_mesaj,75,250,1);
	setTimeout(next,1000);
	}
	else
	{
	 nrincercari++;
     if(nrincercari==1&&mode=="easy") setTimeout(get_clue,5000);	 
	 if(nrincercari==2&&mode=="hard") setTimeout(get_clue,5000);	
	 if(sound) sincorect.play();
	 ascunde_definitie(250);
	 setTimeout(pune_mesaj,225,500,0);
	 setTimeout(ascunde_definitie,2250,500);
	 setTimeout(pune_definitie,2725,500);
	}
  }
  
  function pune_mesaj(t,tip)
  {
  if(tip==1)
  $('#definitie').html("<b class='succes'>Felicitări!</b>").fadeIn(t);
  else
  $("#definitie").html("<b class='error'>Mai încearcă!</b>").fadeIn(t);
  
  }

  function reset_game() { if(sound) setTimeout(function(){sninja.play()},450); $("#resetable").hide(500); setTimeout(joaca,500); $("#resetable").show(500); }
  function newGame(){setC(joc,0); nivel=0; start(-1); }
  function next(){ nivel++;  setC(joc,nivel); start(0);  }
  
  function setC(cname, cvalue) {var d = new Date(); d.setTime(d.getTime() + (30*24*60*60*1000));  var expires = "expires="+ d.toUTCString();  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; }
  function getC(cname) { var name = cname + "=";  var decodedCookie = decodeURIComponent(document.cookie);   var ca = decodedCookie.split(';');   for(var i = 0; i <ca.length; i++) { var c = ca[i];  while (c.charAt(0) == ' ') { c = c.substring(1); }if (c.indexOf(name) == 0) { return c.substring(name.length, c.length);}}return 0;}
  
  function mode_highlight(){if(mode=="hard") { $("#hard").addClass("modactiv"); $("#easy").removeClass("modactiv");}  else { $("#easy").addClass("modactiv"); $("#hard").removeClass("modactiv");}}
  function mode_show(){if(mode=="hard") $( "#mode").prop('checked', true);  else $( "#mode").prop('checked', false); }
  
  function s_switch_check(){ if(sound) sswitch.play(); } 
  
  function mode_check()
  {
  if($("#mode").is(":checked")) {
  mode="hard";
  nr_butoane=16;
  $("#he1").addClass("offset-m2");
  $("#he1").removeClass("offset-m3");
  $("#e2").removeClass("offset-m3");
  $("#h2").addClass("offset-m2");
  $(".hard-letter").removeClass("invisible");
  } else { 
  mode="easy"; 
  nr_butoane=12; 
  $("#he1").removeClass("offset-m2");
  $("#he1").addClass("offset-m3");
  $("#e2").addClass("offset-m3");
  $("#h2").removeClass("offset-m2");
  $(".hard-letter").addClass("invisible");
  } 
  setC(joc+"_mode",mode);
  mode_highlight();
  }
  
  function info(x){
  if(x){$("#info").hide(500); $("#game").show(500);}
  else{ $("#game").hide(500); $("#info").show(500);}}
  
  function home(){
  level_check(); $("#game").hide(500); $("#startgame").show(500);
  }
  
  function switch_sound(){
  if(sound==0) 
  {sound=1;  $("#switch_sound").html("volume_up");}
  else {sound=0; $("#switch_sound").html("volume_off");}
  }
  
  function level_check(){
  var startlevel = parseInt(nivel)+1;
  if(nivel>=niveluri.length) { $("#startgame").hide(); $("#endgame").show(1000);  } 
  else if (startlevel==1) $("#startlevel").html("START"); else $("#startlevel").html("Începe nivelul "+startlevel);
  }
  
  function get_clue(){
	 if(sound) sindiciu.play();
     hide_nivel(250);
	 setTimeout(fill_nivel,245,2,"<b class='mesajindiciu' onClick='show_clue();'>Indiciu!</b>",500);
  }
  function show_clue() 
  {
   if(sound) spunelitera.play();
   var y = solutie.split("");
   incercare=y[0]+" ";
   lungime_incercare=1;
   init_btns();
   for(var i=2; i<=lungime_solutie; i++)
   incercare=incercare+"_ ";  
   $("#incercare").html(incercare);
   $('#nivel').fadeOut(250);
   setTimeout(fill_nivel,240,1);
   
  }
  $(document).ready( function(){
  nivel=getC(joc); 
  mode=getC(joc+"_mode");  
  if(mode==0) mode="easy"; 
  mode_show();  
  mode_highlight();
  mode_check();
  level_check();   
  $("#mode").change(mode_check);
  }); 