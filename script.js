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
        {time: "13:40-14:00", description: "<strong>Из опыта использования цифровых образовательных ресурсов</strong><br>Выставка, работа панельных сессий"},
        {time: "14:00-14:05", description: "<strong>Открытие августовского совещания на тему 'Цифровые инновации в образовании'</strong><br>Модератор: Кожамжарова Раушан Пернешовна<br>Руководитель отдела образования города Тараз"},
        {time: "14:05-14:08", description: "<strong>Яркие события в сфере образования</strong><br>Видеоролик"},
        {time: "14:09-14:19", description: "<strong>Итоги 2023-2024 учебного года и задачи на новый учебный год</strong><br>Садырқұлов Рауан Нұрғалиұлы<br>Руководитель управления образования акимата Жамбылской области"},
        {time: "14:20-14:40", description: "<strong>Обеспечение качества образования в условиях цифровизации</strong><br>Кожамжарова Раушан Пернешовна<br>Руководитель отдела образования города Тараз"},
        {time: "14:41-14:44", description: "<strong>Практика эффективного использования ИКТ и ИИ в управлении организацией образования</strong><br>Видеоролик, №40 гимназия"},
        {time: "14:45-14:50", description: "<strong>Эффективное управление образовательной организацией на базе платформы Notion</strong><br>Басар Әділет Жексеналыұлы<br>Директор школы 125 High School"},
        {time: "14:51-14:54", description: "<strong>Искусственный интеллект: качественный урок</strong><br>Видеоролик, №45 гимназия имени Б.Момышулы"},
        {time: "14:55-15:00", description: "<strong>Образование в эпоху ИИ: роль искусственного интеллекта</strong><br>Беридзе Мурат Абдуллаевич<br>Учитель информатики №41 гимназии"},
        {time: "15:01-15:04", description: "<strong>Искусственный интеллект в школьном оценивании: шаг к инновационному образованию</strong><br>Видеоролик, №41 гимназия имени А.Пушкина"},
        {time: "15:05-15:15", description: "<strong>Подведение итогов работы совещания</strong><br>Гүлдана Әлімжанқызы Жауынбекова<br>Заместитель акима города Тараз"},
        {time: "15:16-15:30", description: "<strong>Награждение педагогов</strong>"},
        {time: "15:31-15:32", description: "<strong>Песня 'Туған жер'</strong><br>Выступление детей"}
    ],
    kz: [
        {time: "13:40-14:00", description: "<strong>Цифрлық білім беру ресурстарын қолдану тәжірибесінен</strong><br>Көрме, панельді сессиялардың жұмысы"},
        {time: "14:00-14:05", description: "<strong>Білім берудегі цифрлық инновациялар</strong><br>Тамыз кеңесінің ашылуы<br>Модератор: Қожамжарова Раушан Пернешовна<br>Тараз қаласы білім бөлімінің басшысы"},
        {time: "14:05-14:08", description: "<strong>Білім саласындағы айшықты оқиғалар</strong><br>Бейнебаян"},
        {time: "14:09-14:19", description: "<strong>2023-2024 оқу жылының қорытындысы мен жаңа оқу жылындағы міндеттер</strong><br>Садырқұлов Рауан Нұрғалиұлы<br>Жамбыл облысы әкімдігінің білім басқармасының басшысы"},
        {time: "14:20-14:40", description: "<strong>Цифрландыру жағдайында білім беру сапасын қамтамасыз ету</strong><br>Қожамжарова Раушан Пернешовна<br>Тараз қаласы білім бөлімінің басшысы"},
        {time: "14:41-14:44", description: "<strong>Білім беру ұйымын басқаруда АКТ-ны тиімді қолдану тәжірибесі</strong><br>Бейнебаян, №40 гимназия"},
        {time: "14:45-14:50", description: "<strong>Notion платформасы негізінде білім беру ұйымын тиімді басқару</strong><br>Басар Әділет Жексеналыұлы<br>125 High School мектебінің директоры"},
        {time: "14:51-14:54", description: "<strong>Жасанды интеллект: сапалы сабақ</strong><br>Бейнебаян, Б.Момышұлы атындағы №45 гимназия"},
        {time: "14:55-15:00", description: "<strong>Жасанды интеллект дәуіріндегі білім: жасанды интеллект рөлі</strong><br>Беридзе Мурат Абдуллаевич<br>№41 гимназияның информатика пәні мұғалімі"},
        {time: "15:01-15:04", description: "<strong>Мектептегі бағалау жүйесіндегі ЖИ: инновациялық білімге қадам</strong><br>Бейнебаян, А.Пушкин атындағы №41 гимназия"},
        {time: "15:05-15:15", description: "<strong>Кеңес жұмысын қорытындылау</strong><br>Гүлдана Әлімжанқызы Жауынбекова<br>Тараз қаласының әкімі"},
        {time: "15:16-15:30", description: "<strong>Білім беру қызметкерлерін марапаттау</strong>"},
        {time: "15:31-15:32", description: "<strong>Ән 'Туған жер'</strong><br>Балалар қошеметі"}
    ]
};

function displayEvents(lang = 'kz') {
    const eventsTable = document.getElementById('events');
    eventsTable.innerHTML = ''; // Очистка таблицы перед добавлением новых событий

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

            docName1: "Бағдарламасы",
            docName2: "Үндеу",
            docName3: "Секциялар",
            docName4: "Материалдар",
            docName5: "ұсынымдары",
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

            docName1: "Программа",
            docName2: "Обращение",
            docName3: "Секции",
            docName4: "Материалы",
            docName5: "Рекомендации",
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
