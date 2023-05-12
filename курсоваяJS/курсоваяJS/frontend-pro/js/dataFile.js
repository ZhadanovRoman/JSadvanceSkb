const dataArray = [];
const $sortItems = document.querySelectorAll('.major-row-item');
const $sortItemSvg = document.querySelectorAll('.major-item-svg');
const $headerInput = document.querySelector('.header-search-input');
let count = true;





document.addEventListener('DOMContentLoaded', () => {
    if(JSON.parse(localStorage.getItem('usData'))===null){
        getData()
    }else{
    renderTable()
}
})

async function getData() {
    const res = await fetch('http://localhost:3000/api/clients');
    const data = await res.json();
    localStorage.setItem('usData', JSON.stringify(data));
    renderTable();
}

async function postData(obj) {
    console.log(obj)
    await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    getData();
}

async function del(id) {
    await fetch('http://localhost:3000/api/clients/'+id, {
        method: 'DELETE'
    })
    getData();
}

async function changeData(id,obj){
      await fetch('http://localhost:3000/api/clients/'+id, {
        method: 'PATCH',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    });
getData();
}

function deletClient(delBtn) {
    let modalDelet = document.querySelector('.crm-delete-modal');
    clientItem = document.querySelectorAll('.main-table-row');
    delBtn.addEventListener('click', function(e){
        let id = this.dataset.idNumDel;
        $modalWindow.style.display = 'block';
        modalDelet.style.display = 'flex';

        let delModBtn = document.getElementById('delete-modal-btn');
        delModBtn.addEventListener('click', () => {
            del(id);
            id=null;
            $modalWindow.style.display = 'none';
            modalDelet.style.display = 'none';
        })

        let delModClose = document.getElementById('delete-modal-close');
        delModClose.addEventListener('click', (() => {
            modalDelet.style.display = 'none';
            $modalWindow.style.display = 'none';
        }))
    })
}



$sortItems[0].addEventListener('click', (e) => {
    let dataArray = JSON.parse(localStorage.getItem('usData'));
    if (count == true) {
        dataArray.sort((a, b) => a.id - b.id);
        localStorage.setItem('usData', JSON.stringify(dataArray))
        renderTable();
        $sortItemSvg[0].style.transform = 'rotate(180deg)'
        count = false;
    } else {
        dataArray.sort((a, b) => b.id - a.id);
        localStorage.setItem('usData', JSON.stringify(dataArray))
        renderTable();
        $sortItemSvg[0].style.transform = 'rotate(360deg)'
        count = true;
    }
})
$sortItems[1].addEventListener('click', (e) => {
    let dataArray = JSON.parse(localStorage.getItem('usData'));
    if (count == true) {
        dataArray.sort((a, b) => a.surname.localeCompare(b.surname));
        localStorage.setItem('usData', JSON.stringify(dataArray))
        renderTable();
        $sortItemSvg[1].style.transform = 'rotate(180deg)'
        count = false;
    } else {
        dataArray.sort((a, b) => b.surname.localeCompare(a.surname));
        localStorage.setItem('usData', JSON.stringify(dataArray))
        renderTable();
        $sortItemSvg[1].style.transform = 'rotate(360deg)'
        count = true;
    }
})
$sortItems[2].addEventListener('click', (e) => {
    let dataArray = JSON.parse(localStorage.getItem('usData'));
    if (count == true) {
        dataArray.sort((a, b) => a.id - b.id);
        localStorage.setItem('usData', JSON.stringify(dataArray))
        renderTable();
        $sortItemSvg[2].style.transform = 'rotate(180deg)'
        count = false;
    } else {
        dataArray.sort((a, b) => b.id - a.id);
        localStorage.setItem('usData', JSON.stringify(dataArray))
        renderTable();
        $sortItemSvg[2].style.transform = 'rotate(360deg)'
        count = true;
    }
})
$sortItems[3].addEventListener('click', (e) => {
    let dataArray = JSON.parse(localStorage.getItem('usData'));
    if (count == true) {
        console.log(dataArray)
        dataArray.sort(function(a, b){
        return (a.updatedAt.slice(0, 10)+a.updatedAt.slice(11, 16)).localeCompare(b.updatedAt.slice(0, 10)+b.updatedAt.slice(11, 16))
    })
        localStorage.setItem('usData', JSON.stringify(dataArray))
        renderTable();
        $sortItemSvg[3].style.transform = 'rotate(180deg)'
        count = false;
    } else {
        dataArray.sort(function(a, b){
         return (b.updatedAt.slice(0, 10)+b.updatedAt.slice(11, 16)).localeCompare(a.updatedAt.slice(0, 10)+a.updatedAt.slice(11, 16))  
    });
        localStorage.setItem('usData', JSON.stringify(dataArray))
        renderTable();
        $sortItemSvg[3].style.transform = 'rotate(360deg)';
        count = true;
    }
})
//поиск
let inter
$headerInput.addEventListener('keyup', () => {
    clearInterval(inter);
    inter = setInterval(search, 1300);
})

function search() {
    let arrData = JSON.parse(localStorage.getItem('usData'));
    let arrDone = [];
    if ($headerInput.value != '') {
        console.log($headerInput.value);
        arrData.forEach(s => {
            Object.values(s).forEach(el => {
                if (el.indexOf($headerInput.value) !== -1) {
                    arrDone.push(s);
                }
                arrFilter(arrDone)
            })
        });
    };

    function arrFilter(arr) {
        for (var q = 1, i = 1; q < arr.length; ++q) {
            if (arr[q] !== arr[q - 1]) {
                arr[i++] = arr[q];
            }
        }
        arr.length = i;
        return arrDone = arr;
    }
    renderTable(arrDone)
    clearInterval(inter);
};
//поиск-----


async function getPersonalData(id){
    let res = await fetch('http://localhost:3000/api/clients/'+id)
    let clientData = await res.json()
    modalRender(clientData)
}
