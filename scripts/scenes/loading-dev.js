(function () {

	Crafty.defineScene('loading', function () {
		Crafty.background('#000000');

		Crafty.e('2D, DOM, Text')
			.attr({ w: 100, h: 20, x: 150, y: 120 })
			.text('Loading...')
			.css({ 'text-align': 'center'})
			.textColor('#CCCCCC');


		Crafty.e('Loading, 2D, DOM, Text')
			.attr({ w: 100, h: 20, x: 50, y: 300})
			.textColor('#FFFFFF')

		Crafty.load([
				//backgrounds
				'images/backgrounds/game_over.PNG'
				, 'images/backgrounds/menu.jpg'
				//sprites
				, 'images/sprites/cars/cars.png'
				//textures
				, 'images/textures/asphalt_texture.png'
				, 'images/textures/tex_trava.bmp'
			],

			function () {
				/*when loaded*/
				Crafty.sprite(130, 300, "images/sprites/cars/cars.png", {
					mycar: [0, 0],
					car1: [1, 0],
					car2: [2, 0],
					car3: [3, 0],
					car4: [4, 0]
				});

				Crafty.sprite("images/textures/asphalt_texture.png", {
					asphalt: [0, 0, 100, 100]
				});

				Crafty.c('Grass', {
					init: function () {
						var y = -256;

						this.requires("2D, Canvas, Image")
							.attr({
								w: Crafty.viewport.width,
								h: Crafty.viewport.height*2
							})
							.image("images/textures/tex_trava.bmp", "repeat")
							.bind('EnterFrame', function () {
								this.y += 4;

								if (this.y > 0)
									this.y = y;
							})
					}
				});

				Crafty.c('Asphalt', {
					init: function () {

						var y = -340;

						this.requires("2D, Canvas, asphalt")
							.attr({
								w: 100,
								h: 100,
								x: Crafty.viewport.width / 2,
								y: Crafty.viewport.height / 2
							})
							.bind('EnterFrame', function () {
								this.y += 4;

								if (this.y > Crafty.viewport.height)
									this.y = y;
							})
					}
				});

				//TEST for loading scene
				setTimeout(function () {

					Crafty.enterScene('menu');

				}, 100);

			},
			function (e) {
				/*progress*/
				console.log(e)

				Crafty('Loading').text('progress: ' + e.percent)
			},
			function (e) {
				console.log('error loading');
			}
		);
	});


}());
