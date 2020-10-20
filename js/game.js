/* Game created by Vlad Timotei $ver.6.0 @23.09.2020 #ro_en100 */
var game = "4img";
var oldgame = "4img1word_19052020F";
var level = {}; // solution, solution_lenght, try_lenght, completed, definition, timeforaudiohint, timeoforhint
var player = {}; // name, level, mode, startofgame, endofgame, timpepergame, scorpergame, totalscore, usedclue, tries, clue_coef, sound, olduser

var btns = []; //starts with 1
var btns_txt = []; //starts with 0
var clues = [];
var preloaded_imgs = new Array();
 
var music = {}
music.correct = document.getElementById("s_correct");
music.incorrect = document.getElementById("s_incorrect");
music.pull_letter = document.getElementById("s_pull_letter");
music.push_letter = document.getElementById("s_push_letter");
music.ninja = document.getElementById("s_ninja");
music.switch_btn = document.getElementById("s_switch");
music.hint = document.getElementById("s_hint");

var modal = document.getElementById("modal_area");
var modalGame = document.getElementById("game");

var stats = {};
var ranking;
/*onHomeLoad functions*/
function check_old_data() {
    if(getval(game) == 0) {
		if(getval(oldgame)!=0){
			setval(game,getval(oldgame)); delval(oldgame);
			setval(game+"_mode",getval(oldgame+"_mode")); delval(oldgame+"_mode");
			setval(game+"_acceptedterms",getval(oldgame+"_acceptedterms")); delval(oldgame+"_acceptedterms");
			setval(game+"_name",getval(oldgame+"_nume")); delval(oldgame+"_nume");
			setval(game+"_score",getval(oldgame+"_score")); delval(oldgame+"_score");
		 return; 
		}
        window.addEventListener("message", function(event) {
            newDomain(event.data);
        });
        document.getElementById("transfer-player-data").src =
            "https://raduanastase.com/fb-api/_extra/4img/TransferPlayerData.php?game=4img1word_19052020F&ver=072020";
    }
}

function newDomain(data) {
    var oldData = JSON.parse(data);
    if(oldData.score != player.totalscore) {
        setval(game, oldData.level);
        setval(game + "_score", oldData.score);
        setval(game + "_mode", oldData.mode);
        check_player(0);
    }
}

function getval(cname) {
    var loc = localStorage.getItem(cname);
    if(loc) return loc;
    else return 0;
}

function setval(cname, cvalue) {
    localStorage.setItem(cname, cvalue);
}

function delval(cname){
	localStorage.removeItem(cname);
}

function load_game() {
    player.language = getval(game + "_language");
    if(player.language == 0) {
        player.language = "ro";
        setval(game + "_language", "ro");
    }
    load_language(player.language);
}

function load_language(lang) {
    var langRo = $('.lang-ro');
    var langEn = $('.lang-en');
    if(lang == "ro") {
        player.language = 0;
        langEn.hide();
        langRo.show();
    }
    if(lang == "en") {
        player.language = 1;
        langEn.show();
        langRo.hide();
    }
    check_player();
}

function check_player(first_check = 1) {
    player.name = getval(game + "_name");
    player.level = getval(game);
    player.sound = getval(game + "_sound");
    player.totalscore = getval(game + "_score");
    player.ID = getval(game + "_ID");
    if(player.sound == 0) player.sound = "on";
    set_sound();
    check_mode();
    check_level();
    if(first_check) get_ranking("short");
    player.olduser = 0;
    preload_current_images();
    preload_next_images();
    if(player.name != 0) {
        $("#noname").hide();
        $("#salut").html(", " + player.name);
    } else {
        if(player.level != 0) player.olduser = 1;
        $("#noname").show();
        $("#salut").html("");
    }
}

function set_sound() {
    if(player.sound == "on") $("#switch_sound").html("volume_up");
    else $("#switch_sound").html("volume_off");
}

function check_mode() {
    player.mode = getval(game + "_mode");
    if(player.mode == 0) player.mode = "easy";
    if(player.mode == "hard") {
        $("#mode").prop('checked', true);
        mode_hard_design();
    } else {
        $("#mode").prop('checked', false);
        mode_easy_design();
    }
    setval(game + "_mode", player.mode);
}

function mode_hard_design() {
    $(".hard").addClass("modactiv");
    $(".easy").removeClass("modactiv");
}

function mode_easy_design() {
    $(".easy").addClass("modactiv");
    $(".hard").removeClass("modactiv");
}

function check_level() {
    var startlevel = parseInt(player.level) + 1;
    if(player.level >= levels[player.language].length) {
        show_final_score();
        clearTimeout(level.timeforaudiohint);
        $("#startgame").hide();
        $("#endgame").show(1000);
        return 0;
    } else if(startlevel == 1) $("#startlevel").html("START");
    else $("#startlevel").html(textdb[player.language]['startlevel'] + " " + startlevel);
    $("#startgame").show();
}

function show_final_score() {
    $("#scor_total").html(player.totalscore);
    get_ranking("final");
    $("#finalcongrats-name").html(player.name + "!");
}

function get_ranking(whattype) {
    var param = {
        "type": whattype,
        "name": player.name
    };
    var req = "https://vladtimotei.ro/scripts/4img/4img_ranking.php";
    $.get(req, param, function(data) {
        ranking = data;
        put_ranking(whattype);
    });
}

function put_ranking(whattype) {
    var rank = {};
    var output = "";
    var x;
    ranking = ranking.split("||", 3);
    rank = JSON.parse(ranking[2]);
    for(x in rank) output += '<div class="row s12"><div class="col s8 offset-s1 clasn">' + rank[x]['id'] + '. ' + rank[x]['nume'] +
        '</div><div class="col s2 clasp">' + rank[x]['punctaj'] + '</div></div>';
    if(whattype == "short") {
        output += '<span onclick="javascript:ranking_page();" class="link-clasament" ><i>' + textdb[player.language]['and'] + ' <b>' + ranking[0] + '</b> ' +
            textdb[player.language]['otherplayers'] + ' | ' + textdb[player.language]['fullranking'] + '  </i></span>';
        $("#clasament").html(output);
    }
    if(whattype == "full") {
        output += "<div class='cent center'>" + textdb[player.language]['and'] + " <b>" + ranking[0] + "</b> " + textdb[player.language]['otherplayers'] +
            "</div>";
        $("#clasament-complet").html(output);
    }
    if(whattype == "final") {
        output += "<div class='cent center'>" + textdb[player.language]['and'] + " <b>" + ranking[0] + "</b> " + textdb[player.language]['otherplayers'] +
            "</div>";
        $("#clasament-final").html(output);
    }
    if(ranking[1] < 10) {
        $("#firstofthem").removeClass("invisible");
        $("#lastofthem").addClass("invisible");
    } else {
        $("#firstofthem").addClass("invisible");
        $("#lastofthem").removeClass("invisible");
    }
}

function preload_current_images() {
    if(player.level < (levels[player.language].length)) {
        var currentlevel = levels[player.language][player.level].split('|', 3);
        var imgs_urls = currentlevel[1].split(',', 4);
        preload_imgs(imgs_urls);
    }
}

function preload_next_images() {
    if(player.level < (levels[player.language].length - 1)) {
        var nextlevel = levels[player.language][parseInt(player.level) + 1].split('|', 3);
        var imgs_urls = nextlevel[1].split(',', 4);
        preload_imgs(imgs_urls);
    }
}

function preload_imgs(imgs) {
    for(var i = 0; i < imgs.length; i++) {
        preloaded_imgs[i] = new Image();
        preloaded_imgs[i].src = "images/" + imgs[i] + ".jpg";
    }
}

function load_game_events() {
    $("#mode").change(change_mode);
}
/*onHomeClick functions*/
function change_mode() {
    if($("#mode").is(":checked")) {
        player.mode = "hard";
        mode_hard_design();
    } else {
        player.mode = "easy";
        mode_easy_design();
    }
    eplay(music.switch_btn);
    setval(game + "_mode", player.mode);
}

function eplay(effect) {
    if(player.sound == "on") {
        effect.currentTime = 0;
        effect.play();
    }
}

function ranking_page(x) {
    setTimeout(eplay, 10, music.ninja);
    if(x) {
        get_ranking("short");
        $("#rankingpage").hide(500);
        $("#startgame").show(500);
    } else {
        get_ranking("full");
        clearTimeout(level.timeforaudiohint);
        $("#game").hide(500);
        $("#startgame").hide(500);
        $("#endgame").hide(500);
        $("#rankingpage").show(500);
    }
}

function change_language(lang) {
    player.language = lang;
    setval(game + "_language", lang);
    $("#startgame").hide(500);
    eplay(music.ninja);
    $("#startgame").show(500);
    setTimeout(load_language, 500, lang);
}

function home() {
    if(level.completed == 0) {
        get_ranking("short");
        clearTimeout(level.timeforaudiohint);
        setTimeout(eplay, 10, music.ninja);
        check_level();
        $("#game").hide(250);
        $("#startgame").show(500);
    }
}

function info(x) {
    if(level.completed == 0) {
        setTimeout(eplay, 10, music.ninja);
        if(x) {
            $("#info").hide(500);
            $("#game").show(500);
        } else {
            clearTimeout(level.timeforaudiohint);
            $("#game").hide(500);
            $("#info").show(500);
        }
    }
}

function switch_sound() {
    if(player.sound == "off") player.sound = "on";
    else player.sound = "off";
    setval(game + "_sound", player.sound);
    set_sound();
}
/*onLevelLoad functions*/
function start(fromhome) {
    if(fromhome == 1) {
        if(get_player_name()) {
            eplay(music.ninja);
            $("#startgame").hide(1000);
            $("#game").show(500);
            playthegame();
        }
    }
    if(fromhome == 0) {
        if(player.level >= levels[player.language].length) {
            clearTimeout(level.timeforaudiohint);
            show_final_score();
            $("#game").hide(500);
            $("#endgame").show(500);
        } else {
            $("#game").hide(600);
            setTimeout(playthegame, 400);
            $("#game").show(500);
        }
    }
}

function get_player_name() {
    if(player.name == 0) {
        var availablename;
        var playernameinput = document.getElementById("nume-participant").value.replace(/\s+/g, '');
        if(playernameinput.length > 10) {
            $("#alertme").html(textdb[player.language]['namelengthalert'] + "!<br/>");
            return 0;
        }
        playernameinput = sanitizename(playernameinput);
        if(playernameinput == "") {
            $("#alertme").html(textdb[player.language]['namealert'] + "!<br/>");
            return 0;
        }
        if(!document.getElementById("termsandconditions").checked) {
            $("#alertme").html(textdb[player.language]['policyalert'] + "!</i><br/>");
            return 0;
        } else setval(game + "_acceptedterms", "yes");
        if(player.olduser) var param = {
            "name": playernameinput,
            "olduser": true,
            "nivel": player.level,
            "punctaj": player.totalscore
        };
        else var param = {
            "name": playernameinput
        };
        player.ID = get_player_id(param, false);
        if(player.ID.indexOf("#") != 0) {
            setval(game + "_name", playernameinput);
            player.name = playernameinput;
            player.olduser = 0;
            $("#salut").html(", " + player.name);
            setval(game + "_ID", player.ID);
        } else {
            $("#alertme").html(textdb[player.language]['pickothername'] + "! " + playernameinput + "  " + textdb[player.language]['exists'] + " ! <br/>");
            return 0;
        }
    }
    if(player.ID == 0) {
        var param = {
            "name": player.name,
            "olduser": true,
            "nivel": player.level,
            "punctaj": player.totalscore
        };
        get_player_id(param, true);
    }
    $("#noname").hide();
    return 1;
}

function sanitizename(s) {
    var diacritics = ["ă", "â", "ș", "ț", "î", "Ă", "Â", "Ș", "Ț", "Î", "#", "$", "'", '"', "update", "UPDATE", "DELETE", "delete"];
    var chars = ["a", "a", "s", "t", "i", "A", "A", "S", "T", "I", "", "", "", "", "", "", "", ""];
    for(var i = 0; i < diacritics.length; i++) {
        s = s.split(diacritics[i]).join(chars[i]);
    }
    return s;
}

function get_player_id(param, nonsync) {
    var playerID;
    var req = "https://vladtimotei.ro/scripts/4img/4img_get_name.php";
    $.ajax({
        type: "GET",
        url: req,
        async: nonsync,
        data: param,
        success: function(data) {
            if(nonsync) {
                player.ID = data.replace("#", "");
                setval(game + "_ID", player.ID);
            } else playerID = data;
        }
    });
    if(!nonsync) return playerID;
}

function playthegame() {
    gametime(1);
    init();
    fill_try();
    fill_level(1);
    fill_img();
    fill_definition(0);
}

function gametime(moment) {
    if(moment == 1) player.startofgame = new Date().getTime();
    else player.endofgame = new Date().getTime();
}

function init() {
    var date = levels[player.language][player.level].split('|', 3);
    level.definition = date[2];
    clues = date[1].split(',', 4);
    level.solution = date[0];
    level.completed = 0;
    level.solution_lenght = level.solution.length;
    level.try_lenght = 0;
    player.tries = 0;
    player.clue_coef = 1;
    player.usedclue = 0;
    do_btns(decide_mode());
}

function decide_mode() {
    if(level.solution_lenght > 12) {
        return "hard";
    } else {
        return player.mode;
    }
}

function do_btns(mode) {
	set_btns_mode(mode);
    init_btns(mode);
    fill_btns(mode);
}

function set_btns_mode(mode) {
    if(mode == "hard") {
        $("#he1").addClass("offset-m2");
        $("#he1").removeClass("offset-m3");
        $("#e2").removeClass("offset-m3");
        $("#h2").addClass("offset-m2");
        $(".hard-letter").removeClass("invisible");
    } else {
        $("#he1").removeClass("offset-m2");
        $("#he1").addClass("offset-m3");
        $("#e2").addClass("offset-m3");
        $("#h2").removeClass("offset-m2");
        $(".hard-letter").addClass("invisible");
    }
}

function init_btns(mode) {
    var b, limit;
    if(mode == "hard") limit = 16;
    else limit = 12;
    for(var i = 1; i <= limit; i++) {
        btns[i] = 0;
        b = "#" + i;
        $(b).attr('style', "");
    }
}

function fill_btns(mode) {
    var i, level_key;
    level_key = getval(game + "_key_"+player.language);
    if(level_key) {
        level_key = level_key.split("#");
        if(level_key[0] == player.level) {
            if(mode == "easy") {
                btns_txt = level_key[1].split('');
                for(i = 1; i <= 12; i++) document.getElementById(i).innerHTML = btns_txt[i - 1];
            } else {
				btns_txt = level_key[2].split('');
				if(player.mode=="easy") btns_txt.sort(function(a, b) {return a.localeCompare(b); });
                for(i = 1; i <= 16; i++) document.getElementById(i).innerHTML = btns_txt[i - 1];
            }
            return true;
        }
    }
    var encrypted_solution_easy = level.solution + add_letters(12 - level.solution_lenght);
    var encrypted_solution_hard = encrypted_solution_easy + add_letters(16-encrypted_solution_easy.length);
	
    var btns_txt_easy = encrypted_solution_easy.split('');
    btns_txt_easy.sort(function(a, b) {
        return a.localeCompare(b);
    });
	
    var btns_txt_hard = shuffle(encrypted_solution_hard.split(''));
	
    encrypted_solution_easy = btns_txt_easy.join('');
    encrypted_solution_hard = btns_txt_hard.join('');
	
    if(mode == "easy") {
        btns_txt = btns_txt_easy.slice();
        for(i = 1; i <= 12; i++) document.getElementById(i).innerHTML = btns_txt[i - 1];
    } else {
		btns_txt = btns_txt_hard.slice();
		if(player.mode=="easy") btns_txt.sort(function(a, b) {return a.localeCompare(b); });
        for(i = 1; i <= 16; i++) document.getElementById(i).innerHTML = btns_txt[i - 1];
    }
    setval(game + "_key_"+player.language, player.level + "#" + encrypted_solution_easy + "#" + encrypted_solution_hard);
}

function add_letters(n) {
    var text = "";
    if(player.language) var possible = "ABCDEFGHILMNOPRSTUVXZ";
    else var possible = "AĂÂBCDEFGHIÎLMNOPRSȘTȚUVXZ";
    for(var i = 0; i < n; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function fill_try() {
    var usertry = "";
    for(var i = 1; i <= level.solution_lenght; i++) usertry = usertry + "_ ";
    $("#usertry").html(usertry);
    var usertrysize = 1.8 + 0.15 * (14 - level.solution_lenght);
    $("#usertry").css("font-size", usertrysize + "em");
}

function fill_level(whatmode, txt, t) {
    if(whatmode == 1) {
        var niveltxt = parseInt(player.level) + 1;
        $("#level").html(textdb[player.language]['level'] + " <b>" + niveltxt + "</b>").fadeIn(500);
    } else $('#level').html(txt).fadeIn(t);
}

function fill_img() {
    shuffle(clues);
    for(var i = 1; i <= 4; i++) document.getElementById("clue" + i).src = "images/" + clues[i - 1] + ".jpg";
}

function fill_definition(t) {
    $('#definition').html(textdb[player.language]['iama'] + " " + level.definition + "! " + textdb[player.language]['findme']).fadeIn(t);
}
/*onLevelClick functions --- touch();*/
function touch(l) {
    if(level.completed == 0) {
        if(btns[l] == 1) getOutLetter(l);
        else if(level.try_lenght < level.solution_lenght) putInLetter(l);
    }
}

function getOutLetter(letter) {
    if(level.try_lenght == 1) $(".reset").removeClass("resetactiv");
    eplay(music.pull_letter);
    level.try_lenght--;
    btns[letter] = 0;
    var usertry = document.getElementById('usertry').innerHTML;
    var pos = usertry.lastIndexOf(btns_txt[letter - 1]);
    $('#usertry').html(usertry.substring(0, pos) + '_' + usertry.substring(pos + 1));
    letter = "#" + letter;
    $(letter).attr('style', "");
}

function putInLetter(letter) {
    if(level.try_lenght == 0) $(".reset").addClass("resetactiv");
    eplay(music.push_letter);
    level.try_lenght++;
    btns[letter] = 1;
    document.getElementById("usertry").innerHTML = document.getElementById("usertry").innerHTML.replace('_', btns_txt[letter - 1]);
    letter = "#" + letter;
    $(letter).attr('style', "background-color: #CCC !important;");
    if(level.try_lenght == level.solution_lenght) check_player_try();
}

function check_player_try() {
    var sol = document.getElementById('usertry').innerHTML.replace(/\s/g, '');
    if(sol == level.solution) {
        level.completed = 1;
        eplay(music.correct);
        level.try_lenght = 0;
        $(".reset").removeClass("resetactiv");
        hide_definition(100);
        gametime(2);
        scor();
        setTimeout(display_message, 75, 250, 1);
        setTimeout(next, 1500);
    } else {
        player.tries++;
        if(player.tries == 1 && player.mode == "easy") {
            level.timeforhint = setTimeout(get_clue, 5000);
            level.timeforaudiohint = setTimeout(eplay, 4900, music.hint);
        } else if(player.tries == 2 && player.mode == "hard") {
            level.timeforhint = setTimeout(get_clue, 5000);
            level.timeforaudiohint = setTimeout(eplay, 4900, music.hint);
        }
        eplay(music.incorrect);
        hide_definition(250);
        setTimeout(display_message, 225, 500, 0);
        setTimeout(hide_definition, 2250, 500);
        setTimeout(fill_definition, 2725, 500);
    }
}

function hide_definition(t) {
    $('#definition').fadeOut(t);
}

function display_message(t, type) {
    if(type == 1) $('#definition').html("<b class='succes'>" + textdb[player.language]['congrats'] + ", <span id='player-name'>" + player.name +
        "</span>!</b> " + textdb[player.language]['yourscore'] + ": <b>" + player.totalscore + "</b>").fadeIn(t);
    else $("#definition").html("<b class='error'>" + textdb[player.language]['tryagain'] + "!</b>").fadeIn(t);
}

function get_clue() {
    hide_nivel(250);
    setTimeout(fill_level, 245, 2, "<b class='mesajindiciu' onClick='show_clue();'>" + textdb[player.language]['clue'] + "!</b>", 500);
}

function hide_nivel(t) {
    $('#level').fadeOut(t);
}

function show_clue() {
    player.clue_coef = 1 - (1 / level.solution_lenght);
    player.usedclue = 1;
    eplay(music.push_letter);
    var y = level.solution.split("");
    var usertry = y[0] + " ";
    level.try_lenght = 1;
    init_btns(decide_mode());
    for(var i = 2; i <= level.solution_lenght; i++) usertry = usertry + "_ ";
    $("#usertry").html(usertry);
    $('#level').fadeOut(250);
    $(".reset").addClass("resetactiv");
    setTimeout(fill_level, 240, 1);
}

function scor() {
    var difficulty_coeficient = {
        easy: 1,
        hard: 1.75
    };
    player.timepergame = player.endofgame - player.startofgame;
    if(player.timepergame > 300000) player.timepergame = 300000;
    var evaluare = (300000 - player.timepergame + (level.solution_lenght * 10000)) / 1000;
    player.scorepergame = parseInt(evaluare * difficulty_coeficient[player.mode] * player.clue_coef);
    player.totalscore = parseInt(player.totalscore) + player.scorepergame;
}

function next() {
    stats = {
        "nivel": parseInt(parseInt(player.level) + 1),
        "time": parseInt(player.timepergame / 1000),
        "indiciu": player.usedclue,
        "mod": player.mode,
        "cuv": level.solution,
        "nume": player.name,
        "scor": player.totalscore,
        "lang": player.language,
        "ID": player.ID
    };
    send_stats();
    clearTimeout(level.timeforaudiohint);
    clearTimeout(level.timeforhint);
    player.level++;
    setTimeout(preload_next_images, 1000);
    setval(game, player.level);
    setval(game + "_score", player.totalscore);
    setval(game + "_key_"+player.language, 0);
    start(0);
}

function send_stats() {
    var req = "https://vladtimotei.ro/scripts/4img/4img_send_stats.php";
    $.get(req, stats);
}
/*onLevelClick functions --- others*/
function reset_game() {
    if(level.try_lenght != 0) {
        level.try_lenght = 0;
        fill_try();
        init_btns(decide_mode());
        setTimeout(eplay, 10, music.pull_letter);
        $(".reset").removeClass("resetactiv");
    }
}

function open_modal(image) {
    var modalImg = document.getElementById("maximg");
    modalGame.style.opacity = "0.5";
    modal.style.display = "block";
    modalImg.src = image;
}

function close_modal() {
    modal.style.display = "none";
    modalGame.style.opacity = "1";
}

function newGame() {
    clearTimeout(level.timeforaudiohint);
    clearTimeout(level.timeforhint);
    setval(game + "_name", 0);
    setval(game, 0);
	setval(game+"_ID",0);
    setval(game + "_score", 0);
    player.totalscore = 0;
    player.level = 0;
    check_level();
    check_player();
	eplay(music.ninja);
    $("#endgame").hide(500);
    $("#startgame").show(500);
}
/*DB*/
textdb = [
{'level':'Nivel',
 'iama':'Sunt un',
 'findme':'Cine sunt?',
 'congrats':'Felicitări',
 'yourscore':'Scorul tău',
 'tryagain':'Încearcă din nou',
 'clue':'Indiciu',
 'namealert':'Introdu numele mai întâi',
 'namelengthalert':'Introdu un nume mai scurt de 10 caractere!',
 'policyalert':'Acceptă Politica de confidențialitate',
 'pickothername':'Alege alt nume',
 'exists':'există deja',
 'startlevel':'Începe nivelul',
 'and':"și",
 'otherplayers':'alți jucători',
 'fullranking':'Vezi clasament',
 'game':'4 Imagini',
 'placeholder':'Scrie numele tău aici'
 
},
{'level':'Level',
 'iama':'I am a',
 'findme':'Who am I?',
 'congrats':'Congrats',
 'yourscore':'Your score',
 'tryagain':'Try again',
 'clue':'Clue',
 'namealert':'Enter your name first',
 'namelengthalert':'Choose a name shorter than 10 characters!',
 'policyalert':'Accept Privacy Policy',
 'pickothername':'Pick anoter name',
 'exists':'already exists',
 'startlevel':'Start level',
 'and':"and",
 'otherplayers':'other players',
 'fullranking':'Full ranking',
 'game': '4 Images',
 'placeholder':'Put your name here'
}
]

var levels = [
    ["MOISE|2,4,6,8|personaj biblic",
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
        "IOV|151,28,152,153|personaj biblic",
        "LABAN|154,155,156,157|personaj biblic",
        "MATEI|158,148,30,24|personaj biblic",
        "SOLOMON|161,17,24,26|personaj biblic",
        "NEEMIA|159,160,26,24|personaj biblic",
        "DULCE|75,76,77,78|adjectiv",
        "ROȘIE|35,8,59,60|substantiv-adjectiv",
        "PUSTIU|11,52,54,53|substantiv-adjectiv",
        "BOLNAV|35,36,37,38|substantiv-adjectiv",
        "MARE|8,46,48,49|substantiv-adjectiv",
        "PLÂNS|39,40,41,42|substantiv",
        "GRIJĂ|33,31,32,34|substantiv",
        "RUGĂCIUNE|153,31,149,150|substantiv",
        "LOT|86,40,87,88|personaj biblic",
        "GHEDEON|89,90,16,91|personaj biblic",
        "ESAU|92,93,94,95|personaj biblic",
        "ABEL|96,97,98,99|personaj biblic",
        "RUT|100,101,102,103|personaj biblic",
        "NAAMAN|152,153,104,105|personaj biblic",
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
        "SAUL|17,30,136,137|personaj biblic",
        "BALAAM|134,141,142,70|personaj biblic",
        "ZACHEU|71,143,144,145|personaj biblic",
        "ACAN|146,1,147,71|personaj biblic",
        "EUTIH|162,163,164,165|personaj biblic",
        "METUSALA|166,167,168,169|personaj biblic",
        "BOAZ|170,171,172,173|personaj biblic",
        "ELI|174,175,176,177|personaj biblic",
        "MEFIBOȘET|178,179,180,181|personaj biblic",
        "HAMAN|182,183,184,21|personaj biblic",
        "CALEB|185,186,187,188|personaj biblic",
        "EVA|189,190,191,192|personaj biblic",
        "NICODIM|193,194,195,196|personaj biblic",
        "IETRO|197,198,199,200|personaj biblic",
        "BENIAMIN|201,202,203,204|personaj biblic",
        "ENOH|205,206,207,208|personaj biblic",
        "SIMON|209,210,211,212|personaj biblic",
        "DALILA|213,214,215,216|personaj biblic",
        "BATȘEBA|217,218,219,220|personaj biblic",
        "ISMAEL|221,222,223,224|personaj biblic",
        "POTIFAR|225,226,227,228|personaj biblic",
        "BARABA|229,230,231,232|personaj biblic",
        "IUDA|233,234,235,236|personaj biblic",
        "MICAL|237,238,239,240|personaj biblic",
        "ȘTEFAN|241,242,243,244|personaj biblic",
        "MIRIAM|245,246,247,248|personaj biblic",
        "NEBUCADNEȚAR|249,250,251,252|personaj biblic",
        "BELȘAȚAR|253,254,255,256|personaj biblic",
        "ABNER|257,258,259,260|personaj biblic",
        "ANANIA|314,315,316,317|personaj biblic",
        "RAHELA|275,276,277,279|personaj biblic",
        "URIE|271,272,273,274|personaj biblic",
        "IACOV|301,302,303,304|personaj biblic",
        "ELISABETA|284,285,286,287|personaj biblic",
        "TOMA|288,289,290,291|personaj biblic",
        "SILA|292,293,294,295|personaj biblic",
        "SEM|296,298,299,300|personaj biblic",
        "IOSIF|280,281,282,283|personaj biblic",
        "AGAR|305,306,308,309|personaj biblic",
        "ȘADRAC|334,335,336,337|personaj biblic",
        "MARDOHEU|363,364,365,366|personaj biblic",
        "CAIN|310,311,312,313|personaj biblic",
        "MARIA|326,327,328,329|personaj biblic",
        "SAFIRA|354,355,357,358|personaj biblic",
        "IROD|342,343,344,345|personaj biblic",
        "LEA|346,347,348,277|personaj biblic",
        "ISUS|330,331,332,333|personaj biblic",
        "DORCA|349,350,351,353|personaj biblic",
        "ABIGAIL|338,339,340,341|personaj biblic",
        "NATAN|318,319,320,321|personaj biblic",
        "DINA|359,360,361,220|personaj biblic",
        "AMOS|322,323,324,325|personaj biblic",
        "CORE|367,368,369,370|personaj biblic",
        "EHUD|371,372,373,304|personaj biblic"
    ],
    ["MOSES|2,4,6,8|biblical figure",
        "JOSEPH|1,3,5,7|biblical figure",
        "ABRAHAM|9,11,13,15|biblical figure",
        "NOAH|10,12,14,16|biblical figure",
        "ESTHER|17,19,21,23|biblical figure",
        "LUKE|18,20,22,24|biblical figure",
        "ADAM|25,27,29,43|biblical figure",
        "PHARAOH|44,11,17,5|biblical figure",
        "JONAH|8,45,46,47|biblical figure",
        "DANIEL|7,50,51,24|biblical figure",
        "AARON|58,56,55,57|biblical figure",
        "JOHN|10,61,5,62|biblical figure",
        "PETER|72,74,73,63|biblical figure",
        "LAZARUS|64,65,66,67|biblical figure",
        "JUDAS|68,69,70,71|biblical figure",
        "JOHN|79,80,81,20|biblical figure",
        "ELIJAH|82,83,84,85|biblical figure",
        "JOB|151,28,152,153|biblical figure",
        "LABAN|154,155,156,157|biblical figure",
        "MATTHEW|158,148,30,24|biblical figure",
        "SOLOMON|161,17,24,26|biblical figure",
        "NEHEMIAH|159,160,26,24|biblical figure",
        "SWEET|75,76,77,78|adjective",
        "RED|35,8,59,60|adjective",
        "DESERT|11,52,54,53|noun",
        "SICK|35,36,37,38|adjective",
        "SEA|8,46,16,49|noun",
        "CRY|39,40,41,42|noun-verb",
        "CARE|33,31,32,34|noun",
        "PRAYER|153,31,149,150|noun",
        "LOT|86,40,87,88|biblical figure",
        "GIDEON|89,90,16,91|biblical figure",
        "ESAU|92,93,94,95|biblical figure",
        "ABEL|96,97,98,99|biblical figure",
        "RUTH|100,101,102,103|biblical figure",
        "NAAMAN|152,153,104,105|biblical figure",
        "SAMSON|106,107,108,109|biblical figure",
        "JONATHAN|110,93,111,112|biblical figure",
        "SAMUEL|113,114,115,116|biblical figure",
        "JOSHUA|117,118,119,120|biblical figure",
        "GOLIATH|106,138,139,140|biblical figure",
        "SARAH|121,122,123,124|biblical figure",
        "RAHAB|125,126,119,118|biblical figure",
        "MARTHA|127,128,64,66|biblical figure",
        "PILATE|129,130,131,132|biblical figure",
        "ABSALOM|133,17,134,135|biblical figure",
        "SAUL|17,30,136,137|biblical figure",
        "BALAAM|134,141,142,70|biblical figure",
        "ZACCHAEUS|71,143,144,145|biblical figure",
        "ACHAN|146,1,147,71|biblical figure",
        "EUTYCHUS|162,163,164,165|biblical figure",
        "METHUSELAH|166,167,168,169|biblical figure",
        "BOAZ|170,171,172,173|biblical figure",
        "ELI|174,175,262,261|biblical figure",
        "MEPHIBOSHETH|178,179,180,181|biblical figure",
        "HAMAN|182,183,184,21|biblical figure",
        "CALEB|185,186,187,188|biblical figure",
        "EVE|189,190,191,192|biblical figure",
        "NICODEMUS|193,194,195,196|biblical figure",
        "JETHRO|197,264,199,263|biblical figure",
        "BENJAMIN|201,202,203,265|biblical figure",
        "ENOCH|266,206,207,208|biblical figure",
        "SIMON|209,210,211,212|biblical figure",
        "DELILAH|213,214,215,216|biblical figure",
        "BATHSHEBA|217,218,219,220|biblical figure",
        "ISHMAEL|221,222,223,224|biblical figure",
        "POTIPHAR|225,226,227,228|biblical figure",
        "BARABBAS|229,230,231,232|biblical figure",
        "JUDAS|233,234,235,236|biblical figure",
        "MICHAL|237,238,239,240|biblical figure",
        "STEPHEN|241,242,243,244|biblical figure",
        "MIRIAM|245,246,247,248|biblical figure",
        "NEBUCHADNEZZAR|249,250,251,252|biblical figure", // mode will change to hard automatically
        "BELSHAZZAR|253,254,255,256|biblical figure",
        "ABNER|267,268,269,270|biblical figure",
        "ANANIAS|314,315,316,317|biblical figure",
        "RACHEL|275,276,278,279|biblical figure",
        "URIAH|271,272,273,274|biblical figure",
        "JACOB|301,302,303,304|biblical figure",
        "ELIZABETH|284,285,286,287|biblical figure",
        "THOMAS|288,289,290,291|biblical figure",
        "SILAS|292,293,294,295|biblical figure",
        "SHEM|297,298,299,300|biblical figure",
        "JOSEPH|280,281,282,283|biblical figure",
        "HAGAR|305,307,308,309|biblical figure",
        "SHADRACH|334,335,336,337|biblical figure",
        "MORDECAI|362,364,365,366|biblical figure",
        "CAIN|310,311,312,313|biblical figure",
        "MARY|326,327,328,329|biblical figure",
        "SAPPHIRA|354,356,357,358|biblical figure",
        "HEROD|342,343,344,345|biblical figure",
        "LEAH|346,347,348,277|biblical figure",
        "JESUS|330,331,332,333|biblical figure",
        "DORCAS|349,350,352,353|biblical figure",
        "ABIGAIL|338,339,340,341|biblical figure",
        "NATHAN|318,319,320,321|biblical figure",
        "DINAH|359,360,361,220|biblical figure",
        "AMOS|322,323,324,325|biblical figure",
        "KORAH|367,368,369,370|biblical figure",
        "EHUD|371,372,373,304|biblical figure"
    ]
];

$(document).ready(function() {
    check_old_data();
    load_game();
    load_game_events();
});