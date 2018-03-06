/**
*@class
* Script para iniciar sesion al sistema
* @author: Fco. Antonio García Quintana
*/
$(document).ready(function () {
    LoginPage();
});

window.LoginPage = function () {
    (function ($) {

        var login = {
            /*Inicializador del script.*/
            init: function () {
                this.cache();
                this.bindEvents();
                this.clearForm();

            },
            /*Declaracion de variables y objetos.*/
            cache: function () {
                this.btnLogin = $('#btnLogin');
                this.txtUserName = $('#txtUserName');
                this.txtPass = $('#txtPass');

                //mensajes de validacion;
                this.validUserName = $("#validUserName");
                this.validPass = $("#validPass");
            },
            clearForm: function(){
                var self = login;
                self.validUserName.hide();
                self.validPass.hide();
            },
            /*Declaración de eventos de los objetos*/
            bindEvents: function () {
                this.btnLogin.on('click', this.OnLogin);

            },
            //metodo para validar el formulario del login
            validLogin: function () {
                var self = login;
                var ret = false;
                if (self.txtUserName.val() === "") {
                    ret = true;
                    self.validUserName.show();
                } else {
                    self.validUserName.hide();
                }

                if (self.txtPass.val() === "") {
                    ret = true;
                    self.validPass.show();
                } else {
                    self.validPass.hide();
                }

                return ret;

            },
            getData: function () {
                var self = login;
                var data = {
                    usuario: {
                        id: 0,
                        username: self.txtUserName.val(),
                        pass: self.txtPass.val()
                    }
                }
                return data;
            },
            OnLogin: function () {

                var self = login;
                if (!self.validLogin()) {
                    var data = self.getData();
                    $.ajax({
                        type: 'POST',
                        url: 'Default.aspx/onLogin',
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            var ret = JSON.parse(response.d);
                            if (ret.success) {
                                alert(ret.message);

                                //redireccionamos al grid de usuarios
                                window.location.href = window.location.origin + '/Views/gridUsers';
                            } else {
                                alert(ret.message);
                            }

                        },
                        failure: function (response) {
                            var ret = JSON.parse(response.d);
                            alert(ret.message);
                        }
                    });
                }
                
            }
        };
        window.login = login.init();
    })(jQuery);
};