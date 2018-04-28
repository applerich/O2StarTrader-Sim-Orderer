# O2StarTrader-Sim-Orderer
Used to order 20 free sims multiple times from https://www.o2startrader.co.uk/ using HTTP Requests. Coded in Node JS

O2StarTrader is a platform in which you can create an account and order 20 free sims. Once you distribute these sims, you will get affiliate money each time someone top's up the sim you've received. This code allows you to order multiple sims with ease and manage/save accounts that are created.
**Usage**

1. Input your details in 'config.json'
tasks = the amount of accounts you want to create at the time

2. Open the directory and in the console, input

   > node index.js


**Requires**

Cheerio
>npm install cheerio

Request
>npm install request

Fs
>npm install fs