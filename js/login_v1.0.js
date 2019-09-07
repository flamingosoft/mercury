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

function POST(url, query, callback)
{
	var xmlhttp = getXmlHttp(); // Создаём объект XMLHTTP
	xmlhttp.open('POST', url, true); // Открываем асинхронное соединение
    xmlhttp.setRequestHeader('Content-Type', 'application/json'); // Оформим тип запроса
	xmlhttp.timeout = 2000;
    xmlhttp.onreadystatechange = function () 
	{ // Ждём ответа от сервера
        if (xmlhttp.readyState == 4) 
		{ // Ответ пришёл
			// Сервер вернул код 200 (что хорошо)
			// Выводим ответ сервера
			var str = xmlhttp.responseText;

			// сформируем объект вывода в зависимости от статуса
			obj = { 
				status: xmlhttp.status == 200 ? "ok": xmlhttp.statusText,
				message: xmlhttp.status + ': ' +str, 
				value: str !== "" ? JSON.parse(str): { message: "Unknown error" }
			};
			callback(obj);
			return;
        }

    };
	xmlhttp.ontimeout = function() {
		obj = {
			status: "error", 
			message: "ERROR: request timed out", 
			value: {} 
		};
		callback(obj);
	};
	xmlhttp.onerror = function() {
		obj = {
			status: xmlhttp.status, 
			message: "Unknown error: " + xmlhttp.statusText, 
			value: {} 
		};
		callback(obj);		
	};
    xmlhttp.send(query); // Отправляем POST-запрос
}

function AddClass(elId, className)
{
	// возможно ClassList не везде сработает корректно, но полной универсальности
	// в ТЗ не требовалось, а на всех современных браузерах это вроде бы работает
	var myButtonClasses = document.getElementById(elId).classList;
	myButtonClasses.add(className);
}

function RemoveClass(elId, className)
{
	var myButtonClasses = document.getElementById(elId).classList;
	myButtonClasses.remove(className);
}

function SetAvatarView(photoUrl = null, name = null)
{
	if (photoUrl == null && name == null)
	{
		// нет данных, значит оставляем форму авторизации
		//document.getElementById("user").style = "display: none;";
		document.getElementById("avatar").src = "";
		document.getElementById("name").innerHTML = "no name";
		RemoveClass("login", "invisible");
		AddClass("user", "invisible");
	}
	else
	{
		// иначе показываем форму выхода из профиля и скрываем форму авторизации
		//document.getElementById("user").style = "display: block";
		document.getElementById("avatar").src = obj.value.photoUrl;
		document.getElementById("name").innerHTML = obj.value.name;
		document.getElementById("login").innerHTML = "";
		RemoveClass("user", "invisible");
		AddClass("login", "invisible");
	}	
}

function SetErrorMsgView(message = null)
{
	if (message == null)
	{
		//document.getElementById("errorMessage").style = "display: none";
		RemoveClass("email", "wrong");
		RemoveClass("passw", "wrong");
		AddClass("errorMessage", "invisible");
	}
	else 
	{
		document.getElementById("errorMessage").value = message;
		//document.getElementById("errorMessage").style = "display: block;";
		RemoveClass("errorMessage", "invisible");
		AddClass("email", "wrong");
		AddClass("passw", "wrong");
		
		var removeWrong = function() { 
			RemoveClass("email", "wrong");
			RemoveClass("passw", "wrong"); 
		};
		
		email.onfocus = removeWrong;
		passw.onfocus = removeWrong;
	}
}

function LogIn() {
	SetAvatarView();
	SetErrorMsgView();
	
	var email = document.getElementById("email").value; // Считываем значение a
    var passw = document.getElementById("passw").value; // Считываем значение b
	var login = { email: email, password: passw };
	POST("https://us-central1-mercdev-academy.cloudfunctions.net/login", JSON.stringify(login), function(obj) {
			if (obj.status == "ok")
			{
				SetAvatarView(obj.value.photoUrl, obj.value.name);
				SetErrorMsgView();
			}
			else
			{
				SetAvatarView();
				if (obj.value.error !== undefined)
					SetErrorMsgView(obj.value.error);
				else
					SetErrorMsgView(obj.message);
			}
		}
	);
}

function LogOut()
{
	alert("LogOut is not implementation!");
}