$(document).ready(function(){
				var machine1 = $("#machine1").slotMachine({
					active	: 0,
					delay	: 500
				});

				var machine2 = $("#machine2").slotMachine({
					active	: 1,
					delay	: 500
				});

				var machine3 = $("#machine3").slotMachine({
					active	: 2,
					delay	: 500
				});

				function onComplete(active){
					switch(this.element[0].id){
						case 'machine1':
							$("#machine1Result").text("Index: "+this.active);
							break;
						case 'machine2':
							$("#machine2Result").text("Index: "+this.active);
							break;
						case 'machine3':
							$("#machine3Result").text("Index: "+this.active);
							break;
					}
				}

				$("#ranomizeButton").click(function(){

					machine1.shuffle(5, onComplete);

					setTimeout(function(){
						machine2.shuffle(5, onComplete);
					}, 500);

					setTimeout(function(){
						machine3.shuffle(5, onComplete);
					}, 1000);

				})
			});

// 1 crimineel:http://img.clipartlook.com/bank-robber-clipart-png-robber-clipart-531_415.png
// 2 https://preview.ibb.co/mPYLHo/treasure_161753_960_720.png
// 3 https://image.ibb.co/e3s0iT/if_Gold_Cart_379511.png
// 4 http://www.clker.com/cliparts/t/m/S/Q/Z/t/treasure-chest-hi.png
// 5
// 6
