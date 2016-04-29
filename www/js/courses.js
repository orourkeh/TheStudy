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
			var content = '<select id="prefixSelect" name="prefixSelect" float="right">';
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
				content += '<option>' + prefixList[i] + '</option>';
			}
			content += '</select>';
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
			var content = '<select id="campusSelect" name="campusSelect">';
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
				content += '<option>' + campusList[i] + '</option>';
			}
			content += '</select>';
			showData.append(content);
			// adds the content we've created to the html page
		  }
		});
 }
 
 
 
 /*
Example finished course html:

 get Classes()
 
 reads JSON file to obtain offered courses
 removes classes not meeting selection criteria from dropdown menus
 creates HTML to display classes e.x. shown above
 */

 function getClasses()
 {
	var pastelColors = Array("#1FCB4A","#48FB0D","#2DC800","#59DF00","#5757FF","#62A9FF","#62D0FF","#06DCFB","#01FCEF","#03EBA6","#01F33E","#800080","#872187","#9A03FE","#892EE4","#3923D6","#2966B8","#23819C");
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
						content += '<div class="class-head" style="	background:' + pastelColors[Math.floor(Math.random()*pastelColors.length)] + ';">' + courses[i].name + '</div>';
						content += '<div class="class-information"><b>Location: </b>' + courses[i].location + '\n' + '</br><b>Description: </b>' + courses[i].desc + '</div>';	
						content += '<div class="class-information">';
						content += '<paper-tabs width="100%" scrollable>';
						for(var j = 0; j < courses[i].times.length; j++)
						{
							content += '<paper-tab>' + courses[i].times[j] + '</paper-tab>';
						}
						content += '</paper-tabs>';
						content += '</div>';
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
	
	