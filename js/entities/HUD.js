

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

	init: function() {
		this._super(me.Container, 'init');
		this.isPersistent = true;
		this.collidable = false;
		this.z = Infinity;
		this.name = "HUD";
	
		this.addChild(new game.HUD.ScoreItem(5, 5));
	}
});


/** 
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		this._super(me.Renderable, 'init', [x, y, 10, 10]); 
		this.score = -1;
		this.floating = true;
	},

	/**
	 * update function
	 */
	update : function () {
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		}
		return false;
	},

	/**
	 * draw the score
	 */
	draw : function (context) {

	}

});
