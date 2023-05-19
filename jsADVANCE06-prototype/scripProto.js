const $listW = document.querySelector('.list-elements'),
 $form = document.querySelector('.form'),
 $input = document.querySelector('.form-input');

 let arrProp = [],
 marker=true;

document.addEventListener('DOMContentLoaded',()=>{
    $form.addEventListener('submit',function(e){
        
        e.preventDefault();
        $listW.innerHTML='';

    getProto($input.value);
    
           
    });
    $input.addEventListener('input',()=>{
        $input.style.border='1px solid grey';
        arrProp=[];
    })
}
)

function getProto(value){
    $input.value='';
    if(typeof window[value] === "function"){
        let arr=[];
        let x = (window[value].prototype);
           if(x.__proto__){
            let objKeys =Object.keys(x.__proto__);
          
        for(let i in objKeys){
            arr.push(objKeys[i])
        }
    }
        console.log(x.constructor.name)
          if(x.constructor.name){  /////////// нужно настроить этот иф чтоб появлялся 6й элемент
            createList(x.constructor.name,arr);
    
        }else{ createList('Object');}
   try{
    getProto(x.__proto__.constructor.name)
}catch{}
        
    
    }
  
    if($listW.childNodes.length==0){
        $input.style.border='1px solid red';
        
    };
}


function createList(obj,prop){
    let propList = document.createElement('ol');
    propList.classList.add('prop-list');
       propList.style.display='none';
       if(prop){
        prop.forEach(element => {
            let propItem = document.createElement('li');
            propItem.classList.add('prop-item')
            propItem.textContent=element//+':'+(typeof element);
            propList.append(propItem);
        });
    };
        let item = document.createElement('li');
        item.classList.add('list-item');
        item.textContent = obj;
        item.append(propList)
        $listW.append(item);

        item.addEventListener('click',function(){
               if(marker==true){
             this.childNodes[1].style.display='block';
             marker=false;
            }else{
                this.childNodes[1].style.display='none';
                marker=true;
            }
        })
}