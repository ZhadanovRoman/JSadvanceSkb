let todoItemLocal=[],
    todoItemServ=[],
      container = document.getElementById('todo-app'),
      titel = 'Новая задача',
      itemList = [],
      lastId = 0,
      btnStorage = document.createElement('button'),
      marker=false
      
    const $nav = document.querySelector('.nav');
   
    btnStorage.addEventListener('click',()=>{ 
      
      switch (JSON.parse(localStorage.getItem('marker'))) {
         case null:
         case false:
            btnStorage.classList.remove('btn-info');
            btnStorage.classList.add('btn-warning');
            btnStorage.textContent='Перейти на СЕРВЕРНОЕ хранилище';
            marker=true;
            localStorage.setItem('marker',JSON.stringify(true))
            console.log(JSON.parse(localStorage.getItem('marker')))
            
           break;
       
         case true:
            btnStorage.classList.remove('btn-warning');
            btnStorage.classList.add('btn-info');
               btnStorage.textContent='Перейти на ЛОКАЛЬНОЕ хранилище'
               marker=false;
               
              localStorage.setItem('marker',JSON.stringify(false));
              console.log(JSON.parse(localStorage.getItem('marker')))
              
           break; 
       }
       location.reload()
})
function domContLoad(){
document.addEventListener('DOMContentLoaded',()=>{
  let lastOwner = localStorage.getItem('linkNumb');
  container.innerHTML='';
  if(JSON.parse(lastOwner)==null){
   loader('owner1')
  }else{
  loader(JSON.parse(lastOwner));
  }
})
}domContLoad()
document.querySelectorAll('.nav-link').forEach((a)=>{
      a.addEventListener('click',(e) => {
         e.preventDefault();
         container.innerHTML='';
         loader(a.dataset.link);
         localStorage.setItem('linkNumb',JSON.stringify(a.dataset.link));
       }
      )
   });
 ///----- 
function loader(owner){
         createTodoApp(owner);
         
         if(JSON.parse(localStorage.getItem('marker'))==true){
         loadData(owner);
         }else{getData(owner)}//<---в этот пункт добавить if(){getData(owner);}
  };
   
   function craeteAppTitel(titel){
        let appTitel = document.createElement('h2');
        appTitel.innerHTML = titel;
        return appTitel;
      }
     // 
function createTodoItemForm(){
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');
    
    form.classList.add('input-group','mb-3');
    input.classList.add('form-control');
    input.placeholder = 'введите название новой задачи';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn','btn-primary');
    button.textContent = 'Добавить задачу';
    
    button.setAttribute('disabled',true);
    input.addEventListener('input',function(){
     button.disabled = false;
     
     if (input.value ==''){
      button.disabled = true;
     }
    });

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);
    return {form,input,button};
};
//
 function createTodoList(){
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
 };
 //
function renderList(arrData){
   arrData.forEach(element => {
      createTodoItem(element);
   });
};
//импортим 
import {objDoneTrue as objDoneTrueServ} from './main-second.js'

function objDoneTrue(id){
   itemList.forEach(el=>{
      if(el.id==id){
         el.done=true;
      }
 }
);
localStorage.setItem('addItem', JSON.stringify(itemList));
}

//импортим 

import {objDoneFalse as objDoneFalseServ} from './main-second.js'

function objDoneFalse(id){
   itemList.forEach(el=>{
      if(el.id==id){
         el.done=false;
      }
 }
);
localStorage.setItem('addItem', JSON.stringify(itemList));
}


function saveData(obj){

   if(obj==null){
     console.log('пусто');
   }else{
    let objWhithID = {id:lastId++,...obj}
    itemList.push(objWhithID);
      localStorage.setItem('addItem', JSON.stringify(itemList));
      localStorage.setItem('lastItemId', lastId);
  }
}


//import
import { getData } from './main-second.js';

function loadData(searchOwner){
  
   const itemJSON = localStorage.getItem('addItem');
   if(itemJSON) {
       itemList = JSON.parse(itemJSON);
   }
   const lastIdJSON = localStorage.getItem('lastItemId');
   if(lastIdJSON) {
       lastId = parseInt(lastIdJSON);
   }
   itemList.forEach((el)=>{
      if(el.owner==searchOwner){todoItemLocal.push(el)}
   })
   renderList(todoItemLocal);
   todoItemLocal=[];
};

//imp
import { delItem as delItemServ} from './main-second.js';

 function delItem(id){
   itemList= itemList.filter(el => el.id!= id);

console.log(itemList)
localStorage.setItem('addItem', JSON.stringify(itemList));
 }
 
 import {saveDataServ} from './main-second.js'

   function createTodoApp(owner){
      let todoAppTitel = craeteAppTitel(titel);
      let todoItemForm = createTodoItemForm();
      
      container.append(todoAppTitel);
      container.append(todoItemForm.form);
      if(JSON.parse(localStorage.getItem('marker'))==false||JSON.parse(localStorage.getItem('marker'))==null){
         btnStorage.classList.add('btn','btn-warning');
         btnStorage.textContent='Перейти на ЛОКАЛЬНОЕ хранилище';
         }else{
            btnStorage.classList.add('btn','btn-info');
            btnStorage.textContent='Перейти на СЕРВЕРНОЕ хранилище';
         }
         $nav.append(btnStorage);
      //////////////////////////saveData
      
      
      if(JSON.parse(localStorage.getItem('marker'))==true){
      todoItemForm.form.addEventListener('submit', e=>{
         e.preventDefault();
        
      let newItem={
        name: todoItemForm.input.value,
        owner: owner,
        done: false,
       }
     saveData(newItem);
     container.innerHTML='';
     createTodoApp(owner);
     loadData(owner);
        }
       );
      }else{
         saveDataServ(todoItemForm,owner)
      }
        };
       
function createTodoItem(Obj){
   let item = document.createElement('li');
   let buttonGroup = document.createElement('div');
   let doneButton = document.createElement('button');
   let deletButton = document.createElement('button');
   let todoList = createTodoList();
   item.innerHTML = Obj.name;
   
// 
    
if(Obj.done==true){item.classList.add('list-group-item-success')}
   
    doneButton.addEventListener('click',()=>{
      if(JSON.parse(localStorage.getItem('marker'))==true){
     item.classList.toggle('list-group-item-success');
     if(item.classList.contains('list-group-item-success')==true){
      objDoneTrue(Obj.id)
   ;}else{objDoneFalse(Obj.id)}
}else{
   item.classList.toggle('list-group-item-success');
   if(item.classList.contains('list-group-item-success')==true){
    objDoneTrueServ(Obj.id)
 ;}else{objDoneFalseServ(Obj.id)}
}
    });

   deletButton.addEventListener('click',()=>{
      if(JSON.parse(localStorage.getItem('marker'))==true){
      if (confirm('Точно???')){
      delItem(Obj.id);
      console.log(Obj.id)
      item.remove();
      }
   }else{
      if (confirm('Точно???')){
         delItemServ(Obj.id);
         item.remove();
         }
   }
   });

item.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
buttonGroup.classList.add('btn-group','btn-group-sm');
doneButton.classList.add('btn','btn-success');
doneButton.textContent = 'Готово';
deletButton.classList.add('btn','btn-danger');
deletButton.textContent = 'Удалить';

buttonGroup.append(doneButton);
buttonGroup.append(deletButton);
item.append(buttonGroup);
todoList.append(item);
container.append(todoList);
todoItemServ=[];
return {
   item,
   doneButton,
   deletButton
};     
}
