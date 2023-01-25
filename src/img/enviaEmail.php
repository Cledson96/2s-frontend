<?php
         $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
     $mensagem = $_POST['mensagem'];
    $remetente = "Contato realizado pelo site...";

    require_once('phpmailer/class.phpmailer.php');
    $mail = new PHPMailer();
    $mail->IsSMTP();

    try {
        $mail->IsSMTP();                                             // Define que a mensagem ser� via SMTP
        $mail->SMTPAuth = true;                                      // Usa autentica��o SMTP
        $mail->Host = "mail.moveexpress.com.br";                     // Configura��es do Servidor de email
        $mail->Port = 587;                                           // Porta SMTP para envio
        //$mail->SMTPSecure = "SSL";                                 // Tipo de Autentica��o  
        $mail->Username = "webmaster@moveexpress.com.br";            // Usuario de Email para validar envio de email
        $mail->Password = "@@2020#!A";                               // Senha do Email
        $mail->Subject = ('*** Contato pelo site ***');              // Titulo do Email
        $mail->AddAddress('contato@moveexpress.com.br');           // Enviar Para 	
        $mail->AddBCC('webmaster@moveexpress.com.br');
        $mail->SetFrom($email);     // Email envido de
        $mail->MsgHTML(
                "
                <!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>
                <html xmlns='http://www.w3.org/199ite9/xhtml' xml:lang='pt-br' lang='pt-br'>
                <head>
                <title></title>
                    <style type='text/css'>
                    .dados {
                        padding:5px;
                        width:100%;
                        font-family:'Trebuchet MS', Calibri, Arial, Helvetica, sans-serif;
                        font-size:13px;
                        color:#000000;
                        background:#E8F3FF;							
                    }
                    h3 {
                        color:#0000CD;
                    }
                    h2 {
                        color:#436EEE;
                    }
                    h4 {
                        color:#B22222;
                    }									
                    </style>
                </head>
                <body>
                    <table class='dados' align='center'>
                        <tr>
                            <td class='dados'><h2><i><b>$remetente!</b></i></h2></td>
                        </tr>
                        <tr>
                            <td class='dados'><h3><i>Ola, $name, esta solicitando um contato pelo site!</i></h3></td>				                            
                        </tr>
                        <tr>
                            <td class='dados'>Nome do contato : <i><b> $name</b></i></td>
                        </tr>
                        <tr>
                            <td class='dados'>E-mail para contato : <i><b>$email</b></i></td>
                        </tr>
                        <!--
                        <tr>
                            <td class='dados'>Assunto : <i><b>$assunto</b></i></td>
                        </tr>				                        
                        -->
                        <tr>
                            <td class='dados'>Telefone para contato : <i><b>$phone</b></i></td>
                        </tr>				                        
                        <tr>
                            <td class='dados'>Mensagem do cliente : <i><b>$mensagem</b></i></td>
                        </tr>				                        
                        <tr>
                            <td class='dados'><h4>Atenciosamente - $name</h4></td>
                        </tr>
                        <!--
                        <tr>
                            <td class='dados'><h4>Endere�o Site - $enderecoSite</h4></td>                                                                
                        </tr>
                        -->
                    </table>
                <!-- Code injected by live-server -->
<script>
	// <![CDATA[  <-- For SVG support
	if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}
	// ]]>
</script>
</body>
                </html>
        	");
        $mail->Send();
    } catch (phpmailerException $e) {
        echo $e->errorMessage();
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    require_once('retornoMensagem.php');
?>