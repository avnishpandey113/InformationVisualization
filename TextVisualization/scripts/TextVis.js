    var textString="../includes/Congressional Russia probes likely to head into 2018.txt";
	var stopWords= [];
	stopWords=words;

d3.text(textString, (function (data) 
 {

 var heading="Congressional Russia probes likely to head into 2018";
 document.getElementById("ArticleHeading").innerHTML=heading;
drawWordCloud(data);
tabulate(data);
drawText(); 
   function drawText() 
   { 
    var html = data.replace(/\r?\n|\r/g , "<br> ");
    document.getElementById("textdraw").innerHTML = html; 
  }
d3.select('#select-key').on("change", change);
}));

function change() {	
d3.select("svg").remove();
d3.select("table").remove();

var inputValue=d3.select(this).property('value');

if(inputValue== "News")
{
	var heading="Congressional Russia probes likely to head into 2018";
	document.getElementById("ArticleHeading").innerHTML=heading;
	textString="../includes/Congressional Russia probes likely to head into 2018.txt";	
}	
else if (inputValue== "Story")
{	
var heading="A Ghost Story";
	 document.getElementById("ArticleHeading").innerHTML=heading;
	textString="../includes/Story.txt";
}

 d3.text(textString, (function (data) 
 {	 
drawWordCloud(data);
tabulate(data);
 drawText(); 
   function drawText() 
   { 
    var html = data.replace(/\r?\n|\r/g , "<br> ");
    document.getElementById("textdraw").innerHTML = html; 
  }
})); 
}

//Drawing word cloud
function drawWordCloud(textString){ 
        var word_count = {},words=[],wordPair=[],i=0,j=0,k=0,l=0,m=0,n=0;
		var regEx=/^[ A-Za-z0-9]+$/i;
        var wordString= RemoveStopWords(textString,stopWords);
        var wordArray= wordString.replace(/\r?\n|\r/g , " ");
        wordArray= wordArray.split(' ');      


        for(i=0;i<wordArray.length;i++){
          if((wordArray[i]!="")) {
            wordArray[k]=wordArray[i];
            k++;
          } 
        }
      
	  for(i=0; i<wordArray.length-1; i++){
      wordPair[i]=wordArray[i]+' '+wordArray[i+1];

        if(wordPair[i].match('\\b[A-Za-z]* [A-Za-z]*\\b')){
              words[m] = wordPair[i];
              m++;
      }
        else if(wordPair[i].match('\\b[A-Za-z]*[.] [A-Za-z]*\\b')){
          wordPair[i] = wordPair[i].replace('.', '');
        }

      }


for(k=0;k<words.length;k++){
    var n=(words[k].length)-1;
       for(l=n;l>=0;l--){
         if(!(words[k].charAt(l).match(regEx))){
           words[k] = words[k].replace(words[k].charAt(l), '');
           n--;
         }
       }
     }

      if (words.length == 1){
        word_count[words[0]] = 1;
      } else {
        words.forEach(function(word){
          var word = word.toLowerCase();
          var track = word.split(" ");   
          if (word != "" && word.length>1){
            if (word_count[word]){
              word_count[word]++;
            } else {
              word_count[word] = 1;
            }
          }
        })
      }

        var svg_location = "#chart";
        var width = 1000;
        var height = 345;		
        var fill = d3.scale.category20();

        var word_entries = d3.entries(word_count);

        var xScale = d3.scale.linear()
           .domain([0, d3.max(word_entries, function(d) {
              return d.value;
            })
           ])
           .range([10,30]);

        d3.layout.cloud().size([width, height])
          .timeInterval(20)
          .words(word_entries)
          .fontSize(function(d) { return xScale(+d.value); })
          .text(function(d) { return d.key; })
          .rotate(function() { return ~~(Math.random() * 2) * 90; })
          .font("Georgia")
          .on("end", draw)
          .start();

        function draw(words) {
			
			
			var selected= null;
          d3.select(svg_location).append("svg")
              .attr("width", width)
              .attr("height", height)
            .append("g")
              .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
            .selectAll("text")
              .data(words)
            .enter().append("text")
              .style("font-size", function(d) { return xScale(d.value) + "px"; })
              .style("font-family", "Georgia")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")
              .attr("transform", function(d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              }).attr("id",function(d) { return d.key; })
              .text(function(d) { return d.key; })
			  .on("click", function(d) {
          if (selected != null)     
        {
         d3.select(svg_location).selectAll("text[id='"+selected+"'").style("text-decoration", "none");
        }
          selected =d3.select(this).attr("id");  
          d3.select(this).style("text-decoration", "underline");
 pairHighlighter(selected); 
});
    }
	
  function pairHighlighter(textPair)
  {    
    var word1,word2;
	var context  = document.querySelector('#textdraw');
    var docText = context.innerText ;
    var updateText = docText.replace(/\r?\n|\r/g , "<br> ");
    var regex = new RegExp('\\b('+textPair+')\\b', 'ig'); 
    if(updateText.match(regex))
      updateText = updateText.replace(regex, '<a id="pairSpot">$1</a>'); 
    else{
      var temp=textPair.split(' ');
      tempText=updateText;
      for(var i=0; i< tempText.length; i++){
        if(tempText[i]=="," || tempText[i]==":" || tempText[i]=="?" || tempText[i]=="!" || tempText[i]=="-" || tempText[i]=='"'){
          tempText=tempText.replace(tempText[i],'.')
      }
}
      var temp1=tempText.split('.');
      var regex1 = new RegExp('\\b('+temp[0]+')\\b', 'ig'); 
      var regex2 = new RegExp('\\b('+temp[1]+')\\b', 'ig'); 

      for(i=0; i<temp1.length; i++){
        if(temp1[i].match(regex1) && temp1[i].match(regex2)){
          word1=temp1[i].replace(regex1, '<a id="pairSpot">$1</a>');
          word2=word1.replace(regex2, '<a id="pairSpot">$1</a>');
      updateText = updateText.replace(temp1[i], word2); 

    }
  }
}

context.innerHTML  = updateText;
document.getElementById('pairSpot').scrollIntoView();

}
		
        d3.layout.cloud().stop();

}

//Removing stop words
function RemoveStopWords(s,w) {
	var re = new RegExp('\\b(' + w.join('|') + ')\\b', 'ig');	
    return (s || '').replace(re, '').replace(/[ ]{2,}/, ' ');	
}
//Tabulating word frequency
function tabulate(textString){ 
  var wordArray= RemoveStopWords(textString,stopWords);
  var context  = document.querySelector('#textdraw');
  var selected=null;
  wordArray= wordArray.replace(/\r?\n|\r/g , " ");

  var singleWords=wordArray.replace(/[^a-z0-9\ ]/gi,'');
		singleWords=singleWords.split(' ');
		
		for( var i=0;i< singleWords.length;i++)
		{
			singleWords[i]=singleWords[i].toLowerCase();
		}
	var result = WordCount(singleWords);
	
	
	function WordCount(arr) {
    var a = [], b = [], c=[], prev;
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev && arr[i] !== "") {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
	
for(i=0; i<a.length; i++){
	c[i]=[];
		c[i][0]=a[i];
		c[i][1]=b[i];		
}  
    return c;
}

function createTable(result){
			
			var table = d3.select("#table").append("table");
        var header = table.append("thead").append("tr");
        
		header.selectAll("th")
                .data(["Word", "Frequency"])
                .enter()
                .append("th")
                .text(function(d) { return d; });
        var tablebody = table.append("tbody");
        rows = tablebody
                .selectAll("tr")
                .data(result)
                .enter()
                .append("tr");
        
        cells = rows.selectAll("td")
                 .data(function(d) {                 
                    return d;
                })
                .enter()
                .append("td")
				.attr("id",function(d) { return d; })
                .text(function(d) {
                    return d;
                });
				cellHighlight = rows.select("td").on("click", function(d) {
                  if(selected != null){
                    tablebody.selectAll("td[id='"+selected+"'").style("text-decoration", "none");
                  }
                 
          selected =d3.select(this).attr("id");  
          d3.select(this).style("text-decoration", "underline");
 wordHighlighter(selected); 
});
}
         function wordHighlighter(oneWord)
  {    
   var docText = context.innerText ;
   var updateText = docText.replace(/\r?\n|\r/g , "<br> ");
   var regex = new RegExp('\\b('+oneWord+')\\b', 'ig'); 
   updateText = updateText.replace(regex, '<span id="wordSpot">$1</span>');
 context.innerHTML  = updateText;
 document.getElementById('wordSpot').scrollIntoView();
}
		createTable(result);
		
}
