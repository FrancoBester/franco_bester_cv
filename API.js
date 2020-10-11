load_steam();
load_github();
load_spaceX();

async function load_steam(){//function that loads steam account data into a json reponse
    let steam_url = "https://cors-anywhere.herokuapp.com/";//global port
    const steam_response = await fetch(steam_url + "http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=89C2835E21B28EDD4E98FED3AEAD8508&steamid=76561198969742452&include_appinfo=true&include_played_free_games=true&appids_filter=730");//url used to retrieve data from api
    const steam_data = await steam_response.json();
    load_steamdata(steam_data);//function that convert api json data into html tags and info to display to user
};

async function load_github(){//function that loads github account data into a json reponse
    const git_url =  "https://api.github.com/users/FrancoBester"; //url used to retrieve data from api
    const git_response = await fetch(git_url);
    const git_data = await git_response.json();
    load_gitdata(git_data);//function that convert api json data into html tags and info to display to user
};

async function load_spaceX(){//function tht loads data from spacex launch api
    const space_url = "https://api.spacexdata.com/v3/launches/latest?pretty=true";//url used to retrieve data from api
    const space_response = await fetch(space_url);
    const space_data = await space_response.json();
    load_spacedata(space_data);//function that convert api json data into html tags and info to display to user
};

let games = [];//array that will contain all the games data on a steam account
function load_steamdata(steamdata){
    game_count = steamdata.response.game_count;//gets the amount of games that steam user has
    games = steamdata.response.games;//gets an array of all the users games
    let innerHtml_steam = '<p><a href="#Links" onclick=open_new_window("steamcommunity.com/profiles/76561198969742452/")> Steam account information </a></p>';//display html 

    for(i = 0;i < 5 && i < game_count;i++){//tarverse all the steam games untill the 5 ar reached or the users games stop
        let img_src = "'http://media.steampowered.com/steamcommunity/public/images/apps/" + games[i].appid +"/" + games[i].img_logo_url + ".jpg'"//gets the games images form online
        innerHtml_steam = innerHtml_steam + 
        "<div style='float:left; margin-top:0px; padding-left: 3rem; width:45rem; margin-left: 1rem; margin-bottom: 0.1rem' class ='background_api'>"+
        "<h4 style='float:left; margin-top:2rem;'>"+games[i].name+ "<div>"+//gets game name from api
        "<h5>Playtime: "+ (games[i].playtime_forever/60).toFixed(2) +" hours "+ //get hours each game has been played from web api
        "<img src="+ img_src+' class="game_img"/>'+"</div>"//loads image source into img div
        +"</div>" 
    };
    innerHtml_steam = innerHtml_steam + "</div>";
    document.getElementById("Steam").innerHTML=innerHtml_steam;
};

function load_gitdata(githubdata){
    // create a hyperlink to account as heading, loads github account image along with account name, type and laste date uploaded to github
    document.getElementById("Github").innerHTML=`
    <p><a href="#Links" onclick=open_new_window("${githubdata.html_url.slice(7,40)}")>Github account information</a></p> 
    <div class="background_api">
    <img src="${githubdata.avatar_url}" class="git_img"/>
    <p>Account name: ${githubdata.login}</p>
    <p>Account type: ${githubdata.type}</p>
    <p>Lastest upload: ${githubdata.updated_at.slice(0,10) + " " + githubdata.updated_at.slice(11,19)}</p>
    </div>
    `
};

function load_spacedata(spacedata){
    //fucntion loads spacex launch data into a div
    //data include flight number, mission name, rocket ID/name.type, manufactere and payload for launch
    document.getElementById("SpaceX").innerHTML=`
    <p> <a href='#Links' onclick=open_new_window("www.spacex.com/")>Latest SpaceX information</a></p>
    <div class="background_api" style="padding-bottom:0.5rem">
    <img src='https://www.spacex.com/static/images/backgrounds/starlink_11_dekstop.jpg' class="space_img"/>
    <p>Fight number : ${spacedata.flight_number}</p>
    <p>Mission name : ${spacedata.mission_name}</p>
    <p>Current local launch date: ${spacedata.launch_date_local.slice(0,10) +" "+spacedata.launch_date_local.slice(11,19)} </p>
    <p>Rocket id: ${spacedata.rocket.rocket_id}</p>
    <p>Rocket name: ${spacedata.rocket.rocket_name}</p>
    <p>Rocket type: ${spacedata.rocket.rocket_type}</p>
    <p>Rocket manufactorer: ${spacedata.rocket.second_stage.payloads[0].manufacturer}</p>
    <p>Rocket payload: ${spacedata.rocket.second_stage.payloads[0].payload_type}</p>
    </div>
    <div style="height:4.9rem"></div>
    `
};