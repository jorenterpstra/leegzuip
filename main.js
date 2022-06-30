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
    constructor(geel, blauw, rood){
        this.geel = geel;
        this.blauw = blauw;
        this.rood = rood;
        this.goal = 200;
    }
    increaseGeel(){this.geel = this.geel + 1}
    increaseBlauw(){this.blauw = this.blauw + 1}
    increaseRood(){this.rood = this.rood + 1}
    total(){return this.geel + this.blauw + this.rood;}
    reset(){this.geel = 1; this.blauw = 1; this.rood = 1;}
    
    maximum(){return Math.max(this.geel, this.blauw, this.rood)}
    
    geelPercentage(){ return (this.geel/this.maximum()) * this.percentageReached(); }
    blauwPercentage(){ return (this.blauw/this.maximum()) * this.percentageReached(); }
    roodPercentage(){ return (this.rood/this.maximum()) * this.percentageReached(); }
    
    percentageReached(){
        return Math.min(0.985, this.total()/this.goal);
    }

    toJson = function() {
        let x = {geel: this.geel, blauw: this.blauw, rood: this.rood};
        x = JSON.stringify(x);
        return x;
    };
    static fromJson(json){
        let data = JSON.parse(json); // Parsing the json string.
        return new State(data.geel, data.blauw, data.rood);
    }
    static loadFromKoekje(){
        let koekje = getCookie("staat");
        console.log(koekje);
        if(koekje != ""){
            return State.fromJson(koekje);
        }
        return new State(1,1,1);
    }
}

let state = State.loadFromKoekje();


function update_view(){
    setColor(state.geelPercentage(), state.geel, "geel");
    setColor(state.blauwPercentage(), state.blauw, "blauw");
    setColor(state.roodPercentage(), state.rood, "rood");
    setTotal(state.total());
    setCookie("staat", state.toJson(), 12);
}

update_view();


window.onkeydown= function(gfg){
    console.log(gfg.keyCode);
    if(gfg.keyCode === 49){
        state.increaseGeel();
    };
    if(gfg.keyCode === 50)
   {
       state.increaseBlauw();
       
   };
    if(gfg.keyCode === 51){
        state.increaseRood();
    };

    update_view();
};