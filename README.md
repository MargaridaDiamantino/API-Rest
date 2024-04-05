
<h1>pass.in</h1>
O pass.in é uma aplicação de gestão de participantes em eventos presenciais.

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.


<h1>comandos</h1>


npm install

npm  run start

npm run db:migrate

npm run db:studio

<h1>Requisitos</h1>


<h1>Requisitos funcionais</h1>

 O organizador deve poder cadastrar um novo evento;
 
 O organizador deve poder visualizar dados de um evento;
 
 O organizador deve poser visualizar a lista de participantes;
 
 O participante deve poder se inscrever em um evento;
 
 O participante deve poder visualizar seu crachá de inscrição;
 
 O participante deve poder realizar check-in no evento;


 <h1>Regras de negócio</h1>

  O participante só pode se inscrever em um evento uma única vez;
	
 O participante só pode se inscrever em eventos com vagas disponíveis;
 
 O participante só pode realizar check-in em um evento uma única vez;


 <h1>Requisitos não-funcionais</h1>

 O check-in no evento será realizado através de um QRCode;

 <h1>Documentação da API (Swagger)</h1>


 	https://localhost:3333-docs/json

 <h1>Banco de Dados</h1>
Nessa aplicação  usei um banco de dados relacional (SQL). Para ambiente de desenvolvimento  com o SQLite pela facilidade do ambiente.
