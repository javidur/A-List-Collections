user_input_form.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = playerSearch.value;

  async function playerSearchById(searchTerm) {
    debugger;
    //3139477 patrick mahomes - QB
    //3116406 tyreek hill - WR
    //3128720 nick chubb - RB
    let API_URL = `https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/${searchTerm}`;
    // let API_URL = "https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/3139477";
    let response = await fetch(API_URL);
    let result = await response.json();
    console.log(result);

    renderCard(result);
  }

  playerSearchById(searchTerm);
  user_input_form.reset();
});

function renderCard(result) {
  //CARD FRONT
  const playerFullName = result.athlete.fullName;
  // const playerLastName = result.athlete.lastName;
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

  debugger;
  let template = getTemplate();
  template.find("#card_img").attr("src", playerHeadshot);
  template.find("#name").text(playerFullName);
  template.find("#team_name").text(`Team: ${currentTeam}`);
  template.find("#position").text(`Position: ${position}`);
  template.find("#number").text(`Number: ${number}`);
  template.find("#height").text(`Height: ${height}`);
  template.find("#weight").text(`Weight: ${weight}`);
  template.find("#birthdate").text(`Birthdate: ${birthDate}`);
  template.find("#college").text(`College: ${college}`);
  template.find("#status").text(`Status: ${status}`);
  template.find("#draftInfo").text(`Draft Info: ${draftInfo}`);
  template.find("#currentYear").text(`Current Year: ${currYear}`);
  template.find("#stat1Name").text(stat1Name);
  template.find("#stat1Value").text(stat1Number);
  template.find("#stat2Name").text(stat2Name);
  template.find("#stat2Value").text(stat2Number);
  template.find("#stat3Name").text(stat3Name);
  template.find("#stat3Value").text(stat3Number);
  template.find("#stat4Name").text(stat4Name);
  template.find("#stat4Value").text(stat4Number);

  $("#card_container").append(template);
}

function getTemplate() {
  return $($("#card_template").html());
}
