/**
 * Created with JetBrains WebStorm.
 * User: Kirill
 * Date: 04.11.12
 * Time: 18:42
 * To change this template use File | Settings | File Templates.
 */
describe("Hero tests", function(){

    var hero;
    beforeEach(function() {
        // arrange
        hero = new Hero(100,100);
    });

    describe("Intersect function", function(){
        var apple;

        beforeEach(function(){
            // arrange
            apple = new Apple(0, 0);
            hero = new Hero(0, 0);
            apple.Height = 10;
            hero.Height = 10;
            apple.Width = 10;
            hero.Width = 10;
        });

        it("Should return #WEST# when west intersect occurred", function(){
            hero.x = 50;
            apple.x = 60;

            expect(positionOf(hero, apple)).toEqual("#WEST#");
        });

        it("Should return #EAST# when west intersect occurred", function(){
            hero.x = 70;
            apple.x = 60;

            expect(positionOf(hero, apple)).toEqual("#EAST#");
        });

        it("Should return #NORTH# when west intersect occurred", function(){
            hero.y = 40;
            apple.y = 50;

            expect(positionOf(hero, apple)).toEqual("#NORTH#");
        });

        it("Should return #SOUTH# when west intersect occurred", function(){
            hero.y = 60;
            apple.y = 50;

            expect(positionOf(hero, apple)).toEqual("#SOUTH#");
        });
    });

    describe("Hero jumping", function(){

        beforeEach(function() {
            // arrange
            height = 100;
            gravity = 9.8;
        });

        it("Should start jumping when is called", function(){
            // act
            hero.Jump();

            // assert
            expect(hero.SpeedY).toEqual(maxSpeedY);
            expect(hero.IsJumping).toBeTruthy();
        });

        it("Should decrease speed on lambda when is jumping", function(){
            // arrange
            hero.SpeedY = 0;

            // act
            hero.Jump();
            var previousSpeedY = hero.SpeedY;
            hero.ApplyGravity();

            // assert
            expect(hero.SpeedY).toEqual(previousSpeedY - fallingLambda);
        });

        it("Should stop jumping when speed is zero", function(){
            // act
            hero.SpeedY = 0;
            hero.ApplyGravity();

            expect(hero.IsJumping).toBeFalsy();
        });

    });

    describe("Hero movements", function(){
       beforeEach(function(){
          // arrange
          hero.x = 100;
          width = 500;
          hero.IsRunning = true;
       });

       it("Should move right when function called with right direction", function(){
           // arrange
           var previousX = hero.x;

           // act
           hero.Move("right");

           // assert
           expect(hero.x).toEqual(previousX + maxSpeedX);
       });

       it("Should move left when function called with left direction", function(){
           // arrange
           var previousX = hero.x;

           // act
           hero.Move("left");

           // assert
           expect(hero.x).toEqual(previousX - maxSpeedX);
       });
    });

    describe("Screen borders", function(){
       beforeEach(function(){
           // arrange
           width = 100;
           hero.IsRunning = true;
       });

       it("Should not move if stay near right screen border and called moving in right direction", function(){
           // arrange
           hero.x = 100;
           var previousX = hero.x;

           // act
           hero.Move("right");

           // assert
           expect(hero.x).toEqual(previousX);
       });

       it("Should not move if stay near left screen border and called moving in left direction", function(){
           // arrange
           hero.x = 0;
           var previousX = hero.x;

           // act
           hero.Move("left");

           // assert
           expect(hero.x).toEqual(previousX);
       });
    });

});