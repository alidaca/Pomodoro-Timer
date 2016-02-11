var running = false;
var intervalB, intervalS, line;
var audio = new Audio ('http://soundbible.com/mp3/pin_dropping-Brian_Rocca-2084700791.mp3'); 

//increase length 

  function addTime(idName){
    value = parseInt($('#'+ idName).text());
    value++;
    $('#'+ idName).text(value);
    if( idName == 'sessionEnd'){
      $('#minutes').text(value);
    }
  }//addTime

  
//decrease length

  function subtractTime(idName){
    value = parseInt($('#'+ idName).text());
    if (value <= 0){
      value = 0;
    } else {
      value --;
      $('#'+ idName).text(value);
      if( idName == 'sessionEnd'){
        $('#minutes').text(value);
      }
    }//if-else
  }//subtractTime


// display timer settings

  function displayTimer(m){
    var hours = Math.floor(m/60);
    var minutes = Math.floor(m % 60);

    if (hours > 10){
      $('#hours').removeClass('hidden').text(hours);
      $('#spacer').removeClass('hidden');
    }else if (hours > 0){
      $('#hours').removeClass('hidden').text('0'+hours);
      $('#spacer').removeClass('hidden');
    }
    
    if (minutes < 10){
      $('#minutes').text('0' + minutes);
    }else{
      $('#minutes').text(minutes);
    }

  }//displayTimer

//timer  

  function startTimer(){
    running = true;
    var sessionInput = parseInt($('#sessionEnd').text());
    var breakInput = parseInt($('#breakEnd').text());
    var sessionT = sessionInput;
    var breakT = breakInput;
    line = new ProgressBar.Line('#countdown',{
        color:        '#fae596',
        trailcolor:   '#fae596',
        strokeWidth:   3,
        easing:       'easeInOut',
        duration:      sessionT *60000
      });

    displayTimer(sessionT);
    $('#label').text('Session');

    intervalS = setInterval(countdownS, 60000);
    line.animate(1);

    function countdownS(){
      if (sessionT <= 1){
          clearInterval(intervalS);
          audio.play();
          intervalB = setInterval(countdownB, 60000);
          displayTimer(breakT);
          $('#label').text('Break');
          sessionT = sessionInput;
          line.destroy();
          line = new ProgressBar.Line('#countdown',{
            color:        '#fae596',
            trailcolor:   '#fae596',
            strokeWidth:   3,
            easing:       'easeInOut',
            duration:      breakT *60000
          });
          line.animate(1);
          
      }else{
      sessionT --;
      displayTimer(sessionT);
      } 
    }//countdownS
    
    function countdownB(){
      if (breakT <= 1){
        clearInterval(intervalB);
        audio.play();
        intervalS = setInterval(countdownS, 60000);
        displayTimer(sessionT);
        $('#label').text('Session');
        breakT = breakInput;
        line.destroy();
        line = new ProgressBar.Line('#countdown',{
          color:        '#fae596',
          trailcolor:   '#fae596',
          strokeWidth:   3,
          easing:       'easeInOut',
          duration:      sessionT *60000
        });
        line.animate(1);

      }else{
      breakT --;
      displayTimer(breakT);
      }
    } //breakCountdown

  } //startTimer

  
//timer controls

  $('#countdown').on('click', function(){
    if (running){
      clearInterval(intervalS);
      clearInterval(intervalB);
      $('#subtractSession').on('click', function(){subtractTime('sessionEnd');});
      $('#subtractBreak').on('click', function(){subtractTime('breakEnd');});
      $('#addSession').on('click',function(){addTime('sessionEnd');});
      $('#addBreak').on('click', function (){addTime('breakEnd');});
      line.destroy();
      running = false;
    } else {
      startTimer();
      $('#addSession').off();
      $('#addBreak').off();
      $('#subtractSession').off();
      $('#subtractBreak').off();
    }
  });

//break and session length controls

  $('#subtractSession').on('click', function(){
    subtractTime('sessionEnd');
  });

  $('#subtractBreak').on('click', function(){
    subtractTime('breakEnd');
  });

  $('#addSession').on('click',function(){
    addTime('sessionEnd');
  });

  $('#addBreak').on('click', function (){
    addTime('breakEnd');
  });

