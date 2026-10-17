# VODAR Smart Irrigation – rendezett weboldal

## FTP feltöltés

A `dist/` mappa **tartalmát** töltsd fel a Kántor weboldalán kiválasztott új almappába. Az `index.html` közvetlenül ebbe az almappába kerüljön. A fő Kántor oldal indexét ne írd felül.

A feltöltéshez szükséges fájlok: index.html, legal.html, app.js, legal.js, style.css, content.json, valamint a teljes assets/ és documents/ mappa. Sem Git, sem Node, PHP vagy adatbázis nem kell.

A documents/ alatt található hét .bin fájl és a brochure.json a letölthető PDF szükséges részei. Együtt töltsd fel őket, ne nevezd át. A képek több méretváltozatát is meg kell tartani: a böngésző választ közöttük a kijelző alapján.

## Szerkesztés

A szövegek és a cégadatok a dist/content.json fájlban szerkeszthetők magyar, angol, olasz és német nyelven. A képválasztás a dist/app.js, a megjelenés a dist/style.css fájlban található. Az űrlap a látogató levelezőprogramját nyitja meg, önállóan nem küld e-mailt.

## Mappák

- dist/: tiszta, feltölthető weboldal, kizárólag használt fájlokkal.
- RM/: külön GitHub-repozitórium. Gyökerében és dist/ almappájában ugyanaz a weboldal található a korábbi telepítési rend szerint. FTP-re ezek közül elég egy példány.
- .git/ és .openai/: fejlesztési előzmények és az online előnézet beállításai; FTP-re nem kellenek.

A régi csomagok, képek, előnézetek és korábbi leírások a projekt melletti VODAR-archivum dátumozott mappába kerültek. Az eredeti fotókat és a kiállítási forrásanyagokat a projekt mappáján kívül nem módosítottuk.

Feltöltés után HTTPS-en ellenőrizd az oldalt, a négy nyelvet, a jogi oldal linkjeit és a prospektus letöltését. A végleges URL ismeretében készítsd el a QR-kódot.
