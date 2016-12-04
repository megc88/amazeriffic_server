var main = function(toDoObjects) {
  "use strict";

  var toDos = toDoObjects.map(function (toDo) {
     return toDo.description;
   });
  
  $(".tabs a span").toArray().forEach(function(element) {
    var $element = $(element);
    

    $(element).on("click", function() {
      var $content;
      var $input;
      var $button;
      var i;

    $(".tabs a span").removeClass("active");
    $element.addClass("active");
    $("main .content").empty();


    if ($element.parent().is(":nth-child(1)")) {
      $content = $("<ul>");
      for(i = toDos.length-1; i >= 0; i--) {
        $content.append($("<li>").text(toDos[i]));
       }
 } else if ($element.parent().is(":nth-child(2)")) {
     $content = $("<ul>");
     toDos.forEach(function (todo) {
       $content.append($("<li>").text(todo));
     });
 } else if ($element.parent().is(":nth-child(3)")) {
     var tags = [];

     toDoObjects.forEach(function (toDo) {
       toDo.tags.forEach(function (tag) {
          if (tags.indexOf(tag) === -1) {
	     tags.push(tag);
	  }
       });
     });
     console.log(tags);

     var tagObjects = tags.map(function (tag) {
        var toDosWithTag = [];

	toDoObjects.forEach(function (toDo) {
	  if (toDo.tags.indexOf(tag) !== -1) {
	    toDosWithTag.push(toDo.description);
	  }
	});

     tagObjects.forEach(function (tag) {
       var $tagName = $("<h3>").text(tag.name),
       var $content = $("<ul>");

       tag.toDos.forEach(function (description) {
         var $li = $("<li>").text(description);
	 $content.append($li);
       });

       $("main .content").append($tagName);
       $("main .content").append($content);
       });
 } else if ($element.parent().is(":nth-child(4)")) {
     $input = $("<input>"),
     $button = $("<button>").text("+");

     $ibutton.on("click", function () {
       if ($input.val() !== "") {
          toDos.push($input.val());
          $input.val("");
        }
   });
   $content = $("<div>").append($input, $button);

   }

   $("main .content").append($content);
     
     return false;

   });

 });
   
   $(".tabs a:first-child span").trigger("click");

};

$(document).ready(function () {
   $.getJSON("todo.json", function (toDoObjects) {
      main(toDoObjects);
   });
});

