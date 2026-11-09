# Fácil Viagens — site institucional

Projeto React + TypeScript + Vite. A identidade visual foi reconstruída para a Fácil Viagens, aproveitando a base técnica do ZIP enviado (React/Vite, organização por componentes e ícones Lucide), sem copiar a identidade do site de referência.

## Executar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Fotografias oficiais

**Nenhuma fotografia de destino ou viagem foi reaproveitada do site de referência.** As três imagens do ZIP original eram capturas de tela de outro site de viagens, não registros da Fácil Viagens. Por isso, elas não foram incluídas na nova interface.

A página contém placeholders visuais identificados para receber somente fotos autorizadas da agência. Adicione os arquivos nas pastas:

- `public/images/logo`
- `public/images/banner`
- `public/images/destinos`
- `public/images/pacotes`
- `public/images/experiencias`
- `public/images/promocoes`
- `public/images/equipe`
- `public/images/excursoes`

Depois, atualize os placeholders em `src/App.tsx` para renderizar os arquivos oficiais. Não use imagens genéricas ou geradas por IA.

## Conteúdo comercial

Destinos, pacotes, preços, datas, disponibilidade, promoções, avaliações e redes sociais não foram inventados. O site orienta o visitante a consultar a agência até que o catálogo comercial real seja cadastrado.

## Funcionalidades

- Navegação por seções e menu responsivo.
- Formulário de pesquisa que prepara uma mensagem de orçamento no WhatsApp.
- Formulário de contato com validação básica e envio via WhatsApp.
- Filtros de categoria na área de destinos.
- Atalhos de telefone, e-mail, WhatsApp e Google Maps.
- Horários e endereço informados pela empresa.
- Modal de política de privacidade e termos de uso.
- Layout responsivo, acessibilidade básica e suporte a `prefers-reduced-motion`.

## Dados oficiais configurados

- Fácil Viagens — Sousa, Paraíba.
- Telefone/WhatsApp: (83) 99108-3939.
- E-mail: facilviagens@facilviagens.net.
- Endereço: Rua Cônego José Viana, nº 99, bairro Estação, Sousa – PB, CEP 58807-320.
- Segunda a sexta: 08h–12h e 14h–18h.
- Sábado: 08h–12h.
- Domingo: fechado.

## Observação técnica

O formulário não grava dados em servidor: ele valida os campos essenciais e abre o WhatsApp com a mensagem preenchida. Não existe consulta de passagens, reserva ou disponibilidade automatizada nesta versão.
