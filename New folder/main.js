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

const channels = ["linustechtips","comicstorian","shortcircut","hardwarecanucks","techquickie","motogp","engineeringexplained","crunchyroll","randomfrankp","carwow"]
load_youtube()
async function load_github(){
    let git_url = "https://api.spacexdata.com/v3/launches"
    const git_repsonse = await fetch(git_url)
    const git_data = await git_repsonse.json()

}

function load_gitdata(gitdata){

}

function load_youtube(){
    let base_youtube_url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername="
    let end_youtube_url = "&key=AIzaSyDnDRQc-4KUg6uJFZK3FY2qHBdpB1KVqtY"
    let channel_name = ""
    // test(base_youtube_url+"linustechtips"+end_youtube_url)
    // const test_data = await fetch(base_youtube_url+"linustechtips"+end_youtube_url)
    channels.forEach(element => {
        channel_name = element
        console.log(element)
        const test_data = test(base_youtube_url+element+end_youtube_url)
        // const test = await test_data.json
        // console.log(test)
    });
}

async function test(url){
    const data = await fetch(url)
    const json_data = await data.json()

    dat_test(json_data.items[0].snippet.thumbnails.medium.url)
    // console.log(json_data.items[0].snippet.thumbnails.medium.url)
    // document.getElementById("youtube").innerHTML = `
    //     <img src="${json_data.items[0].snippet.thumbnails.medium.url}">
    // `
    // console.log(url)
    // console.log(json_data.items[0].snippet.thumbnails.medium.url)
    // let original_html = document.getElementById("youtube")
    // original_html.innerHTML += '<img src="${json_data.items[0].snippet.thumbnails.medium.url}>"'
    // let new_html = '<img src="${json_data.items[0].snippet.thumbnails.medium.url}>"';
    // document.getElementById("youtube").innerHTML = new_html
    // console.log(document.getElementById("youtube").innerHTML)
}

function dat_test(info){
    let original_html = document.getElementById("youtube")
    original_html.innerHTML += `<img src="${info}">`
}