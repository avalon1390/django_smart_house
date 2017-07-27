  const submitBtn = document.getElementById('processing');
    submitBtn.removeEventListener('click', logIn);
    submitBtn.addEventListener('click', logIn);


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