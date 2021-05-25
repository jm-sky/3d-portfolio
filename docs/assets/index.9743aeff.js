import{O as e,T as t,S as i,C as s,G as n,W as a,P as h,a as r,A as o,b as c,c as m,M as d,d as l,e as p,f as w}from"./vendor.ee9400eb.js";class g{constructor(e={}){this.options=e,this.spread=e.spread||100,this.init()}init(){this.geometry=new p(.25,24,24),this.material=new d({color:16777215}),this.mesh=new l(this.geometry,this.material);const[e,t,i]=Array(3).fill().map((()=>w.randFloatSpread(this.spread)));this.mesh.position.set(e,t,i)}}const u=new class{constructor(e={}){this.options=e,this.entities=[],this.helpers={},this.lights={},this.init()}init(){this.createScene(),this.createLights(),this.createCamera(),this.createRenderer(),this.options.helpers&&this.addHelpers(),this.controls=new e(this.camera,this.renderer.domElement)}createScene(){this.bg=(new t).load("./space.jpg"),this.scene=new i,this.scene.background=new s(17),this.scene.background=this.bg,this.helpers.gridHelper=new n(200,50)}createRenderer(){this.renderer=new a({canvas:document.querySelector("#bg")}),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.setSize(window.innerWidth,window.innerHeight)}createCamera(){this.camera=new h(75,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.setZ(10)}createLights(){this.lights.pointLight=new r(16777215,.8),this.lights.pointLight.position.set(9,9,9),this.lights.ambientLight=new o(16777215,.2),this.scene.add(...Object.values(this.lights)),this.helpers.lightHelper=new c(this.lights.pointLight)}addHelpers(){this.scene.add(...Object.values(this.helpers))}add(...e){e.forEach((e=>{this.entities.push(e),e.mesh&&this.scene.add(e.mesh)}))}animate(){requestAnimationFrame((()=>this.animate())),this.entities.filter((e=>e.update)).forEach((e=>{e.update()})),this.renderer.render(this.scene,this.camera)}}({helpers:!1}),b=new class{constructor(e={}){this.options=e,this.init()}init(){this.geometry=new m(29,8,16,100),this.material=new d({color:16737095,wireframe:this.options.wireframe}),this.mesh=new l(this.geometry,this.material)}update(){this.mesh.rotation.x+=.01,this.mesh.rotation.y+=.005}}({wireframe:!1}),y=Array(600).fill().map((e=>new g({spread:400}))),f=new class{constructor(){this.init()}init(){this.geometry=new p(7,24,24),this.bg=(new t).load("./moon.jpg"),this.normalMap=(new t).load("./normal.jpg"),this.material=new d({map:this.bg,normalMap:this.normalMap}),this.mesh=new l(this.geometry,this.material),this.mesh.position.setX(60),this.mesh.position.setY(10),this.mesh.position.setZ(-75)}};u.add(b),u.add(f),u.add(...y),document.body.onscroll=function(){const e=document.body.getBoundingClientRect().top;f.mesh.rotation.x+=.05,f.mesh.rotation.y+=.075,f.mesh.rotation.z+=.05,u.camera.position.x=0+-.1*e,u.camera.position.z=30+-2e-4*e,u.camera.position.y=0+-2e-4*e},u.animate();
