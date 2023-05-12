
const $clientTable = document.querySelector('.crm-main-table'),
    $btnAddClient = document.querySelector('.crm-btn'),
    $addModal = document.querySelector('.crm-add-modal'),
    $modalInput = document.querySelectorAll('.crm-add-modal-inpt'),
    $modalSelectsContainer = document.querySelector('.crm-add-modal-selects'),
    $modalBtnAdd = document.querySelector('.crm-modal-btnAdd'),
    $modalClose = document.querySelector('.crm-modal-close'),
    $modalBtnSave = document.querySelector('.crm-modal-btnSave'),
    $modalWindow = document.querySelector('.modal'),
    $modalTitle = document.querySelector('.crm-modal-title'),
    $modalLinkBtn = document.querySelector('.crm-modal-btnCancel'),
    $starF = document.querySelector('.first-star'),
    $starS = document.querySelector('.second-star'),
    $modalErrorMessage = document.querySelector('.modal-error-message'),
    $formDescrInpt = document.querySelectorAll('.form-descr-inpt');
    let arrSelectsContact = document.querySelectorAll('.modal-selectJS'),
    arrInputsContacts = document.querySelectorAll('.modal-selectInptJS'),                                     
     markerModal = null;
   
  function coicesOn(el){
        const choices = new Choices(el,{
        searchEnabled: false,
        shouldSort: false,
    })
}

function deleteContactItem(delContactBtn){
      delContactBtn.addEventListener('click',function(e){
             delContactBtn.parentNode.remove();
         if($modalSelectsContainer.childNodes.length==0){
                $modalSelectsContainer.style.padding = '0';
            };
            });
            
};
////// purple-star
$modalInput[0].addEventListener('input',function(){
        if(this.value!=''){
            $starF.style.display='none';
            $modalErrorMessage.style.display = 'none';
    }else{
        $starF.style.display='block';
    }
    })
$modalInput[1].addEventListener('input',function(){
        if(this.value!=''){
            $starS.style.display='none';
            $modalErrorMessage.style.display = 'none';
    }else{
        $starS.style.display='block';
    }
    })
//////purple-star-end

if ($modalBtnSave) {
    $modalBtnSave.addEventListener('click', (e) => {
        e.preventDefault();
        if (markerModal==true) {
            let idPerson = document.querySelector('.title-span-idJS').textContent;
            getClientContacts(true, idPerson.substr(4));
        } else {
            getClientContacts();
        };
        $modalInput.forEach(el => {
            el.value = '';
        })
        let selectInpt = document.querySelectorAll('.modal-select-containerJS');
        selectInpt.forEach(el => {
            el.remove();
        })
    })
}

$modalBtnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    if($modalInput[0].value!=''&&$modalInput[1].value!=''){
    $modalSelectsContainer.style.padding = '25px 0 0 0 ';
 createContactSelect(); 
 
}else{
    $modalErrorMessage.style.display='block';
    $modalErrorMessage.textContent='Заполните обязательные для ввода поля!';
}
})

$btnAddClient.addEventListener('click', (e) => {
    markerModal=false;
    $formDescrInpt.forEach(el=>{
        el.style.display='none';
    })
    $starF.classList.remove('first-star-change');
    $starS.classList.remove('second-star-change');
    $modalSelectsContainer.innerHTML='';
    $modalTitle.textContent = 'Новый клиент';
    $modalWindow.style.display = 'block';
    $addModal.style.display = 'flex';
    $modalLinkBtn.textContent = 'Отмена';
})

$modalLinkBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (this.textContent == 'Отмена') {
        closeModal();
    }
    if (this.textContent == 'Удалить') {
        let idPerson = document.querySelector('.title-span-idJS').textContent
        del(idPerson.substr(4));
        closeModal();
    }
})

$modalClose.addEventListener('click', () => {
    closeModal();
    $modalSelectsContainer.style.padding = '0';
})


function closeModal() {
    $starF.style.display='block';
    $starS.style.display='block';
    $modalWindow.style.display = 'none';
    $addModal.style.display = 'none';
    if(document.querySelector('.title-span-idJS')){
        document.querySelector('.title-span-idJS').remove();
    }
    
    $modalInput.forEach(el => el.value = '');
}

function inputValidation() {
    $addModal.forEach(el => {
        if (el.value != String) {
        }
    })
}
function clearTableItems() {
    if ($clientTable.childNodes.length > 1) {
        let items = document.querySelectorAll('.main-table-row');
        items.forEach(el => el.style.display = 'none')

    }
}

function renderTable(arr) {
    
    let arrData
    clearTableItems();
    if (!arr || arr == ''){
        arrData = JSON.parse(localStorage.getItem('usData'));
    }else{ 
        arrData = arr; 
    };

     if(arrData){
    arrData.forEach(objData => {
        let rowClientData = document.createElement('tr');
        rowClientData.classList.add('main-table-row');
        let ID = document.createElement('td');
        ID.classList.add('item-id-js');
        let FIO = document.createElement('td');
        FIO.classList.add('item-FIO-js');
        let createTime = document.createElement('td');
        createTime.classList.add('item-createTime-js');
        let timeCreateSpan = document.createElement('span');
        timeCreateSpan.classList.add('time-create-spanJS');
        let changeTime = document.createElement('td');
        changeTime.classList.add('item-changeTime-js');
        let changeTimeSpan = document.createElement('span');
        changeTimeSpan.classList.add('time-create-spanJS');
        let contactsBlock = document.createElement('td');
        contactsBlock.classList.add('item-contacts-js');
        let action = document.createElement('td');
        action.classList.add('item-action-js');
        action.dataset.idNum = objData.id;
        let actionChange = document.createElement('span');
        actionChange.classList.add('item-action-changeJS');
        actionChange.textContent = 'Изменить';
        let zeroItem = document.createElement('td');
        zeroItem.classList.add('item-zero-js');
        zeroItem.dataset.idNumDel = objData.id;
        let zeroSpan = document.createElement('span')
        zeroSpan.classList.add('item-zeroSpan-js');
        zeroSpan.textContent = 'Удалить';
        let actionImg = document.createElement('img');
        actionImg.src = 'img/actionPenICON.svg';
        let delImg = document.createElement('img');
        delImg.src = 'img/deletICON.svg';


        ID.textContent = objData.id.slice(0, 6);
        FIO.textContent = objData.surname + ' ' + objData.name + ' ' + objData.lastName;

        let dateCreateFormat = objData.createdAt.slice(0, 10),
            timeCreateFormat = objData.createdAt.slice(11, 16);

        createTime.textContent = dateCreateFormat.split("-").reverse().join(".");
        timeCreateSpan.textContent = timeCreateFormat;
        createTime.append(timeCreateSpan)

        let dateUpdateFormat = objData.updatedAt.slice(0, 10),
        timeUpdateFormat = objData.updatedAt.slice(11, 16);

    changeTime.textContent = dateUpdateFormat.split("-").reverse().join(".");
    changeTimeSpan.textContent = timeUpdateFormat;
    changeTime.append(changeTimeSpan);

   
        objData.contacts.forEach((el) => {
            if (el.type) {
               
                let contactBox = document.createElement('div');
                contactBox.classList.add('contact-box-js');
                 let contactSpan = document.createElement('span');
                 contactSpan.classList.add('contact-triangle-js');
                 let contactDataSpan = document.createElement('span');
                 contactDataSpan.classList.add('contact-dataSpan-js');
                 
                 contactBox.append(contactDataSpan,contactSpan)

                if (el.type == 'Телефон'){
                    let phonImg = document.createElement('img');
                   phonImg.src = 'img/phoneICON.svg';
                   contactDataSpan.textContent=el.value;
                    contactBox.append(phonImg);
                   contactsBlock.append(contactBox);
               } if (el.type == 'Доп.телефон') {
                   let phonImg = document.createElement('img');
                   phonImg.src = 'img/phoneICON.svg';
                   contactDataSpan.textContent=el.value;
                   contactBox.append(phonImg);
                   contactsBlock.append(contactBox);
               } if (el.type == 'Email') {
                   let mailImg = document.createElement('img');
                   mailImg.src = 'img/mailICON.svg';
                   contactDataSpan.textContent=el.value;
                   contactBox.append(mailImg);
                   contactsBlock.append(contactBox);
               } if (el.type == 'VK') {
                   let vkImg = document.createElement('img');
                   vkImg.src = 'img/vkICON.svg';
                   contactDataSpan.textContent=el.value;
                   contactBox.append(vkImg);
                   contactsBlock.append(contactBox);
               } if (el.type == 'Facebook') {
                   let fbImg = document.createElement('img');
                   fbImg.src = 'img/fbICON.svg';
                   contactDataSpan.textContent=el.value;
                   contactBox.append(fbImg);
                   contactsBlock.append(contactBox);
               }if(el.type == 'Другое'){
                   let otherImg = document.createElement('img');
                   otherImg.src = 'img/otherContactICON.svg';
                   contactDataSpan.textContent=el.value;
                   contactBox.append(otherImg);
                   contactsBlock.append(contactBox);
               } 
            };
        });
    
        action.append(actionImg, actionChange)
        zeroItem.append(delImg, zeroSpan);

        deletClient(zeroItem);
        changeClient(action);
        rowClientData.append(ID, FIO, createTime, changeTime, contactsBlock, action, zeroItem);

        $clientTable.append(rowClientData)
         
        
    });//  
}//arrData--end   
           let toolTip = document.querySelectorAll('.contact-dataSpan-js'),
            triangle = document.querySelectorAll('.contact-triangle-js'),
           contBox = document.querySelectorAll('.contact-box-js');
           for(let i=0; i<contBox.length; i++){
            contBox[i].addEventListener('mouseover',function(){
                triangle[i].style.display='block';
                toolTip[i].style.display='block';
                })
            contBox[i].addEventListener('mouseout',function(){
                    triangle[i].style.display='none';
                    toolTip[i].style.display='none';
                    
                    })

            }
           }
          


function createContactSelect(typeSel,valSel) {
    let contactsArr = [];
   if($modalSelectsContainer.childNodes.length==10){
    $modalBtnAdd.style.display ='none';
   }else{$modalBtnAdd.style.display ='block';
};

    if($modalSelectsContainer.childNodes.length<10){
        $modalSelectsContainer.style.padding = '25px 0 0 0 ';
            contactsArr = ['Телефон', 'Доп.телефон', 'Email', 'VK', 'Facebook','Другое'];

            let selectContainer = document.createElement('div');
            selectContainer.classList.add('modal-select-containerJS');
            let select = document.createElement('select');
            select.classList.add('modal-selectJS');
            
            contactsArr.forEach((el) => {
                let selOption = document.createElement('option');
                selOption.classList.add('select-option')
                selOption.value = el
                selOption.textContent = el;
                select.appendChild(selOption);
            })
            if(typeSel){select.value = typeSel};
            let inputSelect = document.createElement('input');
        inputSelect.classList.add('modal-selectInptJS');
        if(valSel){
            inputSelect.value = valSel
        }else{
        inputSelect.placeholder = 'Введите данные контакта';
        };

        let divSelectClose = document.createElement('div');
    divSelectClose.classList.add('modal-divSelectCloseJS');
    let selectCloseSvg = document.createElement('img');
    selectCloseSvg.src = 'img/plus_in_circle45deg.svg';

    divSelectClose.append(selectCloseSvg);
    selectContainer.append(select, inputSelect, divSelectClose);
    $modalSelectsContainer.append(selectContainer);
    coicesOn(select);
   inputSelect.addEventListener('keyup',function(){
        divSelectClose.style.display ='flex';
        this.style.width='55%';
      })
      deleteContactItem(divSelectClose)
  }
}

function getClientContacts(marker, id) {
    let arrayContacts = [];
    let arrSelectsContact = document.querySelectorAll('.modal-selectJS');
   let arrInputsContacts = document.querySelectorAll('.modal-selectInptJS');
    for (let i = 0; i < arrSelectsContact.length; i++) {
        let objCont = {
            
            type: arrSelectsContact[i].value,
            value: arrInputsContacts[i].value
        }
        arrayContacts.push(objCont);

    }
    createClient(arrayContacts, marker, id);
    arrayContacts=[];
    
}

function createClient(arr, marker, id) {
    
    let clientNew = {
        surname: $modalInput[0].value,
        name: $modalInput[1].value,
        lastName: $modalInput[2].value,
        contacts: arr
    }
    
    if (!marker) {
        postData(clientNew);
    } else { changeData(id, clientNew) }
    return clientNew;
}

function changeClient(changeBtn) {
    let idPerson;
    changeBtn.addEventListener('click', function (){
        
        $formDescrInpt.forEach(el=>{
            el.style.display='block';
        })
        $starF.classList.add('first-star-change');
        $starS.classList.add('second-star-change');
        markerModal = true;
        idPerson = this.dataset.idNum;
        $modalWindow.style.display = 'block';
        $modalSelectsContainer.innerHTML='';
      
        getPersonalData(idPerson);
        $addModal.style.display = 'flex';
        $modalTitle.textContent = 'Изменить данные';
        $modalLinkBtn.textContent = 'Удалить';
        let titleSpan = document.createElement('span');
        titleSpan.textContent = 'ID:'+' '+ idPerson;
        titleSpan.classList.add('title-span-idJS')
        $modalTitle.append(titleSpan);
    })

}

function modalRender(obj) {
   

    $modalInput[0].value = obj.surname;
    $modalInput[1].value = obj.name;
    $modalInput[2].value = obj.lastName
    if(obj.contacts){
     obj.contacts.forEach(el=>{
        createContactSelect(el.type,el.value)
     }) 
    }
}
