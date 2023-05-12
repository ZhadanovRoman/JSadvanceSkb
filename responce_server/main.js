const majorMenu = {num:1,name:2};
const $starWarsList = document.querySelector('.sw-episodes-list');
const $starWarsEpisod = document.querySelector('.episode-dscr');
let allInfoResult=[],
  menuBox = document.createElement('div');


document.addEventListener('DOMContentLoaded',()=>{
    allInformation()
    
})

async function allInformation(){
    const res = await fetch('https://www.swapi.tech/api/films/');
    const allInfo = await res.json();
    
    processingRequest(allInfo)
};

function processingRequest(allInfo){
    allInfo.result.forEach(el=>{
allInfoResult.push( el.properties)
  })
   
    getEpisodName(allInfoResult);
    
};

function getEpisodName(arr){
    console.log(arr);
arr.forEach(element => {
     majorMenu.name = element.title;
    majorMenu.num = element.url.substr(-1,1);
    createSWList(majorMenu);
});
}

function createSWList(obj){
    console.log(obj);
    let link = document.createElement('a');
    link.classList.add('link-main-js');
    link.innerHTML = obj.num+')'+' '+obj.name+'<br>';
       
       menuBox.classList.add('menu-box-js');
       menuBox.append(link); 
       $starWarsList.append(menuBox); 
       
    
          link.addEventListener('click',(e)=>{
         let linkNumb = e.target.textContent.substr(0,1)
         history.pushState(null,'','?part'+linkNumb);
         getAllDataPart(linkNumb);
        e.preventDefault();
        $starWarsList.innerHTML='';
        $starWarsList.classList.remove('sw-episodes-list');
        allInfoResult=[];
    })
}
 
window.addEventListener('popstate',()=>{
    $starWarsList.innerHTML='';
    $starWarsList.classList.remove('sw-episodes-list1');
    $starWarsList.classList.add('sw-episodes-list');
    $starWarsList.append(menuBox);
    localStorage.clear();
})
    