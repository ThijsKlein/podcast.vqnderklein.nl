var currentPage = '0';

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
}

if (currentPage === '4') {

    console.log('hi');

    document.addEventListener('DOMContentLoaded', function() {
        const sections = document.querySelectorAll('.pageSection');



        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    document.getElementById('Navsection' + currentSection).classList.remove('activeLink');

                    document.getElementById('Nav' + entry.target.id).classList.add('activeLink');

                    const numberRegex = /\d+/;
                    currentSection = parseInt(entry.target.id.match(numberRegex)[0], 10);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            observer.observe(section);
        });




    });
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