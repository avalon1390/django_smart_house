((() => {
    var autoGet;
    const requestBtn = document.getElementById('request');
    const logOutBtn = document.getElementById('back');
    requestBtn.removeEventListener('click', start);
    requestBtn.addEventListener('click', stop);
    requestBtn.removeEventListener('click', stop);
    requestBtn.addEventListener('click', start);
    logOutBtn.addEventListener('click',logOut );
}))();
var numerator=0;
function getCookie(name) {
  let r = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  if (r) return r[2];
  else return "";
}

function deleteCookie(name) {
   let date = new Date(); // Берём текущую дату
   date.setTime(date.getTime() - 1); // Возвращаемся в "прошлое"
   document.cookie = name += `=; expires=${date.toGMTString()}`; // Устанавливаем cookie пустое значение и срок действия до прошедшего уже времени
}

function start(event) {
        event.preventDefault();
        numerator += 1;
        console.log(numerator);
        autoGet = setTimeout(getData,1);
    }

function logOut(event) {
        event.preventDefault();

        deleteCookie("logged_in");
        window.location.href = "/";
}

function getData() {

   let xhr = new XMLHttpRequest();
       xhr.onreadystatechange= () => {
           if (xhr.readyState != 4) {
               return;
           }
           if(xhr.status != 200) {
               console.log('error');
               return;
           }
           var posts = "";
           result.innerHTML=""
           const sensorData = JSON.parse(xhr.responseText).answer;
           for(let i = 0;i<sensorData.length;i++){
               let splitted = sensorData[i].split('@')
               //posts.push("Показания датчика - "+splitted[0]+" за "+splitted[1]+" = "+splitted[2]+'<br/>');
               posts+="Показания датчика - "+splitted[0]+" за "+splitted[1]+" = "+splitted[2]+'<br/>';
           }
           result.innerHTML=posts;
           console.log(posts);
           if(numerator>1){
           clearTimeout(autoGet);
           numerator -= 1;
           }
           else{autoGet = setTimeout(getData,5000)};
       };
       console.log(getCookie("logged_in"));
       xhr.open('GET', `/get_data?l${getCookie("logged_in")}`);
       xhr.send();
}