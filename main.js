//Შექმენით აპლიკაცია რომელიც მოგცემთ საშვალებას რომ დაარეგისტრიროთ სტუდენტები, 
//სტუდენტების ინფორმაციებია : სურათი,სახელი, გვარი, ასაკი, ელ.ფოსტა, მობილურის ნომერი, 
//აპლიკაციაში უნდა ისახებოდეს დარეგისტრირებული სტუდენტები ქარდის ან ცხრილის ფორმატით, 
//აპლიკაციაში უნდა იყოს მოცემული ფუნქციონალი რომელიც დაფილტრავს სტუდენტებს შემდეგი 
//ინფორმაციებით : სახელი, გვარი, ელ.ფოსტა, მობილურის ნომერით;


var imgInput = document.getElementById("imgurl");
var nameInput = document.getElementById("name");
var surnameInput = document.getElementById("surname");
var ageInput = document.getElementById("age");
var mailInput = document.getElementById("mail");
var mobileNumInput = document.getElementById("mobilenum");
var filterInput = document.getElementById("filter");
var cardsArea = document.querySelector(".card");



class StudentsInfo {
    imageURL;
    name;
    surname;
    age;
    mail;
    mobileNum;


    constructor(imageURL, name, surname, age, mail, mobileNum) {
        this.imageURL = imageURL;
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.mail = mail;
        this.mobileNum = mobileNum;
    }
}

class HtmlRenderInfo {

    getCardToHtml(student) {
        return `<div class="cardbody">
                    <img src="${student.imageURL}"alt="">
                    <h1>Name: ${student.name}</h1>
                    <h1>Surname: ${student.surname}</h1>
                    <h3>Age: ${student.age}</h3>
                    <h3>Mail: ${student.mail}</h3>
                    <h3>Mobile: ${student.mobileNum}</h3>
                </div>`
    }

    renderStudentsInfo(StudentCollection) {
        cardsArea.innerHTML = "";
        StudentCollection.forEach(student => {
            cardsArea.innerHTML += this.getCardToHtml(student)

        })

    }
}

class ViewController {
    render = new HtmlRenderInfo();
    studentCollection = [];
    filteredData = [];


    showCards() {
        if (imgInput.value == "" || nameInput.value == "" || surnameInput.value == "" ||
            ageInput.value == "" || mailInput.value == "" || mobileNumInput.value == "") {
            swal({
                text: "Fill all in the fields",
                buttons: false
            })
        } else {
            var studentsInfoItem = new StudentsInfo(imgInput.value, nameInput.value, surnameInput.value,
                ageInput.value, mailInput.value, mobileNumInput.value);
            this.studentCollection.push(studentsInfoItem)
            this.render.renderStudentsInfo(this.studentCollection);

        }
        this.resetInputs();
    }

    filterStudents() {
        this.filteredData = [];
        var filterValue = filterInput.value;
        this.filteredData = this.studentCollection.filter(item => item.name.toLowerCase() == filterValue.toLowerCase() ||
            item.surname.toLowerCase() == filterValue.toLowerCase() ||
            item.mail.toLowerCase() == filterValue.toLowerCase() ||
            item.mobileNum.toLowerCase() == filterValue.toLowerCase())

        this.render.renderStudentsInfo(this.filteredData);
    }

    resetView() {
        this.studentCollection = [];
        this.resetInputs()
    }

    resetInputs() {
        imgInput.value = "";
        nameInput.value = "";
        surnameInput.value = "";
        ageInput.value = "";
        mailInput.value = "";
        mobileNumInput.value = "";
        filterInput.value = "";
    }

    resetBtn() {
        cardsArea.innerHTML = "";
        this.resetInputs();
    }


}

var view = new ViewController();
