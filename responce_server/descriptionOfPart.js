let planetsArr = [],
 speciesArr = [],
 cssPromises= {};


async function getAllDataPart(num){
    let res = await fetch('https://www.swapi.tech/api/films/'+num),
     data = await res.json(), 
     speciesUrlArr=[],
     planetUrlArr=[];

   speciesData = data.result.properties.species,
   planetsData = data.result.properties.planets;

   planetsData.forEach((el)=>{
    planetUrlArr.push(fetch(el).then(res=>res.json()));
   })
   loadDataServer(planetUrlArr);
   
   speciesData.forEach((el)=>{
    speciesUrlArr.push(fetch(el).then(res=>res.json()));
   })
   loadDataServer(speciesUrlArr,data.result.properties);

    $starWarsList.innerHTML='LOADING...';
   return data;
}; 

 async function createDscriptOfPart(part){
    $starWarsList.innerHTML='';
    $starWarsList.classList.add('sw-episodes-list1');
    let titelPart = document.createElement('h1');
    titelPart.classList.add('dop-titel-js');
    titelPart.innerHTML=part.title+' '+'episode  '+part.episode_id;
    $starWarsList.append(titelPart);
    let backBtn = document.createElement('button');
    backBtn.addEventListener('click',()=>{
        history.back();
    })
    backBtn.textContent='Back to episodes';
    backBtn.classList.add('dop-btn-js');
    $starWarsList.append(backBtn);
    let openingCrawl = document.createElement('p');
    openingCrawl.innerHTML=part.opening_crawl;
    openingCrawl.classList.add('dop-openingCrawl-js')
    $starWarsList.append(openingCrawl);
    
    let titelPlanet = document.createElement('h2');
    titelPlanet.innerHTML='Planets';
    titelPlanet.classList.add('dop-title-planet-js')
    $starWarsList.append(titelPlanet);
    
   planetsArr.forEach(el=>{
    createObjectsList(el.result.properties.name);
   })

    let titelSpecies = document.createElement('h2');
    titelSpecies.innerHTML='Species';
    titelSpecies.classList.add('dop-title-species-js')
    $starWarsList.append(titelSpecies);
  speciesArr.forEach(el=>{
    createObjectsList(el.result.properties.name);
   });
   loadStyles('./styles-dop.css');
    };

 function createObjectsList(obj){
    let objectsList = document.createElement('ul');
    objectsList.classList.add('dop-ul-js')
    let item = document.createElement('li');
   item.href = 'part.html'
    item.classList.add('dop-itemLi-js')
    item.innerHTML = obj;
    objectsList.append(item);
    $starWarsList.append(objectsList);
 };


 function getDataList(arrUrl){
   return Promise.all(
    arrUrl
    ).then((el)=>{
        if(el[0].result.description=="A planet."){
            planetsArr=el;
        }else{speciesArr=el};
    } 
   )
    }; 
     
    async function loadDataServer(arr,data){
             await getDataList(arr);
            createDscriptOfPart(data);
        };

    function loadStyles(src){
        if(!cssPromises[src]){
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = src;
       cssPromises[src] = new Promise(resolve=>{
            link.addEventListener('load',()=>resolve());    
    });document.head.append(link);
} return cssPromises[src];
    }

