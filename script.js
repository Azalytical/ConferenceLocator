document.getElementById('lookup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const id = document.getElementById('id').value.trim();

    fetch('assets/data.csv')
        .then(response => response.text())
        .then(text => {
            // Убираем пробелы и пустую запятую в заголовке
            const rows = text.trim().split('\n').map(row => row.trim());
            const headers = rows[0].replace(/,\s*$/, '').split(',').map(header => header.trim());

            const data = rows.slice(1).map(row => {
                const values = row.split(',').map(value => value.trim());
                const item = {};
                headers.forEach((header, index) => {
                    item[header] = values[index];
                });
                return item;
            });

            // Ищем по полю "ID", которое должно быть строкой для корректного сравнения
            const item = data.find(entry => entry.ID === id);
            if (item) {
                document.getElementById('name').innerText = item.Name;
                document.getElementById('success-icon').style.display = 'block';
            } else {
                document.getElementById('name').innerText = 'Не найдено';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('name').innerText = 'Не найдено, Ошибка';
        });
});



const events = {
    ru: [
        {time: "09:00", description: "Открытие конференции"},
        {time: "09:30-10:00", description: "Выставка и панельные сессии"},
        {time: "10:00-10:05", description: "Открытие августовского совещания на тему 'Цифровые инновации в образовании'"},
        {time: "10:06-10:09", description: "Видеоролик 'Яркие события в сфере образования'"},
        {time: "10:10-10:15", description: "Доклад: 'Обеспечение качества образования в условиях цифровизации'"},
        {time: "10:16-10:19", description: "Видеоролик 'Практика эффективного использования ИКТ и ИИ в управлении образовательной организацией'"},
        {time: "10:20-10:25", description: "Доклад: 'Эффективное управление образовательной организацией на базе платформы Notion'"},
        {time: "10:26-10:35", description: "Видеоролик 'Искусственный интеллект: качественный урок'"},
        {time: "10:36-10:41", description: "Доклад: 'Образование в эпоху ИИ: роль искусственного интеллекта'"},
        {time: "10:42-10:45", description: "Видеоролик 'Искусственный интеллект в оценивании: шаг к инновационному образованию'"},
        {time: "10:46-10:51", description: "Доклад: 'Информационная система: Qamqor Technologies'"},
        {time: "10:52-10:57", description: "Доклад: 'Использование цифровых технологий в дошкольном образовании'"},
        {time: "10:58-11:03", description: "Заключение работы совещания"},
        {time: "11:04-11:20", description: "Награждение педагогов и лучших образовательных организаций"}
    ],
    kz: [
        {time: "09:00", description: "Конференцияның ашылуы"},
        {time: "09:30-10:00", description: "Көрме және панельді сессиялар"},
        {time: "10:00-10:05", description: "Тамыз кеңесінің ашылуы 'Цифрлық инновациялар білімде'"},
        {time: "10:06-10:09", description: "Бейнебаян 'Білім саласындағы айшықты оқиғалар'"},
        {time: "10:10-10:15", description: "Баяндама: 'Цифрландыру жағдайында білім сапасын қамтамасыз ету'"},
        {time: "10:16-10:19", description: "Бейнебаян 'Білім ұйымын басқаруда АКТ мен ЖИ тиімді қолдану тәжірибесі'"},
        {time: "10:20-10:25", description: "Баяндама: 'Notion платформасы негізінде білім ұйымын тиімді басқару'"},
        {time: "10:26-10:35", description: "Бейнебаян 'Жасанды интеллект: сапалы сабақ'"},
        {time: "10:36-10:41", description: "Баяндама: 'Жасанды интеллект дәуіріндегі білім: жасанды интеллект рөлі'"},
        {time: "10:42-10:45", description: "Бейнебаян 'Мектептегі бағалау жүйесіндегі ЖИ: инновациялық білімге қадам'"},
        {time: "10:46-10:51", description: "Баяндама: 'Ақпараттық жүйе: Qamqor Technologies'"},
        {time: "10:52-10:57", description: "Баяндама: 'Мектепке дейінгі білімде цифрлық технологияларды қолдану'"},
        {time: "10:58-11:03", description: "Кеңес жұмысын қорытындылау"},
        {time: "11:04-11:20", description: "Білім беру қызметкерлерін марапаттау"}
    ]
};



function displayEvents(lang = 'kz') {
    const eventsTable = document.getElementById('events');
    eventsTable.innerHTML = ''; // Очистка таблицы перед добавлением новых событий

    console.log(lang);
    
    events[lang].forEach(event => {
        const eventRow = document.createElement('tr');
        eventRow.innerHTML = `<td>${event.time}</td><td>${event.description}</td>`;
        eventsTable.appendChild(eventRow);
    });
}

let currentLang = 'kz'; // по умолчанию русский язык

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
            heading: '"БІЛІМ БЕРУДЕГІ ЦИФРЛЫҚ ИННОВАЦИЯЛАР"\nпедагогтердің қалалық тамыз кеңесі',
            label: 'ЖСН жазыңыз:',
            button: 'Іздеу',
            section: 'Бөлім:',
            place: 'Орны:',
            eventsHeading: 'Бағдарламасы',
            eventsTime: 'Уақыты',
            eventsDescription: 'Іс-шара',
            eventsPlace: 'Орын',
            pdfDownload: 'Документтер',
            resultName: 'Аты-жөні:',

            docName1: "Саммит бағдарламасы",
            docName2: "Үндеу",
            docName3: "Секциялар",
            docName4: "Материалдар",
            docName5: "Саммит ұсынымдары",
        },
        ru: {
            heading: '"ЦИФРОВЫЕ ИННОВАЦИИ В ОБРАЗОВАНИИ"\nгородское августовское совещание педагогов',
            label: 'Введите ИИН:',
            button: 'Поиск',
            section: 'Секция:',
            place: 'Место:',
            eventsHeading: 'Программа',
            eventsTime: 'Время',
            eventsDescription: 'Описание',
            eventsPlace: 'Место',
            pdfDownload: 'Документы',
            resultName: 'Имя:',

            docName1: "Программа саммита",
            docName2: "Обращение",
            docName3: "Секции",
            docName4: "Материалы",
            docName5: "Рекомендации саммита",
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
