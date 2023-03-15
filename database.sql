
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- MANUALLY CREATED

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE "team" (
	"id" serial PRIMARY KEY,
	"team_name" VARCHAR(255) NOT NULL,
	"user_id" INT NOT NULL REFERENCES "user"
);


CREATE TABLE "team_pokemon" (
	"id" serial PRIMARY KEY,
	"team_id" INT NOT NULL REFERENCES "team" ON DELETE CASCADE,
	"api_pokemon_id" INT
);



CREATE TABLE "pokemon_move" (
	"id" serial PRIMARY KEY,
	"team_pokemon_id" INT NOT NULL REFERENCES "team_pokemon" ON DELETE CASCADE,
	"api_move_id" INT 
);


CREATE TABLE "pokemon_type" (
	"id" serial PRIMARY KEY,
	"team_pokemon_id" INT NOT NULL REFERENCES "team_pokemon",
	"api_type_id" INT NOT NULL
);


INSERT INTO "team" ("team_name", "user_id")
VALUES ( 'Electric Friends', '1');

INSERT INTO "team_pokemon" ("team_id", "api_pokemon_id")
VALUES ('1','25'), ('1','1008'), ('1', '135'), ('1', '466'), ('1', '894'), ('1','145');

INSERT INTO "team" ("team_name", "user_id")
VALUES ( 'Lil Pokes', '1');

INSERT INTO "team_pokemon" ("team_id", "api_pokemon_id")
VALUES ('2','175'), ('2','172'), ('2', '446'), ('2', '458'), ('2', '447'), ('2','438');

INSERT INTO "team" ("team_name", "user_id")
VALUES ( 'TalonTusk', '2');

INSERT INTO "team_pokemon" ("team_id", "api_pokemon_id")
VALUES ('3','1000'), ('3','663'), ('3', '984'), ('3', '986'), ('3', '991'), ('3','987');


SELECT "user".username, team.team_name, team_pokemon.api_pokemon_id FROM "user"
JOIN team ON team.user_id = "user".id
JOIN team_pokemon ON team_pokemon.team_id = team.id
GROUP BY "user".username, team.team_name, team_pokemon.api_pokemon_id;


SELECT "user".username, "team".team_name, "team_pokemon".api_pokemon_id FROM "user"
JOIN "team" ON "team".user_id = "user".id
JOIN "team_pokemon" ON "team_pokemon".team_id = "team".id
WHERE  "user".id='1' AND "team".id = '2'
GROUP BY "user".username, "team".team_name, "team_pokemon".api_pokemon_id;

SELECT "user".username, "team".id, "team".team_name, "team_pokemon".api_pokemon_id FROM "user"
JOIN "team" ON "team".user_id = "user".id
JOIN "team_pokemon" ON "team_pokemon".team_id = "team".id
WHERE  "user".id='1'
GROUP BY "user".username, "team".id, "team".team_name, "team_pokemon".api_pokemon_id;


SELECT "team".id, "team".team_name FROM "team"
JOIN "user" ON "team".user_id = "user".id
JOIN "team_pokemon" ON "team_pokemon".team_id = "team".id
WHERE  "user".id= '1' 
GROUP BY "team".id, "team".team_name;


-- Select From ream.router.js
SELECT "user".username, "team".id, "team".team_name, "team_pokemon".api_pokemon_id FROM "user"
  JOIN "team" ON "team".user_id = "user".id
  JOIN "team_pokemon" ON "team_pokemon".team_id = "team".id
  WHERE  "user".id='1'
  GROUP BY "user".username, "team".id, "team".team_name, "team_pokemon".api_pokemon_id;



