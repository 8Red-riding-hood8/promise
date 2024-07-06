function getPost() { // створюємо функцію getPost, яка відповідає за отримання постів
    const postid = document.getElementById('postNum').value; // отримуємо значення(ввів користувачі) з елементу id якого postNum

    if(postid >= 1 && postid <= 100){  // перевірка що отримане значення в діапазоні від 1 до 100
        fetch(`https://jsonplaceholder.typicode.com/posts/${postid}`) // fetch дозволяє здійснювати HTTP запити до веб-серверів і отримувати відповіді, в даному прикладі ми отримуємо пост за відповілним id
        .then((response) => {
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // обробка відповіді сервера, цей метод знищує тіло HTTP і повертає новий об'єкт Promise, який містить розпарсений JSON-об'єкт (JavaScript Object Notation) або масив
        })
        .then((post) => {
            const postContainer = document.getElementById('postContainer');

            postContainer.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <button onclick="getComments(${post.id})">Get Comments</button>
            `;
        })
        .catch((error) => {
            console.error(error); // якщо відповідь є невалідним JSON
        });

    } else {
        console.log(`Невірний id поста! Введіть число від 1 до 100`);
    }
}

function getComments(postid) { // створюємо функцію getComments і перелаємо параметер postid, яка відповідає 
    fetch(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`) // отримуємо коментарі за заданим id поста
    .then((response) => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // обробка відповіді сервера, цей метод знищує тіло HTTP і повертає новий об'єкт Promise, який містить розпарсений JSON-об'єкт (JavaScript Object Notation) або масив
    })
    .then((comments) => { 
        const commentsContainer = document.createElement('div');
        commentsContainer.innerHTML = `
            <h3>Comments:</h3>
            <ul>
                ${comments.map((comment) => `<li>${comment.name}: ${comment.body}</li>`).join('')}
            </ul>
            `;
        const postContainer = document.getElementById('postContainer');
        postContainer.appendChild(commentsContainer);
    })
    .catch((error) => {
        console.error(error); // якщо відповідь є невалідним JSON
    });
}
