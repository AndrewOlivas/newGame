game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function(){
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();
	
		return true;
	},

	goldTimerCheck: function(){
		// checks what time to give you gold
			if (Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >=1000)){
			game.data.gold += (game.data.exp1+1);
			console.log("current gold: " + game.data.gold);
			}
		},

	creepTimerCheck: function(){
		// function for when creeps spawn
			if (Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >=1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
		
		}
	}
});

game.HeroDeathManager = Object.extend({
	// function for when your hero dies
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		
	},

	update: function(){
		// win function
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			
			me.state.current().resetPlayer(10, 0);
			}

		return true;
	}
});


game.ExperienceManager = Object.extend({
	init: function(x, y, settings){
		this.alwaysUpdate = true;
		
		this.gameover = false;
		

	},

	update: function(){
		if(game.data.win === true && !this.gameover) {
			this.gameOver(true);
		}else if(game.data.win === false && !this.gameover){
	
			this.gameOver(false);

		}

		return true;
	},

	gameOver: function(win){
		if (win){
			game.data.exp += 10;
			
		}else{
			game.data.exp += 1;
			
		}
			game.data.gameover = true;
			
			me.save.exp = game.data.exp;
			
			me.save.exp2 = 4;
		}
});

game.SpendGold = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastBuy = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
	},

	update: function(){
		this.now = new Date().getTime();
		// binds buy keys and checks if you buy or not
		if (me.input.isKeyPressed("buy") && this.now-this.lastBuy >= 1000){
			this.lastBuy = this.now;
			if (!this.buying) {
				this.startBuying();
			} else {
				this.stopBuying();
			}

		}

		// this.checkBuyKeys();

		return true;
	},

	startBuying: function(){
		this.buying = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.setOpacity(0, 8);
		me.game.world.addChild(game.data.buyscreen, 34);
		game.data.player.body.setVelocity(0, 0);
		// sets keys for buying
		me.state.pause(me.input.KEY.F1, "F1",true);
		me.state.pause(me.input.KEY.F2, "F2",true);
		me.state.pause(me.input.KEY.F3, "F3",true);
		me.state.pause(me.input.KEY.F4, "F4",true);
		me.state.pause(me.input.KEY.F5, "F5",true);
		me.state.pause(me.input.KEY.F6, "F6",true);
		this.setBuyText();
	},

	setBuyText: function() {
		
		game.data.buytext = new (me.Renderable.extend({
			// sets fonts for the buytext and color
			init: function(){
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;		
			},

			draw: function(renderer){
				// all skills for buytext
				this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 1: Incease Damage, Current Level: " + game.data.exp1 +, this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 2: Run Faster, Current Level:", this.pos.x, this.pos.y + 80);
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health, Current level:", this.pos.x, this.pos.y + 120);
				this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level", this.pos.x, this.pos.y + 160);
				this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health: ", this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear: ", this.pos.x, this.pos.y + 240);
				

			}

	}));
	me.game.world.addChild(game.data.buytext, 35);
},

	stopBuying: function(){
		// binds and unbinds keys
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		me.game.world.removeChild(game.data.buyscreen);
		me.state.pause(me.input.KEY.F1, "F1",true);
		me.state.pause(me.input.KEY.F2, "F2",true);
		me.state.pause(me.input.KEY.F3, "F3",true);
		me.state.pause(me.input.KEY.F4, "F4",true);
		me.state.pause(me.input.KEY.F5, "F5",true);
		me.state.pause(me.input.KEY.F6, "F6",true);
		me.game.world.removeChild(game.data.buytext);
	},
	


});