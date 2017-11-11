
async function getvals(){
    let result = await fetch('https://gist.githubusercontent.com/alexhagen/da70c9cd16341f2d8c5ff658099ca86f/raw/9252d920fef40aec2bb3b3d944d500e2fe5bd7aa/entries.json',
    {
    	method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch(error => console.warn(error));
    return result;
  }

export var ENTRIES1 = getvals();
