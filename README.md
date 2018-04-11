# react_kurssi

## luo projecti (minne projektin juuri luodaan)


## käynnistä json-serveri (projektin juuressa)
npx json-server --port=3001 --watch db.json

### json-serveri järkevämmin
1. asennetaan juureen riippuvuudeksi:
npm install json-server --save
2. lisätään tiedoston package.json osaan scripts rivi:
"server": "json-server -p3001 db.json"
3. käynnistetään serveri:
npm run server

## asennetaan axios -kirjaston (projektin juuressa)
npm install axios --save