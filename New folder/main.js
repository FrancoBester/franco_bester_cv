// AIzaSyDnDRQc-4KUg6uJFZK3FY2qHBdpB1KVqtY - youtube_aut
// http://www.youtube.com/watch?v={video_id_here}
// LTT - https://www.googleapis.com/youtube/v3/search?key=AIzaSyDnDRQc-4KUg6uJFZK3FY2qHBdpB1KVqtY&channelId=UCXuqSBlHAE6Xw-yeJA0Tunw&part=snippet,id&order=date&maxResults=20
// comic - UCmA-0j6DRVQWo4skl8Otkiw 
// yammie - UCkegEsZItEPQNItECCZA_pw
// donut - UCL6JmiMXKoXS6bpP1D3bk8g
// demolition - UCBvc7pmUp9wiZIFOXEp1sCg
// short - UCdBK94H6oZT2Q7l0-b0xmMg
// hardware - UCTzLRZUgelatKZ4nyIKcAbg
// tech - UChIZGfcnjHI0DG4nweWEduw
// dave2d - UCVYamHliCI9rw1tHR1xbkfw
// quick - UC0vBXGSyV14uvJ4hECDOl0Q
// linked - UCeeFfhMcJa1kjtfZAGskOCA
// spacex - https://api.spacexdata.com/v3/launches
// https://api.spacexdata.com/v3/launches

// https://www.googleapis.com/youtube/v3/channels?part=contentDetails&channelId=UCmA-0j6DRVQWo4skl8Otkiw &key=AIzaSyDnDRQc-4KUg6uJFZK3FY2qHBdpB1KVqtY 
// get channel logo -https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=linustechtips&key=AIzaSyDnDRQc-4KUg6uJFZK3FY2qHBdpB1KVqtY

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
    <p><a href="#Links" onclick=open_new_window("${githubdata.html_url.slice(7,40)}")>Github account information</a></p> 
    <div class="background_api">
    <img src="${githubdata.avatar_url}"/>
    <p>Account name: ${githubdata.login}</p>
    <p>Account type: ${githubdata.type}</p>
    <p>Lastest upload: ${githubdata.updated_at.slice(0,10) + " " + githubdata.updated_at.slice(11,19)}</p>
    <p>On Github since: ${githubdata.created_at.slice(0,10)}</p>
    </div>
    `
}

function load_youtube(){
    let base_youtube_url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername="
    let end_youtube_url = "&key=AIzaSyDnDRQc-4KUg6uJFZK3FY2qHBdpB1KVqtY"
    channels.forEach(element => {
        channel_name = element
        // console.log(element)
        get_channel_image(base_youtube_url+element+end_youtube_url)
    });
}

async function get_channel_image(youtube_url){
    const raw_data = await fetch(youtube_url)
    const json_data = await raw_data.json()
    load_youtube_html(json_data.items[0].snippet.thumbnails.medium.url)
}

function load_youtube_html(channel_info){
    let original_html = document.getElementById("youtube")
    original_html.innerHTML += `<img src="${channel_info}" class='youtube_coin'>`
}