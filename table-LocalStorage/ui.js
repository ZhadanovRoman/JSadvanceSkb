class UIManager {
    dataManager = null;
    constructor(){
        this.dataManager = new DataManager(this.renderTable.bind(this));
        document.querySelector('.form-input').addEventListener('submit', this.onFormSubmit.bind(this));
        document.querySelectorAll('.thead-dark th').forEach(th => 
            th.addEventListener('click', this.onClickSort.bind(this, th.getAttribute('data-sort-field'))));

        document.querySelectorAll('.form-search input[data-field]').forEach(input => 
            input.addEventListener('change', this.onChangeFilterInput.bind(this, input.getAttribute('data-field'), input)));
    }

    renderTable(displayItems) {
        let tableBody = document.querySelector('.tbody');
        tableBody.innerHTML = '';
        console.log(displayItems);
        for(const student of displayItems) {
            const row = this.createStudentRow(student);
            tableBody.append(row);
        }
    }

    onChangeFilterInput(fields, input){
        this.dataManager.setFilterCriteria(fields, input.value);
    }

    createStudentRow(student) {
        
        let studTr = document.createElement('tr');
        studTr.classList.add('obj-tr');
        let tdFIO = document.createElement('td');
        tdFIO.classList.add('obj-name', 'td-obj');
        let tdFacult = document.createElement('td');
        tdFacult.classList.add('obj-facul', 'td-obj');
        let tdStudBirthday = document.createElement('td');
        tdStudBirthday.classList.add('obj-birthd', 'td-obj');
        let tdStudStudyYears = document.createElement('td');
        tdStudStudyYears.classList.add('obj-study', 'td-obj');
        tdFIO.innerHTML = student.surname + " " + student.name + " " + student.lastname;
        tdFacult.innerHTML = student.facultet;
        tdStudBirthday.innerHTML = student.birthday;
        tdStudStudyYears.innerHTML = student.yearStudy;
        studTr.append(tdFIO, tdFacult, tdStudBirthday, tdStudStudyYears);
        return studTr;
    }
    onClickSort(fields) {
        this.dataManager.setSortField(fields);
    }
    onFormSubmit(e) {
        
        e.preventDefault();
        const values = [
            this.validateAndGetStringValue(document.querySelector('.form-group-div:has(input#surname)')),
            this.validateAndGetStringValue(document.querySelector('.form-group-div:has(input#name)')),
            this.validateAndGetStringValue(document.querySelector('.form-group-div:has(input#lastname)')),
            this.validateAndGetStringValue(document.querySelector('.form-group-div:has(input#facultet)')),
            this.validateAndGetDateValue(document.querySelector('.form-group-div:has(input#input-birthday)')),
            this.validateAndGetYearValue(document.querySelector('.form-group-div:has(input#input-study)'))];
        if(values.indexOf(null) > -1){
            return;
        }
        const newItem = {
            surname: values[0],
            name: values[1],
            lastname: values[2],
            facultet: values[3],
            birthday: values[4],
            yearStudy: values[5],
        }
        this.dataManager.addStudent(newItem);
    }


    validateAndGetStringValue(el) {
        let validation = true;
        if (el.querySelector('input').value == '') {
            el.querySelector('span').textContent = 'Заполните поле ввода';
            el.querySelector('span').classList.add('text-danger');
            validation = false;
        } if (el.querySelector('input').value.charAt() != el.querySelector('input').value.charAt().toUpperCase()) {
            el.querySelector('span').textContent = 'Введите текст с большой буквы';
            el.querySelector('span').classList.add('text-danger');
            validation = false;
        } if (el.querySelector('input').value.length > 0 && el.querySelector('input').value.length < 2) {
            el.querySelector('span').textContent = 'Минимальное число символов 2';
            el.querySelector('span').classList.add('text-danger');
            validation = false;
        } if (validation == true) {
            let dataInput = el.querySelector('input').value;
            el.querySelector('span').textContent = '';
            el.querySelector('span').classList.remove('text-danger');
            return dataInput.trim();
        }
        return null;
    }

    validateAndGetDateValue(el) {
        let validation = true;
        if (el.querySelector('input').value == '') {
            el.querySelector('span').textContent = 'Заполните поле ввода';
            el.querySelector('span').classList.add('text-danger');
            validation = false;
        } if (validation == true) {
            let dataInput = el.querySelector('input').value;
            el.querySelector('span').textContent = '';
            el.querySelector('span').classList.remove('text-danger');
            return dataInput.trim();
        }
        return null;
    }

    validateAndGetYearValue(el) {
        let nowYear = new Date().getFullYear();
        let validation = true;
        if (el.querySelector('input').value == '') {
            el.querySelector('span').textContent = 'Заполните поле ввода';
            el.querySelector('span').classList.add('text-danger');
            validation = false;
        }
        if (el.querySelector('input').value < 2000 && el.querySelector('input').value != '') {
            el.querySelector('span').textContent = 'Минимальный год начала обучения 2000';
            el.querySelector('span').classList.add('text-danger');
            validation = false;
        } if (el.querySelector('input').value > nowYear) {
            el.querySelector('span').textContent = 'Этот год еще не наступил!';
            el.querySelector('span').classList.add('text-danger');
            validation = false;
        }
        if (el.querySelector('input').value.length != 4 && el.querySelector('input').value != '') {

            el.querySelector('span').textContent = 'В этом поле должно быть 4 символа';
            el.querySelector('span').classList.add('text-danger');
            validation = false;
        }
        if (isNaN(el.querySelector('input').value) == true) {
            el.querySelector('span').textContent = 'Только цифры';
            el.querySelector('span').classList.add('text-danger');
            validation = false;
        } if (validation == true) {
            let dataInput = el.querySelector('input').value;
            el.querySelector('span').textContent = '';
            el.querySelector('span').classList.remove('text-danger');
            return parseInt(dataInput.trim());
        }
        return null;
    }

}