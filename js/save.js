var submit = document.getElementById("submit");
var lasttime=localStorage.lasttime;
if(localStorage.selected&&localStorage.selected.length>=160){
	console.log(localStorage.selected.length);
	localStorage.selected=localStorage.selected.substr(8,160);
	console.log(localStorage.selected.length);
	}
$(function(){if(document.getElementById("search").value.trim()!=""){
	search();}bindse();})
if (localStorage.keyword){ document.getElementById("search").value=localStorage.keyword;}
submit.addEventListener('click',function(){
	var search_word = document.getElementById("search").value;
	localStorage.keyword = search_word;
	$("#showarea").html("<div></div>");
	if(document.getElementById("search").value.trim()!=""){
	search();}
},false);

function search(){
$.get("http://realtime.search.yahoo.co.jp/search?ei=UTF-8&p="+document.getElementById("search").value,function(result){
	var i=1;
	$(result).find(".cnt.cf").not(".TS2bh").each(function(){
		if (i>6){bindli();return false;}else{i++;}
		var content=$(this).find("h2").text();
		var pos=content.indexOf("参戦ID：");
		if (pos>0){
			var cid=content.substr(pos+5,8);
			var info=$(this).find(".lt");
			var uid=info.find("a").first().html();
			var timej=info.find("a").last();
			var timea=timej.attr("title");
			var timeb=timej.html();
			var selword=localStorage.selected?localStorage.selected:"";
			var selected=selword.indexOf(cid)>0?"selected":"";
			var str="<div class='lli "+selected+"'><div class='cid'>"+cid+"</div><div class='time'><div>"+timea+"&nbsp;&nbsp;"+timeb+"</div></div></div>"
			$("#showarea").children().last().append(str);
		}
	});
});

};

function bindli(){
	$(".lli").on("click",function(){
		copyTextToClipboard($(this).find(".cid").html());
		localStorage.selected=localStorage.selected+$(this).find(".cid").html();
		$(this).addClass("selected");
		});
}
function bindse(){
	$("select").on("change",function(){
		if($(this).children('option:selected').val()!=-1){
			document.getElementById("search").value=$(this).children('option:selected').val();submit.click();}
			});
}
function copyTextToClipboard(text) {
    var copyFrom = $('<textarea/>');
    copyFrom.text(text);
    $('body').append(copyFrom);
    copyFrom.select();
    document.execCommand('copy');
    copyFrom.remove();
    message(text+" copied");
}
function message(text){
	$(".popup").html(text);
	$(".popup").fadeIn(1000,
	function(){
			setTimeout(function(){$(".popup").fadeOut(2000)}
			, 3000)
			});
}