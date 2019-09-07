// JavaScript source code
/* Данная функция создаёт кроссбраузерный объект XMLHTTP */
function getXmlHttp() {
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function POST(url, query, callback) {
    var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
    xmlhttp.open('POST', url, true); // Открываем асинхронное соединение
    xmlhttp.setRequestHeader('Content-Type', 'application/json'); // Оформим тип запроса
    xmlhttp.timeout = 2000;
    xmlhttp.onreadystatechange = function () { // Ждём ответа от сервера
        if (xmlhttp.readyState == 4) { // Ответ пришёл
            // Сервер вернул код 200 (что хорошо)
            // Выводим ответ сервера
            var str = xmlhttp.responseText;

            // сформируем объект вывода в зависимости от статуса
            obj = {
                status: xmlhttp.status == 200 ? "ok" : xmlhttp.statusText,
                message: xmlhttp.status + ': ' + str,
                value: str !== "" ? JSON.parse(str) : {message: "Unknown error"}
            };
            callback(obj);
            return;
        }

    };
    xmlhttp.ontimeout = function () {
        obj = {
            status: "error",
            message: "ERROR: request timed out",
            value: {}
        };
        callback(obj);
    };
    xmlhttp.onerror = function () {
        obj = {
            status: xmlhttp.status,
            message: "Unknown error: " + xmlhttp.statusText,
            value: {}
        };
        callback(obj);
    };
    xmlhttp.send(query); // Отправляем POST-запрос
}


function getObj(selector) {
    let obj = document.querySelector(selector);
    return obj;
}

function visibleOnOff(obj, On) { // показывает или прячем объект [On = true - показать объект]
    console.log('visibleOnOff');
    if (obj == null) return;
    if (On) obj.classList.remove("invisible");
    else obj.classList.add("invisible")
}

window.loginForm = {
    getName: function () {
        var t = document.getElementById("email");
        if (t != null) return t.value;
        else alert('error tool var');
    },
    obj: function () {
        return getObj("#login");
    },
    hide: function () {
        console.log("login form hide");
        visibleOnOff(loginForm.obj(), false);
    },
    show: function () {
        console.log("login form show");
        visibleOnOff(loginForm.obj(), true);
    },
    setErrorState: function (msg) {
        console.log('setErrorState');
        for (let elem of document.querySelectorAll("#login .form__input")) {
            elem.classList.add("form_error-active");
        }
        getObj("#login .form__error").classList.remove('invisible');
		getObj(".form__error-msg").innerHTML = msg;
    },
    setNormalState: function () {
        console.log('setErrorState');
        for (let elem of document.querySelectorAll("#login .form__input")) {
            elem.classList.remove("form_error-active");
        }
        getObj("#login .form__error").classList.add('invisible');
    }
};

logoutForm = {
    obj: function () {
        return getObj("#logout");
    },
    hide: function () {
        console.log("logout form hide");
        visibleOnOff(logoutForm.obj(), false);
    },
    show: function (url, name) {
        console.log("logout form show");
        getObj("#logout .avatar").src = url;
		getObj("#logout .avatar-name").innerHTML = name;
        visibleOnOff(logoutForm.obj(), true);
    }
};

window.controller = {
    isLogin: false,
    avatar: {
        url: "",
        name: ""
    },
    init: function () { // инициализация объекта и свех свойств
        if (this.isLogin) this.showLogoutForm();
        else this.showLoginForm();
        console.log("init ok!");
    },

    showLogoutForm: function () { // показывает форму выхода
        loginForm.hide();
        logoutForm.show();
    },

    showLoginForm: function () { // показывает форму авторизации
        window.logoutForm.hide();
        window.loginForm.show();
    },

    doLogin: function () {
        var email = document.getElementById("email").value; // Считываем значение a
        var passw = document.getElementById("passw").value; // Считываем значение b
        var login = {email: email, password: passw};
        POST("https://us-central1-mercdev-academy.cloudfunctions.net/login", JSON.stringify(login), function (obj) {
                if (obj.status == "ok") {
                    loginForm.setNormalState();
                    loginForm.hide();
                    logoutForm.show(obj.value.photoUrl, obj.value.name);
                } else {
        			logoutForm.hide();
                    if (obj.value.error !== undefined)
                        loginForm.setErrorState(obj.value.error);
                    else
                        loginForm.setErrorState(obj.message);
        			loginForm.show();
                }
            }
        );

        //this.showLogoutForm();
        return false;
    },

    doLogout: function () {
        console.log("Logout start...");
        this.showLoginForm();
    },

    getLoginForm: function () {
        return getObj("#login");
    },
    getLogoutForm: function () {
        return getObj("#logout");
    },

};

controller.init();

function doLogin() {
    window.controller.doLogin();
    return false;
}

function doLogout() {
    window.controller.doLogout();
    return false;
}

function toggleObject(obj) {
    var f = obj.classList;
    if (f.contains('invisible')) f.remove('invisible');
    else f.add('invisible');
}

function toggleLogin() {
    toggleObject(getObj("#login"));
}

function toggleLogout() {
    toggleObject(getObj("#logout"));
}
