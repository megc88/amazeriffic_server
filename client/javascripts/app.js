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
	  "content": function(callback) {
           $.getJSON("/todos.json", function(toDoObjects) {
	     $content = $("<ul>");
             toDos = toDoObjects.map(function (toDo) {
               return toDo.description;
             });
             for(i = toDos.length-1; i >= 0; i--) {
                $content.append($("<li>").text(toDos[i]));
             }	     
            callback(null, $content);
            }).fail(function (jqXHR, textStatus, error) {
               callback(error, null);
               });
            }   
       });

       tabs.push({
          "name": "Oldest",
	  "content": function(callback) {
                $.getJSON("/todos.json", function(toDoObjects) {
                $content = $("<ul>");
                toDos = toDoObjects.map(function (toDo) {
                   return toDo.description;
                });
                toDos.forEach(function (todo) {
                   $content.append($("<li>").text(todo));
                });
             callback(null, $content);
          }).fail(function (jqXHR, textStatus, error) {
             callback(error, null);
             });
	  }
       });

       tabs.push({
          "name": "Tags",
	  "content": function(callback) {
             $.getJSON("/todos.json", function(toDoObjects){
               var tags = [];

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

                $content = $("main .content").append($tagName)
                                             .append($content);
              });
	     callback(null, $content);
	  }).fail(function (jqXHR, textStatus, error) {
             callback(error, null);
            }); 
          }
	});

   
      tabs.push({
         "name": "Add",
	 "content": function(callback){
           $.getJSON("/todos.json", function(toDoObjects) {
            var $input = $("<input>").addClass("description"),
            $inputLabel = $("<p>").text("Description: "),
     	    $tagInput = $("<input>").addClass("tags"),
     	    $tagLabel = $("<p>").text("Tags: "),
     	    $button = $("<button>").text("+");

            $button.on("click", function () {
              var description = $input.val(),
                tags = $tagInput.val().split(","),
	        newToDo = {"description":description, "tags":tags};

	        $.post("todos", newToDo, function(result) {
	           $input.val("");
	           $tagInput.val("");

                   $(".tabs a:first span").trigger("click");
                 });
             });	

   	    $content = $("<div>").append($inputLabel)
			         .append($input)
			         .append($tagLabel)
    			         .append($tagInput)
	   		         .append($button);
	    callback(null, $content);
         }).fail(function (jqXHR, textStatus, error) {
           });
	 }
     });   
     tabs.forEach(function(tab) {
        var $aElement = $("<a>").attr("href","#"),
            $spanElement = $("<span>").text(tab.name);
        $aElement.append($spanElement);
        $("main .tabs").append($aElement);


	$spanElement.on("click", function() {
	   var $content;

           $(".tabs a span").removeClass("active");
           $spanElement.addClass("active");
           $("main .content").empty();


           tab.content(function (err, $content) {
              if (err !== null) {
                 alert("There was a problem with your request" + err);
              } else {
                if (tab.name !== "Tags") {
                  $("main .content").append($content);
                } 
             }
           });
        });
    });
    $(".tabs a:first span").trigger("click");

};
$(document).ready(function () {
   $.getJSON("/todos.json", function (toDoObjects) {
      main(toDoObjects);
      });
   });
