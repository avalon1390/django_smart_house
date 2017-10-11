((() => {

    const submitBtn = document.getElementById('processing');
    submitBtn.addEventListener('click', logIn);

}))();

function setCookie(name, value) {
   document.cookie = `${name}=${value}`;
}

function logIn(event) {
        event.preventDefault();
        const inLog = document.getElementById('login');
        const inPas = document.getElementById('password');
        if (inLog.value==""||inPas.value==""){alert("Логин и пароль должны быть введены")
        }else if (/[^A-z\. ]/.test(inLog.value)||inLog.value==""){alert("Логин должен состоять из латинских символов")
        }else if (inPas.value.length>16||inPas.value.length<3){alert("Длина пароля должна быть от 3 до 16 символов")
        }else{
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) {
                    return;
                }
                if(xhr.status != 200) {
                    console.log('error');
                    alert("Пользователь с данным логином не существует");
                    return;
                }
                //let url=JSON.parse(xhr.responseText).result;
                console.log(xhr.responseText);
                console.log(window.location.host +'/index/');

                setCookie("logged_in=", inLog.value);
                window.location.href = '/';
            };

        xhr.open('GET', `/login?a=${inLog.value}&b=${inPas.value}`);
        xhr.send();
        }
    }

