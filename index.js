class Employee {
    constructor(name,position){
        this.name=name;
        this.position=position;
    }
    describe(){
        return `${this.name} works in ${this.position}.`;
    }
}
class Department{
    constructor(name){
        this.name=name;
        this.employees=[];
    }
    addEmployee(employee){
        if(employee instanceof Employee){
            this.employees.push(employee);
        }else {
            throw new Error(`You can only add legitimate employee information. Information entered is invalid: ${employee}`);
        }
    }
    describe(){
        return `${this.name} has ${this.employees.length} Employees.`;
    }
}
class Menu{
    constructor(){
        this.departments=[];
        this.selectedDepartment=null;
    }
    start(){
        let selection=this.showMainMenuOptions();
        while(selection != 0){
            switch(selection){
                case '1':
                    this.createDepartment();
                    break;
                case '2': 
                    this.viewDepartment();
                    break;
                case '3':
                    this.dissolveDepartment();
                    break;
                case '4':
                    this.displayDepartments();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert ('You have clocked out');
    }
    showMainMenuOptions(){
        return prompt( `
        0) clock out
        1) create new Department
        2) view Department
        3) dissolve Department
        4) display all Departments
        `);
    }
    showDepartmentMenuOptions(departmentInfo){
        return prompt(`
        0) back
        1) hire employee
        2) lay off employee
        ------------------
        ${departmentInfo}
        `);
    }
    displayDepartments(){
        let departmentString ='';
        for(let i=0;i<this.departments.length;i++){
            departmentString += i + ')' + this.departments[i].name + '\n';
        }
        alert(departmentString);
    }
    createDepartment(){
        let name = prompt('Enter name for new department:');
        this.departments.push(new Department(name));
    }
    viewDepartment(){
        let index = prompt('Enter the index of the department you wish to view:');
        if(index > -1 && index < this.departments.length){
            this.selectedDepartment = this.departments[index];
            let description = 'Department Name:' + this.selectedDepartment.name + '\n';
            
            for(let i=0;i<this.selectedDepartment.employees.length;i++){
                description += i + ')' + this.selectedDepartment.employees[i].name 
                + ' - ' + this.selectedDepartment.employees[i].position + '\n';
            }
                let selection = this.showDepartmentMenuOptions(description);
                switch(selection){
                    case '1':
                        this.hireEmployee();
                        break;
                    case '2':
                        this.layOffEmployee();

                }
            
        }
    }
    dissolveDepartment(){
            let index = prompt('Enter the index of the department you wish to dissolve:');
            if(index>-1 && index<this.departments.length){
                this.departments.splice(index,1);
            }
        }
    hireEmployee(){
            let name = prompt('Enter name of new Employee:');
            let position = prompt('Enter position for new Employee:');
            this.selectedDepartment.employees.push(new Employee(name,position));
        }
    layOffEmployee(){
            let index = prompt('Enter the index of the Employee you wish to lay off:');
            if(index > -1 && index < this.selectedDepartment.employees.length){
                this.selectedDepartment.employees.splice(index,1);
            }
    }
}
let menu = new Menu();
menu.start();