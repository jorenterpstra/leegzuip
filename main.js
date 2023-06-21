function setColor(per, amount, elem)
{
    document.querySelector("."+elem+".amount").style.height = Math.round(per*100) + "%";
    document.querySelector(".goal." + elem).innerHTML = amount;
}

function setTotal(amount){
    document.querySelector("#total").innerHTML = amount;
}

function increase1(elem){
    let x = document.querySelector(".goal." + elem);
    let prev = parseInt(x.innerHTML);
    x.innerHTML = prev + 1;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


class State {
    constructor(geel, blauw, rood, paars){
        this.geel = geel;
        this.blauw = blauw;
        this.rood = rood;
        this.paars = paars;
    }
    increaseGeel(){this.geel = this.geel + 1}
    increaseBlauw(){this.blauw = this.blauw + 1}
    increaseRood(){this.rood = this.rood + 1}
    increasePaars(){this.paars = this.paars + 1}
    
    increaseRandom(){
        let x = Math.random();
        if(x < 0.25){
            this.increaseGeel();
        }
        else if(x < 0.5){
            this.increaseBlauw();
        }
        else if(x < 0.75){
            this.increasePaars();
        }
        else{
            this.increaseRood();
        }
    }

    total(){return this.geel + this.blauw + this.rood + this.paars;}
    reset(){this.geel = 0; this.blauw = 0; this.rood = 0; this.paars = 0;}
    
    maximum(){return Math.max(this.geel, this.blauw, this.rood, this.paars)}
    
    geelPercentage(){ return Math.min(0.98, this.percentageFactor() * this.geel/this.total()); }
    blauwPercentage(){ return Math.min(0.98,this.percentageFactor() * this.blauw/this.total()); }
    roodPercentage(){ return Math.min(0.98, this.percentageFactor() * this.rood/this.total()); }
    paarsPercentage(){ return Math.min(0.98, this.percentageFactor() * this.paars/this.total()); }
    
    
    percentageFactor(){ return 1.3; }
    

    toJson = function() {
        let x = {geel: this.geel, blauw: this.blauw, rood: this.rood, paars: this.paars};
        x = JSON.stringify(x);
        return x;
    };
    static fromJson(json){
        let data = JSON.parse(json); // Parsing the json string.
        return new State(data.geel, data.blauw, data.rood, data.paars);
    }
    static loadFromKoekje(){
        let koekje = getCookie("staat");
        console.log(koekje);
        if(koekje != ""){
            return State.fromJson(koekje);
        }
        return new State(0,0,0,0);
    }
}

let state = State.loadFromKoekje();


function update_view(){
    setColor(state.geelPercentage(), state.geel, "geel");
    setColor(state.blauwPercentage(), state.blauw, "blauw");
    setColor(state.roodPercentage(), state.rood, "rood");
    setColor(state.paarsPercentage(), state.paars, "paars");
    setTotal(state.total());
    setCookie("staat", state.toJson(), 12);
}

update_view();

function tryReset(){
    if (confirm('Weet je zeker dat je de tellers weer allemaal op 1 wilt zetten?')) {
        state.reset();
    }
}

let keyDisabled = false

window.onkeyup = function(gfg){
    keyDisabled = false
}

window.onkeydown = function(gfg){
    //use the QWER keys to increase the counters
    if(keyDisabled) {return;}
    // Q = 81
    if(gfg.keyCode === 81){
        keyDisabled = true;
        state.increaseGeel();
    }
    // W = 87
    if(gfg.keyCode === 87){
        keyDisabled = true;
        state.increaseBlauw();
    }
    // E = 69
    if(gfg.keyCode === 69){
        keyDisabled = true;
        state.increaseRood();
    }
    // R = 82
    if(gfg.keyCode === 82){
        keyDisabled = true;
        state.increasePaars();
    }
    // Spatie = 32
    if(gfg.keyCode === 32){
        keyDisabled = true;
        state.increaseRandom();
    }
    // comma = 188
    if(gfg.keyCode === 188){
        keyDisabled = true;
        tryReset();
    }
    // P = 80

    update_view();
};
