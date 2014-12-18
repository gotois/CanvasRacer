(function (Crafty) {
	var carType = [
		{
			type: 'car1',
			collision: function () {
				return [[15, 30], [115, 30], [120, 285], [10, 285]]
			}
		},
		{
			type: 'car2',
			collision: function () {
				return [[15, 30], [115, 30], [120, 260], [60, 280], [10, 260]]
			}
		},
		{
			type: 'car3',
			collision: function () {
				return [[10, 10], [115, 10], [120, 275], [10, 275]]
			}
		},
		{
			type: 'car4',
			collision: function () {
				return [[15, 30], [115, 30], [120, 280], [10, 280]]
			}
		}
	];

	setInterval(function () {
		Crafty.e('EnemyCar')
			/* Debug */
			.addComponent('WiredHitBox')
			.debugStroke('white')
	}, 2500);

	Crafty.c('EnemyCar', {
		speedUp: function () {
			this.y += this._speed + Crafty('Track').GetSpeed();
		},
		speedDown: function () {
			this.y -= this._speed + Crafty('Track').GetSpeed();
		},
		init: function () {
			if (Crafty._current !== 'level') return;

			var getRandomPos = Crafty.math.randomInt(0, 1);
			var getRandomCar = Crafty.math.randomElementOfArray(carType);

			this
				.requires('Car, 2D, Canvas, Sprite, Collision')
				.requires(getRandomCar.type)
				.collision(new Crafty.polygon(getRandomCar.collision()))
				.one('SetAttrs', function () {
					if (getRandomPos == 1) {
						this.x = Crafty.math.randomInt(0, 40);
					} else {
						this.x = Crafty.math.randomInt(190, 230);
					}
					this.y = Crafty.math.randomNumber(-300, -320);
					this._speed = Crafty.math.randomNumber(1, 1.2);
				})
				.bind('RenderScene', function () {
					if (this.y > Crafty.viewport.height) {
						this.destroy();
					}
				})
				.one('Crash', function () {
					//после аварии - авто идут вниз
					this.unbind('SpeedUp');
					this.unbind('SpeedDown');

					console.log('CRASH!');
				})
				.onHit('PlayerCar', this.crash)
				//.onHit('EnemyCar', this.crash)
				.bind('SpeedUp', this.speedUp)
				.bind('SpeedDown', this.speedDown)
				.bind('EnterFrame', function () {
					this.trigger('SpeedUp');
				})
				.trigger('SetAttrs');
		}
	});

}(Crafty));