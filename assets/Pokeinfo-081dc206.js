import{j as s}from"./index-b8d1fe4c.js";const n=({data:a})=>s.jsxs("div",{className:"left-content",children:[s.jsxs("div",{className:"picture",children:[s.jsx("div",{className:"Pokemonfont",children:a.name}),s.jsx("img",{src:a.sprites.other.home.front_default,alt:"Pic not available..."})]}),s.jsxs("div",{className:"pokemonStats",children:[s.jsx("div",{className:"abilities",children:a.abilities.map(e=>{const t=`${a.types[0].type.name} group`;return s.jsx("div",{className:t,children:s.jsx("h2",{children:e.ability.name})},e.ability.name)})}),s.jsx("div",{className:"base-stat",children:a.stats.map(e=>s.jsx("div",{className:"stats",children:s.jsxs("h3",{children:[e.stat.name,": ",e.base_stat]})},e.stat.name))})]})]});export{n as default};
