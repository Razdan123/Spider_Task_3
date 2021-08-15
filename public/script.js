var nav = document.getElementById('navlist');

function toggleNav () {       

    if ( nav.style.display === "" )
    nav.style.display = "block";

    else
    nav.style.display = "";
}


function windowResizeHandler () {
    if ( screen.width > 500 )
    nav.style.display = "";
}

window.addEventListener("resize", windowResizeHandler);


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


