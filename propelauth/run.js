//https://auth.reportbase.com/api/v1/refresh_token
var accesstoken="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODM5NTg5NTAsImV4cCI6MTY4Mzk2MDc1MCwidXNlcl9pZCI6IjJiY2U2MTc5LWZmN2MtNDA1NS1hMzg5LTEzYjMzYjE3NDEwMyIsImlzcyI6Imh0dHBzOi8vYXV0aC5yZXBvcnRiYXNlLmNvbSIsImVtYWlsIjoidXNlckByZXBvcnRiYXNlLmNvbSIsImZpcnN0X25hbWUiOiJzY290dCIsImxhc3RfbmFtZSI6ImJyaW5rbWFuIiwidXNlcm5hbWUiOiJ1c2VyIiwib3JnX2lkX3RvX29yZ19tZW1iZXJfaW5mbyI6e319.cxVIAwKv8fI-cgveQc-9EiBP-9qba_R6sX6Ez0IQFCLmOT5cDDL_RhHV0gLUZx8ae3UwhWpl_trFkvo6bQYimzWSXYschWOujybSPE18rdtQXEKuKw-X-4ghRfAtIBGoATiBh24NGN47IkmUmxXIgDhHci52p20ZDkRm2AWUyUBDF-7QuWVhsWWP5bxAGfriVMKLtJlEUXNoMJDug7e11CnapGsgY463mYg0yThJTmImvTxI0lR96knQZwbDxpwuycyTt2_fzOxzTfvfGFb38WXUKDt13fPtQoW_AQPAtxqSp3UiJWacyuYltEI0yXk4_hGOqkLWKcCgpLwzCNJblA";
var body = JSON.stringify( { accessToken: accesstoken, data: {"scott":"harry" }});

fetch(`https://propelauth.reportbase5836.workers.dev`,
    {
        method: "POST",
        body: body
    })
  .then(response => response.text())
  .then(response => console.log(response))
  .catch(err => console.error(err));




