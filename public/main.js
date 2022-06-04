
const update = document.querySelector('#update-button')
update.addEventListener('click', _=> {
    fetch('/quotes', {
        method : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify(data = {
            name: 'Darth Vadar',
            quote: 'I find your lack of faith.'
        })
    }).then(res => {
        if(res.ok) return res.json()
    }).then(response => {
        console.log(response)
        window.location.reload(true)
    }).catch(error => {
        console.log(error)
    })
})


const Delete = document.querySelector('#delete-button')
Delete.addEventListener('click', _=> {
    fetch('/quotes', {
        method : 'delete',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify(data = {
            name: 'Abdulfatah'
        })
    }).then(res => {
        if(res.ok) return res.json()
    }).then(response =>{
        if(response ==='no quotes to delete'){
            document.querySelector('#message').textContent = 'No Darth Vadar quote to delete';
        }else{
            window.location.reload(true)
        }
    }).
    catch(error => {
        console.log(error)
    })
})