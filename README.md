Updated for: Assignment 1
Information requested for assignment 1:

Say something about yourself:
My name is Rebecca MacKenzie and I am a first year graduate student here at Northeastern. I got my undergraduate degree at Northeastern (graduated May 2016) and am now working full time at Northeastern as a course coordinator for Fundamentals of Computer Science. During my time as an undergraduate student I had three co-ops, two of which were in web development. However, I worked mainly on the back end so I am hoping to learn a bit about front end development and databases as well as how to pull everything together.

Purpose of the repository:
This repository will contain my work for CS5610 - Web Development with Professor Vidoje Mihajlovikj

Links:
Root to hosted environment on Heroku: https://mackenzie-rebecca-webdev.herokuapp.com/
Project: https://mackenzie-rebecca-webdev.herokuapp.com/project/index.html
Assignment: https://mackenzie-rebecca-webdev.herokuapp.com/assignment/index.html

PROJECT PROBLEMS:
- When I mouse over the profile button in my header it gets a little underscore next to it for some reason. This is the most minor problem.
- Category service is totally broken. Never returns anything even though there are 38 categories in there with valid ids and names
    - Temporary hack: just use an array of all known categories to find their ids/names
- createItem (on item-detail.controller) doesn't seem to work at all so when you return to the offer you don't have any information really
    (ItemModel validation failed: _id: Cast to ObjectID failed for value "1897" at path "_id")
    - Because of this I changed my ItemSchema so that the category reference is just a number rather than an Object ID but this seemed to have no effect. This makes sense since it is complaining about the item ID (which was already set to be a number), not the category ID
    - Much Googling seems to suggest that many people have this issue when trying to FIND an item but nobody seems to have this issue when they CREATE an item...
    - Temporary hack: just look up items in the API all the time instead of storing anything in the database
- Same problem as above when creating an offer. Changed schema to say that item is a number, not an ObjectID but this had no effect
    - Could not think of a temporary hack for this since offers do not exist in the API, only in my database
    - It seems to be inserting something into a collection called offermodels which is weird because I specified the name of my collection in my schema as "offer". The thing it is inserting also seems to just have an ID and that's it...
- Not sure if this is related to the above issue but when I try to create an offer (and it obviously fails) it changes the URL to have "#!/profile" at the end instead of actually redirecting to #!/profile as intended

TO DO:
- When you create an offer it should update your information to contain the offer's ID in either your buys or sells
- When you click the buy/sell button on the offer detail page it actually buys/sells the item
- When you create a sell offer it should check your inventory to make sure you have that thing
- When you create a buy offer it should check (and update) your gold supply, also it should ensure that if you are a non-member you can't buy non-member items
- When you buy/sell something (and complete the offer) your inventory should be updated accordingly
- When you search for items if you are a non-member then only non-member items should display
- Profile should display inventory of items
- Profile should display skills in a more user friendly manner
