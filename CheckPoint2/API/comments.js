
//api formation
var api = 'https://www.googleapis.com/youtube/v3/commentThreads?videoId=';
var apiKey = '&key=AIzaSyCfMV7-URgcG23QBn5lwgkU7SiHnCFkBxs';
var parts = '&part=snippet,replies';
var maxResults = '&maxResults=100';
var nextPagetoken = '&pageToken=QURTSl9pMWZ1N29JOFRjMWdyTGl5c2VMS2VoLVNLcWdfRkNFM2R6blB3UmV6RFV4ejNKdzdKdGp0bmRqaXlldDFLV2NQeS01MjRRX09kQ0NnTlNKaXp1WVllbHZ0S1cyaUZQNmFOZFdydjR4YjlWaXJTZ0tSWG9ab0UzN3VMQ0c0VHM=';


// array to store comments
var saveComments =[];



function setup() {
  noCanvas();
  
  var button = select('#submit');
  button.mousePressed(AskComments);

  

  input = select('#videoId');
}

function AskComments() {
  
  var url = api + input.value() + apiKey + parts + maxResults+ nextPagetoken; 
  loadJSON(url, gotData);
}


function gotData(data) {
  var comments = data.items;
  

    for(var i =0; i < comments.length; i++) {
      createElement('h1',comments[i].snippet.topLevelComment.snippet.authorDisplayName);
      createP(comments[i].snippet.topLevelComment.snippet.textDisplay);
      createP(comments[i].snippet.topLevelComment.snippet.publishedAt);

      var myCommentsObject = {
                              Comment: comments[i].snippet.topLevelComment.snippet.textOriginal.replace(/,/g, ''), // remove commas to avoid errors
                              Author: comments[i].snippet.topLevelComment.snippet.authorDisplayName,
                              Published: comments[i].snippet.topLevelComment.snippet.publishedAt
      };
      saveComments.push(myCommentsObject);          
    }

download();
}

//for converting JSON to csv file and saving it. Take from codepen
function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function download(){
  var headers = {
    Comment: 'Youtube comment'.replace(/,/g, ''), // remove commas to avoid errors
    Author: "Name",
    Published: "Time"
};


var commentsFormatted = [];

  // format the data
  saveComments.forEach((item) => {
      commentsFormatted.push({
          Comment: item.Comment.replace(/\n/g, ''), // remove commas to avoid errors,
          Author: item.Author,
          Published: item.Published
      });
  });
console.log(commentsFormatted);


var fileTitle = 'Comments'; // or 'my-unique-title'

exportCSVFile(headers, commentsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download

   
}
   
    //println(comments);

 // println(data.items[0].snippet.videoId);

 // println(data.items[0].snippet.topLevelComment.kind);



