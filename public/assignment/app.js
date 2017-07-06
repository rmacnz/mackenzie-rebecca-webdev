(function(){
    angular
        .module("WebAppMaker",["ngRoute"])
        .directive("wbdvSortable", wbdvSortable);

    function wbdvSortable() {
        return {
            link: linkFunction
        }

        function linkFunction(scope, element) {
            $(element).
            sortable({
                stop: function(event, ui) {
                    alert("New position: " + ui.item.index());
                    console.log("Start position: " + ui.item.startPos);
                    console.log("New position: " + ui.item.index());

                }});
        }
    }
})();