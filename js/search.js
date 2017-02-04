alert(1);
var intervalId=setInterval(function(){
chrome.extension.getBackgroundPage().console.log(1);
console.log(timeSection);
var myDate=new Date();
var mytime=myDate.toLocaleTimeString();
timeSection.innerHTML=mytime;
},1000);
function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}
httpRequest('http://realtime.search.yahoo.co.jp/search?p=Lv100+%E3%82%AA%E3%83%AA%E3%83%B4%E3%82%A3%E3%82%A8&ei=UTF-8', function(data){
    chrome.extension.getBackgroundPage().console.log(data);
});
