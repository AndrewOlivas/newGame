game.TitleScreen = me.ScreenObject.extend({

	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
		
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Arial", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true)
				
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "READY TO PLAY ;)", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
				
			},

			newGame: function(){
				me.input.releasePointerEvent('pointerdown', this);
				me.save.remove('exp');
				me.save.remove('exp1');
				me.save.remove('exp2');
				me.save.remove('exp3');
				me.save.remove('exp4');
				me.state.change(me.state.PLAY);

			}
	})));

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [380, 340, 250, 50]);
				this.font = new me.Font("Arial", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true)
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Click To Play!", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
				
			},

			newGame: function(){
				game.data.exp = me.save.exp;
				game.data.exp1 = me.save.exp1;
				game.data.exp = me.save.exp2;
				game.data.exp1 = me.save.exp3;
				game.data.exp1 = me.save.exp4;
				me.input.releasePointerEvent('pointerdown', this);
				me.state.change(me.state.PLAY);

			}
	})));

	},
	
	
	onDestroyEvent: function() {
		
	}
});
