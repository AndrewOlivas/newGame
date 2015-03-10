var game = {

	data : {
		// score
		score : 0,
		enemyBaseHealth: 1,
		PlayerBaseHealth: 1,
		enemyCreepHealth: 10,
		playerHealth: 10,
		enemyCreepAttack: 1,
		playerAttack: 1,
		//orcBaseDamage: 10,
		//orcBaseHealth: 100,
		//orcBaseSpeed: 3,
		//orcBaseDefend: 0,
		playerAttackTimer: 1000,
		creepAttackTimer: 1000,
		playerMoveSpeed: 5,
		creepMoveSpeed: 5,
		gameManager: "",
		heroDeathManager: "",
		player: "",
		exp: 0,
		gold: 0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: ""

	},
	
	"onload" : function () {

	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {

		alert("Your browser does not support HTML5 canvas.");
		return;
	}


	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	me.save.add({exp: 0, exp2: 0, exp3: 0, exp4: 0});
	


	me.audio.init("mp3,ogg");


	me.loader.onload = this.loaded.bind(this);

	me.loader.preload(game.resources);

	me.state.change(me.state.LOADING);
},

	"loaded" : function () {
			me.pool.register("player", game.PlayerEntity, true);
			me.pool.register("PlayerBase", game.PlayerBaseEntity);
			me.pool.register("EnemyBase", game.EnemyBaseEntity);
			me.pool.register("EnemyCreep", game.EnemyCreep, true);
			me.pool.register("GameTimerManager", game.GameTimerManager);
			me.pool.register("HeroDeathManager", game.HeroDeathManager);
			me.pool.register("ExperienceManager", game.ExperienceManager);


		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Starts the game up
		me.state.change(me.state.MENU);
	}
};

