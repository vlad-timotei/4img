<!DOCTYPE html>
<html lang="en">
   <head>
      <title>4 Imagini - Fun Bible</title>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
      <meta http-equiv="Cache-Control" content="no-cache" />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="Expires" content="0" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta property="og:title" content="Fun Bible">
      <meta name="description" content="Cu ajutorul nostru, copiii vor învăța lucruri interesante despre Dumnezeu într-un mod inedit!">
      <meta property="og:description" content="Cu ajutorul nostru, copiii vor învăța lucruri interesante despre Dumnezeu într-un mod inedit!">
      <meta property="twitter:card" content="Cu ajutorul nostru, copiii vor învăța lucruri interesante despre Dumnezeu într-un mod inedit!">
      <meta property="og:image" content="https://funbible.net/assets/logo.jpg">
      <meta property="og:url" content="https://funbible.net/4imagini">
      <meta property="og:type" content="website">
      <meta property="fb:app_id" content="231905474567538">
      <meta property="og:site_name" content="4 Imagini - Fun Bible">
      <meta property="og:locale" content="ro_RO">
      <meta property="keywords" content="jocuri biblice,jocuri crestine,activitati crestine,activitati biblice,pagini de colorat biblice,pagini de colorat crestine,jocuri de sabat,activitati de sabat,desene biblice,desene de sabat,desene crestine">
      <link rel="icon" type="image/x-icon" href="https://funbible.net/favicon.ico">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap" rel="stylesheet">
      <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
      <link href="css/style.css?ver=5.0.<?php echo rand();?>" type="text/css" rel="stylesheet" media="all" />
   </head>
   <body>
      <div class="section no-pad-bot" id="startgame">
         <div class="container">
            <img class="header center fb" src="https://funbible.net/assets/logo.svg" >
            <h1 class="header titlu-joc center blue-text text-darken-4">4 Imagini</h1>
            <div class="row center mb0">
               <h5 class="header col s12 m6 offset-m3 light mb20">Bine ai venit<span id="salut"></span>! Cele patru imagini pe care le vei vedea au în comun un cuvânt. Găsește cuvântul și apoi selectează literele în ordine, pentru a forma cuvântul!</h5>
            </div>
            <div class="row center mb0">
               <div id="noname" class="mb10"><span id="alertme"></span><span class="nl">Numele tău: </span><br/><input type="text" placeholder="Scrie numele tău aici" name="nume-participant" id="nume-participant" ><br/></div>
               <span id="old_user_score" class="invisible"></span>
			   <a class="btn-large waves-effect waves-light green darken-2 start mb20" onclick="start(1);" id="startlevel">Începe</a><br/>
               <div class="switch" ><label><span id="easy">Mod ușor</span><input type="checkbox" id="mode"><span class="lever"></span><span id="hard">Mod avansat</span></label></div>
               <br/>
            </div>
            <div class="row center">
               <b class="clasament-title">Clasament</b>
               <br/>
               <div id="clasament">
               </div>
               <br/>
               <img src="https://funbible.net/assets/o-yellow.png" class="decoration"><img src="https://funbible.net/assets/x-pink.png" class="decoration"> <img src="https://funbible.net/assets/o-blue.png" class="decoration"><br/>
            </div>
         </div>
      </div>
      <div class="invisible section no-pad-bot" id="info">
         <div class="container">
            <h1 class="header center blue-text text-darken-4">4 Imagini</h1>
            <div class="row">
               <div class="col s12 light m6 offset-m3">
                  <i class="center cent"> versiunea <b>5.0</b>, cu 75 de cuvinte </i>
                  <ul class="instructiuni">
                     <li><i class="instr_ico material-icons">lightbulb_outline</i> Privește cu atenție cele patru imagini și încearcă să găsești care este elementul comun în ele. Citește și indiciul de sub imagini! Când găsești soluția, apasă, pe rând pe literele colorate. </li>
                     <li><i class="instr_ico material-icons">loop</i> Dacă ai apăsat greșit pe o literă, apasă din nou pe ea și aceasta se va șterge. Poți șterge tot ce ai introdus apăsând pe butonul de resetare. </li>
                     <li><i class="instr_ico material-icons">error_outline</i> Dacă introduci o soluție incorectă, te voi ruga să încerci din nou. Dacă ți se pare prea greu, apasă pe butonul <i  class="home material-icons">home</i> și selectează modul de joc ușor, în care primești indiciul mai devreme, iar literele sunt mai puține și ordonate alfabetic. </li>
                     <li><i class="instr_ico material-icons">help</i>După o încercare sau două, ți se va oferi posibilitatea de a primi ca indiciu prima literă a cuvântului</li>
                     <li><i class="instr_ico material-icons">assignment_turned_in</i> Dacă introduci soluția corectă, avansezi la următorul nivel. Voi adăuga periodic noi niveluri, așa că revin-o aici după ce termini toate nivelurile. </li>
                     <li><b>Succes!</b></li>
                     <br/>
                     <li><i>Sursele imaginilor din acest proiect pot fi consultate <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vS4AMLdDuOoTNoptCtqdrY4BcIaPlrwTnh_qblgKGYXBwUqoVGIvP82v8YSSOcWsuTu5W5bDebCwgrv/pubhtml?gid=1539825106&single=true" target="_new">aici</a>. </i></li>
                     <li><i>Citește despre politica de confidențialitate și utilizarea cookie-urilor <a href="https://docs.google.com/document/d/1JL21qeYWquP3HaMKV6k0TNsNJVEp2imjdsqUedLjriw/edit?usp=sharing" target="_new">aici</a>. </i></li>
                 
				  </ul>
               </div>
            </div>
            <div class="row center">
               <a   class="btn-large waves-effect waves-light green darken-1 start" onclick="info(1);" >Înapoi la joc</a>
            </div>
         </div>
      </div>
      <div class="invisible section no-pad-bot" id="rankingpage">
         <div class="container">
            <h1 class="header center blue-text text-darken-4 titlu-joc">Clasament</h1>
            <div class="row">
               <div class="col s12 light m6 offset-m3">
                  <div id="clasament-complet">
                  </div>
                  <br/>
                  <h3 class="clasament-title cent center">Nu te descuraja dacă nu ești printre primii! Vei ajunge curând!</h3>
               </div>
            </div>
            <div class="row center">
               <a   class="btn-large waves-effect waves-light green darken-1 start" onclick="ranking_page(1);" >Înapoi acasa</a>
            </div>
         </div>
      </div>
      <div class="invisible section no-pad-bot" id="endgame">
         <div class="container">
            <img class="header center fb" src="https://funbible.net/assets/logo.svg" >
            <h1 class="header center blue-text text-darken-4" id="finalcongrats">Felicitări</h1>
            <div class="row center">
               <h5 class="header col s12 light">Ai terminat toate nivelurile acestui joc cu un scor total de <b id="scor_total">100</b> puncte! <br/><br/>Periodic, apar noi niveluri, așa că te așteptăm! </h5>
               <b class="clasament-title">Clasament</b>
               <br/>
               <div id="clasament-final">
               </div>
            </div>
            <div class="row center">
               <a   class="btn-large waves-effect waves-light green darken-1 start" onclick="newGame()"; >Începe din nou</a>
            </div>
         </div>
      </div>
      <div class="invisible container" id="game">
         <div class="section">
            <div class="row">
               <div class="col s6 m3 offset-m3">
                  <img src="" id="clue1" onClick="open_modal(this.src);" class="clue c1" />
               </div>
               <div class="col s6 m3 ">
                  <img src="" id="clue2" onClick="open_modal(this.src);" class="clue c2" />
               </div>
            </div>
            <div class="row mb10">
               <div class="col s6 m3 offset-m3 ">
                  <img src="" id="clue3" onClick="open_modal(this.src);" class="clue c3" />
               </div>
               <div class="col s6 m3  ">
                  <img src="" id="clue4" onClick="open_modal(this.src);" class="clue c4" />
               </div>
            </div>
            <div id="resetable">
               <div class="row">
                  <div class="col s12">
                     <h6 class="center" id="definition" >Găsește-mă!</h6>
                     <h2 class="center" id="usertry" >_ _ _ _ _ _</h2>
                  </div>
               </div>
               <div class="row" id="litere_posibile">
                  <div id="he1" class="col s3 m1 letter "><a class="btn-floating btn-large waves-effect waves-light red darken-4 cent " id="1" onclick="touch(1);">A</a></div>
                  <div class="col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light blue darken-4 cent " id="2" onclick="touch(2);">A</a></div>
                  <div class="col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light teal lighten-2 cent " id="3" onclick="touch(3);">C</a></div>
                  <div class="col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light yellow darken-3 cent " id="4" onclick="touch(4);">A</a></div>
                  <div class="col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light light-blue darken-1 cent " id="5" onclick="touch(5);">A</a></div>
                  <div class="col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light red darken-4 cent " id="6" onclick="touch(6);">A</a></div>
                  <div id="e2" class="col s3 m1 letter "><a class="btn-floating btn-large waves-effect waves-light blue darken-4 cent " id="7" onclick="touch(7);">A</a></div>
                  <div class="col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light teal lighten-2 cent " id="8" onclick="touch(8);">A</a></div>
                  <div id="h2" class="col s3 m1 letter "><a class="btn-floating btn-large waves-effect waves-light yellow darken-3 cent " id="9" onclick="touch(9);">A</a></div>
                  <div class="col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light light-blue darken-1 cent " id="10" onclick="touch(10);">A</a></div>
                  <div class="col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light red darken-4 cent " id="11" onclick="touch(11);">A</a></div>
                  <div class="col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light blue darken-4 cent " id="12" onclick="touch(12);">A</a></div>
                  <div class="hard-letter col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light teal lighten-2 cent " id="13" onclick="touch(13);">A</a></div>
                  <div class=" hard-letter col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light yellow darken-3 cent " id="14" onclick="touch(14);">A</a></div>
                  <div class="hard-letter col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light light-blue darken-1 cent " id="15" onclick="touch(15);">A</a></div>
                  <div class="hard-letter col s3 m1 letter"><a class="btn-floating btn-large waves-effect waves-light red darken-4 cent " id="16" onclick="touch(16);">A</a></div>
               </div>
               <div class="row">
                  <div class="col center s2 m1 offset-m3"><i onClick="home();" class="menub material-icons">home</i></div>
                  <div class="col center s2 m1"><i class="menub material-icons" onClick="info(0);">info_outline</i></div>
                  <div class="col center s4 m2"><span id="level" >Nivel 1</span></div>
                  <div class="col center s2 m1"><i class="menub material-icons" id="switch_sound" onClick="switch_sound();">volume_up</i> </div>
                  <div class="col center s2 m1"><i class="menub reset material-icons" onClick="reset_game();">loop</i></div>
               </div>
            </div>
         </div>
      </div>
      <div id="modal_area" class="modalthing" onClick="close_modal();">
         <span class="close" onClick="close_modal();">&times;</span>
         <img class="modal-content" onClick="close_modal();" id="maximg">
      </div>
      <audio id="s_hint">
         <source src="audio/hint.mp3" preload="auto" type="audio/mp3">
      </audio>
      <audio id="s_correct">
         <source src="audio/corect.mp3" preload="auto" type="audio/mp3">
      </audio>
      <audio id="s_incorrect">
         <source src="audio/incorect.mp3" preload="auto" type="audio/mp3">
      </audio>
      <audio id="s_pull_letter">
         <source src="audio/ia_litera.mp3" preload="auto" type="audio/mp3">
      </audio>
      <audio id="s_push_letter">
         <source src="audio/pune_litera.mp3" preload="auto" type="audio/mp3">
      </audio>
      <audio id="s_ninja">
         <source src="audio/ninja.mp3" preload="auto" type="audio/mp3">
      </audio>
      <audio id="s_switch">
         <source src="audio/switch.mp3" preload="auto" type="audio/mp3">
      </audio>
      <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
      <script src="js/materialize.min.js"></script>
      <script src="js/game.js?ver=5.0.<?php echo rand();?>"></script>
   </body>
</html>