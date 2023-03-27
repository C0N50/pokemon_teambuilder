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
	"name" VARCHAR (255) NOT NULL,
	"team_pokemon_id" INT NOT NULL REFERENCES "team_pokemon" ON DELETE CASCADE
);

--CREATE TABLE "pokemon_type" (
--	"id" serial PRIMARY KEY,
--	"team_pokemon_id" INT NOT NULL REFERENCES "team_pokemon",
--	"api_type_id" INT NOT NULL,
--	"image_url" VARCHAR (255) NOT NULL
--);

CREATE TABLE "pokemon_type" (
	"id" serial PRIMARY KEY,
	"name" VARCHAR (255) NOT NULL,
	"image_url" VARCHAR (255) NOT NULL
);


INSERT INTO "pokemon_type" ("name", "image_url")
VALUES 
('normal', 'Types/NormalIC_SV.png'),
('fire', 'Types/FireIC_SV.png'),
('fighting', 'Types/FightingIC_SV.png'),
('water', 'Types/WaterIC_SV.png'),
('flying', 'Types/FlyingIC_SV.png'),
('grass', 'Types/GrassIC_SV.png'),
('poison', 'Types/PoisonIC_SV.png'),
('electric', 'Types/ElectricIC_SV.png'),
('ground', 'Types/GroundIC_SV.png'),
('psychic', 'Types/PsychicIC_SV.png'),
('rock', 'Types/RockIC_SV.png'),
('ice', 'Types/IceIC_SV.png'),
('bug', 'Types/BugIC_SV.png'),
('dragon', 'Types/DragonIC_SV.png'),
('ghost', 'Types/GhostIC_SV.png'),
('dark', 'Types/DarkIC_SV.png'),
('steel', 'Types/SteelIC_SV.png'),
('fairy', 'Types/FairyIC_SV.png');





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

INSERT INTO "pokemon_move" ("name", "team_pokemon_id")
VALUES ('tackle', '13');


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


SELECT "team_pokemon".api_pokemon_id FROM "team_pokemon"
JOIN "team" ON "team_pokemon".team_id = "team".id
WHERE "team".user_id ='1' AND "team_pokemon".team_id = '1' AND "team_pokemon".api_pokemon_id = '25';


UPDATE "team_pokemon"
  SET api_pokemon_id = '25' 
  FROM "team_pokemon"
  JOIN "team" ON "team_pokemon".team_id = "team".id
  WHERE "team".user_id ='1' AND "team_pokemon".team_id = '1' AND "team_pokemon".api_pokemon_id = '1';
  
  
SELECT "tp".api_pokemon_id
  FROM "team_pokemon" AS "tp"
  JOIN "team" as "t" ON "tp".team_id = "t".id
  WHERE "t".user_id ='1' AND "tp".team_id = '1' AND "tp".api_pokemon_id = '1';
  
  
UPDATE "team_pokemon"
SET api_pokemon_id = '25' 
WHERE "team_pokemon".team_id = '25' AND "team_pokemon".api_pokemon_id = '1';


SELECT * FROM "pokemon_type";
  
  




