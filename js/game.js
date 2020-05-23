// Un joc creat de Vlad Timotei 2020
 // ver. 23052020F50
  var nivel, solutie, lungime_solutie, lungime_incercare, corect, definitie, mode, nr_butoane, workaroundshint, timeforhint, stats;
  var startofgame, endofgame, timepergame, scorepergame, totalscore; 
  var coeficient_dificultate = {easy:1, hard:1.75};
  var coeficient_indiciu=1;
  var indiciu_folosit=0;
  var joc="4img1word_19052020F";
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
  var shint = document.getElementById("s_hint"); 
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
		"PUSTIU|11,52,54,53|substantiv-adjectiv",
		"BOLNAV|35,36,37,38|substantiv-adjectiv",
		"MARE|8,46,48,49|substantiv-adjectiv",
		"PLÂNS|39,40,41,42|substantiv",
		"GRIJĂ|33,31,32,34|substantiv",
		"RUGĂCIUNE|j_3,34,eye,eye2|substantiv",
		"LOT|86,40,87,88|personaj biblic",
		"GHEDEON|89,90,16,91|personaj biblic",
		"ESAU|92,93,94,95|personaj biblic",
		"ABEL|96,97,98,99|personaj biblic",
		"RUT|100,101,102,103|personaj biblic",
		"NAAMAN|j_2,j_3,104,105|personaj biblic",
		"SAMSON|106,107,108,109|personaj biblic",
		"IONATAN|110,93,111,112|personaj biblic",
		"SAMUEL|113,114,115,116|personaj biblic",
		"IOSUA|117,118,119,120|personaj biblic",
		"GOLIAT|106,138,139,140|personaj biblic",
		"SARA|121,122,123,124|personaj biblic",
		"RAHAV|125,126,119,118|personaj biblic",
		"MARTA|127,128,64,66|personaj biblic",
		"PILAT|129,130,131,132|personaj biblic",
		"ABSALOM|133,17,134,135|personaj biblic",
		"SAUL|17,1st,136,137|personaj biblic",
		"BALAAM|134,141,142,136|personaj biblic",
		"ZACHEU|71,143,144,145|personaj biblic",
		"ACAN|146,1,147,71|personaj biblic"
		
		];
 
  function start(fromhome)
  { 
   
  
  if(fromhome==1) { eplay(sninja); $("#startgame").hide(1000);  $("#game").show(500); joaca();}
  if(fromhome==0) { if(nivel>=niveluri.length) {clearTimeout(workaroundshint); show_final_score(); $("#game").hide(500); $("#endgame").show(500);}
             else {  $("#game").hide(600);  setTimeout(joaca,400); $("#game").show(500);}
                  }   
  if(fromhome==-1){$("#endgame").hide(500);  setTimeout(joaca,400); $("#game").show(500);}
  }
 
  function joaca(){
  gametime(1);
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
  corect=0;
  lungime_solutie=solutie.length; 
  lungime_incercare=0;
  nrincercari=0;
  coeficient_indiciu=1;
  indiciu_folosit=0;
  incercare="";
  }
  
  function init_btns() {  var b;  for (var i = 1; i <= nr_butoane; i++) { btns[i] =0; b="#"+i;  $(b).attr( 'style',"" ); } }
  
  function fill_nivel(mode,txt,t){if(mode==1) {var niveltxt=parseInt(nivel)+1;   $("#nivel").html("Nivel <b>"+niveltxt+"</b>").fadeIn(500);} else $('#nivel').html(txt).fadeIn(t);}
  
  function hide_nivel(t){ $('#nivel').fadeOut(t);}
  
  function fill_incercare() {for(var i=1; i<=lungime_solutie; i++)  incercare=incercare+"_ ";   $("#incercare").html(incercare); }
  
  function fill_img(){ shuffle(indicii); for(var i=1;i<=4;i++) document.getElementById("clue"+i).src="images/"+indicii[i-1]+".jpg"; }
  
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
  
  function touch(l){if(corect==0){ if(btns[l]==1) getOutLetter(l); else if(lungime_incercare<lungime_solutie) putInLetter(l); }}
  
  function putInLetter(litera)
  {
  if(lungime_incercare==0) $(".reset").addClass("resetactiv"); 
  eplay(spunelitera);
  lungime_incercare++; 
  btns[litera]=1;
  document.getElementById("incercare").innerHTML=document.getElementById("incercare").innerHTML.replace('_', btns_txt[litera-1]);
  litera="#"+litera;   $(litera).attr( 'style',"background-color: #CCC !important;" );
  if(lungime_incercare==lungime_solutie) verificare();
  }
  
  function getOutLetter(litera)
  {
  if(lungime_incercare==1) $(".reset").removeClass("resetactiv"); 
  eplay(sialitera);
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
	corect=1;
	eplay(scorect);
	lungime_incercare=0; 
	$(".reset").removeClass("resetactiv");
	ascunde_definitie(100);
	gametime(2); scor(); 
	setTimeout(pune_mesaj,75,250,1);
	setTimeout(next,1500);
	}
	else
	{
	 nrincercari++;
     if(nrincercari==1&&mode=="easy") {timeforhint=setTimeout(get_clue,5000); workaroundshint=setTimeout(eplay,4900,shint);  }
	 else if(nrincercari==2&&mode=="hard") { timeforhint=setTimeout(get_clue,5000);	 workaroundshint=setTimeout(eplay,4900,shint); }
	 eplay(sincorect);
	 ascunde_definitie(250);
	 setTimeout(pune_mesaj,225,500,0);
	 setTimeout(ascunde_definitie,2250,500);
	 setTimeout(pune_definitie,2725,500);
	}
  }
  
  function pune_mesaj(t,tip)
  {
  if(tip==1)
  $('#definitie').html("<b class='succes'>Felicitări!</b> Scorul tău: <b>"+totalscore+"</b>").fadeIn(t);
  else
  $("#definitie").html("<b class='error'>Mai încearcă!</b>").fadeIn(t);
  
  }

  function reset_game() { if(lungime_incercare!=0){ lungime_incercare=0; incercare=""; fill_incercare(); init_btns(); setTimeout(eplay,10,sialitera); $(".reset").removeClass("resetactiv");}}
  function newGame(){clearTimeout(workaroundshint); clearTimeout(timeforhint); setC(joc,0); setC(joc+"_score",0); totalscore=0; nivel=0; start(-1); }
  function next(){ stats="?nivel="+parseInt(parseInt(nivel)+1)+"&time="+parseInt(timepergame/1000)+"&indiciu="+indiciu_folosit+"&mod="+mode+"&cuv="+solutie; clearTimeout(workaroundshint); clearTimeout(timeforhint); nivel++;  setC(joc,nivel); setC(joc+"_score", totalscore); start(0); send_stats(); }
  
  function setC(cname, cvalue) {var d = new Date(); d.setTime(d.getTime() + (90*24*60*60*1000));  var expires = "expires="+ d.toUTCString();  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=None; Secure"; }
  function getC(cname) { var name = cname + "=";  var decodedCookie = decodeURIComponent(document.cookie);   var ca = decodedCookie.split(';');   for(var i = 0; i <ca.length; i++) { var c = ca[i];  while (c.charAt(0) == ' ') { c = c.substring(1); }if (c.indexOf(name) == 0) { return c.substring(name.length, c.length);}}return 0;}
  
  function mode_highlight(){if(mode=="hard") { $("#hard").addClass("modactiv"); $("#easy").removeClass("modactiv");}  else { $("#easy").addClass("modactiv"); $("#hard").removeClass("modactiv");}}
  function mode_show(){if(mode=="hard") $( "#mode").prop('checked', true);  else $( "#mode").prop('checked', false); }
  
  function s_switch_check(){ eplay(sswitch); } 
  
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
  setTimeout(eplay,10,sninja);
  if(x){$("#info").hide(500); $("#game").show(500);}
  else{ clearTimeout(workaroundshint); $("#game").hide(500); $("#info").show(500);}}
  
  function home(){
  clearTimeout(workaroundshint); setTimeout(eplay,10,sninja); level_check(); $("#game").hide(500); $("#startgame").show(500);
  }
  
  function switch_sound(){
  if(sound==0) 
  {sound=1;  $("#switch_sound").html("volume_up");}
  else {sound=0; $("#switch_sound").html("volume_off");}
  }
  
  function level_check(){
  var startlevel = parseInt(nivel)+1;
  if(nivel>=niveluri.length) { show_final_score(); clearTimeout(workaroundshint);  $("#startgame").hide(); $("#endgame").show(1000);  } 
  else if (startlevel==1) $("#startlevel").html("START"); else $("#startlevel").html("Începe nivelul "+startlevel);
  }
  
  
  function get_clue(){
	 hide_nivel(250);
	 setTimeout(fill_nivel,245,2,"<b class='mesajindiciu' onClick='show_clue();'>Indiciu!</b>",500);
  }
  function show_clue() 
  {
   coeficient_indiciu=1-(1/lungime_solutie);
   indiciu_folosit=1;
   eplay(spunelitera);
   var y = solutie.split("");
   incercare=y[0]+" ";
   lungime_incercare=1;
   init_btns();
   for(var i=2; i<=lungime_solutie; i++)
   incercare=incercare+"_ ";  
   $("#incercare").html(incercare);
   $('#nivel').fadeOut(250);
   $(".reset").addClass("resetactiv");
   setTimeout(fill_nivel,240,1);
   
  }
  
  function eplay(efect) {if(sound) efect.play(); }
  
  function gametime(moment){if(moment==1) startofgame=new Date().getTime(); else  endofgame=new Date().getTime(); }
  
  function scor()
  {
	 timepergame=endofgame-startofgame;
	 if(timepergame>300000) timepergame=300000;
	 var evaluare = (300000-timepergame+(lungime_solutie*10000))/1000;
	 scorepergame=parseInt(evaluare*coeficient_dificultate[mode]*coeficient_indiciu);
	 totalscore=parseInt(totalscore)+scorepergame;
  }
  
  function show_final_score() {$("#scor_total").html(totalscore);}
  
  function send_stats(){
  var xhttp = new XMLHttpRequest(); 
  xhttp.open("GET", "https://vladtimotei.ro/scripts/4img_stats.php"+stats, true);
  xhttp.send();
  }
  
  $(document).ready( function(){
  nivel=getC(joc);
  totalscore=getC(joc+"_score");  
  mode=getC(joc+"_mode");  
  if(mode==0) mode="easy"; 
  mode_show();  
  mode_highlight();
  mode_check();
  level_check();   
  $("#mode").change(mode_check);
  }); 