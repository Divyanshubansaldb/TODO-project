let todostring=localStorage.getItem('todo');
let todoobject=JSON.parse(todostring);

let elerem=document.getElementById('remove');
let eleadd=document.getElementById('add');
let ul=document.getElementById('list');
let eleevery=document.getElementById("removeevery");
let inputspace=document.getElementById('input');
let cl=document.querySelector('.controls');

let submit=()=>{
    let a=[];
    for (let index = 0; index < ul.children.length; index++) {
        let str=ul.children[index].textContent;
        let check=ul.children[index].childNodes[0].checked;
        let obj={inp:str,checked:check};
        a.push(obj);
    }
    todoobject['array']=a;
    todostring=JSON.stringify(todoobject);
    localStorage.setItem('todo',todostring);
}

if(todoobject===null || (typeof todoobject['array'][1]==='string'))
{
    todoobject={};
    todoobject['array']=[];
    submit();
}

for (let i = 0; i < todoobject['array'].length; i++) {
    let li=document.createElement('li');
    let label=document.createElement('label');
    label.textContent=todoobject['array'][i]['inp'];
    label.setAttribute('for','item');
    li.className='mycheck';

    let inp=document.createElement('input');
    inp.setAttribute('id','check');
    inp.setAttribute('type','checkbox');
    inp.checked=todoobject['array'][i]['checked'];

    li.appendChild(inp);
    li.appendChild(label);
    ul.append(li);
    setTimeout(() => {
        li.className='visual';
        
    }, 50);
}

inputspace.addEventListener('click',()=>{
    let find=document.getElementById('message');
    if(find)
    {
        setTimeout(() => {
            cl.removeChild(find);
        }, 30);
        return true;
    }
    else return false;
})

let removefunction=()=>{
    let li=[...ul.children];
    for (let index = 0; index < li.length; index++) {
        if(li[index].children[0].checked)
        {
            ul.removeChild(li[index]);
        }
    }
    submit();
}

elerem.addEventListener('click',removefunction);

let removeeveryfunction=()=>{
    let li=ul.children;
    while(li.length)
    {
        ul.removeChild(li[0]);
    }
    submit();
}

eleevery.addEventListener('click',removeeveryfunction);

let addfunction=()=>{
    let inputvalues=document.getElementById('input');
    let item=inputvalues.value;
    if(item==='')
    {
        if(cl.childNodes[6].textContent==='Enter your TODO!') return;
        let ele=document.createElement('p');
        ele.textContent='Enter your TODO!';
        ele.setAttribute('id','message');
        setTimeout(() => {
            cl.insertBefore(ele,cl.childNodes[6]);
        }, 50);
        return;
    }

    let li=document.createElement('li');
    let label=document.createElement('label');
    label.textContent=item;
    label.setAttribute('for','item');
    li.className='mycheck';

    let inp=document.createElement('input');
    inp.setAttribute('id','check');
    // inp.type='checkbox';
    inp.setAttribute('type','checkbox');

    li.appendChild(inp);
    li.appendChild(label);
    ul.insertBefore(li,ul.childNodes[0]);
    setTimeout(() => {
        li.className='visual';
        
    }, 50);

    inputvalues.value='';
    submit();
}

eleadd.addEventListener('click',addfunction);