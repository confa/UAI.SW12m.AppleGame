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

    describe("Hero jumping", function(){
        it("Should start jumping when is called", function(){
            // act
            hero.Jump();

            // assert
            expect(hero.SpeedY).toEqual(maxSpeedY);
            expect(hero.IsJumping).toBeTruthy();
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