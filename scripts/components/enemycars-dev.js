(function (Crafty) {
	Crafty.c('EnemyCar', {
        speed: 0.0,
        movingBottom: false,
        compareScreen: function () {
            if (this.movingBottom) {
                if (this.y > Crafty.viewport.height * 2)
                    this.destroy();
            } else {
                if (this.y < -Crafty.viewport.height)
                    this.destroy();
            }

        },
		init: function () {
            if (Crafty._current !== 'level') return;

            var carType = ['car1', 'car2', 'car3', 'car4'],
                movingTop = Crafty.math.randomInt(0, 1);

            this.requires('2D, Canvas, Sprite, Collision')
                .requires(Crafty.math.randomElementOfArray(carType))
                .attr({
                    w: 64,
                    h: 141,
                    movingBottom: movingTop
				})
                .collision(
                new Crafty.polygon([5, 20], [30, 5], [50, 20], [50, 140], [5, 140])
            )
                .one('SetAttrs', function () {
                    if (this.movingBottom) {
                        this.x = Crafty.math.randomInt(100, 160);
                        this.y = -Crafty.math.randomInt(this.h, Crafty.viewport.height);
                        this.rotation = 180;
                        this.speed = Crafty.math.randomNumber(6, 8);
                    } else {
                        this.x = Crafty.math.randomInt(180, 220);
                        this.y = Crafty.math.randomInt(Crafty.viewport.height, Crafty.viewport.height + this.h);
                        this.rotation = 0;
                        this.speed = Crafty.math.randomNumber(1, 3);
                    }
                })
                .one('Crash', function () {
                    //после аварии - авто идут вниз
                    this.unbind('SpeedUp');
                    this.unbind('SpeedDown');

//                    this.movingBottom = true;
                    console.log('CRASH!');

                    this.trigger('CrashMove', 0.0);
//                    this.alpha = .5;
                })
                .onHit('EnemyCar', function (cars) {
                    cars.map(function (e) {
                        return e.obj;
                    })
                        .concat(this)
                        .forEach(function (car) {
                            car.trigger('Crash');
                        })
                    ;
                })
                .bind('CrashMove', function (amount) {
//FIXME!!! плавное уезжаание за экран в случае аварии
//                    console.log('crash!')

                    if (amount > 1) {
                        this.destroy();
                    }
                    this.rotation = Crafty.math.lerp(this.rotation, Crafty.math.randomNumber(-90, 90), amount);

                    this.y += 1;


                    this.trigger('CrashMove', amount + 0.01)
                })
                .bind('SpeedUp', function () {
                    this.y += this.speed;
				})
				.bind('SpeedDown', function() {
                    this.y -= this.speed;
				})
				.bind('EnterFrame', function () {
                    if (movingTop)
						this.trigger('SpeedUp');
                    else
                        this.trigger('SpeedDown');

                    this.compareScreen();
                })
                .trigger('SetAttrs');
		}
	});
}(Crafty));