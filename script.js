document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Элементы для анимации
    const animatedElements = document.querySelectorAll('.activity-card, .tour-card, .stat, .contact-item, .social-icon');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Плавная прокрутка для навигации с учетом хедера
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Закрытие мобильного меню
                document.querySelector('.nav-links')?.classList.remove('active');
                document.querySelector('.burger')?.classList.remove('active');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        });
    });

    // Изменение header при прокрутке
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Улучшенное бургер-меню для мобильных устройств
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {

        // Обработчик клика по бургеру
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            burger.classList.toggle('active');

            // Блокировка скролла при открытом меню
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            });
        });

        // Закрытие меню при клике на затемнение
        navLinks.addEventListener('click', function(e) {
            if (e.target === navLinks) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        });

        // Закрытие меню при нажатии ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }
        });
    }

    // Основные активности
    const mainActivitiesData = [
        {
            name: "Треккинг",
            icon: "fas fa-hiking",
            description: "Пешие походы по горным маршрутам различной сложности",
            tags: ["Горы", "Природа", "Выносливость"]
        },
        {
            name: "Восхождения",
            icon: "fas fa-mountain",
            description: "Покорение вершин с опытными альпинистами-гидами",
            tags: ["Экстрим", "Высота", "Альпинизм"]
        },
        {
            name: "Походы с ночёвкой",
            icon: "fas fa-campground",
            description: "Многодневные походы с оборудованными стоянками",
            tags: ["Приключения", "Ночь", "Поход"]
        },
        {
            name: "Джиппинг",
            icon: "fas fa-car",
            description: "Экстремальные поездки на внедорожниках по бездорожью",
            tags: ["Адреналин", "Внедорожник", "Экстрим"]
        },
        {
            name: "Экскурсии",
            icon: "fas fa-map-marked-alt",
            description: "Познавательные экскурсии по историческим местам",
            tags: ["История", "Культура", "Знания"]
        },
        {
            name: "Туры по Кавказу",
            icon: "fas fa-globe-europe",
            description: "Комбинированные туры по всему Кавказскому региону",
            tags: ["Кавказ", "Мультитур", "Разнообразие"]
        }
    ];

    // Дополнительные услуги
    const servicesData = [
        {
            name: "Скалолазание",
            icon: "fas fa-hands-helping",
            description: "Лазание по естественному и искусственному рельефу",
            tags: ["Скалы", "Сила", "Техника"]
        },
        {
            name: "Ледолазание",
            icon: "fas fa-icicles",
            description: "Восхождение по ледовым склонам и водопадам",
            tags: ["Лед", "Зима", "Экстрим"]
        },
        {
            name: "Спелеотуризм",
            icon: "fas fa-mountain",
            description: "Исследование пещер и подземных полостей",
            tags: ["Пещеры", "Исследования", "Подземелье"]
        },
        {
            name: "Рафтинг",
            icon: "fas fa-water",
            description: "Сплав по горным рекам на рафтах и каяках",
            tags: ["Вода", "Адреналин", "Команда"]
        },
        {
            name: "Парапланы",
            icon: "fas fa-parachute-box",
            description: "Полеты на парапланах с опытными инструкторами",
            tags: ["Небо", "Полеты", "Высота"]
        },
        {
            name: "Парашютизм",
            icon: "fas fa-parachute-box",
            description: "Прыжки с парашютом для новичков и опытных",
            tags: ["Небо", "Адреналин", "Прыжки"]
        },
        {
            name: "Квадроциклы",
            icon: "fas fa-motorcycle",
            description: "Захватывающие маршруты на квадроциклах",
            tags: ["Скорость", "Бездорожье", "Мото"]
        },
        {
            name: "Конный туризм",
            icon: "fas fa-horse",
            description: "Конные походы и прогулки по живописным местам",
            tags: ["Лошади", "Природа", "Традиции"]
        }
    ];

    // Загрузка основных активностей
    const activitiesContainer = document.getElementById('activities-container');
    if (activitiesContainer) {
        mainActivitiesData.forEach(activity => {
            const activityCard = document.createElement('div');
            activityCard.className = 'activity-card';

            activityCard.innerHTML = `
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h3>${activity.name}</h3>
                    <p>${activity.description}</p>
                    <div class="activity-tags">
                        ${activity.tags.map(tag => `<span class="activity-tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            `;

            activitiesContainer.appendChild(activityCard);
        });
    }

    // Загрузка дополнительных услуг
    const servicesContainer = document.getElementById('services-container');
    if (servicesContainer) {
        servicesData.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.className = 'activity-card';

            serviceCard.innerHTML = `
                <div class="activity-icon">
                    <i class="${service.icon}"></i>
                </div>
                <div class="activity-content">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <div class="activity-tags">
                        ${service.tags.map(tag => `<span class="activity-tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            `;

            servicesContainer.appendChild(serviceCard);
        });
    }

    // Обработка формы бронирования
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Сбор данных формы
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                tourType: document.getElementById('tour-type').value,
                message: document.getElementById('message').value
            };

            // В реальном приложении здесь будет отправка данных на сервер
            console.log('Форма отправлена:', formData);

            // Имитация успешной отправки
            alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');

            // Очистка формы
            bookingForm.reset();
        });
    }

    // Анимация для статистики
    const stats = document.querySelectorAll('.stat-number');

    stats.forEach(stat => {
        const targetValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = targetValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
        }, 50);
    });

    // Добавляем класс анимации для элементов при первой загрузке
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animated');
        }
    }, 300);

    // Фикс для мобильных отступов
    function fixMobileLayout() {
        const isMobile = window.innerWidth <= 768;
        const container = document.querySelector('.container');

        if (isMobile && container) {
            // Проверяем и исправляем отступы
            const checkPadding = () => {
                const containerRect = container.getBoundingClientRect();
                const bodyRect = document.body.getBoundingClientRect();

                if (containerRect.left !== 15) {
                    container.style.paddingLeft = '15px';
                }
                if (containerRect.right > bodyRect.right - 15) {
                    container.style.paddingRight = '15px';
                }
            };

            // Проверяем при загрузке и изменении размера
            checkPadding();
            window.addEventListener('resize', checkPadding);
        }
    }

    // Запускаем фиксы при загрузке
    fixMobileLayout();
    window.addEventListener('resize', fixMobileLayout);
});