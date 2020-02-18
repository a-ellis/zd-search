import { readFileSync } from 'fs';
import {resolve } from 'path';

const uniqueKeys = [];

// Users
// const data = JSON.parse(readFileSync(resolve(__dirname, './user/user.json'), 'utf-8'));

// Tickets
// const data = JSON.parse(readFileSync(resolve(__dirname, './ticket/ticket.json'), 'utf-8'));

// Organizations
const data = JSON.parse(readFileSync(resolve(__dirname, './organization/organization.json'), 'utf-8'));

data.forEach(item => {
  Object.keys(item).forEach(key => {
    if (!uniqueKeys.includes(key)) {
      uniqueKeys.push(key);
    }
  });
});

uniqueKeys.forEach(key => console.log(`'${key}',`));

// console.log(...uniqueKeys);


const idArr = [...data.map(item => item._id)];

console.log(idArr.length);

data.forEach(item => {
  const keys = Object.keys(item);
  if (keys.length < uniqueKeys.length) {
    console.log(`Element: ${item.name} is missing keys: ${uniqueKeys.filter(key => !keys.includes(key)).map(key => key)}`)
  }
})

