/**
*@class
* Script para registrar usuario del sistema
* @author: Fco. Antonio García Quintana
*/
$(document).ready(function () {
    RegisterUser();
});

window.RegisterUser = function () {
    (function ($) {

        var UserRegisterPage = {
            /*Inicializador del script.*/
            init: function () {
                this.cache();
                this.bindEvents();
                this.clearForm();


            },
            /*Declaracion de variables y objetos.*/
            cache: function () {
                this.btnSave = $('#btnSave');

                //campos del formulario
                this.txtUserName = $("#txtUserName");
                this.txtPass = $("#txtPass");
                this.txtEmail = $("#txtEmail");
                this.sltSexo = $("#sltSexo");
                this.chckActivo = $("#chckActivo");

                //mensajes de validacion
                this.validUserName = $("#validUserName");
                this.validPass = $("#validPass");
                this.validEmail = $("#validEmail");
                this.validSexo = $("#validSexo");
                this.validEstructureEmail = $("#validEstructureEmail")

            },
            /*Declaración de eventos de los objetos*/
            bindEvents: function () {
                this.btnSave.on('click', this.OnSave);

            },
            clearForm: function () {
                var self = UserRegisterPage;


                self.txtUserName.val('');
                self.txtPass.val('');
                self.txtEmail.val('');
                self.sltSexo.val('-1');
                self.chckActivo.prop('checked', false);

             

                self.validUserName.hide();
                self.validPass.hide();
                self.validEmail.hide();
                self.validSexo.hide();
                self.validEstructureEmail.hide();
            },
            getData: function () {
                var self = UserRegisterPage;

                var data = {
                    usuario: {
                        id: 0,
                        username: self.txtUserName.val(),
                        pass: self.txtPass.val(),
                        email: self.txtEmail.val(),
                        sexo: self.sltSexo.val(),
                        activo: self.chckActivo.is(':checked')
                    }
                }
                return data;
            },
            OnSave: function () {
                
                var self = UserRegisterPage;
                if (!self.validationForm()) {
                    var data = self.getData();
                    $.ajax({
                        type: 'POST',
                        url: 'RegisterUser.aspx/onSave',
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (response) {
                            var ret = JSON.parse(response.d);
                            if (ret.success) {
                                alert(ret.message);

                                //redireccionamos a la pagina de inicio
                                window.location.href = window.location.origin;
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
              
            },
            validationForm() {
                var self = UserRegisterPage;
                var regularExpressionEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                var ret = false;
                //validacion de nombre
                if (self.txtUserName.val() === "") {
                    self.validUserName.show();
                    ret = true;
                } else {
                    self.validUserName.hide();
                }

                //validacion de pass
                if (self.txtPass.val() === "") {
                    self.validPass.show();
                    ret = true;
                } else {
                    self.validPass.hide();
                }

                //validacion de email
                if (self.txtEmail.val() === "") {
                    self.validEmail.show();
                    ret = true;
                } else {

                    self.validEmail.hide();
                    //validacion del formato del correo electronico
                    if (!regularExpressionEmail.test(self.txtEmail.val())) {
                        self.validEstructureEmail.show();
                        ret = true;
                    } else {
                        self.validEstructureEmail.hide();
                    }
                }
                //validacion de sexo
                if (self.sltSexo.val() === "-1") {
                    self.validSexo.show();
                    ret = true;
                } else {
                    self.validSexo.hide();
                }
                return ret;
            }
        };
        window.UserRegisterPage = UserRegisterPage.init();
    })(jQuery);
};