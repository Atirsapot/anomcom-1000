
# ANOMICON-1000
Omaksi iloksi ja opiksi rakennettu "anonyymi" ja "lokaali" web pohjainen keskustelu

## Idea...
Web chatroom johon liittyminen vaatii generoidun qr koodin skannaamisen toisen keskustelijan laitteelta. Eli face to face kohtaaminen vaaditaan. 
Käyty keskustelu poistuu käyttäjän uloskirjautumisen myötä. 

## Toteutus 
Reactilla ja Google Firebasella rakennetaan reaktiivinen SPA. Firebase tallentaa keskustelut ja generoidun sessiotokenin. Uloskirjautuessa tiedot poistetaan firebasesesta. 
## Mikä toimii
 - Keskustelu toimiii teoriassa. 
 - Reactilla tehty UI.
 - Firebase tallentaa keskustelun. 
 - Toistaiseksi kirjautuminen vaatii Google tunnukset.
 
## Mitä uupuu...
 - Anonyymi kirjautuminen sessio tokenilla ei vielä suunniteltu. 
 - Sessio tokenin muuntaminen QR koodiksi.
 - QR koodin lukeminen toiselta laitteelta.
 - Tietojen poistaminen uloskirjautumisen yhteydessä. 
 
 ## Ideoita tulevaisuudelle
Tulevaisuudessa ehkä mahdollista liittyä myös ryhmäkeskusteluunkin... ei pitäisi vaikuttaa hirveästi tpteutukseen, sillä data on vain timestampattyä tekstiä, jolla user id joka on joko käyttäjän oma tai kenen tahansa muun. Selvityksessä...

Ennen QR koodia voisi kokeilla perinteistä pin koodin generointia. Kun PIN toimii, voidaan lisätä pin koodin muuttaminen qr koodiksi, ja qr koodin lukeminen.


