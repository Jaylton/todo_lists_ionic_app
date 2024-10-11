# To-do lists Ionic APP

Aplicativo móvel desenvolvido com Ionic e Angular para gerenciamento de tarefas, utilizando Firebase Authentication para autenticação de usuários e Firestore para armazenamento de dados.

![52285f104122939 5f5bbf1ce5a6d](https://github.com/user-attachments/assets/845d9cc3-ea73-4728-a043-17ebe8d4292e)


## Funcionalidades
 - Autenticação de Usuário: Permite login e cadastro de usuários utilizando Firebase Authentication (por email e senha, e login via Facebook).
 - Gerenciamento de Tarefas: Adicione, edite e exclua tarefas. Marque tarefas como concluídas ou pendentes.
 - Integração com Firebase Firestore: Todas as tarefas são armazenadas no Firestore, o banco de dados NoSQL da Firebase.
 - UI Responsiva: Design otimizado para dispositivos móveis.

## Tecnologias Utilizadas
 - Ionic Framework: Para criar a interface responsiva e fornecer funcionalidades nativas através de Capacitor.
 - Angular: Framework de frontend usado para desenvolver a lógica do aplicativo.
 - Firebase Authentication: Para autenticar usuários no app.
 - Firebase Firestore: Para armazenar e gerenciar os dados das tarefas.
 - SCSS: Usado para estilizar o aplicativo.

## Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:
 - Node.js
 - Ionic CLI (npm install -g @ionic/cli)
 - Firebase CLI (npm install -g firebase-tools)

## Instalação
1. Clone o repositório:

    ``` sh
    git clone https://github.com/usuario/tarefas-app.git
    cd tarefas-app
    ```

2. Instale as dependências:

    ``` sh
    npm install
    ```

3. Configure o Firebase:

 - Crie um projeto no Firebase.
 - Ative o Firebase Authentication com o método de email e senha.
 - Ative o Firestore Database.
 - Copie as configurações do seu projeto Firebase e substitua no arquivo src/environments/environment.ts.

    Exemplo de configuração do Firebase:

    ``` ts
    export const environment = {
      production: false,
      firebaseConfig: {
        apiKey: "SUA_API_KEY",
        authDomain: "SEU_DOMINIO",
        projectId: "SEU_PROJECT_ID",
        storageBucket: "SEU_BUCKET",
        messagingSenderId: "SEU_MESSAGING_ID",
        appId: "SEU_APP_ID",
      }
    };
    ``` 

4. Inicie o servidor de desenvolvimento:

    ``` 
    ionic serve
    ``` 
