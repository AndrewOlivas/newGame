game.PlayerEntity = me.Entity.extend({

	init: function(x, y, settings){
		this.setSuper(x, y);
		this.setPlayerTimers();
		this.setAttributes();
		this.type = "PlayerEntity";
		this.setFlags();
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		this.addAnimation();
		this.renderable.setCurrentAnimation("idle");
	},

	setSuper: function(x, y){
		// sets variables for player
		this._super(me.Entity, 'init', [x, y, {
			image: "player",
			width: 64, 
			height: 64, 
			spritewidth: "64",
			spriteheight: "64",
			getShape: function(){

				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
	},

	setPlayerTimers: function(){
		// sets time for hits and date/time Object
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastSpear = this.now;
		this.lastAttack = new Date().getTime(); 
	},

	setAttributes: function(){
		// sets Attributes for vel,health and this.attack
		this.health = game.data.playerHealth;
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		this.attack = game.data.playerAttack;
	},

	setFlags: function(){
		this.facing = "right";
		this.dead = false;
		this.attacking= false;
	},

	addAnimation: function(){
		// function for animation frames
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
	},

	update: function(delta){
		this.now = new Date().getTime();
		this.dead = this.checkIfDead();
		this.checkKeyPressesAndMove();
		this.checkAbilityKeys();
		this.setAnimation();
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	checkIfDead: function(){
		// function to check if youre dead
		if(this.health <=0){
			return true;
		}
		return false;
	},

	checkKeyPressesAndMove: function(){
			// checks what key is pressed and what it does
		if(me.input.isKeyPressed("right")){
			this.moveRight();
		}

		else if(me.input.isKeyPressed("left")){
			this.moveLeft();
		}

		else{
			this.body.vel.x = 0;
		}

		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
			this.jump();
		}

		this.attacking = me.input.isKeyPressed("attack");
	},

	moveRight: function(){
		// function for what happens when you move right
		this.body.vel.x += this.body.accel.x * me.timer.tick;
		this.facing = "right";
		this.flipX(true);
	},

	moveLeft: function(){
		// function for when you move left
		this.body.vel.x -= this.body.accel.x * me.timer.tick;
		this.facing = "left";
		this.flipX(false);
	},

	jump: function(){
		this.body.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
	},

	checkAbilityKeys: function(){
		// function to check key abilitys
		if(me.input.isKeyPressed("skill1")){
		}
		else if(me.input.isKeyPressed("skill2")){
		}
		else if(me.input.isKeyPressed("skill3")){
			this.throwSpear();
		}
	},

	throwSpear: function(){
		// function for the separ throw ability
		if((this.now-this.lastSpear) >= game.data.spearTimer*1000 && game.data.ability3 > 0){
		this.lastSpear = this.now;
		var spear = me.pool.pull("spear", this.pos.x, this.pos.y, 50, 50, {}, this.facing);
		me.game.world.addChild(spear, 10);
		}
	},

	setAnimation: function(){
		// function to set animations for attack and idle
		if(this.attacking){
			if(!this.renderable.isCurrentAnimation("attack")){
				this.renderable.setCurrentAnimation("attack", "idle");
				this.renderable.setAnimationFrame();
			}
		}

		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){

			if(!this.renderable.isCurrentAnimation("walk")){
			this.renderable.setCurrentAnimation("walk");
			}
		}

		else if(!this.renderable.isCurrentAnimation("attack")){
			this.renderable.setCurrentAnimation("idle");
		}
	},

	loseHealth: function(damage){
			// function for when you lose health
		this.health = this.health - damage;
	},

	collideHandler: function(response){

		if(response.b.type==='EnemyBaseEntity'){
			this.collideWithEnemyBase(response);
		}

		else if(response.b.type==='EnemyCreep'){
			this.collideWithEnemyCreep(response);
		}
	},

	collideWithEnemyBase: function(response){
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

			if(ydif<-50 && xdif<70 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1;
			}

			else if(xdif>-35 && this.facing==='right' && (xdif<0)) {
				this.body.vel.x = 0;
			}

			else if(xdif<70 && this.facing==='left' && (xdif>0)){
				this.body.vel.x = 0;
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}
	},

	collideWithEnemyCreep: function(response){
			// function for when you collide with creep
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			this.stopMovement(xdif);

			if(this.checkAttack(xdif, ydif)){
				// checks if creep is dead
				this.hitCreep(response);
			};

			
	},

	stopMovement: function(xdif){
		// what and where to be facing when you stop moving
			if(xdif>0){
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			}

			else{
				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
	},

	checkAttack: function(xdif, ydif){
		// checks where youre facing when you attack 
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer

			 && (Math.abs(ydif) <=40) && 

			 (((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
			 ){

				this.lastHit = this.now;

				return true;
			}

			return false;
	},

	hitCreep: function(response){
			// to hit creep and do damage and get that goooolllllldddd
				if(response.b.health <= game.data.playerAttack){
					game.data.gold += 1;
					console.log("Current gold: " + game.data.gold);
				}

				response.b.loseHealth(game.data.playerAttack);
	}
});

// THIS DOSENT WORK RIGHT!!!!!!!!!!!!!!!!!!
game.Gloop = me.Entity.extend({

	init: function(x, y, settings){

		this._super(me.Entity, 'init', [x, y, {
			image: "gloop",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function(){
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}
		}]);

		this.health = game.data.gloopHealth;
		this.alwaysUpdate = true;
		this.attacking = false;
		this.lastAttacking = new Date().getTime();
		this.lastHit = new Date().getTime();
		this.now = new Date().getTime();
		this.body.setVelocity(3, 20);
		this.type = "Gloop";
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	loseHealth: function(damage){
		this.health = this.health - damage;
	},

	update: function(delta){

		if(this.health <= 0){
			me.game.world.removeChild(this);
		}

		this.now = new Date().getTime();

		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		me.collision.check(this, true, this.collideHandler.bind(this), true);

		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);

		return true;
	},

	collideHandler: function(response){

		if(response.b.type==='EnemyBase'){
			this.attacking=true;
			this.body.vel.x = 0;
			this.pos.x = this.pos.x +1;
			if((this.now-this.lastHit >= 1000)){
				this.lastHit = this.now;
				response.b.loseHealth(game.data.gloopAttack);
			}
		}

		else if(response.b.type==='PlayerEntity'){
				var xdif = this.pos.x - response.b.pos.x;
				this.attacking=true;
				
				if(xdif>0){

					this.pos.x = this.pos.x +1;

					this.body.vel.x = 0;
				}

				if((this.now-this.lastHit >= 1000) && xdif>0){

					this.lastHit = this.now;

					response.b.loseHealth(game.data.gloopAttack);
				}
			}
		}
});




game.GameTimeManager = Object.extend({

	init: function(x, y, settings){

		this.now = new Date().getTime();
		this.lastCreep = new Date().getTime();
		this.paused = false;
		this.alwaysUpdate = true;
	},

	update: function(){
			// what happens when the player dies and what/where he resets
		this.now = new Date().getTime();
		if(game.data.player.dead){
			me.game.world.removeChild(game.data.player);
			me.state.current().resetPlayer(10, 0);
		}

		if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += 1;
			console.log("Current gold: " + game.data.gold);
		}

		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			this.lastCreep = this.now;
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);
		}

		return true;
	}
});	