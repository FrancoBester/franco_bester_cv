const channels = ["linustechtips","comicstorian","hardwarecanucks","techquickie","motogp","engineeringexplained","crunchyroll","randomfrankp"]
load_youtube()
load_github()
async function load_github(){
    let git_url = "https://api.github.com/users/FrancoBester"
    const git_repsonse = await fetch(git_url)
    const git_data = await git_repsonse.json()
    load_gitdata_html(git_data)
}

function load_gitdata_html(githubdata){
    document.getElementById("github").innerHTML=`
    <img src="${githubdata.avatar_url}"/>
    <h4 class="github_text">Account link:  <a href=#Links onclick=open_new_window("${githubdata.html_url.slice(7,40)}") style="color: #e61251;">github-FrancoBester</a></h4> 
    <h4 class="github_text">Account name: ${githubdata.login}</h4>
    <h4 class="github_text">Account type: ${githubdata.type}</h4>
    <h4 class="github_text">Lastest commit: ${githubdata.updated_at.slice(0,10)}</h4>
    <h4 class="github_text">On Github since: ${githubdata.created_at.slice(0,10)}</h4>
    `
}

function load_youtube(){
    let base_youtube_url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername="
    let end_youtube_url = "&key=AIzaSyDnDRQc-4KUg6uJFZK3FY2qHBdpB1KVqtY"
    channels.forEach(element => {
        channel_name = element
        get_channel_image(base_youtube_url+element+end_youtube_url)
    });
}

async function get_channel_image(youtube_url){
    const raw_data = await fetch(youtube_url)
    const json_data = await raw_data.json()
    load_youtube_html(json_data.items[0].snippet)
}

function load_youtube_html(channel_info){
    let original_html = document.getElementById("youtube")
    let youtube_link = "www.youtube.com/"+(channel_info.title).replaceAll(" ","")
    // console.log(youtube_link)
    original_html.innerHTML += `<a href=#Links onclick=open_new_window("${youtube_link}")><img src="${channel_info.thumbnails.high.url}" class='youtube_coin'> </a>`
}

function open_new_window(URL){//function used to open other webpages in a new browser window
    window.open("https://"+URL);
};