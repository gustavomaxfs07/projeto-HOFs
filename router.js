let renderinterface = 'table'

window.onload = function() {
    renderPage(renderinterface)
}

function renderPage(pageName) {
    switch (pageName) {
        case "table":
            renderDefalt()
            break
        case "graphics":
            renderGraphics()
            break
        case "report":
            renderReport()
            break
    }
}