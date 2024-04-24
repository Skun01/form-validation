// thay đổi các thẻ input
function invalidSign(object, checkElement, messageSelector, changeHaveError){
    var daddy = checkElement.parentElement;
    var message = object.report(checkElement.value);
    console.log(message);
    if(message){
        changeHaveError = true;
        daddy.classList.add("invalid");
        daddy.querySelector(messageSelector).textContent = message;
    }else if(changeHaveError){
        changeHaveError = false;
        if(daddy.querySelector(messageSelector).textContent === object.errorMessage){
            daddy.classList.remove("invalid");
           daddy.querySelector(messageSelector).textContent = ""; 
        }
        
    }
    return changeHaveError;
}
// check everything, no want to sleep:
function validator(formOption){
    var formElement = document.querySelector(formOption.form);
    formOption.rules.forEach(function(object){
        var checkElement = formElement.querySelector(object.selector);
        var haveOwnError = false;
        checkElement.addEventListener('blur', function(){  
            haveOwnError = invalidSign(object, checkElement,".form-message", haveOwnError);
        });

        checkElement.addEventListener('input', function(){
            checkElement.parentElement.classList.remove("invalid");
            checkElement.parentElement.querySelector(".form-message").textContent = "";
        })
        
    });
    // button
    var buttonElement = formElement.querySelector(formOption.button);
    buttonElement.addEventListener("click", function(event){
        var error = false;
        formOption.rules.forEach(function(object){
            var checkElement = formElement.querySelector(object.selector);
            var haveOwnError = false;
            haveOwnError = invalidSign(object, checkElement,".form-message", haveOwnError);
            error = error || haveOwnError;
        });
        if(error){
            event.preventDefault();  
        }
        
    });
    

}
// required function
function required(selectorCheck){
    return {
        selector: selectorCheck,
        errorMessage: "Vui lòng nhập vào trường này",
        report: function(value){
            return value.trim() ? undefined : "Vui lòng nhập vào trường này";
        }
    }
}
// check email bằng biểu thức chính quy
function checkEmail(selectorCheck){
    return {
        selector: selectorCheck,
        errorMessage : "Trường này phải là email",
        report: function(value){
            const emailRegex = /^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/;
            return value.trim().length === 0 || emailRegex.test(value)? undefined : "Trường này phải là email";
            
        }
    }
}
// check password
function checkPassword(selectorCheck){
    return {
        selector: selectorCheck,
        errorMessage: "Vui lòng nhập tối thiểu 6 ký tự",
        report: function(value){
            return value.trim().length >= 6 || value.trim().length === 0? undefined : "Vui lòng nhập tối thiểu 6 ký tự";
        }
    }
}
// xác nhận lại passsword
function confirmPassword(selectorConfirm, selectorPass, dadSelectorPass){
    return {
        selector: selectorConfirm,
        errorMessage: "Mật khẩu nhập lại không đúng",
        report: function(confirmValue){
            var passValue = document.querySelector(`${dadSelectorPass} ${selectorPass}`).value;
            console.log(passValue);
            return passValue.trim() === confirmValue.trim()? undefined : "Mật khẩu nhập lại không đúng"
        }
    }
}