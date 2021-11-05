const inputNewTask = document.querySelector('.inputNewTask');
const btnTask = document.querySelector('.appendTask');
const ulTask = document.querySelector('.tarefas');

function criaLi(){
    const li = document.createElement('li');
    return li;
};

inputNewTask.addEventListener('keypress', function(e){
    if (e.keyCode ===13){
        if(!inputNewTask.value) return;
        criaTarefa(inputNewTask.value)
    }
});

function limpaInput(){
inputNewTask.value = '';
inputNewTask.focus();
}

function criaBtnApagar(li){
    li.innerText += ' ';
    const btnApagar = document.createElement('button');
    btnApagar.innerText = 'Apagar';
    btnApagar.setAttribute('class', 'apagar'); //Cria tag e name;
    li.appendChild(btnApagar);
};


function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    ulTask.appendChild(li);
    limpaInput();
    criaBtnApagar(li);
    salvarTarefas();
};

btnTask.addEventListener('click', function(){
    if (!inputNewTask.value) return;
    criaTarefa(inputNewTask.value);
});

document.addEventListener('click', function(e){
    const el = e.target;
    if (el.classList.contains('apagar')){
       el.parentElement.remove();
       salvarTarefas();
    }
});

function salvarTarefas(){
    const liTarefas = ulTask.querySelectorAll('li')
    const ListaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        ListaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(ListaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
};

function addTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const ListaDeTarefas = JSON.parse(tarefas);

    for ( let tarefa of ListaDeTarefas){
        criaTarefa(tarefa);
    }

}
addTarefasSalvas();

