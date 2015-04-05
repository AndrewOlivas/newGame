game.ExperienceManager = Object.extend({
	
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		this.gameover = false;
	},

	update: function(){
		if(game.data.win === true && !this.gameover){
			this.gameOver(true);
		}

		else if(game.data.win === false && !this.gameover){
			this.gameOver(false);
		}

		return true;

	},
	gameOver: function(win){
		
		if(win){
			game.data.exp += 10;
		}
		else{
			game.data.exp += 1;
		}
		
		this.gameOver = true;
		me.save.exp =  game.data.exp;
		me.save.exp2 = 4;
	}
	
});







//---------------------------------------------------------------------------------------------------------------------------------------------------------------





/*

game.Pause = Object.extend({
	//new init function
	init: function(x, y, settings){
		//sets game to current time
		this.now = new Date().getTime();
		//game isnt paused
		this.paused = false;
		//awlays updates game
		this.alwaysUpdate = true;
		//updates when paused
		this.updateWhenPaused = true;
	},

	//new update function
	update: function(){
		//updates timers
		this.now = new Date().getTime();
		//if buy button is pressed...
		//and its been one second since last buy...
		if(me.input.isKeyPressed("pause"){
			
			this.pauseScreen();
		}


		return true;
	},

	//new startBuying function
	pauseScreen: function(){
		me.state.pause(me.state.PLAY);
		//sets pausePos to current location
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		//makes screen a new sprite
		//sets x and y position
		//gets image
		game.data.pausescreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('new-screen'));
		//updates when screen is up
		game.data.pausescreen.updateWhenPaused = true;
		//makes buy screen opague
		game.data.pausescreen.setOpacity(0.8);
		//adds screen to the game
		me.game.world.addChild(game.data.pausescreen, 34)
		//makes sure player doesnt move when game is paused
		game.data.player.body.setVelocity(0, 0);
		me.state.pause(me.state.PLAY);
	},

	

	//new stopBuying function
	stopPause: function(){
		//when you stop buying, game will start
		me.state.resume(me.state.PLAY);
		//returns normal speed to player when unpaused
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		//removes buy screen when game is unpaused
		me.game.world.removeChild(game.data.pausescreen);
	},

	

*/