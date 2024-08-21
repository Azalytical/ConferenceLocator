document.getElementById('lookup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = parseInt(document.getElementById('id').value.trim(), 10);


    fetch('assets/data.csv')
        .then(response => response.text())
        .then(text => {
            const rows = text.trim().split('\n');
            const headers = rows[0].split(',').map(header => header.trim());

            const data = rows.slice(1).map(row => {
                const values = row.split(',').map(value => value.trim());
                const item = {};
                headers.forEach((header, index) => {
                    item[header] = values[index];
                });
                return item;
            });

            const item = data.find(entry => parseInt(entry.ID, 10) === id);
            if (item) {
                document.getElementById('name').innerText = `${item.Name}`;
                document.getElementById('section').innerText = `${item.Section}`;
                document.getElementById('place').innerText = `${item.Place}`;
                document.getElementById('success-icon').style.display = 'block';
            } else {
                document.getElementById('name').innerText = 'ID not found';
                document.getElementById('section').innerText = '';
                document.getElementById('place').innerText = '';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('name').innerText = 'Error loading data';
            document.getElementById('section').innerText = '';
            document.getElementById('place').innerText = '';
        });
});


const events = {
    ru: [
        {time: "08:00-09:00", description: "Регистрация", place: "Фойе"},
        {time: "09:00-09:45", description: "ТЕСТ", place: "ТЕСТ 2"},
        {time: "10:00-12:30", description: "ТЕСТ", place: "ТЕСТ 2"},
        {time: "12:30-14:00", description: "ТЕСТ", place: ""},
        {time: "14:00", description: "ТЕСТ", place: "ТЕСТ 2"},
        {time: "14:30-14:50", description: "ТЕСТ", place: "ТЕСТ"},
        {time: "15:00-16:00", description: "ТЕСТ", place: "ТЕСТ"},
        {time: "16:00-17:00", description: "ТЕСТ", place: "ТЕСТ"},
        {time: "17:00", description: "ТЕСТ", place: "ТЕСТ"}
    ],
    kz: [
        {time: "08:00-09:00", description: "Регистрация", place: "Фойе"},
        {time: "09:00-09:45", description: "ТЕСТ", place: "ТЕСТ 2"},
        {time: "10:00-12:30", description: "ТЕСТ", place: "ТЕСТ 2"},
        {time: "12:30-14:00", description: "ТЕСТ", place: ""},
        {time: "14:00", description: "ТЕСТ", place: "ТЕСТ 2"},
        {time: "14:30-14:50", description: "ТЕСТ", place: "ТЕСТ"},
        {time: "15:00-16:00", description: "ТЕСТ", place: "ТЕСТ"},
        {time: "16:00-17:00", description: "ТЕСТ", place: "ТЕСТ"},
        {time: "17:00", description: "ТЕСТ", place: "ТЕСТ"}
    ]
};



function displayEvents(lang = 'ru') {
    const eventsTable = document.getElementById('events');
    eventsTable.innerHTML = ''; // Очистка таблицы перед добавлением новых событий

    events[lang].forEach(event => {
        const eventRow = document.createElement('tr');
        eventRow.innerHTML = `<td>${event.time}</td><td>${event.description}</td><td>${event.place}</td>`;
        eventsTable.appendChild(eventRow);
    });
}

let currentLang = 'ru'; // по умолчанию русский язык

function toggleLanguage() {
    if (currentLang === 'ru') {
        currentLang = 'kz';
        document.getElementById('switch-lang').innerText = 'Русский';
    } else {
        currentLang = 'ru';
        document.getElementById('switch-lang').innerText = 'Қазақша';
    }
    switchLanguage(currentLang);
    displayEvents(currentLang); // Обновляем отображение событий на выбранном языке
}

function switchLanguage(lang) {
    const translations = {
        kz: {
            heading: 'СКИБИДИ САММИТ',
            label: 'ЖСН жазыңыз:',
            button: 'Іздеу',
            section: 'Бөлім:',
            place: 'Орны:',
            eventsHeading: 'СКИБИДИ бағдарламасы',
            eventsTime: 'Уақыты',
            eventsDescription: 'Іс-шара',
            eventsPlace: 'Аудитория',
            pdfDownload: 'Документтер',
            resultName: 'Аты-жөні:'
        },
        ru: {
            heading: 'СКИБИДИ САММИТ',
            label: 'Введите ИИН:',
            button: 'Поиск',
            section: 'Секция:',
            place: 'Аудитория:',
            eventsHeading: 'Программа СКИБИДИ',
            eventsTime: 'Время',
            eventsDescription: 'Описание',
            eventsPlace: 'Аудитория',
            pdfDownload: 'Документы',
            resultName: 'Имя:'
        }
    };

    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.innerText = translations[lang][key];
        }
    });
}

// Начальная установка языка
switchLanguage(currentLang);
displayEvents();
