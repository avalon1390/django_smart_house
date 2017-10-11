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