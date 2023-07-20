function loadEnvFile(fileUrl) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', fileUrl, true);
      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error('Failed to load .env file'));
        }
      };
      xhr.onerror = function() {
        reject(new Error('Failed to load .env file'));
      };
      xhr.send();
    });
  }
  
  function parseEnvFile(envFileContents) {
    const envVariables = {};
    envFileContents.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      envVariables[key.trim()] = value.trim();
    });
    return envVariables;
  }
  
  function loadEnvVariables(fileUrl) {
    return loadEnvFile(fileUrl)
      .then(parseEnvFile)
      .catch(error => {
        console.error('Error loading .env file:', error);
        return {};
      });
  }
  
  // Usage
  const fileUrl = 'test.env';
  loadEnvVariables(fileUrl)
    .then(envVariables => {
      // Access the environment variables
        const apiKey = envVariables.API_KEY;

        var script = document.createElement('script');
        
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey;

        script.onload = function () {
            initializeMap()
        }

        document.head.appendChild(script)
    });




function initializeMap(){
    const _lat = -26.702110800131113
    const _lang = 27.832158768111785
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: _lat, lng: _lang},
        zoom: 15
      });
    
      var marker = new google.maps.Marker({
        position: {lat: _lat, lng: _lang},
        map: map
      });
}




































// function fetchData(){

//     return fetch('test.env')
//         .then(response => response.text())
//         .then(envFileContents => {
//             // Parse the key-value pairs from the .env file
//             const envVariables = {};
//             envFileContents.split('\n').forEach(line => {
//             const [key, value] = line.split('=');
//             envVariables[key] = value;
//             });

//             // Access the environment variables
//             const apiKey = envVariables.API_KEY;

//             var script = document.createElement('script');
        
//             script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey;
//             console.log(script.src)

//             document.addEventListener('DOMContentLoaded', function(){
//                 document.body.appendChild(script);
                
//             })

//         })
//     .catch(error => {
//         console.error('Error loading .env file:', error);
//     });
// }

// fetchData()
// .then(() => {
//     initializeMap()
// })