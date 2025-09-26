# dynamic-slide-show
 SlideShow dinâmico para apresentação de slides
# 🖼️ Galeria de Imagens Dinâmica com PHP

Um sistema de slideshow de imagens completo e autogerenciável, construído com PHP no backend para manipulação de arquivos e JavaScript puro (ES6+) no frontend para interatividade. Ideal para portfólios, banners de notícias ou qualquer aplicação que necessite de uma galeria de imagens que possa ser atualizada sem editar o código.

---

## ✨ Funcionalidades Principais

O projeto é dividido em duas partes principais: o **Slideshow** (`index.html`) e o **Painel de Gerenciamento** (`gerenciar.html`).

### Slideshow (`index.html`)
* **Carregamento Dinâmico:** As imagens são carregadas automaticamente da pasta `/imagens` no servidor.
* **Controles Completos:** Navegação (anterior/próxima), pausar/retomar, embaralhar e modo de tela cheia.
* **Customização Avançada:**
    * **4 Efeitos de Transição:** Escolha entre "Deslizar (Horizontal)", "Esmaecer (Fade)", "Deslizar (Vertical)" e "Zoom".
    * **Tempo Configurável:** Defina o intervalo de tempo para a troca de slides.
    * **Persistência:** Suas escolhas de efeito e tempo são salvas no navegador (`localStorage`) e recarregadas automaticamente.
* **Upload de Imagens:** Envie novas imagens diretamente pela interface do slideshow.

### Painel de Gerenciamento (`gerenciar.html`)
* **Galeria Visual:** Visualize todas as imagens presentes no servidor em um layout de grade.
* **Deleção Individual:** Apague imagens específicas com um clique e confirmação.
* **Deleção em Massa:** Um botão para apagar todas as imagens da galeria de uma só vez, com dupla confirmação para segurança.

---

## 🛠️ Estrutura de Arquivos

O projeto é organizado de forma modular para fácil manutenção:

```
/
├── index.html           (A página do slideshow)
├── gerenciar.html       (A página de gerenciamento de imagens)
│
├── assets/
│   ├── css/
│   │   ├── main.css         (Estilos do slideshow)
│   │   └── gerenciar.css    (Estilos da página de gerenciamento)
│   └── js/
│       ├── main.js          (Scripts do slideshow)
│       └── gerenciar.js     (Scripts da página de gerenciamento)
│
├── includes/
│   ├── listar_imagens.php   (Script PHP que lê a pasta e retorna a lista de imagens)
│   ├── upload.php           (Script PHP que gerencia o upload de novas imagens)
│   └── deletar_imagem.php   (Script PHP que apaga as imagens do servidor)
│
└── /imagens/              (Pasta onde as imagens são armazenadas)
```

---

## 🚀 Como Executar o Projeto

1.  **Servidor Web:** É necessário um ambiente de servidor com suporte a **PHP** (como XAMPP, WAMP, MAMP ou um servidor web online).
2.  **Clone o Repositório:** Baixe ou clone os arquivos para a pasta do seu servidor (ex: `htdocs` no XAMPP).
3.  **Permissões da Pasta:** A pasta `/imagens/` precisa de **permissões de escrita** para que o PHP possa salvar (upload) e apagar (delete) os arquivos.
4.  **Acesse:** Abra o navegador e acesse o `index.html` através do seu endereço de servidor local (ex: `http://localhost/seu-projeto/`).

---

## 💻 Tecnologias Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Fetch API
* **Backend:** PHP
* 
 Administração dos slides
<img width="1920" height="1080" alt="imagem1" src="https://github.com/user-attachments/assets/a1923e1b-c35c-4c54-aeaa-aee93c6507dc" />

Gerenciamento das imagens
<img width="1920" height="1080" alt="imagem2" src="https://github.com/user-attachments/assets/28d4023b-f01e-4d5a-8ebd-49e3a785ede6" />
