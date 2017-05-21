/**
 * Created by rolob on 5/21/2017.
 */
module.exports = function(app) {

    var todos = [
        {title: "Grocery shopping"},
        {title: "Plan next week"},
        {title: "Budget"}
    ];

    app.get("/api/getTodos", function(req, res){
        res.json(todos);
    });
}