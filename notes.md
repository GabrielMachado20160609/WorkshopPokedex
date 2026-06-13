### Anotações importantes
- Uma boa forma de entregar resultados com IA é definir melhor o porjeto, ferramentas que vão ser utilizadas, descrever o escopo, objetivo e o que ele deve fazer. Detalhar projeto é a chave
- Documentar pode gerar maior aproveitamento da IA para a aplicação. Talvez priorizar mais atenção em revisar documentações (sejam manuais ou geradas)


###### Hybrid teams
Agentes autônomos que vão além dos limites do projeto (ex.: OpenClaw).

#### Instructions
No início de cada sessão essas instructions serão lidas.
```
    *.instructions.md
```

#### Copilot Instructions
Atua especificamente no contexto do projeto.
```
    copilot-instructions.md
```

#### Prompts
Invocados quando usamos barra no chat, como comandos do Claude. (como por exmeplo o /create-agent)
```
    *.promt.md
```
obs.: Não pode executar scripts complexos

#### Skills
Habilidades que podem executar scripts, definidas como skills do Claude.
```
    SKILL.md
```

#### Agentes
Coração do desenvolvimento, cada um especialista em um tópico.

#### Hooks
Gatilhos disparados que tomam decisões (não isoladamente) antes ou depois de ferramentas serem usadas. Pode ser utilizada como um Guardrail. Podem executar scripts. Pode até disparar um pipeline de CI/CD.
```
    hooks / settings.json
```

###### Detalhes
- Demais IDEs são forks do VS Code, mas só o Code consegue processar a IA sem emular o ambiente

ref:
https://github.com/cyz/devdays-pokedex