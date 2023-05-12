class DataManager {
    students = [];
    lastId = 0;
    displayItems = [];
    filterCriterias = {};
    sortedField = null;
    sortDirectionAsc = true;
    valueChangedCallback = null;

    constructor(callbackForRender){
        this.valueChangedCallback = callbackForRender;
        this.loadData();
    }

    loadData() {
        const studnetsJSON = localStorage.getItem("students");
        if(studnetsJSON) {
            this.students = JSON.parse(studnetsJSON);
        }
        const lastIdJSON = localStorage.getItem("lastStudentId");
        if(lastIdJSON) {
            this.lastId = parseInt(lastIdJSON);
        }
        this.calcDisplayItems();
    }

    saveData() {
        localStorage.setItem("students", JSON.stringify(this.students));
        localStorage.setItem("lastStudentId", this.lastId);
    }

    addStudent(newStudent) {
        const newItem = { id: this.lastId++, ...newStudent };
        this.students.push(newItem);
        this.saveData();
        this.calcDisplayItems();
    }

    setFilterCriteria(fieldName, value) {
        this.filterCriterias[fieldName] = value;
        this.saveData();
        this.calcDisplayItems()
    }
    
    setSortField(fieldName) {
        if(fieldName !== this.sortedField) {
            this.sortDirectionAsc = true;
        } else {
            this.sortDirectionAsc = !this.sortDirectionAsc;
        }
        this.sortedField = fieldName;
        this.saveData();
        this.calcDisplayItems();
    }
    
    deleteStudent(id) {
        this.students = this.students.filter(s => s.id != id);
        this.saveData();
        this.calcDisplayItems();
    }

    clrearSorting() {
        this.sortedField = null;
        this.sortDirectionAsc = true;
        this.saveData();
        this.calcDisplayItems();
    }

    clearFilter() {
        this.filterCriterias = {};
        this.saveData();
        this.calcDisplayItems();
    }

    calcDisplayItems() {
        this.displayItems = this.students;
        for(const fieldName in this.filterCriterias) {
            if(this.filterCriterias[fieldName]) {
                this.displayItems = this.displayItems.filter(
                    item => this.checkAnyStudentField(item, fieldName));
            }
        }
        if(this.sortedField)
        {
            this.displayItems = this.displayItems.sort((f, s) => {
                if(f[this.sortedField] > s[this.sortedField]) {
                    return this.sortDirectionAsc ? -1 : 1;
                }
                if(f[this.sortedField] < s[this.sortedField]) {
                    return this.sortDirectionAsc ? 1 : -1;
                }
                return 0;
            });
        }
        this.valueChangedCallback(this.displayItems);
    }
    checkAnyStudentField(student, fieldNames){
        const fields = fieldNames.split(',');
        let contains = false;
        for(const fieldName of fields){
            contains = contains || this.checkStudentField(student, fieldName, this.filterCriterias[fieldNames]);
        }
        return contains;
    }

    checkStudentField(student, fieldName, fieldValue) {
        if(student[fieldName] === undefined
            || student[fieldName] === null) {
            return false;
        } 
        if (typeof student[fieldName] === 'string' || student[fieldName] instanceof String) {
             return student[fieldName].toLocaleLowerCase().indexOf(fieldValue.toLocaleLowerCase()) > -1;
        }
        return student[fieldName] == fieldValue;
    }
}