# mercury
# Test for mercury dev 
# by Alexander Khayev
# e-mail: alexander.khayev@gmail.com
# date: 2019-08-29

примечания к работе:
1. верстка создана для 3-х расширений: <=320px, 321px-1919px, >1920px.
для первого диапазона полностью "резиновые" настройки
для третьего вариант по-умолчанию (как в фигме, старался близко к PixelPerfect)
для второго диапазона нечто среднее (например, размер формы в пикселях, что-то другое в процентах (первый пробный вариант так сказать :)
	
так сделано потому, что в задании нет четкого описания "адаптивности", делать ли полностью резиновую верстку или просто несколько вариантов для разных разрешений?
	
2. я не нашел шрифт Gotham (по идее его дизайнер должен приложить, наверное), поэтому скачал близкое из того, что нашел в сети и прописал стилем в прямо файле html

3. в задании не указана логика перехода на форму "после" успешной авторизации, поэтому я сделал все внутри одного файла путём сокрытия элементов. Полагаю, что правильнее было бы сделать две формы, одна с авторизацией, вторая с профилем и переходить с первой на вторую, например, через Location.href=...  Но поскольку в задании логика не прописана, то счёл этот момент несущественным

4. стили пересекаются и местами лишние. Не успел вычистить, т.к. с одной стороны боялся опоздать с выполнением задания, а с другой - я не силен в верстке, поэтому процесс "оптимизации вручную" мог затянуться, а автоматических инструментов я пока не знаю (которые бы на 100% надежно это делали)

5. для кнопки "Login" мне показались неправильным то, что она для сфокусированного случая белая и без рамки, в то время как разные браузеры активные элементы ввода иногда подсвечивают рамкой. Поэтому вопреки заданию я задал свою рамку как для элементов ввода, так и для кнопки, для единообразия и понятного выделения кнопки при работе только на клавиатуре

6. в задании не указано, должны ли подсвечиваться поля после неудачной авторизации, поэтому я добавил сброс "красноты" после повторной фокусировки в полях ввода

7. скриншоты с телефона приложены к письму ответа в почте и в репозитории

8. код не 100% универсальный (из серии - не работает шрифт в IE и есть проблемы с JS там), но в современных браузерах все работает (даже в моём Microsoft Lumia 435, где многие сайты очень кривые :) )

9. я никогда не работал с figma, поэтому, возможно, какие-то данные макета взял оттуда неправильно, готов обсудить и поправить

10. работа со всеми полями построена на айдишниках, что мне видится не совсем правильным, но чтобы не перегружать задание, я счел этот момент некритичным

11. в поля ввода сразу забил правильные значения, так неправильно, но считаю для тестового задания допустимо - и отлаживать удобнее и вам меньше времени тратить на проверку (вдруг вы вручную будете смотреть)

P.S.: С уважением к команде Mercury Dev,
	  будущий стажер Хаев Александр.
	  г.Самара

