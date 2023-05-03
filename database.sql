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
  




