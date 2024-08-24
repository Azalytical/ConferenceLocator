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
        {time: "09:00", description: "<strong>Открытие конференции</strong>"},
        {time: "09:30-10:00", description: "<strong>Из опыта использования цифровых образовательных ресурсов</strong><br>Выставка, работа панельных сессий"},
        {time: "10:00-10:05", description: "<strong>Открытие августовского совещания на тему 'Цифровые инновации в образовании'</strong><br>Модератор: Кожамжарова Раушан Пернешовна<br>Руководитель отдела образования города Тараз"},
        {time: "10:06-10:09", description: "<strong>Яркие события в сфере образования</strong><br>Видеоролик"},
        {time: "10:10-10:15", description: "<strong>Обеспечение качества образования в условиях цифровизации</strong><br>Кожамжарова Раушан Пернешовна<br>Руководитель отдела образования города Тараз"},
        {time: "10:16-10:19", description: "<strong>Практика эффективного использования ИКТ и ИИ в управлении организацией образования</strong><br>Видеоролик, №40 гимназия"},
        {time: "10:20-10:25", description: "<strong>Эффективное управление образовательной организацией на базе платформы Notion</strong><br>Басар Әділет Жексеналыұлы<br>Директор школы 125 High School"},
        {time: "10:26-10:35", description: "<strong>Искусственный интеллект: качественный урок</strong><br>Видеоролик, №45 гимназия имени Б.Момышулы"},
        {time: "10:36-10:41", description: "<strong>Образование в эпоху ИИ: роль искусственного интеллекта</strong><br>Беридзе Мурат Абдуллаевич<br>Учитель информатики №41 гимназии"},
        {time: "10:42-10:45", description: "<strong>Искусственный интеллект в оценивании: шаг к инновационному образованию</strong><br>Видеоролик, №41 гимназия имени А.Пушкина"},
        {time: "10:46-10:51", description: "<strong>Информационная система: Qamqor Technologies</strong><br>Толеген Жансерик<br>Представитель компании Delta com service"},
        {time: "10:52-10:57", description: "<strong>Использование цифровых технологий в дошкольном образовании</strong><br>Умбетова Балжан Кенжеболатовна<br>Учитель казахского языка ясли-сада №8"},
        {time: "10:58-11:03", description: "<strong>Подведение итогов работы совещания</strong><br>Бақытжан Әмірбекұлы Орынбеков<br>Аким города Тараз"},
        {time: "11:04-11:20", description: "<strong>Награждение педагогов и лучших образовательных организаций</strong>"}
    ],
    kz: [
        {time: "09:00", description: "<strong>Конференцияның ашылуы</strong>"},
        {time: "09:30-10:00", description: "<strong>Цифрлық білім беру ресурстарын қолдану тәжірибесінен</strong><br>Көрме және панельді сессиялар"},
        {time: "10:00-10:05", description: "<strong>Білім берудегі цифрлық инновациялар</strong><br>Тамыз кеңесінің ашылуы<br>Модератор: Қожамжарова Раушан Пернешовна<br>Тараз қаласы білім бөлімінің басшысы"},
        {time: "10:06-10:09", description: "<strong>Білім саласындағы айшықты оқиғалар</strong><br>Бейнебаян"},
        {time: "10:10-10:15", description: "<strong>Цифрландыру жағдайында білім беру сапасын қамтамасыз ету</strong><br>Қожамжарова Раушан Пернешовна<br>Тараз қаласы білім бөлімінің басшысы"},
        {time: "10:16-10:19", description: "<strong>Білім беру ұйымын басқаруда АКТ-ны тиімді қолдану тәжірибесі</strong><br>Бейнебаян, №40 гимназия"},
        {time: "10:20-10:25", description: "<strong>Notion платформасы негізінде білім беру ұйымын тиімді басқару</strong><br>Басар Әділет Жексеналыұлы<br>125 High School мектебінің директоры"},
        {time: "10:26-10:35", description: "<strong>Жасанды интеллект: сапалы сабақ</strong><br>Бейнебаян, Б.Момышұлы атындағы №45 гимназия"},
        {time: "10:36-10:41", description: "<strong>Жасанды интеллект дәуіріндегі білім: жасанды интеллект рөлі</strong><br>Беридзе Мурат Абдуллаевич<br>№41 гимназияның информатика пәні мұғалімі"},
        {time: "10:42-10:45", description: "<strong>Мектептегі бағалау жүйесіндегі ЖИ: инновациялық білімге қадам</strong><br>Бейнебаян, А.Пушкин атындағы №41 гимназия"},
        {time: "10:46-10:51", description: "<strong>Ақпараттық жүйе: Qamqor Technologies</strong><br>Толеген Жансерик<br>Delta com service компаниясының өкілі"},
        {time: "10:52-10:57", description: "<strong>Мектепке дейінгі білім беруде цифрлық технологияларды қолдану</strong><br>Умбетова Балжан Кенжеболатовна<br>№8 бөбекжай-бақшасының қазақ тілі пәнінің мұғалімі"},
        {time: "10:58-11:03", description: "<strong>Кеңес жұмысын қорытындылау</strong><br>Бақытжан Әмірбекұлы Орынбеков<br>Тараз қаласының әкімі"},
        {time: "11:04-11:20", description: "<strong>Білім беру қызметкерлерін марапаттау</strong>"}
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
