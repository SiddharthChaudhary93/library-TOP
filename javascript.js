const form = document.querySelector('#details')
const inputs = form.querySelectorAll('input[type=text]');
const result = document.querySelector('.result');
var allBooks = JSON.parse(localStorage.getItem('books')) || [];
console.log('all books:',allBooks);

function getValues(e){
    e.preventDefault();
    let values=[];
    let createElement = true;
    inputs.forEach(input=>{
        // console.log(input);
        console.log(`${input.id} value is ${input.value}`);
        if(input.id==='pages'){
            if(input.value<1 || input.value>5000){
                alert(`not a valid value`);
                createElement=false;
                return;
            }
        }
        if(input.id==='read'){
            console.log(input.value.toLowerCase())
            if(input.value.toLowerCase()!=='yes' && input.value.toLowerCase()!=='no'){
                alert(`not a valid value`);
                createElement=false;
                return;
            }
            
        }
        values.push(input.value.toLowerCase());
        
        
    });
    allBooks.push(values);
        // console.log(allBooks);
    if(createElement){
        addElement(values);
        localStorage.setItem('books',JSON.stringify(allBooks));
        //will also work if we dont stringify till the type is string 
    }
    
    window.location.reload();
    
}
let id=0;
function addElement(values){
    
    const div = document.createElement('div');
    
    const html = `
        <div '>
            <p class='name'>${values[0]}</p>
            <div class='author__page'>
                <p class='author'>By:- ${values[1]}</p>
                <p class='pages'>${values[2]} pages in total</p>
            </div>
            <div class='options'>
                <button class='add'>+</button>
                <button class='remove' value='${id}'>-</button>
                <button class='${values[3]==='yes' ? 'read--yes':'read--no'} read'>Read : ${values[3]}</button>
            </div>
        </div>
        
    `;
    
    div.classList.add('result_flex');
    div.classList.add(`class-${id}`);
    id++;
    div.innerHTML = html;
    result.appendChild(div);
    
    
}
// window.location.reload();
form.addEventListener('submit',getValues);

allBooks.forEach(book=>{
    addElement(book);
});

const readButtons = document.querySelectorAll('.read');
function changeRead(){
    if(this.innerHTML.includes('yes')){
        this.classList.remove('read--yes');
        this.classList.add('read--no');
        this.innerHTML = `Read : no`
    }
    else if(this.innerHTML.includes('no')){
        this.classList.remove('read--no');
        this.classList.add('read--yes');
        this.innerHTML = `Read : yes`
    }
}

readButtons.forEach(readBtn => {
    readBtn.addEventListener('click',changeRead);
});

const removeButtons = document.querySelectorAll('.remove');

function removeElement(){
    console.log(this.value);
    const div = document.querySelector(`.class-${this.value}`);
    console.log(div);
    div.innerHTML='';
    result.removeChild(div);
    allBooks.splice(this.value,1);
    // console.log(allBooks);
    localStorage.setItem('books',JSON.stringify(allBooks));
    window.location.reload();
}

removeButtons.forEach(button=>{
    button.addEventListener('click',removeElement);
})

