var margin = {top: 20, right: 200, bottom: 30, left: 40},
    width = 1100 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var xCat="calories", yCat="protein",cerealData,xVitamin=0;

d3.text("../data/cereal.csv", function(textString)
{
	//Processing data file
	var text= textString.replace(/,/g , "");
	var newText= text.replace(/ /g , ",");
	var attributeNames=["name","mfr","type","calories","protein",
	"fat","sodium","fiber","carbo","sugars","shelf","potass",
	"vitamins","weight","cups"];
	cerealData = d3.csv.parse(attributeNames+"\n"+newText);
	cerealData.forEach(function(d) {
    d.calories = +d.calories;
    d.protein = +d.protein;
	d.sodium = +d.sodium;
	d.fiber = +d.fiber;
	d.potass = +d.potass;
	d.weight= +d.weight;
	d.shelf=+d.shelf;
	d.cups= +d.cups;
  });
  //Defining x-axis
var xValue = function(d) { return d[xCat];}, // data -> value
    xScale = d3.scale.linear().range([0, width]), // value -> display
    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
	
//Defining y-axis
var yValue = function(d) { return d[yCat];}, // data -> value
    yScale = d3.scale.linear().range([height, 0]),// data -> display
    yAxis = d3.svg.axis().scale(yScale).orient("left");  
	
  //Finding max of x&y range
       var xMax = d3.max(cerealData, xValue)*1.05,
		xMin = d3.min(cerealData, xValue),
        yMax = d3.max(cerealData, yValue)*1.05,
		yMin = d3.min(cerealData, yValue);
  // Setting domain range for x and y axis
  xScale.domain([xMin-1, xMax+1]);
  yScale.domain([yMin-1, yMax+1]);
//Defining zoom behaviour
	var zoomBeh = d3.behavior.zoom()
      .x(xScale)
      .y(yScale)
      .scaleExtent([0, 500])
      .on("zoom", zoomed);		
// add the graph canvas to the body of the webpage 
	var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	.call(zoomBeh);
  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
	  .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Calories")
	  .attr("font-family", "sans-serif")
	  .attr("font-size", "20px");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Protein (g)")
	  .attr("font-family", "sans-serif")
	  .attr("font-size", "20px");
// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// filling color as per manufacturer
var cValue = function(d) { 
	if(d.mfr=='A')
	{
		
		d.mfr="American Home Food Products";
		return d.mfr;
	}
	else if(d.mfr=='G')
	{
		d.mfr="General Mills";
		return d.mfr;
	}
	else if(d.mfr=='K')
	{
		d.mfr="Kelloggs";
		return d.mfr;
	}
	else if(d.mfr=='N')
	{
		d.mfr="Nabisco";
		return d.mfr;
	}
	else if(d.mfr=='P')
	{
		d.mfr="Post";
		return d.mfr;
	}
	 else if(d.mfr=='Q')
	{
		d.mfr="Quaker Oats";
		return d.mfr;
	}
    else if (d.mfr=='R')
	{
		d.mfr="Ralston Purina";
		return d.mfr;
	}
	},
 color = d3.scale.category10();
   //Defining radius as per vitamin value
	 xVitamin=function(d) {
		if(d.vitamins==0)
		return 5;
	else if(d.vitamins==25)
		return 8;
	else if(d.vitamins==100)
		return 40;
    };	
var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);
  // draw dots
  objects.selectAll(".dot")
      .data(cerealData)
    .enter().append("circle")
      .classed("dot", true)
	  .attr("r", xVitamin)
	  .attr("transform",transform)
      .style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()//tooltip
               .duration(200)
               .style("opacity", .9);
			   if(d.cups==-1)
			   {
				   if(d.type == "H")
			   {
			 tooltip.html(d.name + "<br/> ("+ xCat + ":"+ xValue(d) 
	        + ", "+yCat+":"+ yValue(d) +", "+"Shelf:"+ d.shelf+", "+"Weight:"+ d.weight+"Oz, "+"Cups:"+"N/A"+ ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px")
			   .style("background", "red");   
			   }
			   else
			   {
            tooltip.html(d.name + "<br/> ("+ xCat + ":"+ xValue(d) 
	        + ", "+yCat+":"+ yValue(d) +", "+"Shelf:"+ d.shelf+","+"Weight:"+ d.weight+"Oz, "+"Cups:"+"N/A"+ ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px")
               .style("background", "blue");
			   }
			   }
			   else{
				   if(d.type == "H")
			   {
			 tooltip.html(d.name + "<br/> ("+ xCat + ":"+ xValue(d) 
	        + ", "+yCat+":"+ yValue(d) +", "+"Shelf:"+ d.shelf+","+"Weight:"+ d.weight+"Oz, "+"Cups:"+ d.cups+ ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px")
			   .style("background", "red");   
			   }
			   else
			   {
            tooltip.html(d.name + "<br/> ("+ xCat + ":"+ xValue(d) 
	        + ", "+yCat+":"+ yValue(d) +", "+"Shelf:"+ d.shelf+", "+"Weight:"+ d.weight+"Oz, "+"Cups:"+ d.cups+ ")")
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px")
               .style("background", "blue");
			   }
			   }
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });

  // draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width +150)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);
	  
	 //interacting with legend 
  legend.on("click", function(type) {
        d3.selectAll(".legend")
        .style("opacity", 0.5);
        d3.select(this)
        .style("opacity", 1);
        d3.selectAll(".dot")
        .style("opacity", 0.0)
        .filter(function(d) {           
          return d.mfr == type;
        })
            .style("opacity", 1)
            .style("stroke", "black")
        .style("fill", function(d) {
          if (d.mfr == type) {
            return d
          } else {
            return "white"
          };
        });
      });

  // draw legend text
  legend.append("text")
      .attr("x", width +140)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;});


 //Implementing zoom function		
	function zoomed() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    svg.selectAll(".dot")
        .attr("transform", transform);
  }

  function transform(d) {

	  if( d[xCat]!=-1 && d[yCat]!=-1)
	  {	  
   return "translate(" + xScale(d[xCat]) + "," + yScale(d[yCat]) + ")";
	  }
	  else{

		  return "translate(" + xScale(d[xCat])*-2000 + "," + yScale(d[yCat])*-2000 + ")";
	  }  	  
 }
//Changing values on x-axis
d3.select('#select-key').on("click", change);
  function change() {	
	  var inputValue=d3.select(this).property('value');
	  xCat=inputValue;
	   if(xCat=="sodium")		  
	  {

	xMax = d3.max(cerealData,xValue)*1.05;
    xMin = d3.min(cerealData,xValue);
    zoomBeh.x(xScale.domain([xMin-1, xMax+1])).y(yScale.domain([yMin-1, yMax+1]));

    var svg = d3.select("body").transition();

    svg.select(".x.axis").call(xAxis).select(".label").text("Sodium (mg)");

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
	  }	
 	  else if(xCat=="calories")		  
	  {

	xMax = d3.max(cerealData,xValue)*1.05;
    xMin = d3.min(cerealData,xValue);
    zoomBeh.x(xScale.domain([xMin-1, xMax+1])).y(yScale.domain([yMin-1, yMax+1]));

    var svg = d3.select("body").transition();

    svg.select(".x.axis").call(xAxis).select(".label").text("Calories");

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
	  }
else if(xCat=="potass")		  
	  {

	xMax = d3.max(cerealData,xValue)*1.05;
    xMin = d3.min(cerealData,xValue);
    zoomBeh.x(xScale.domain([xMin-1, xMax+1])).y(yScale.domain([yMin-1, yMax+1]));

    var svg = d3.select("body").transition();

    svg.select(".x.axis").call(xAxis).select(".label").text("Potassium (mg)");

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
	  }
else if(xCat=="carbo")		  
	  {
	xMax = d3.max(cerealData,xValue)*2.6;
    xMin = d3.min(cerealData,xValue);
    zoomBeh.x(xScale.domain([xMin-1, xMax+1])).y(yScale.domain([yMin-1, yMax+1]));

    var svg = d3.select("body").transition();

    svg.select(".x.axis").call(xAxis).select(".label").text("Carbohydrates (g)");

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
	  }	  	  
  }
//Changing values on y-axis 
d3.select('#select-key2').on("click", change2);
  function change2() {	
	  var inputValue=d3.select(this).property('value');
	  yCat=inputValue;
	   if(yCat=="fiber")		  
	  {
	yMax = d3.max(cerealData,yValue)*1.05;
    yMin = d3.min(cerealData,yValue);
    zoomBeh.x(xScale.domain([xMin-1, xMax+1])).y(yScale.domain([yMin-1, yMax+1]));

    var svg = d3.select("body").transition();

    svg.select(".y.axis").call(yAxis).select(".label").text("Fiber (g)");

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
	  }	
  	  else if(yCat=="protein")		  
	  {
	yMax = d3.max(cerealData,yValue)*1.05;
    yMin = d3.min(cerealData,yValue);
    zoomBeh.x(xScale.domain([xMin-1, xMax+1])).y(yScale.domain([yMin-1, yMax+1]));

    var svg = d3.select("body").transition();

    svg.select(".y.axis").call(yAxis).select(".label").text("Protein (g)");

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
	  }
else if(yCat=="fat")		  
	  {
	yMax = d3.max(cerealData,yValue)*1.05;
    yMin = d3.min(cerealData,yValue);
    zoomBeh.x(xScale.domain([xMin-1, xMax+1])).y(yScale.domain([yMin-1, yMax+1]));

    var svg = d3.select("body").transition();

    svg.select(".y.axis").call(yAxis).select(".label").text("Fat (g)");

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
	  }	
else if(yCat=="sugars")		  
	  {
	yMax = d3.max(cerealData,yValue)*1.8;
    yMin = d3.min(cerealData,yValue);
    zoomBeh.x(xScale.domain([xMin-1, xMax+1])).y(yScale.domain([yMin-1, yMax+1]));

    var svg = d3.select("body").transition();

    svg.select(".y.axis").call(yAxis).select(".label").text("Sugar (g)");

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
	  }  
  }  
  

	
}	);

	
