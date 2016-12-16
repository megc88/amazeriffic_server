var main = function(toDoObjects) {
  "use strict";
   var toDos,
       tabs,
       $content,
       $input,
       $button,
       i;

   toDos = toDoObjects.map(function (toDo) {
     return toDo.description;
   });
  
  tabs = [];


       tabs.push({
          "name": "Newest",
	  "content": function() {
	     $content = $("<ul>");
             for(i = toDos.length-1; i >= 0; i--) {
                $content.append($("<li>").text(toDos[i]));
             }
	     return $content;
           }   
       });

       tabs.push({
          "name": "Oldest",
	  "content": function() {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                   $content.append($("<li>").text(todo));
                });
             return $content;
	  }
       });

       tabs.push({
          "name": "Tags",
	  "content": function() {
           //     var tags = [];

                toDoObjects.forEach(function (toDo) {
                   toDo.tags.forEach(function (tag) {
                      if (tags.indexOf(tag) === -1) {
	                tags.push(tag);
	              }         
                   });
                });

                var tagObjects = tags.map(function (tag) {
                   var toDosWithTag = [];

	           toDoObjects.forEach(function (toDo) {
	              if (toDo.tags.indexOf(tag) !== -1) {
	                toDosWithTag.push(toDo.description);
	              }
	           });
                   return { "name" : tag, "toDos" : toDosWithTag };
                });	

               tagObjects.forEach(function (tag) {
                  var $tagName = $("<h3>").text(tag.name),
                  $content = $("<ul>");

                  tag.toDos.forEach(function (description) {
                     var $li = $("<li>").text(description);
	             $content.append($li);
                  });

                 $("main .content").append($tagName);
                 $("main .content").append($content);
              });
	     // return $content;
	   }
	});

   
      tabs.push({
         "name": "Add",
	 "content": function(){
            var $input = $("<input>").addClass("description"),
            $inputLabel = $("<p>").text("Description: "),
     	    $tagInput = $("<input>").addClass("tags"),
     	    $tagLabel = $("<p>").text("Tags: "),
     	    $button = $("<button>").text("+");

            $button.on("click", function () {
              var description = $input.val(),
                tags = $tagInput.val().split(","),
	        newToDo = {"description":description, "tags":tags};

	        toDoObjects.push({"description":description, "tags":tags});

	        $.post("todos", newToDo, function(response) {
	           console.log(response);
	        });
   
	     toDos = toDoObjects.map(function(toDo) {
	     return toDo.description;
	     });
	
	       $input.val("");
	       $tagInput.val("");
            });	

   	    $content = $("<div>").append($inputLabel)
			         .append($input)
			         .append($tagLabel)
    			         .append($tagInput)
	   		         .append($button);
	    return $content;
	 }
      });
   
     tabs.forEach(function(tab) {
        var $aElement = $("<a>").attr("href",""),
            $spanElement = $("<span>").text(tab.name);
        $aElement.append($spanElement);

        $spanElement.on("click", function() {

           $(".tabs a span").removeClass("active");
           $spanElement.addClass("active");
           $("main .content").empty();



           $content = tab.content(); 
           

           $("main .content").append($content);
     
            return false;

      });

     $("main .tabs").append($aElement);
   });
};

$(document).ready(function () {
   $.getJSON("todos.json", function (toDoObjects) {
      main(toDoObjects);
   });
});

