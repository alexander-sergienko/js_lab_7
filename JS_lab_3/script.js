// Объекты
// Задание 1

console.log("Объекты");

console.log("Задание 1");

// Задание 1а
let user = {};

// Задание 1b
user.name = "John";

// Задание 1c
user.surname = "Smith";

// Задание 1d
user.name = "Pete";

// Задание 1e
delete user.name;


// Задание 2

console.log("Задание 2");

let myBrowser = {
    name: "Microsoft Internet Explorer",
    version: 9.0
};

for (let i in myBrowser) {
    console.log(myBrowser[i]);
}

console.log();


// Задание 3

console.log("Задание 3");

function isEmpty(obj) {
    for (let i in obj) {
        return false;
    }
    return true;
}

console.log(isEmpty(user));
console.log();


// Задание 4

const user1 = {
    name: "John"
};

user1.name = "Pete"; // Изменение свойств объекта

// user1 = 123; // Переопределение переменной, что невозможно


// Задание 5

function multiplyNumeric(obj) {
    for (let i in obj) {
        if (typeof obj[i] == "number") {
            obj[i] *= 2;
        }
    }
}


// Задание 6

console.log("Задание 6");

let calculator = {
    read(a, b) {
        this.a = a;
        this.b = b;
    },
    sum() {
        return this.a + this.b;
    },
    mul() {
        return this.a * this.b;
    }
};

calculator.read(3, 5);
console.log(calculator.sum());
console.log(calculator.mul());
console.log();


// Задание 7

console.log("Задание 7");

let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep() {
        console.log(this.step);
        return this;
    }
};

ladder.up().up().down().up().down().showStep();
console.log();


// Задание 8

console.log("Задание 8");

function Browser(name, version) {
    this.name = name;
    this.version = version;
    this.aboutBrowser = function() {
        console.log(`Название ${this.name}, версия ${this.version}`);
    };
}

myBrowser1 = new Browser("Microsoft Internet Explorer", 9.0);

for (let i in myBrowser1) {
    console.log(myBrowser1[i]);
}

console.log();

myBrowser1.aboutBrowser();

console.log();


// Задание 9

// console.log("Задание 9");
//
// employee = {
//     constructor(name, department, phone, salary) {
//         this.name = name;
//         this.department = department;
//         this.phone = phone;
//         this.salary = salary;
//     },
//     toString() {
//         console.log(`Имя: ${this.name}, Отдел: ${this.department}, Телефон: ${this.phone}, Зарплата: ${this.salary}`);
//     }
// }
//
// let employee1 = employee("Иван", "IT", "8-800-555-35-35", 50000);
// employee1.toString()
// console.log();


// Задание 10

console.log("Задание 10");

function Calculator() {
    this.read = function(a, b) {
        this.a = a;
        this.b = b;
    };
    this.sum = function() {
        return this.a + this.b;
    };
    this.mul = function() {
        return this.a * this.b;
    };
}

let calculator1 = new Calculator();
calculator1.read(3, 5);
console.log(calculator1.sum());
console.log(calculator1.mul());
console.log();


// Задание 11

console.log("Задание 11");

function Accumulator(startingValue) {
    this.value = startingValue;
    this.read = function(a) {
        this.value += a;
    };
}

let accumulator = new Accumulator(1);
console.log(accumulator.value);
accumulator.read(1);
console.log(accumulator.value);
console.log();


// Работа с прототипами
// Задание 1

console.log("Работа с прототипами");

console.log("Задание 1");

let animal = {
    jumps: null
};

let rabbit = {
    __proto__: animal,
    jumps: true
};

console.log(rabbit.jumps); // Обращается к свойству объекта rabbit и находит его (true)

delete rabbit.jumps; // Удаляем у объекта rabbit свойство jumps

console.log(rabbit.jumps); // Поиск свойства jumps в объекте rabbit не дает результата, поэтому обращается к прототипу и находит его (null)

delete animal.jumps; // Удаляем у объекта animal свойство jumps

console.log(rabbit.jumps); // Так как, мы удалили свойство jumps у объекта animal, то при обращении к свойству jumps объекта rabbit,
                           // он не находит его ни в своем объекте, ни в прототипе, поэтому выводит undefined

console.log();


// Задание 2

console.log("Задание 2");

let animal_ = {
    eat() {
        this.full = true;
    }
};

let rabbit_ = {
    __proto__: animal_
};

rabbit_.eat();

console.log(animal_.full);
console.log(rabbit_.full); // Объект rabbit_ не имеет свойства full, но при вызове метода eat() у объекта rabbit_ создается свойство full
console.log();


// Задание 3

console.log("Задание 3");

let hamster = {
    stomach: [],
    eat(food) {
        this.stomach.push(food);
    }
};

let speedy = {
    __proto__: hamster,
    stomach: []
};

let lazy = {
    __proto__: hamster,
    stomach: [] // Решением может быть создание свойства stomach у объектов speedy и lazy
};

speedy.eat("apple");
console.log(speedy.stomach);

console.log(lazy.stomach); // При вызове метода eat() у объекта speedy, создается свойство stomach у объекта speedy и добавляется элемент в массив
console.log();


// Задание 4

console.log("Задание 4");

String.prototype.color = "black";

String.prototype.size = 14;

String.prototype.write = stringWrite;

function stringWrite() {
    console.log("Цвет текста: " + this.color);
    console.log("Текст: " + this.toString());
    console.log("Размер шрифта: " + this.size);
}

let s = new String("Это строка");
s.color = "red";
s.size = 16;
s.write();

let s2 = new String("Вторая строка");
s2.write();

console.log();


// Задание 5

console.log("Задание 5");

function Rabbit() {}
Rabbit.prototype = {
    eats: true
};

let rabbit1 = new Rabbit();

Rabbit.prototype = {};              // Теперь новый прототип пустой.
Rabbit.prototype.eats = false;      // Новый прототип имеет eats: false.
delete rabbit1.eats;                 // Удаляем eats из самого rabbit.
delete Rabbit.prototype.eats;       // Удаляем eats из прототипа.

console.log(rabbit1.eats);
console.log();


// Классы
// Задание 1

console.log("Классы");

console.log("Задание 1");

class Clock {
    constructor(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    showTime() {
        console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
    }
}

let clock = new Clock(12, 30, 45);
clock.showTime();
console.log();


// Задание 2

console.log("Задание 2");

class Animal {
    constructor(name) {
        this.name = name;
    }
}

class Rabbit_ extends Animal {
    constructor(name) {
        super(name);
        this.created = Date.now();
    }
}

let rabbit1_ = new Rabbit_("Белый кролик");
console.log(rabbit1_.name);
console.log();


// Задание 3

console.log("Задание 3");

class Clock_ {
    constructor(template) {
        this.template = template;
    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = "0" + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = "0" + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = "0" + secs;

        let output = this.template.replace("h", hours).replace("m", mins).replace("s", secs);

        console.log(output);
    }

    stop() {
        clearInterval(this.timer);
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}

let clock_ = new Clock_("h m s");
//clock_.start();

class ExtendedClock extends Clock_ {
    constructor(template, precision = 1000) {
        super(template);
        this.precision = precision;
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), this.precision);
    }
}

let extendedClock = new ExtendedClock("h m s", 2000);
//extendedClock.start();


// Задание 4

console.log("Задание 4");

class Stock {
    constructor() {
        this.boxes = [];
        this.nextId = 0;
    }

    add(weight, volume) {
        this.boxes.push({ id: this.nextId++, weight, volume });
    }

    getByW(min_w) {
        let suitableBoxes = this.boxes.filter(box => box.weight >= min_w);
        if (suitableBoxes.length === 0) return -1;
        suitableBoxes.sort((a, b) => a.weight - b.weight || a.id - b.id);
        let box = suitableBoxes[0];
        this.boxes = this.boxes.filter(b => b.id !== box.id);
        return box.id;
    }

    getByV(min_v) {
        let suitableBoxes = this.boxes.filter(box => box.volume >= min_v);
        if (suitableBoxes.length === 0) return -1;
        suitableBoxes.sort((a, b) => a.volume - b.volume || a.id - b.id);
        let box = suitableBoxes[0];
        this.boxes = this.boxes.filter(b => b.id !== box.id);
        return box.id;
    }
}

const stock = new Stock();
stock.add(10, 20);
stock.add(15, 10);
stock.add(5, 30);

console.log(stock.getByW(12));
console.log(stock.getByV(25));
console.log(stock.getByW(6));
console.log(stock.getByV(50));
