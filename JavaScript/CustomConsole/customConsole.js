"use strict";
/**
 * Custom Console object
 * 
 * @param {boolean} showDate Whether to log the date when writing logs to the DOM
 */
function customConsole(showDate) {

    let body = document.body,
        elem = null,
        embedId = 'cc_embedder',
        elem_console = null,
        show_date = (showDate !== 'undefined' && showDate) ? true : false;

    /**
     * Create the console element
     */
    function createConsoleElement() {
        elem = document.createElement('section');
        elem.className = "custom-console-logger";
        elem.id = embedId;
        
        // Header
        let elem_header = document.createElement('header');
        elem_header.className = "console-header";
        elem_header.innerText = "Custom Console";
        elem_header.style.fontWeight = "bold";
        elem_header.style.padding = "0 10px";
        elem_header.style.height = "15%";
        elem_header.style.lineHeight = "200%";
        elem_header.style.boxShadow = "inset 0 -1px 0px #ccc"
        elem.appendChild(elem_header);

        // Console
        elem_console = document.createElement('div');
        elem_console.className = "console-logger";
        elem_console.style.overflowY = "auto";
        elem_console.style.height = "84%";
        elem_console.style.padding = "0 10px";
        elem.appendChild(elem_console);

        // Style it
        elem.style.boxSizing = "borderBox";
        elem.style.position = "absolute";
        elem.style.zIndex = "99999";
        elem.style.height = "25vh";
        elem.style.width = "100vw";
        elem.style.bottom = "0";
        elem.style.left = "0";
        elem.style.right = "0";
        elem.style.backgroundColor = "#eeeeee";
        elem.style.borderWidth = "1px 0 0 0";
        elem.style.borderColor = "#000000";
        elem.style.borderStyle = "solid";
        elem.style.overflow = "hidden";

        // Append it
        body.appendChild(elem);
    }
    
    /**
     * Initialize the setup
     */
    function init() {
        if (document.querySelector('#' + embedId) !== null) {
            elem = document.querySelector('#' + embedId);
        } else {
            createConsoleElement();
        }
    }

    /**
     * Log a message to custom console
     * @param {string} text The text to log
     */
    function log(text) {
        let elem_console_logger = document.querySelector('.console-logger');
        let newLog = document.createElement('div');
        newLog.className = "custom-logger_new-log";
        newLog.style.padding = "5px 0";
        newLog.innerHTML = "";
        
        if (show_date) {
            var d = new Date();
            newLog.innerHTML = d.toString() + "<br />";
        }
        
        newLog.innerHTML += text;
        elem_console_logger.appendChild(newLog);
        elem_console_logger.scrollTop = elem_console_logger.scrollHeight;
    }

    return {
        init: init,
        log: log
    }
}