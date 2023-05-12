
let todoItemServ=[],
container = document.getElementById('todo-app'),
titel = 'Новая задача';

   
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
//экспортим
export async function objDoneTrue(objId){
   await fetch('http://localhost:3000/api/todos/'+objId,{
      method: 'PATCH',
      headers:{ 'Content-Type':'application/json'},
      body:JSON.stringify({done:true})
 });
};
//экспортим
export async function objDoneFalse(objId){
   await fetch('http://localhost:3000/api/todos/'+objId,{
      method: 'PATCH',
      headers:{ 'Content-Type':'application/json'},
      body:JSON.stringify({done:false})
 });
};
//export
export async function getData(searchOwner){
   let response = await fetch('http://localhost:3000/api/todos/');
   let arr = await response.json();
   console.log(arr)
   arr.forEach((el)=>{
      console.log(searchOwner)
      if(el.owner==searchOwner){todoItemServ.push(el)}
   })

   console.log(todoItemServ);
   renderList(todoItemServ);
   todoItemServ=[];
 };
//exp
 export async function delItem(objId){
   await fetch('http://localhost:3000/api/todos/'+objId,{
      method: 'DELETE',
 });
 getData();
 };
 
   function createTodoApp(owner){
      let todoAppTitel = craeteAppTitel(titel+' '+owner.charAt(5));
      let todoItemForm = createTodoItemForm();
      
      container.append(todoAppTitel);
      container.append(todoItemForm.form);

      saveDataServ(todoItemForm,owner)
    
   };
         
  export function saveDataServ(todoItemForm,owner){
      todoItemForm.form.addEventListener('submit',async e=>{
         e.preventDefault();
        
       const response = await fetch('http://localhost:3000/api/todos',{
       method: 'POST',
       body: JSON.stringify({
        name: todoItemForm.input.value,
        owner: owner,
        done: false,
       }),
       headers:{
        'Content-Type': 'application/json',
       },
     }
       );
       
       container.innerHTML='';
       createTodoApp(owner);
       getData(owner);
        });
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
     item.classList.toggle('list-group-item-success');
     if(item.classList.contains('list-group-item-success')==true){
      objDoneTrue(Obj.id)
   ;}else{objDoneFalse(Obj.id)}
    });

   deletButton.addEventListener('click',()=>{
      if (confirm('Точно???')){
      delItem(Obj.id);
      item.remove();
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
