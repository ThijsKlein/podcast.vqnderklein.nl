var currentPage = '1';

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

SwitchToPage(currentPage)