class Food{
    constructor(){
        
    }

    display(){
        var x=80;
        var y=100;
     
        var feed = createButton("Feed the Dog");
        feed.position(550,95);
 
        if(feed.mousePressed(function(){
            foodS = foodS-1;
            gameState = 1;
            database.ref('/').update({'gameState': gameState});
        }));
 
       var addFood = createButton("Add Food");
        addFood.position(670,95);
 
        if(addFood.mousePressed(function(){
         foodS = foodS+1;
         gameState = 2;
         database.ref('/').update({'gameState': gameState});
     }));
        
}

}