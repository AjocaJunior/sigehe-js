console.log('SIGEHE');

var firebaseConfig = {
    apiKey: "AIzaSyCnQjyxi9V0GlrQs_CjXTWIK7_4CLDAzVk",
    authDomain: "sigehe-fa801.firebaseapp.com",
    projectId: "sigehe-fa801",
    storageBucket: "sigehe-fa801.appspot.com",
    messagingSenderId: "930304808574",
    appId: "1:930304808574:web:82e181baf98952bb022a2f",
    measurementId: "G-JBM10MRBX0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth.Auth.Persistence.LOCAL;

$("#login-btn").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != "") {

        firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {

            // var userId = firebase.auth().currentUser.uid;
            
                    window.location.href = "index.html";
              

        }).catch(function (error) {
            var errormessage = error.message;
            console.log("Error Message:" + errormessage);
        });

    } else {
        window.alert('Porfavor, preencha os campos vazios');
    }
});


//REGISTRAR ...

$("#registrar-btn").click(function () {
    var code = $("#code").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var pass1 = $("#pass1").val();


    if (email != "" && password != "" && pass1 != "") {

        if (password == pass1) {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {

                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref("Users/" +userId).once('value').then(function(snapshot)
                {
                    if(snapshot.val()){
                        window.location.href = "index.html";
                    }else{
                        window.location.href = "user-details.html";
                    }
                });


            }).catch(function (error) {
                var errormessage = error.message;
                console.log("Error Message:" + errormessage);
            });
        } else {
            window.alert('A senha não combina com a senha de confirmação');
        }

    } else {
        window.alert('Porfavor, preencha os campos vazios');
    }
});

// FIM REGISTRAR

//RECUPERAR PASSWORD

$("#recuperar-pw-btn").click(function () {
    var auth = firebase.auth();
    var email = $("#email").val();

    if (email != "") {
        auth.sendPasswordResetEmail(email).then(function () {
            window.alert('Email para recuperação de senha enviado, verifique sua caixa de entradas.');
        }).catch(function (error) {
            var errormessage = error.message;
            console.log("Error Message:" + errormessage);
        })
    } else {
        window.alert('Porfavor, coloque seu email!');
    }

});

//FIM RECUPERAR PASSWORD..


//LOG OUT

$("#logout-btn").click(function () {
    firebase.auth().signOut();
    window.location = "login";
});

//FIM LOG OUT

$("#salvar-actualizar-btn").click(function () {
    var firstName = $("#firstName").val();
    var secondName = $("#secondName").val();
    var genero = $("#genero").val();
    var phone = $("#phone").val();
    var curso = $("#curso").val();
    var semestre = $("#semestre").val();

    var rootRef = firebase.database().ref().child("users");
    var userId = firebase.auth().currentUser.uid;
    var userRef = rootRef.child(userId);

    if (firstName != "" && secondName != "" && genero != "" && phone != "" && curso != "" && semestre != "") {

        var userData = {
            "nome": firstName,
            "apelido": secondName,
            "genero": genero,
            "phone": phone,
            "curso":curso,
            "semestre":semestre
        };

        userRef.set(userData, function(error){
if(error){
    var errormessage = error.message;
            console.log("Error Message:" + errormessage);
}else{
    window.location.href="index.html";
}
        });
    } else {
        window.alert('Porfavor, preencha todos os campos!')
    }

});