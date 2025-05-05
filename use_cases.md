# Äänestysjärjestelmän käyttötapausten kuvaukset

Tässä asiakirjassa kuvataan äänestysjärjestelmän käyttötapaukset käyttötapauskaavion mukaisesti.

## Käyttötapaus 1: Äänestäjän rekisteröinti

- **Käyttötapauksen nimi**: Register Voter
- **Käyttäjät**: Vaaliviranomainen
- **Trigger**: Vaalivirkailija käynnistää äänestäjien rekisteröintiprosessin uuden äänestäjän lisäämiseksi järjestelmään.
- **Edellytys**:
  - Vaalivirkailija on kirjautunut järjestelmään hallinnollisilla oikeuksilla.
  - Äänestäjän tunnistetiedot (esim. nimi, henkilötunnus) ovat käytettävissä.
- **Edellytys**:
  - Äänestäjä on rekisteröity järjestelmään ja hänelle on annettu yksilöllinen äänestäjän tunnus.
  - Äänestäjä on oikeutettu osallistumaan vaaleihin.
- **Käyttötilanteen kulku**:
  1. Vaalivirkailija kirjautuu äänestysjärjestelmään.
  2. Vaalivirkailija siirtyy kohtaan ”Rekisteröi äänestäjä”.
  3. Vaalivirkailija syöttää äänestäjän tiedot (nimi, henkilötunnus, osoite).
  4. Järjestelmä validoi syötetyt tiedot (esim. tarkistaa, ettei henkilöllisyystodistuksia ole päällekkäin).
  5. Järjestelmä luo yksilöllisen äänestäjätunnuksen ja tallentaa äänestäjätietueen.
  6. Järjestelmä näyttää vaaliviranomaiselle vahvistusviestin.
- **Poikkeuksellinen toiminta**:
  - **Vääränlainen syöttö**: Jos äänestäjän tunnus on jo rekisteröity tai jos tiedot on syötetty puutteellisesti, järjestelmä näyttää virheilmoituksen ja kehottaa vaalivirkailijaa korjaamaan tiedot.
  - **Järjestelmävirhe**: Jos järjestelmä ei onnistu tallentamaan äänestäjätietuetta, näytetään virheilmoitus ja vaalivirkailijaa kehotetaan yrittämään uudelleen.
  
  ## Käyttötapaus 2: Äänestäjän kelpoisuuden tarkistaminen
- **Käyttötapauksen nimi**: Verify Voter Eligibility
- **Käyttäjät**:Vaaliviranomainen, äänestysjärjestelmä (automaattinen)
- **Käynnistin**:Äänestäjä yrittää äänestää tai vaalivirkailija tarkistaa äänestäjän kelpoisuuden manuaalisesti.
- **Edellytys**:
  - Äänestäjä on rekisteröitynyt järjestelmään.
  - Vaalivirkailija on kirjautunut sisään (manuaalista todentamista varten) tai äänestäjä antaa tunnukset (automaattista todentamista varten).
- **Edellytys**:
- Äänestäjän kelpoisuus on vahvistettu, jolloin hän voi äänestää, tai evätty, jolloin äänestäminen estyy.
- **Käyttötilanteen kulku**:
1. Äänestäjä tai vaalivirkailija käynnistää tarkastusprosessin.
  2. Järjestelmä pyytää äänestäjän henkilöllisyystodistusta tai valtakirjaa.
  3. Järjestelmä tarkistaa äänestäjän tiedot kelpoisuuskriteerien perusteella (esim. rekisteröintitilanne, ikä, alue).
  4. Jos äänestäjä on oikeutettu, järjestelmä myöntää pääsyn äänestyskäyttöliittymään.
  5. Jos äänioikeus ei täyty, järjestelmä näyttää hylkäävän viestin.
- **Poikkeuksellinen toiminta**:
5.Järjestelmä luo yksilöllisen äänestäjätunnuksen ja tallentaa äänestäjätietueen.
6.Järjestelmä näyttää vaaliviranomaiselle vahvistusviestin.

- **Poikkeuksellinen toiminta**:

- **Vääränlainen syöttö**:Jos äänestäjän tunnus on jo rekisteröity tai jos tiedot on syötetty puutteellisesti, järjestelmä näyttää virheilmoituksen ja kehottaa vaalivirkailijaa korjaamaan tiedot.
- **Järjestelmävirhe**:Jos järjestelmä ei onnistu tallentamaan äänestäjätietuetta, näytetään virheilmoitus ja vaalivirkailijaa kehotetaan yrittämään uudelleen.

## Käyttötapaus 3: Äänestä
- **Käyttötapauksen nimi**: Cast Vote
- **Käyttäjät**:
Voter
- **Trigger**:Äänestäjä aloittaa äänestysprosessin kelpoisuuden tarkistamisen jälkeen.
- **Edellytys**:
- Äänestäjä on todettu äänioikeutetuksi (sisältää Verify Voter Eligibility -käyttötapauksen).
- Vaali on aktiivinen (äänestysaika on avoinna).
- **Postcondition**:
- Äänestäjän ääni on kirjattu järjestelmään.
  - Äänestäjä ei voi äänestää uudelleen samassa vaalissa.
- **Käyttötilanteen kulku**:
  1. Äänestäjä kirjautuu äänestysjärjestelmään tunnuksillaan.
  2. Järjestelmä tarkistaa kelpoisuuden (kutsuu Verify Voter Eligibility).
  3. Järjestelmä näyttää äänestyslipun, jossa on ehdokasvaihtoehdot.
  4. Äänestäjä valitsee ehdokkaan ja lähettää äänensä.
  5. Järjestelmä tallentaa äänestyksen ja merkitsee äänestäjän äänestäneeksi.
6.Järjestelmä näyttää äänestäjälle vahvistusviestin.
- **Poikkeuksellinen toiminta**:
  - **On jo äänestänyt**: Jos äänestäjä on jo äänestänyt, järjestelmä näyttää virheilmoituksen ja estää äänestämisen uudelleen.
  - **Valinta päättynyt**:
Cast Vote
  - **Käyttäjät**:Äänestäjä
  
  ## Käyttötapaus 4: Ääntenlaskenta
- **Käyttötapauksen nimi**: Ääntenlaskenta
- **Käyttäjät**:
Järjestelmänvalvoja
- **Trigger**:

Järjestelmänvalvoja käynnistää ääntenlaskennan vaalien päättymisen jälkeen.
- **Edellytys**:
- Vaalikausi on päättynyt.
- Järjestelmänvalvoja on kirjautunut sisään järjestelmänvalvojan oikeuksin.
- **Edellytys**:
- Kunkin ehdokkaan äänimäärät on laskettu ja tallennettu.
- Vaalitulokset ovat valmiina katsottaviksi.
- **Käyttötilanteen kulku**:
1.Järjestelmänvalvoja kirjautuu äänestysjärjestelmään.
2.Järjestelmänvalvoja siirtyy ”Tally Votes” -osioon.
3.Järjestelmä laskee yhteen kaikki kirjatut äänet.
4.Järjestelmä laskee ehdokaskohtaiset kokonaisäänet.
5.Järjestelmä tallentaa tulokset ja näyttää yhteenvedon ylläpitäjälle.
- **Poikkeuksellinen toiminta**:
  - **Vaalit ovat edelleen aktiivisia**: Jos vaali on käynnissä, järjestelmä estää ääntenlaskennan ja näyttää virheilmoituksen.
- **Tietojen korruptoituminen**:Jos äänestystiedot ovat puutteellisia tai korruptoituneita, järjestelmä ilmoittaa asiasta ylläpitäjälle ja ehdottaa tietojen tarkastusta.


## Käyttötapaus 5: Näytä vaalitulokset
- **Käyttötapauksen nimi**: Näytä vaalitulokset
- **Käyttäjät**:
Äänestäjä, vaaliviranomainen
- **Trigger**:

Käyttäjä pyytää saada tarkastella vaalituloksia vaalien päättymisen jälkeen.
- **Edellytys**:
- Vaalit ovat päättyneet ja äänet on laskettu.
- Järjestelmänvalvoja on julkaissut tulokset.
- **Edellytys**:
- Käyttäjä katsoo vaalitulokset (esim. ehdokkaiden äänimäärät).
- **Käyttötilanteen kulku**:
  1. Käyttäjä (äänestäjä tai vaaliviranomainen) käyttää äänestysjärjestelmää.
  2. Käyttäjä siirtyy ”Vaalitulokset”-osioon.
  3. Järjestelmä hakee ja näyttää yhteenlasketut tulokset (esim. pylväsdiagrammina tai taulukkona).
  4. Käyttäjä tarkastelee tuloksia.
- **Poikkeuksellinen toiminta**:
- **Tuloksia ei ole saatavilla**:Jos vaalit ovat käynnissä tai tuloksia ei ole vielä julkaistu, järjestelmä näyttää viestin, joka ilmoittaa, että tuloksia ei ole saatavilla.
  - **Käyttöoikeus evätty**: Jos käyttäjällä ei ole oikeuksia (esim. tulokset on rajoitettu virkamiehiin), näytetään virheilmoitus.