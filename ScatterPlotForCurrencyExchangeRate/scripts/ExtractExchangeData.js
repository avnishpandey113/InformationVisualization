   	var xAxis = ["All Months","January","February", "March","April","May","June","July","August","September"];

    var selection = d3.select('body')
    .append('select')
    .attr('class','select')
    .on('change',onchange);

    selection
    .selectAll('option')
    .data(xAxis).enter()
    .append('option')
    .text(function (d) { return d; });

	
	function onchange() {
		 var color = d3.scale.category10();
		 var currencyExchangeData=[],label=[],audCad=[],brlCad=[],eurCad=[],hkdCad=[],gbpCad=[],usdCad=[],dateArray=[];	 
         var totalObservations=0;
         var observationsArray=[],observationsArrayNew=[];
         var k=0;
         var maxElement=0;
		 var startDate=0,endDate=0;
		 var inputValue;
		 
		d3.select("svg").remove();
		inputValue = d3.select('select').property('value');
		d3.json("../data/ExchangeData.json", function(data){
			console.log(data);
    function scatterPlot(){
		
        $.each(data.observations, function(i) {
            if(data.observations[i].FXAUDCAD["v"])
            {
                currencyExchangeData.push(data.observations[i].d,
                    data.observations[i].FXAUDCAD["v"],
                    data.observations[i].FXBRLCAD["v"],
                    data.observations[i].FXEURCAD["v"],                    
                    data.observations[i].FXHKDCAD["v"],
					data.observations[i].FXGBPCAD["v"],
                    data.observations[i].FXUSDCAD["v"]);
                
					totalObservations++;
            }

     });
	                  $.each(data.observations, function(i, f) {
                   if(data.observations[i].FXAUDCAD["v"])
                   {
                      dateArray.push(data.observations[i].d);
                         audCad.push(data.observations[i].FXAUDCAD["v"]);
                         brlCad.push(data.observations[i].FXBRLCAD["v"]);
                         eurCad.push(data.observations[i].FXEURCAD["v"]);
                         hkdCad.push(data.observations[i].FXHKDCAD["v"]);
                         gbpCad.push(data.observations[i].FXGBPCAD["v"]);
                         usdCad.push(data.observations[i].FXUSDCAD["v"]);
                  }

              });


                label.push(data.seriesDetail.FXAUDCAD["label"]);
                label.push(data.seriesDetail.FXBRLCAD["label"]);
                label.push(data.seriesDetail.FXEURCAD["label"]);
                label.push(data.seriesDetail.FXHKDCAD["label"]);
                label.push(data.seriesDetail.FXGBPCAD["label"]);
                label.push(data.seriesDetail.FXUSDCAD["label"]);
	 
        for(var i=0; i<totalObservations; i++)
        {
            observationsArray[i]=[];
            for(var j=0; j<=6; j++)
            {
                observationsArray[i][j]=currencyExchangeData[k];
				 
                if(!isNaN(observationsArray[i][j])){
                    if(observationsArray[i][j]>maxElement)
                        maxElement=observationsArray[i][j];
                }
                k++;
            }
        }
		
		for(i=0,k=0;i<(observationsArray.length)*6;i++){
            observationsArrayNew[i]=[];
          }


          for(i=0;i<6;i++){            
            for(j=0;j<observationsArray.length;j++){
              observationsArrayNew[k][0]=observationsArray[j][0];
              observationsArrayNew[k][1]=observationsArray[j][i+1];
              observationsArrayNew[k][2]=label[i];
              k++;
            }
          }
		  
// Set the dimensions of the canvas
var margin = {top: 60, right: 20, bottom: 50, left: 100},
    width = 1300 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.top + "," + margin.right + ")") ;

// Parsing date
var parseDate = d3.time.format("%Y-%m-%d").parse;
//format the date appearing in tooltip
var formatTime = d3.time.format("%B %e");

// Set the input range and ouput domain
var x = d3.time.scale()
          .range([0, width-200]);
		  
var y = d3.scale.linear()
		.domain([0, maxElement+0.025])
          .range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(15);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(16);
	   
if(inputValue=="All Months"){
         x.domain(d3.extent(observationsArrayNew, function(d) { return parseDate(d[0]); }));	 
        }
        else if(inputValue=="January"){
          startDate="2017-01-01";
          endDate="2017-01-31";
           x.domain([parseDate(startDate),parseDate(endDate)]);
        }
         else if(inputValue=="February"){
          startDate="2017-02-01";
          endDate="2017-02-28";
            x.domain([parseDate(startDate),parseDate(endDate)]);
        }
         else if(inputValue=="March"){
          startDate="2017-03-01";
          endDate="2017-03-31";
            x.domain([parseDate(startDate),parseDate(endDate)]);
        }
         else if(inputValue=="April"){
          startDate="2017-04-01";
          endDate="2017-04-30";
            x.domain([parseDate(startDate),parseDate(endDate)]);
        }
         else if(inputValue=="May"){
          startDate="2017-05-01";
          endDate="2017-05-31";
            x.domain([parseDate(startDate),parseDate(endDate)]);
        }
         else if(inputValue=="June"){
          startDate="2017-06-01";
          endDate="2017-06-30";
            x.domain([parseDate(startDate),parseDate(endDate)]);
        }
         else if(inputValue=="July"){
          startDate="2017-07-01";
          endDate="2017-07-31";
           x.domain([parseDate(startDate),parseDate(endDate)]);
        }
         else if(inputValue=="August"){
          startDate="2017-08-01";
          endDate="2017-08-31";
            x.domain([parseDate(startDate),parseDate(endDate)]);
        }
         else if(inputValue=="September"){
          startDate="2017-09-01";
          endDate="2017-09-30";
            x.domain([parseDate(startDate),parseDate(endDate)]);
        }
          

 // naming x-axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
	.append("text")
    .attr("class", "label")
    .attr("x", width/2)
    .attr("y", +50)
    .style("text-anchor", "end")
    .text("Date")
	.attr("font-family", "Georgia")
	.attr("font-size", "20px");
 
// naming y-axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
	.append("text")
    .attr("class", "label")
    .attr("transform", "translate( 0 ,"+(height/3)+")rotate(-90)")
    .attr("y", -54)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Exchange Rates")
	.attr("font-family", "Georgia")
	.attr("font-size", "20px");


 // add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
.attr("class", "tooltip")
.style("opacity", 0);

var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", width-170)
      .attr("height", height);
	
    //Drawing scatterplot
    objects.selectAll(".dot")
        .data(observationsArrayNew)
      .enter().append("circle")
	  .classed("dot", true)
      .style("fill", function(d) { return color(d[2]); })
        .attr("r", 2.5)
		.attr("id", function(d) { return d[2];})
        .attr("cx", function(d) { return x(parseDate(d[0])); })
        .attr("cy", function(d) { return y(d[1]);})
		.on("mouseover", function(d) {
    tooltip.transition()
    .duration(200)
    .style("opacity", .9);
     tooltip.html(d[2]+"<br>"+"Date:"+d[0]+"<br>"+"Rate:"+d[1])
      .style("left", (d3.event.pageX + 5) + "px")
      .style("top", (d3.event.pageY - 28) + "px")
	   .style("background", "lightpink");
       d3.selectAll(".dot")
        .style("opacity", 0.0)
       .filter(function(observationsArrayNew) {     
          return observationsArrayNew[2] == d[2];
        })
            .style("opacity", 1)
        .style("fill", function(observationsArrayNew) {
          if (observationsArrayNew[2] == d[2]) {
            return d[1];
          } else {
            return "white"
          };
        });

  })
  .on("mouseout", function(d) {
    tooltip.transition()
    .duration(500)
    .style("opacity", 0);
     d3.selectAll(".dot")
     .style("opacity", 1);

  });

  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .classed("legend", true)
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
   

  // draw legend colored rectangles
 var legendShape= legend.append("rect")
      .attr("x", width-100)
      .attr("width", 18)
      .attr("height", 18)
	  .attr("id",function(d,i) { return label[i];})
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width-70)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d,i) { return label[i];});
	  
 legendShape.on("click", function(type) {          
          var attr =d3.select(this).attr("id");    
     if(d3.selectAll("circle[id='"+attr+"'").attr("r")==0)
     {
     d3.selectAll("circle[id='"+attr+"'").attr("r", 2.5);
     d3.selectAll("rect[id='"+attr+"'").style("opacity", 1);
     }
     else
     {
      d3.selectAll("circle[id='"+attr+"'").attr("r",0);
      d3.selectAll("rect[id='"+attr+"'").style("opacity", 0.2);
     }
    });

   };

scatterPlot();

});
	}