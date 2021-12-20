const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos")); //ローカルストレージの値を取得

if(todos){
    todos.forEach(todo => {
        add(todo); //todosがあれば初期にli追加
    })
}

form.addEventListener("submit",function(event){
    event.preventDefault(); //Enterでページが自動で更新されないように
    add();
})

function add(todo){
    let todoText = input.value

    if(todo){
        todoText = todo.text;
    }
    if(todoText){ //todoText.length > 0 と書かなくても良い
        const li =document.createElement("li");　//リスト生成
        li.innerText = todoText; //todoTextをリストの文章にする
        li.classList.add("list-group-item"); //生成したリストにクラス追加

        if (todo && todo.completed) {
            li.classList.add("text-decoration-line-through");
        }

        li.addEventListener("contextmenu", function(event){
            event.preventDefault();
            li.remove();
            saveData();
        });　//右クリックで消える

        li.addEventListener("click", function() {
            li.classList.toggle("text-decoration-line-through"); //classの切り替え　横線のclass
            saveData();
        }); 

        ul.appendChild(li); //ulにliを追加
        input.value =""; //インプット内の文字を削除
        saveData();
    }
}

function saveData() {
    const lists = document.querySelectorAll("li"); //全てのliを取得しlistsとする
    let todos = [];　//変数todosという空の配列を定義

   lists.forEach(list => {
       let todo = {
           text: list.innerText,
           completed: list.classList.contains("text-decoration-line-through")
       }; //リストの文とリストのクラス(横棒)があるかをオブジェクトとして変数todoへ
       todos.push(todo); //変数todo(上記のオブジェクト)をtodos配列へ
   });
   localStorage.setItem("todos",JSON.stringify(todos)); //todosという名のキーのストレージに変数todosを入れる
}
