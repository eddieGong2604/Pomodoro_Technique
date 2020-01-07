//loader
$(window).on("load",function() {
  let rnd = 200;
   $('.tom-container').fadeOut(rnd,function() {
    $('.tom-container').hide();
  });

}); 




let taskName,mainTime,longTime,shortTime,notification;
let pomodoroObject = {
	taskName: "",
	mainTime: 0,
	longTime: 0,
	shortTime: 0,
	notification: false
};
let numberOfClockUsed = 0;
let isPaused = true;
let totalTimeInSecond = 0;
	
let totalTimeCounting = 0;
let sliderValue = 0;


function progressToMainApp(){

	document.querySelector('#starter').classList.remove('show');
	document.querySelector('#starter').classList.add('hidden');
	document.querySelector('#in-progress').classList.add('show');

	document.querySelector('#time-modification').classList.add('show');
	document.querySelector('#concentration-aid').classList.add('show');
	document.querySelector('#main-time-left').value = pomodoroObject.mainTime;
	document.querySelector('#short-break-left').value = pomodoroObject.shortTime;
	document.querySelector('#long-break-left').value = pomodoroObject.longTime;
}


function initTheObject(){
	pomodoroObject.taskName = document.getElementById("task-name").value;
	pomodoroObject.mainTime = Number(document.getElementById("main-time").value);
	pomodoroObject.longTime = Number(document.getElementById("long-time").value);
	pomodoroObject.shortTime = Number(document.getElementById("short-time").value);
	pomodoroObject.notification = document.getElementById("notification-google").checked;

	totalTimeInSecond = pomodoroObject.mainTime*60*1000;
	totalTimeCounting = totalTimeInSecond;
}


let finishPopUp = 0;
let animation;
let clickTimes = 1;

function changeTimeWithSlider(){
	totalTimeCounting = totalTimeInSecond* (1- (document.getElementById("clock-slider").value)/100) ;
	sliderValue = Number(document.getElementById('clock-slider').value);
	let a = new Date(totalTimeCounting);
	let minute = ("00" + a.getMinutes()).substr(-2);
	let second = ("00" + a.getSeconds()).substr(-2);
	document.getElementById('middle-counter').innerHTML = minute + ":" + second;

}



function startCounting(){
	

	document.getElementById('middle-counter').innerHTML = pomodoroObject.mainTime + ":" + "00";
	document.getElementById('task-name-counting').innerHTML = pomodoroObject.taskName;

	animation = setInterval(function() {
	
	if(!isPaused){
		finishPopUp++;
	    totalTimeCounting = totalTimeCounting - 1000;
	   sliderValue = sliderValue + 100/(totalTimeInSecond/1000);
  	 	if(totalTimeCounting < 0){
  	 		

  	 			if(document.getElementById('status').innerHTML == "Main Time"){
  	 				document.getElementById('number-of-pom').innerHTML = ++numberOfClockUsed;

  	 					
  	 				if(numberOfClockUsed%4==0 && numberOfClockUsed>=4){
  	 					document.getElementById('status').innerHTML = "Long break";
  	 					document.getElementById('concentration-aid').innerHTML = "<ul>Long Break Tips<li>May recap your work so far.</li><li>Remember to stay hydrated.</li><li>Don't allow yourself to be lured away with mobile devices or social media until everything all finished.</li></ul>";
  	 					totalTimeCounting = totalTimeInSecond= pomodoroObject.longTime*60*1000;

  	 				}
  	 				else{
  	 					document.getElementById('status').innerHTML = "Short break";
  	 					document.getElementById('concentration-aid').innerHTML = "<ul>Short Break Tips<li>Drink a cup of water.</li><li>Have some light food.</li> <li>Leave your chair and take a deep breath to relax</li></ul>";
  	 					totalTimeCounting =totalTimeInSecond= pomodoroObject.shortTime*60*1000;

  	 				}
  	 				sliderValue = 0;
  	 			}

  	 			else if(document.getElementById('status').innerHTML != "Main Time"  ){
  	 				document.getElementById('status').innerHTML = "Main Time";
  	 				document.getElementById('concentration-aid').innerHTML = "<ul>Main Time Tips<li>Intensive focus in the main period.</li><li>Avoid external distraction. <a style='color: white;' href='https://chrome.google.com/webstore/detail/block-facebook/gebclbfnlcebcljmgblacllmjkfidoef'>Facebook Blocker</a></li> <li>(Optional) Play your favourite study music at the same level as mosquito buzz.</li> </ul>";
  	 				totalTimeCounting = totalTimeInSecond = pomodoroObject.mainTime*60*1000;
  	 				sliderValue = 0;
  	 				
  	 			}

     		}
    	else{
	    	let a = new Date(totalTimeCounting);
	    	let minute = ("00" + a.getMinutes()).substr(-2);
	    	let second = ("00" + a.getSeconds()).substr(-2);
	    	document.getElementById('middle-counter').innerHTML = minute + ":" + second;
	      	document.getElementById('clock-slider').value = sliderValue;
    		}

		}

    }
    , 1000);

	
	function controllingTwoButtons(){
		
	document.querySelector("#left-button").addEventListener('click',function(){

		if(clickTimes %2==1){
			clickTimes = 0;
			isPaused = false;
				document.querySelector("#left-button").innerHTML = "Pause";
		}
		else{
			clickTimes = 1;
			isPaused = true;
			document.querySelector('#left-button').innerHTML = "Resume ";
		}
	});

	document.querySelector('#right-button').addEventListener('click',function(){
		document.getElementById('status').innerHTML = "Main Time";
		document.getElementById('middle-counter').innerHTML = pomodoroObject.mainTime + ":" + "00";
		isPaused = true;
		totalTimeInSecond = pomodoroObject.mainTime*60*1000;
		countDown = new Date(totalTimeInSecond);
		totalTimeCounting = countDown.getTime();
		sliderValue = 0;
		document.getElementById('left-button').innerHTML = "Play";
		clickTimes = 1;
		document.getElementById('clock-slider').value = 0;
		document.getElementById('number-of-pom').innerHTML = 0;
		numberOfClockUsed = 0;
		finishPopUp=0;
	});
	}

	controllingTwoButtons();


}
//js clock 
function startTheApp(){
	if(document.getElementById("task-name").value != ""){
		initTheObject();
		progressToMainApp();
		startCounting();
	}
	else{
	document.querySelector("#denied").classList.remove('hidden');
	document.querySelector("#denied").classList.add('show');

	}
	
}

function applyCustomization(){
	document.getElementById('pop-up').classList.remove('show');
	pomodoroObject.mainTime = Number(document.querySelector("#main-time-left").value);
	pomodoroObject.shortTime = Number(document.querySelector("#short-break-left").value);
	pomodoroObject.longTime = Number(document.querySelector("#long-break-left").value);
	

	document.getElementById('status').innerHTML = "Main Time";
	document.getElementById('middle-counter').innerHTML = 
		pomodoroObject.mainTime + ":" + "00";
	isPaused = true;
	clickTimes = 1;
	totalTimeInSecond = pomodoroObject.mainTime*60*1000;
	countDown = new Date(totalTimeInSecond);
	totalTimeCounting = countDown.getTime();
	sliderValue = 0;
	numberOfClockUsed = 0;
	finishPopUp=0;
	document.getElementById('left-button').innerHTML = "Play";
	document.getElementById('number-of-pom').innerHTML = 0;
	document.getElementById('clock-slider').value = 0;

	document.querySelector("#pop-up").classList.remove("show");

}

function popUp(){
	document.querySelector("#pop-up").classList.add("show");


}

function noPopUp(){
	document.querySelector("#pop-up").classList.remove("show");
	document.querySelector('#main-time-left').value = pomodoroObject.mainTime;
	document.querySelector('#short-break-left').value = pomodoroObject.shortTime;
	document.querySelector('#long-break-left').value = pomodoroObject.longTime;
}

function finishTheApp(){
	clearInterval(animation);
	document.querySelector('#pop-up-finish').classList.add('show');
	document.getElementById('number-of-pom-finish').innerHTML = numberOfClockUsed;
	document.getElementById('time-finish').innerHTML = finishPopUp;
}


//dropdown
// Material Select Initialization
$(document).on("ready",function() {
$('.mdb-select').materialSelect();
});


//slider

