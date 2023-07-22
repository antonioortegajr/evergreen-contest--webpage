// milliseconds until page refreshed
const refreshTime = 10000


axios.get('https://blkikjvgfd.execute-api.us-west-2.amazonaws.com/ditto/get-data')
        .then(function (response) {
          let d = response.data.Items;
          console.log(d)
          d.map(types => {
              if(types.type == 'currentWinner'){
                const contentNameData = types.recordData.contestName;
                let hasHyphen = contentNameData.includes("-");
                let day = "";
                let nam = "";
                let contestAndName = contentNameData;
                if(hasHyphen){
                  const parts = contentNameData.split("-");
                  day = parts[0].slice(0, -1);
                  nam= parts[1].substring(1);
                  contestAndName = day+' '+nam;
                };
                console.log(contestAndName)

                const contestantNameClass = ".v1_11"
                const artistNameClass = ".v1_12"
                const artistLocationClass = ".v1_10"
                const pictureClass = ".v1_4"
                const contestClass = ".v1_5"

                document.querySelector(contestantNameClass).innerHTML = types.recordData.name
                document.querySelector(artistNameClass).innerHTML = types.recordData.artistName
                document.querySelector(artistLocationClass).innerHTML = types.recordData.artistLocation
                document.querySelector(contestClass).innerHTML = contestAndName
                document.querySelector(pictureClass).style.borderRadius = "32px";
                document.querySelector(pictureClass).style.backgroundImage = `url(${types.recordData.photo})`
              }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
        let cIndex = 0;
        const handler = setInterval(function() {
            cIndex++;
            if (cIndex >= 0) {
                window.location = window.location.href;
            }f
        }, refreshTime);