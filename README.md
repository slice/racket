# racket

play with javascript in your browser with no friction

```sh
$ npm i -g @slicey/racket
```

## description

racket is a small wrapper around webpack and webpack-serve, letting you quickly
test javascript in the browser without having to set things up.

racket isn't designed to 'build' apps, though. no code compiling is done other
than `import`/`export` resolving via webpack and jsx compiling, so make sure you
have a modern browser while using racket.

think of racket like a really really small create-react-app, with no scaffolding
required.

## getting started

create `index.js`:

```js
import React from 'react'
import ReactDOM from 'react-dom'

const node = (
  <div style={{ padding: '1rem', background: 'mistyrose' }}>beep boop!</div>
)

// injected by racket automatically
const mountNode = document.getElementById('mount')

ReactDOM.render(node, mountNode)
```

install your deps:

```sh
$ npm i react react-dom
```

and boot it up:

```sh
$ racket

ℹ ｢hot｣: webpack: Compiling...
ℹ ｢serve｣: Project is running at http://localhost:8080
```
