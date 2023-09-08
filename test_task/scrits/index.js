const mainContainer = document.querySelector('.main-container');
let btnsArr = [];
let wordsArr = [
    'дом', 'офис', 'вокзал', 'хранилище', 'стадион', 'касса', 'гостинница1', 'гостинница2', 'причал', 'отель'
]
let greenBtnsArr = [
    'вокзал', 'стадион', 'гостинница1', 'отель'
]
function createBtns() {

    for (let i = 0; i < wordsArr.length; i++) {
        let btn = document.createElement('div');
        btn.classList.add('btn-style');

        /* let btnVer = document.createElement('span');
         btnVer.classList.add('btn-span-ver');
 */
        let btnHor = document.createElement('span')
        btnHor.classList.add('btn-span-hor')

        btn.textContent = wordsArr[i];
        btn.append(btnHor)
        btnsArr.push(btn)
    }
    addBtns()
} createBtns();

function addBtns() {
    if (btnsArr.length !== 0) {
        btnsArr.forEach((el) => {
            mainContainer.append(el)
        })
    }
}




mainContainer.addEventListener('click', (e) => {

    function cleaningStyles() {
        let allButtons = document.querySelectorAll('.btn-style');

        allButtons.forEach((el) => {

            if (el.classList.contains('btn') && el.dataset.count !== undefined) {
                el.classList.remove('btn', 'btn-green-full', 'btn-blue-full')
                el.lastChild.style.display = 'none'
                delete el.dataset.count
                return
            }
        })
    }

    if (greenBtnsArr.indexOf(e.target.textContent) !== -1 && e.target.textContent.length < 15) {
        btnGreen();
        console.log('btnGrenDone')
        return
    }
    if (greenBtnsArr.indexOf(e.target.textContent) === -1 && e.target.textContent.length < 15) {
        btnBlue()
        console.log('btnBlueDone')
        return
    } else { cleaningStyles() }

    function btnGreen() {

        if (e.target.textContent.length < 15 && e.target.dataset.count === undefined) {
            cleaningStyles()

            e.target.classList.add('btn', 'btn-green-full');
            e.target.children[0].style.display = 'block';
            e.target.children[0].style.left = '16px';
            e.target.dataset.count = 1
            return
        } if (e.target.dataset.count === '1') {
            e.target.children[0].style.display = 'none';
            e.target.classList.remove('btn', 'btn-green-full');
            delete e.target.dataset.count
            return
        }

    }

    function btnBlue() {

        if (e.target.textContent.length < 15 && e.target.dataset.count === undefined) {
            cleaningStyles()
            e.target.classList.add('btn', 'btn-blue-full');
            e.target.children[0].style.display = 'block';
            e.target.children[0].style.left = '16px';
            e.target.dataset.count = 1
            return
        } if (e.target.dataset.count === '1') {
            e.target.children[0].style.display = 'none';
            e.target.classList.remove('btn', 'btn-blue-full', 'btn-green-full');
            delete e.target.dataset.count
            return
        }
    }
})



