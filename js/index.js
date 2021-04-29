// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input'); // поле с мин.весом
const maxWeight = document.querySelector('.maxweight__input'); // поле с макс.весом

const fruitColors = [{ color: 'фиолетовый', colorClass: 'violet' }, { color: 'зеленый', colorClass: 'green' }, { color: 'розово-красный', colorClass: 'carmazin' }, { color: 'желтый', colorClass: 'yellow' }, { color: 'светло-коричневый', colorClass: 'lightbrown' }, ];

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  document.querySelector('.fruits__list').innerHTML = '';
  for (let i = 0; i < fruits.length; i++) {
    // формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let li = document.createElement('li');
    let color = fruitColors.find(fruitColor => fruitColor.color === fruits[i].color);
    li.classList.add(`fruit__item`);
    if(color) {
      li.classList.add(`fruit_${color.colorClass}`);
    } else {
      li.classList.add(`fruit_black`);
    }
    li.innerHTML = `
    <div class="fruit__info">
      <div>index: ${i}</div>
      <div>kind: ${fruits[i].kind}</div>
      <div>color: ${fruits[i].color}</div>
      <div>weight (кг): ${fruits[i].weight}</div>
    </div>`;
    document.querySelector('.fruits__list').appendChild(li);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  const hash = JSON.stringify(fruits);
  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // допишите функцию перемешивания массива
    //
    let el = fruits.splice(getRandomInt(0, fruits.length - 1), 1);
    result.push(el[0]);
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
  }
  fruits = result;
  if(hash == JSON.stringify(fruits))alert('Порядок не изменился');
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits = fruits.filter((item) => {
    if(minWeight.value != '' && !isNaN(minWeight.value) && maxWeight.value != '' && !isNaN(maxWeight.value)) {
      if(item.weight >= minWeight.value && item.weight <= maxWeight.value) return true;
    }

    if(minWeight.value != '' && !isNaN(minWeight.value) && (maxWeight.value == '' || isNaN(maxWeight.value))) {
      if(item.weight >= minWeight.value) return true;
    }

    if(maxWeight.value != '' && !isNaN(maxWeight.value) && (minWeight.value == '' || isNaN(minWeight.value))) {
      if(item.weight <= maxWeight.value) return true;
    }

  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => 
  // допишите функцию сравнения двух элементов по цвету
  a > b ? true : false;
;

const sortAPI = {
  bubbleSort(arr, comparation) {
    // допишите функцию сортировки пузырьком
    for (let j = arr.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (comparation(arr[i].color, arr[i + 1].color)) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
  },

  quickSort(arr, comparation) {
    // допишите функцию быстрой сортировки
    function quickS(array) {
      if (array.length <= 1) {
        return array;
      } else {
        let pivotIndex = Math.floor(array.length / 2);
        let pivot = array[pivotIndex];
        let less = [];
        let greater = [];
    
        for (let i = 0; i < array.length; i++) {
          if (i === pivotIndex) continue;
          if (!comparation(arr[i].color, pivot.color)) {
            less.push(array[i]);
          } else {
            greater.push(array[i]);
          }
        }
        let result = [];
        return result.concat(quickS(less), pivot, quickS(greater));
      }
    }
    fruits = quickS(arr);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  sortKind = sortKind == 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if(kindInput.value != '' && colorInput.value != '' && weightInput.value != '' && !isNaN(weightInput.value)) {
    fruits.push({kind: kindInput.value, color: colorInput.value, weight : +weightInput.value});
  } else {
    alert('Одно из полей пустое или заполнено некорректными данными!');
  }
  display();
});
