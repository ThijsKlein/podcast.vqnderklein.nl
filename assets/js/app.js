var currentPage = '2';
var currentSection = '1';
var sections;

function SwitchToPage(pageId) {
    var idSelectorNew = 'page' + pageId;
    var idSelectorNow = 'page' + currentPage;

    var activeSelectorNow = 'navPage' + currentPage;
    var activeSelectorNew = 'navPage' + pageId;

    var currentElement = document.getElementById(idSelectorNow);
    if (currentElement) {
        currentElement.style.display = 'none';
    }

    var newElement = document.getElementById(idSelectorNew);
    if (newElement) {
        newElement.style.display = 'block';
    }

    var activeElementNow = document.getElementById(activeSelectorNow);
    if (activeElementNow) {
        activeElementNow.classList.remove('active');
    }

    currentPage = pageId;

    if (pageId != 5) {
        var activeElementNew = document.getElementById(activeSelectorNew);
        if (activeElementNew) {
            activeElementNew.classList.add('active');
        }
    }

    if (currentPage === '4') {

        sections = document.querySelectorAll('.pageSection');

        let loadedSection = null;

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                const isIntersecting = entry.isIntersecting;

                if (isIntersecting && sectionId !== loadedSection) {
                    if (loadedSection) {
                        const navSection = document.getElementById('Navsection' + loadedSection);
                        const navElement = document.getElementById('Nav' + loadedSection); // Corrected line

                        console.log('navSection:', navSection);
                        console.log('navElement:', navElement);

                        if (navSection) {
                            const playElements = document.querySelectorAll('.NavNav');
                            playElements.forEach((element) => {
                                element.classList.remove('activeLink');
                            });
                        }
                    }

                    const newNavElement = document.getElementById('Nav' + sectionId); // Changed to sectionId
                    console.log('newNavElement:', newNavElement);

                    if (newNavElement === null) {
                        document.getElementById('Navsection2').classList.remove('activeLink');

                        document.getElementsByClassName('indexHome')[0].classList.add('activeLink');
                    }

                    if (newNavElement) {
                        const playElements = document.querySelectorAll('.NavNav');
                        playElements.forEach((element) => {
                            element.classList.remove('activeLink');
                        });
                        newNavElement.classList.add('activeLink');
                    }

                    loadedSection = sectionId;
                    currentSection = parseInt(sectionId.match(/\d+/)[0], 10);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

SwitchToPage(currentPage)

function ScrollToPageSection(sectionId) {

    document.documentElement.style.scrollBehavior = "smooth";
    var element = document.getElementById('section' + sectionId);
    element.scrollIntoView();

}

var currentSection = '1';

function submitForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'sendEmail.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const successMessage = document.getElementById('success-message');
            successMessage.textContent = xhr.responseText;
        } else {
            console.error('Error:', xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Network error');
    };
    xhr.send(formData);
}