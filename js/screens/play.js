game.PlayScreen = me.ScreenObject.extend({

	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01");

		this.resetPlayer(0, 420);

		
		// adds these vars so they can be pulled from other files 
		var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
		me.game.world.addChild(gameTimerManager, 0);


		var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		me.game.world.addChild(heroDeathManager, 0);

		var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		me.game.world.addChild(experienceManager, 0);

		var spendGold = me.pool.pull("SpendGold", 0, 0, {});
		me.game.world.addChild(spendGold, 0);
		// binds keys to game 
		me.input.bindKey(me.input.KEY.B, "buy");

		me.input.bindKey(me.input.KEY.Q, "skill1");

		me.input.bindKey(me.input.KEY.W, "skill2");

		me.input.bindKey(me.input.KEY.E, "skill3");

		me.input.bindKey(me.input.KEY.RIGHT, "right");

		me.input.bindKey(me.input.KEY.LEFT, "left");

		me.input.bindKey(me.input.KEY.SPACE, "jump");

		me.input.bindKey(me.input.KEY.A, "attack");

		this.HUD = new game.HUD.Container();
		
		me.game.world.addChild(this.HUD);
	},

	onDestroyEvent: function() {
		
		me.game.world.removeChild(this.HUD);
	},

	resetPlayer: function(x, y){
		// when the player dies
		game.data.player = me.pool.pull("player", x, y, {});

		me.game.world.addChild(game.data.player, 5);

	}
});
