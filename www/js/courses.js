/*
file decsritptor

 */
 
 //Fills dropdown element with all prefixes found in JSON file
 function getPrefixes()
 {
	 var showData = $('#show-prefixes');
	 $.getJSON('js/courseList.json', function (data) {
		  var courses = data.items.map(function (course) {
			// used to return what is now shown in content during the for loop
			return course;
		  });
		  showData.empty();
			// only do anything if there's items in the course data we've pulled
			var content = '<paper-dropdown-menu id="prefixSelect" label="Prefix" float="right" no-animation>';
			content += '<paper-listbox class="dropdown-content">';
		  if (courses.length) 
		  {
			var prefixList = [];
			prefixList.push("All");
			for (var i = 0; i < courses.length; i++)
			{	
				var prefix = courses[i].prefix;
				var isUnique = true;
				for(var j = 0; j < prefixList.length; j++)
				{
					if(prefix == prefixList[j])
					{
						isUnique = false;
					}
				}
				if(isUnique == true)
				{
					prefixList.push(prefix);
				}
				
			}
			for(var i = 0; i< prefixList.length; i++)
			{
				content += '<div><paper-item>' + prefixList[i] + '</paper-item></div>';
			}
			content += '</paper-listbox>';
			content += '</paper-dropdown-menu>';
			showData.append(content);
			// adds the content we've created to the html page
		  }
		});
 }
 
  function getCampuses()
 {
	 var showData = $('#show-campuses');
	 $.getJSON('js/courseList.json', function (data) {
		  var courses = data.items.map(function (course) {
			// used to return what is now shown in content during the for loop
			return course;
		  });
		  showData.empty();
			// only do anything if there's items in the course data we've pulled
			var content = '<paper-dropdown-menu id="campusSelect" label="Location" no-animation>';
			content += '<paper-listbox class="dropdown-content">';
		  if (courses.length) 
		  {
			var campusList = [];
			campusList.push("All");
			for (var i = 0; i < courses.length; i++)
			{	
				var campus = courses[i].location;
				var isUnique = true;
				for(var j = 0; j < campusList.length; j++)
				{
					if(campus == campusList[j])
					{
						isUnique = false;
					}
				}
				if(isUnique == true)
				{
					campusList.push(campus);
				}
				
			}
			for(var i = 0; i< campusList.length; i++)
			{
				content += '<div><paper-item>' + campusList[i] + '</paper-item></div>';
			}
			content += '</paper-listbox>';
			content += '</paper-dropdown-menu>';
			showData.append(content);
			// adds the content we've created to the html page
		  }
		});
 }
 
 
 
 /*
Example finished course html:

<paper-card class="course">
	<div class="class-head">Accounting 201</div>
		<div class="class-location"> Location: North Campus\n Description: example</div>
		<div class="class-times">
			<paper-menu>
				<paper-item>Monday 2:00-10:00 PM</paper-item>
				<paper-item>Tuesday 4:00-10:00 PM</paper-item>
				<paper-item>Wednesday 2:00-10:00 PM</paper-item>
				<paper-item>Thursday 2:00-10:00 PM</paper-item>
			</paper-menu>
</paper-card>								

 get Classes()
 
 reads JSON file to obtain offered courses
 removes classes not meeting selection criteria from dropdown menus
 creates HTML to display classes e.x. shown above
 */
 function getClasses()
 {
	 var showData = $('#show-classes');
		var campusSelected = $( "#campusSelect" ).val();
		var prefixSelected = $( "#prefixSelect" ).val();
		//.getJSON loads JSON file
		//To load external JSON file replace 'js/courseList.json' with corresponding link e.x. 'https://example.com/courseList.JSON
		$.getJSON('js/courseList.json', function (data) {

		  var courses = data.items.map(function (course) {
			// used to return what is now shown in content during the for loop
			return course;
		  });

		  showData.empty();
					

			// only do anything if there's items in the course data we've pulled
		  if (courses.length) 
		  {
			var content = '<div class="scrollable" style="-webkit-overflow-scrolling: touch;"> '; 
			for (var i = 0; i < courses.length; i++)
			{
				if(courses[i].location == campusSelected || campusSelected == "All")
				{
					if(courses[i].prefix == prefixSelected || prefixSelected == "All")
					{
						content += '<paper-card class="course">';
						content += '<div class="class-head">' + courses[i].name + '</div>';
						content += '<div class="class-information"><b>Location: </b>' + courses[i].location + '\n' + '<b>Description: </b>' + courses[i].desc + '</div>';	
						content += '</paper-card>'	
					}
				}				
			}
			content +='</div>'
			showData.append(content);
			// adds the content we've created to the html page
		  }
		});
 }
 
 
$(document).ready(getCampuses);//Excutes getCampuses() on page load
$(document).ready(getPrefixes);//Executes getPrefies() on page load
$("#refresh").on("click", getClasses);//Executes getClasses() when refresh button is hit
$(document).ready(getClasses);//Executes getClasses() on page load


	
	