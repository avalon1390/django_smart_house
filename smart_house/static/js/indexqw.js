  const submitBtn = document.getElementById('processing');
    submitBtn.removeEventListener('click', logIn);
    submitBtn.addEventListener('click', logIn);

var socket = new WebSocket("ws://" + window.location.host + "/chat/");
socket.onmessage = function(e) {
    alert(e.data);
}
socket.onopen = function() {
    socket.send("hello world");
}
// Call onopen directly if socket is already open
if (socket.readyState == WebSocket.OPEN) socket.onopen();


  function logIn(event) {
        event.preventDefault();

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
                if (xhr.readyState != 4) {
                    return;
                }
                if(xhr.status != 200) {
                    console.log('error');
                    alert("no user");
                    return;
                }
                console.log(xhr.responseText);
                let url=JSON.parse(xhr.responseText).result;
                console.log(url);

            };
        xhr.open('GET', `/login`);
        xhr.send();
    };
/
/
/
/
/
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
/
/
/
/
/
/
/
/

var posts = [];
var test="";

var ExitButton = React.createClass({
    onBtnClickHandler: function() {
    logOut();
    },
    render: function() {
        return (
            <div>
                <button onClick={this.onBtnClickHandler} ref='alert_button2'>Выход</button>
            </div>
        );
    }
});

var Article = React.createClass({

    getInitialState: () => {
        return {
            visible: false
        };
    },

    render: function() {
        var sensor = this.props.data.SensorName,
            text = this.props.data.SensorData
        return (
            <div className='article'>
                <p className='news__sensor'>{sensor}:</p>
                <p className='news__text'>{text}</p>
            </div>
        )
    }
});

var News = React.createClass({

    getInitialState: function() {
        return {
            counter: 0
        }
    },
    render: function() {
        var datas = this.props.data;
        var newsTemplate;

        if (datas != "") {
            datas=Array.prototype.slice.call(datas);
            newsTemplate = datas.map(function(item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                );
            });
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }
        return (
            <div className='news'>
                {newsTemplate}
            </div>
        );

    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className='app'>
                <h3>Показания</h3>
                <ExitButton />
            </div>
        );
    }
});
var AppData = React.createClass({
    render: function() {
        return (
            <div className='app_data'>
                <News data={posts} /*data={result}*/ />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
function tick(){
    ReactDOM.render(
         <AppData />,
         document.getElementById('result')

    );
}
setInterval(tick,4000);


var numerator=0;
var autoGet;
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


function logOut() {

        deleteCookie("logged_in");
        window.location.href = "/logout/";
}



var socket = new WebSocket("ws://" + window.location.host + "/"+getCookie("logged_in").replace("=", "")+"/");
socket.onmessage = function(e) {
    console.log(e.data);
    socket.send(getCookie("logged_in"));
}
socket.onopen = function() {
    socket.send(getCookie("logged_in").replace("=", ""));
}
if (socket.readyState == WebSocket.OPEN) socket.onopen();