/**
 * Created by rolob on 5/21/2017.
 */
module.exports = function(app) {

    var todos = [
        {title: "Grocery shopping"},
        {title: "Plan next week"},
        {title: "Budget"}
    ];

    app.get("/api/todo", function(req, res){
        res.json(todos);
    });
    app.delete("/api/todo/:index", function(req,res){
        var index = req.params["index"];
        todos.splice(index,1);
        res.json(todos);
    });
}