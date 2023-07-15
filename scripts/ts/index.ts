// Elements

const previewIcon = document.querySelector(".preview-icon");
const passwordInput = document.querySelector('.login-card--password input') as HTMLInputElement
// Actions
previewIcon.addEventListener('click',() => {
    if(passwordInput.type === 'password'){
        passwordInput.type = 'text'
        return
    }

    passwordInput.type = 'password'
})
