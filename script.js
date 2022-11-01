user_input_form.addEventListener("submit", (event)=>{
    event.preventDefault();
    
    const searchTerm = playerSearch.value;
    const header = document.createElement("h1");
    header.textContent = searchTerm;
    
    container.appendChild(header);
    
    async function playerSearchById(searchTerm){
        debugger;
        //3139477 patrick mahomes - QB
        //3116406 tyreek hill - WR
        //3128720 nick chubb - RB
        let API_URL = `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${searchTerm}`;
       // let API_URL = "https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/3139477";
        let response = await fetch(API_URL);
        let result = await response.json();
        console.log(result);
        
    
        //CARD FRONT
        const playerFirstName = result.athlete.firstName;
        const playerLastName = result.athlete.lastName;
        const number = result.athlete.jersey;
        const position = result.athlete.position.displayName;
        const currentTeam = result.athlete.team.displayName;
        const playerHeadshot = result.athlete.headshot.href;
    
        //CARD BACK
        const height = result.athlete.displayHeight;
        const weight = result.athlete.displayWeight;
        const birthDate = result.athlete.displayDOB;
        const college = result.athlete.college.name;
        const draftInfo = result.athlete.displayDraft;
        const status = result.athlete.status.name;
        
    
        //2022 STATS
        const currSeasonStats = result.athlete.statsSummary.statistics;
        const currYear = result.season.displayName; //Displays the year of the current season
        const stat1Name = currSeasonStats[0].displayName;
        const stat1Number = currSeasonStats[0].displayValue;
        const stat2Name = currSeasonStats[1].displayName;
        const stat2Number = currSeasonStats[1].displayValue;
        const stat3Name = currSeasonStats[2].displayName;
        const stat3Number = currSeasonStats[2].displayValue;
        const stat4Name = currSeasonStats[3].displayName;
        const stat4Number = currSeasonStats[3].displayValue;
    
        
    }
    
    playerSearchById(searchTerm);
        user_input_form.reset();
    
    
    });
    
    
    
    
    