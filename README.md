# TFC - Gerenciamento de classificação de um campeonato. (backend)
#### `POO | Typescript | Sequelize | MYSQL | Mocha | Chai | Sinon | Docker | Express | Joi | JWT | BCript`

<br>
O TFC é um sistema de gerenciamento de campeonado onde é possível adicionar novos jogos, finalizar e alterar placares de partidas em andamento, e ver as classificações por visitantes, times da casa ou geral. Tudo feito a partir de informações básicas da partida.
<br>

### Como executar:
ATENÇÃO:
Você precisa ter o docker instalado no seu computador.
O frontend, backend e db ocupam as portas 3000, 3001 e 3306 respectivamente, certifique-se que elas não estão sendo usadas, ou a aplicação não vai funcionar.
<br><br>
1º Clone o repositório:
```bash
git clone git@github.com:lucas-g-oliveira/TFC-gerir-classificacao-em-um-campeonato.git
```
2º Execute o comando abaixo no diretório raiz da aplicação e aguarde, pode demorar dependendendo do computador, após terminar, o app poderá ser acessado na <a href="http://localhost:3000/" target="_blank">porta 3000</a>.
```bash
npm run install:apps && npm run compose:up
```
3º Você pode pazer login como usuário ou administrador, com as credenciais abaixo <br>
<br>Admin: admin@admin.com  | Password: secret_admin
<br>User: user@user.com    | Password: secret_user


<br>
 <img src="images/preview.png" width="900px" >

 ## Objetivos:
<section>
- Praticar os conhecimentos adquiridos sobre Hofs
</br> - Praticar testes unitários com Jest
</br> - praticar conhecimentos de Typescript

</section>

</br>

## Créditos:

- Desenvolvido por mim: Backend, testes unitários e configurações do docker.
- Desenvolvido pela `Trybe`: Todo o front-end e configurações do package.json, ts.config e testes.
