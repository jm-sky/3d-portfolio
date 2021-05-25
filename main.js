import './style.css';

import * as THREE from 'three';
import App from './src/App.js';
import Torus from './src/Torus.js';
import Star from './src/Star.js';
import Moon from './src/Moon.js';
//-------------------------------------------------------------------------

//-------------------------------------------------------------------------
const app = new App({ helpers: false });
const torus = new Torus({ wireframe: false });
const stars = Array(600).fill().map(_ => new Star({ spread: 400 }));
const moon = new Moon();

app.add(torus);
app.add(moon);
app.add(...stars);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.mesh.rotation.x += 0.05;
  moon.mesh.rotation.y += 0.075;
  moon.mesh.rotation.z += 0.05;

  app.camera.position.x = 0 + t * -0.1;
  app.camera.position.z = 30 + t * -0.0002;
  app.camera.position.y = 0 + t * -0.0002;
}
document.body.onscroll = moveCamera;

app.animate();
