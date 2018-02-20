// Language JSON File Location
var language = localStorage.getItem('language');
// Default Language
var default_lang = 'en';

// Set Selected Language
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    language = localStorage.getItem('language');
    // Run Multi Language Plugin
    getLanguage()
}

// Run Multi Language Plugin
function getLanguage() {
    // Language on user preference
    (language == null) ? setLanguage(default_lang) : false;
    // Load data of selected language
    $.ajax({
        url: 'locales/' + language + '.json',
        dataType: 'json', async: true
    }).done(function (lang) {
        // add selected language class to the body tag
        $('body').attr('class', language);
        // Loop through message in data
        $.each(lang, function (index, val) {
            (index === 'head') ? $(document).attr("title", val['title']) : false;
            $(index).children().each(function () {
                $(this).text(val[$(this).attr('key')])
            })
        })
    })
}

// Auto Loader
$(document).ready(function () {
    if (language != null && language !== default_lang)
        getLanguage(language);
});
