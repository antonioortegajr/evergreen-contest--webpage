          
          // milliseconds until page refreshed
          const refreshTime = 10000
          
          
          let currentJudged;
          axios.get('https://blkikjvgfd.execute-api.us-west-2.amazonaws.com/ditto/get-data')
            .then(function (response) {
              let d = response.data.Items;
              let curArray = [];
              let curCont;
      
              d.map(types => {
                  if(types.type == 'currentContest'){
                    curCont = types.recordData.contestName;
                  }
              });

              //the winner stuffs.
              d.map(names => {
                if(names.name === curCont){
                  curContest = names.recordData.contestants;
                }
                    
              });
              let zeros;
                curContest.map((cont)=>{
                  d.map((i)=>{
                    if(i.id == cont){
                      var scoreArray = i.recordData.contest.score;
                      if(scoreArray.indexOf(0) > -1) {
                          curArray.push(i);
                    }
                  }
                })
              })
              const contentNameData = curArray[0].recordData.contest.contestName;
              let hasHyphen = contentNameData.includes("-");
              let day = "";
              let nam = "";
              let contestAndName = contentNameData;
              if(hasHyphen){
                const parts = contentNameData.split("-");
                day = parts[0].slice(0, -1);
                nam= parts[1].substring(1);
                contestAndName = day+'<br>'+nam;
              }

              const contestantNameClass = ".v1_11"
              const artistNameClass = ".v1_12"
              const artistLocationClass = ".v1_10"
              const pictureClass = ".v1_4"
              const contestClass = ".v1_5"

              document.querySelector(contestantNameClass).innerHTML = curArray[0].name
              document.querySelector(artistNameClass).innerHTML = curArray[0].recordData.artist
              document.querySelector(artistLocationClass).innerHTML = curArray[0].recordData.artistLocation
              document.querySelector(contestClass).innerHTML = contestAndName
              document.querySelector(pictureClass).style.borderRadius = "32px";
              document.querySelector(pictureClass).style.backgroundImage = `url(${curArray[0].recordData.photo})`
console.log(curArray[0].name)

            //document.querySelector('#main-image').innerHTML='<div class="contestName">'+contestAndName+'</div><img id="tatt-img" src="'+curArray[0].recordData.photo+'" />';
            //document.querySelector('#win').innerHTML='<div class="data">Contestant Name: <div class="artist">'+curArray[0].name+'</div></div>'+'<div class="data">Artist name: <div class="artist">'+curArray[0].recordData.artist+'</div></div>'+'<div class="data">Artist Location: <div class="artist">'+curArray[0].recordData.artistLocation+'</div></div>';
            })
            .catch(function (error) {
              console.log(error);
            });
        
            let cIndex = 0;
        
            const handler = setInterval(function() {
                cIndex++;
                if (cIndex >= 0) {
                   window.location = window.location.href;
                }
            }, refreshTime);